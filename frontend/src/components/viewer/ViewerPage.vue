<template>
  <div style="width: 100%; height: 100%;" v-if="isReady && displayMode === 'overlay'">
    <ViewerCanvas @click="toggleElementVisibility" :source="image" :elements="statefulElementsOverlay">
      <template #toolbar>
        <ViewerToolbar
          @click="toggleTextVisibility"
          :handleDisplayChange="handleDisplayChange"
          :displayMode="displayMode"
          :isTextVisibile="isTextVisibile" />
      </template>
    </ViewerCanvas>
  </div>
  <Splitpanes v-else-if="isReady && displayMode === 'aside'" class="default-theme">
    <Pane size="50" style="background: none;">
      <ViewerCanvas @click="handleClick" :source="image" :elements="statefulElementsAside">
        <template #toolbar>
          <ViewerToolbar
            :handleDisplayChange="handleDisplayChange"
            :show-text-visibility-toggle="false"
            :displayMode="displayMode"
            :isTextVisibile="isTextVisibile"
          ></ViewerToolbar>
        </template>
      </ViewerCanvas>
    </Pane>
    <Pane style="background: none; position: relative; overflow: auto">
      <ViewerContent @input="handleClick" :content="statefulElementsAside" />
    </Pane>
    <!--
    <Pane style="background: none; position: relative; overflow: auto">
      <div class="browser-content-metadata">
        <div class="title">Metadaten</div>
      </div>
    </Pane>
    -->
  </Splitpanes>
  <b-loading v-else :active="!isReady" :is-full-page="false" style="z-index: 2"></b-loading>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes';
import ViewerCanvas from './ViewerCanvas.vue';
import ViewerToolbar from './ViewerToolbar.vue';
import ViewerContent from './ViewerContent.vue';
import 'splitpanes/dist/splitpanes.css';

export default {
  components: {
    ViewerCanvas,
    ViewerToolbar,
    ViewerContent,
    Splitpanes,
    Pane,
  },
  props: {
    content: Array,
    image: String,
    isReady: Boolean,
  },
  data() {
    return {
      displayMode: 'aside',
      isTextVisibile: false,
      selectedElementsOverlay: [],
      selectedElementsAside: [],
      elementStatesOverlay: {},
      elementStatesAside: {},
      eventSource: null,
    };
  },
  watch: {
    '$route.query': {
      handler: 'setDisplayAndVisbility',
      immediate: true,
    },
    isTextVisibile: {
      handler: 'handleVisibilityChange',
      immediate: true,
    },
    isReady: {
      handler: 'setElementStates',
      immediate: true,
    },
    selectedElementsOverlay: {
      handler: 'handleSelectedElementsOverlayChange',
      immediate: true,
    },
    selectedElementsAside: {
      handler: 'handleSelectedElementsAsideChange',
    },
  },
  computed: {
    statefulElementsOverlay() {
      return this.content.map((element) => ({
        ...this.elementStatesOverlay[element.id],
        ...element,
      }));
    },
    statefulElementsAside() {
      return this.content.map((element) => ({
        ...this.elementStatesAside[element.id],
        ...element,
      }));
    },
  },
  methods: {
    setDisplayAndVisbility(query) {
      // Set text visibility.
      // The default is false.
      if (query.v && (query.v === 'true' || query.v === true)) {
        this.isTextVisibile = true;
      }

      // Set display mode.
      if (query.d) this.handleDisplayChange(query.d);
    },
    handleDisplayChange(value) {
      const query = { ...this.$route.query };
      // Set the display-property in query and change display mode
      query.d = value;
      this.displayMode = value;
      // update the query.
      this.$router.push({
        ...this.$route,
        query,
      });
    },
    handleVisibilityChange(value) {
      if (value === false) {
        // make all text invisible
        this.selectedElementsOverlay = [];
      } else {
        // make all text visible
        this.content.forEach((element) => {
          if (!this.selectedElementsOverlay.includes(element.id)) {
            this.selectedElementsOverlay.push(element.id);
          }
        });
      }
    },
    handleSelectedElementsOverlayChange(elements) {
      this.content.forEach((element) => {
        const state = this.elementStatesOverlay[element.id];
        this.elementStatesOverlay[element.id] = {
          state,
          isTextVisible: elements.includes(element.id),
        };
      });
    },
    handleSelectedElementsAsideChange(elements) {
      this.content.forEach((element) => {
        this.elementStatesAside[element.id] = {
          ...this.elementStatesAside[element.id],
          isSelected: elements.includes(element.id),
          isFocused: elements.includes(element.id),
          eventSource: this.eventSource,
        };
      });
    },
    setElementStates() {
      // Overlay elements
      if (Object.keys(this.elementStatesOverlay).length === 0) {
        this.elementStatesOverlay = this.content.reduce((obj, val) => ({
          ...obj,
          [val.id]: {
            isTextVisible: this.isTextVisibile,
            isHighlighted: val.highlight,
          },
        }), {});
      }

      // Elements in aside mode
      if (Object.keys(this.elementStatesAside).length === 0) {
        this.elementStatesAside = this.content.reduce((obj, val) => ({
          ...obj,
          [val.id]: {
            isTextVisible: this.isTextVisible,
            isHighlighted: val.highlight,
            isSelected: false,
          },
        }), {});
      }
    },
    onDisplayModeChanged(change) {
      // Called when child (ViewerToolbar) changes the displayMode or zoom
      if (change.type === 'display') this.handleDisplayChange(change.value);
    },
    toggleTextVisibility() {
      this.isTextVisibile = !this.isTextVisibile;
      // Update query with text-visibility
      const query = { ...this.$route.query };
      query.v = this.isTextVisibile;
      this.$router.push({
        ...this.$route,
        query,
      });
    },
    toggleElementVisibility(id) {
      // If element is not included, add it.
      if (!this.selectedElementsOverlay.includes(id)) {
        this.selectedElementsOverlay.push(id);
      } else {
        // else remove it.
        const index = this.selectedElementsOverlay.indexOf(id);
        if (index !== -1) {
          this.selectedElementsOverlay.splice(index, 1);
        }
      }
    },
    handleClick(elementId, eventSource) {
      this.eventSource = eventSource;
      const index = this.selectedElementsAside.indexOf(elementId);
      if (index === -1) {
      // no mutli select
        this.selectedElementsAside = [elementId];
      } else {
        this.selectedElementsAside.splice(index, 1);
      }
    },
  },
  destroy() {
    this.selectedElementsOverlay = [];
    this.selectedElementsAside = [];
  },
};
</script>

<style>
.splitpanes__splitter:hover {
  background-color: rgba(127, 0, 255, 0.25) !important;
}

.browser-content-metadata {
  padding: 0.75rem;
  height: 100%;
}

.title {
    text-align: center;
    font-weight: bold;
    font-size: large;
}
</style>
