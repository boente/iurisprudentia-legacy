<template>
  <div ref="container" :id="id">
    <slot></slot>
  </div>
</template>

<script>
import OpenSeadragon from 'openseadragon';

export default {
  props: {
    id: {
      type: String,
      default: 'openseadragon',
    },
    options: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.viewer = null;
  },
  mounted() {
    this.$nextTick(() => {
      const { tileSources, ...options } = this.options;
      if (this.viewer === null && this.$refs.container) {
        this.viewer = new OpenSeadragon({
          element: this.$refs.container,
          ...options,
        });

        this.viewer.open(tileSources);
        this.viewer.addOnceHandler('open', () => this.$emit('open'));
      }
    });
  },
  destroyed() {
    if (this.viewer !== null) {
      this.viewer.destroy();
    }
  },
  computed: {
    overlay() {
      const overlay = this.viewer.svgOverlay();
      return overlay.node();
    },
  },
};
</script>
