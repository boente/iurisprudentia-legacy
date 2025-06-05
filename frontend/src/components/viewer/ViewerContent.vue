<template>
  <div ref="container" class="browser-content" style="overflow: auto">
    <div v-if="content.length === 0" class="message">
      <div class="message-body"
      >
        {{ $t("viewer.content.noText") }}
      </div>
    </div>
    <div v-else class="content" style="padding: 0.25rem 0.75rem">
      <h3 class="primary-color"
      >
        {{ $t("viewer.content.title") }}
        <b-tooltip
          :label="info"
          multilined
          position="is-right"
          style="vertical-align: bottom">
          <b-icon icon="info"/>
        </b-tooltip></h3>
    </div>
    <ul>
      <li
        ref="elements"
        v-for="(element, index) in content"
        @click="$emit('input', element.id, 'content')"
        :key="index"
        :class="['browser-content-element', { 'is-highlighted': element.isSelected }]"
      >
        <span
          v-for="(segment, index) in element.segments"
          :key="index"
          :class="['browser-content-label', { 'is-highlighted': segment.isMatch }]"
        >{{ segment.string }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// TODO : Remove the selected elements when destroyed

export default {
  data() {
    return {
      info: this.$i18n.t('viewer.content.info'),
    };
  },
  props: {
    content: {
      type: [Array],
      required: true,
    },
    selected: {
      type: [Number, String],
      default: null,
    },
  },
  watch: {
    selectedElement(element) {
      if (element !== null) {
        if (element.isFocused && element.eventSource) {
          this.scrollIntoView(this.elementIds.indexOf(element.id));
        }
      }
    },
  },
  computed: {
    selectedElements() {
      return this.content.filter((element) => element.isSelected);
    },
    selectedElement() {
      if (this.selectedElements.length === 0) {
        return null;
      }
      return this.selectedElements[0];
    },
    elementIds() {
      return this.content.map((element) => element.id);
    },
  },
  methods: {
    scrollIntoView(index) {
      const element = this.$refs.elements[index];

      if (element) {
        let method = null;
        if (typeof element.scrollIntoViewIfNeeded === 'function') {
          method = 'scrollIntoViewIfNeeded';
        } else if (typeof element.scrollIntoView === 'function') {
          method = 'scrollIntoView';
        }

        if (method !== null) {
          element[method]({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }
      }
    },
  },
};
</script>
