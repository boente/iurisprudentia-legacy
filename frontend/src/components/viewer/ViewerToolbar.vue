<template>
  <b-field>
    <p class="control">
      <b-tooltip position="is-bottom" :label="decrease">
        <b-button @click="decreaseZoom" size="is-medium" icon-left="minus-square" />
      </b-tooltip>
    </p>
    <p class="control">
      <b-tooltip position="is-bottom" :label="increase">
        <b-button @click="increaseZoom" size="is-medium" icon-left="plus-square" />
      </b-tooltip>
    </p>
    <p class="control">
      <b-dropdown :value="displayMode" @change="setDisplayMode">
        <template #trigger>
          <b-tooltip position="is-bottom" :label="display">
            <b-button size="is-medium" icon-left="eye" />
          </b-tooltip>
        </template>
        <b-dropdown-item value="overlay">
          <div class="media">
            <b-icon icon="image" class="media-left" />
            <div class="media-content"
            >
              {{ $t("viewer.toolbar.textOverlay") }}
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item value="aside">
          <div class="media">
            <b-icon icon="columns" class="media-left" />
            <div class="media-content"
            >
              {{ $t("viewer.toolbar.textAside") }}
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </p>
    <p v-if="showTextVisibilityToggle" class="control">
      <b-tooltip position="is-bottom" :label="showTextVisibility">
        <b-button
          @click="toggleTextVisibility"
          :class="{'is-link': isTextVisibile }"
          size="is-medium"
          icon-left="file-alt"
        />
      </b-tooltip>
    </p>
  </b-field>
</template>

<script>
import EventBus from '@/utils/event-bus';

export default {
  data() {
    return {
      decrease: this.$i18n.t('viewer.toolbar.decrease'),
      increase: this.$i18n.t('viewer.toolbar.increase'),
      display: this.$i18n.t('viewer.toolbar.display'),
      showTextVisibility: this.$i18n.t('viewer.toolbar.showTextVisibility'),
    };
  },
  props: {
    displayMode: {
      type: String,
      required: true,
    },
    handleDisplayChange: { type: Function },
    showTextVisibilityToggle: {
      type: Boolean,
      default: true,
    },
    isTextVisibile: Boolean,
  },
  methods: {
    toggleTextVisibility() {
      this.$emit('click');
    },
    setDisplayMode(value) {
      this.handleDisplayChange(value);
    },
    increaseZoom() {
      EventBus.$emit('INCREASE_ZOOM');
      this.$emit('input', { type: 'zoom', delta: 1 });
    },
    decreaseZoom() {
      EventBus.$emit('DECREASE_ZOOM');
      this.$emit('input', { type: 'zoom', delta: -1 });
    },
  },
};
</script>
