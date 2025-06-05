<template>
  <OpenSeadragon
    v-if="elements"
    key="viewer"
    @open="handleOpen"
    ref="openseadragon"
    :options="options"
    :style="styles"
  >
    <div class="toolbar-wrapper">
      <slot name="toolbar"></slot>
    </div>
    <b-loading
      :active="!isReady"
      :is-full-page="false"
      style="z-index: 2"
    ></b-loading>
  </OpenSeadragon>
</template>

<script>
// TODO : Remove the selected elements when destroyed
import EventBus from '@/utils/event-bus';
import { Rect, Point } from 'openseadragon';
import OpenSeadragon from './OpenSeadragon.vue';

export default {
  components: {
    OpenSeadragon,
  },
  props: {
    source: {
      type: [String, Array, Object],
      required: true,
    },
    elements: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    elements(elements) {
      if (this.viewerOverlay) {
        this.viewerOverlay.update(elements);
      }
    },
  },
  data() {
    return { isReady: false };
  },
  computed: {
    viewer() {
      return this.$refs.openseadragon.viewer;
    },
    options() {
      return {
        tileSources: this.source,
        showZoomControl: false,
        showHomeControl: false,
        showFullPageControl: false,
        preserveImageSizeOnResize: true,
        gestureSettingsMouse: {
          clickToZoom: false,
        },
        visibilityRatio: 1,
        maxZoomPixelRatio: 5,
        minZoomImageRatio: 0.01,
      };
    },
    styles() {
      return {
        width: '100%',
        height: '100%',
        position: 'relative',
      };
    },
  },
  created() {
    EventBus.$on('INCREASE_ZOOM', this.handleIncreaseZoom);
    EventBus.$on('DECREASE_ZOOM', this.handleDecreaseZoom);
  },
  beforeDestroy() {
    EventBus.$off('INCREASE_ZOOM', this.handleIncreaseZoom);
    EventBus.$off('DECREASE_ZOOM', this.handleDecreaseZoom);
  },
  methods: {
    createOverlay({ openSeadragon, elements, onOverlayClick }) {
      // CSS Classes
      const BACKDROP_HANDLE = 'js-backdrop';
      const ELEMENT_HANDLE = 'js-overlay-element';
      const MATCH_CLASS = 'is-match';
      const TOOLTIP_TEXT_VISIBLE = 'Klicken um text zu verstecken';
      const LABEL_FONT_SIZE = 16;
      const TEXT_VISIBLE_CLASS = 'is-text-visible';

      // 1. create html backdrop
      const elementsById = {};
      const el = document.createElement('div');
      // add the backdrop-class and backdrop-handle (to query the element)
      el.classList.add('overlay-backdrop', BACKDROP_HANDLE);

      // 2. create overlay backdrop
      openSeadragon.addOverlay({
        element: el,
        location: new Rect(0, 0, 1, openSeadragon.viewport.getAspectRatio()),
      });

      /*
      NOTE:
      append elements to DOM in reverse order, so in case of
      overlapping elements, those with lower y top coords
      overlap those lower ones
      */
      const reversedElements = elements.slice().reverse();
      reversedElements.forEach((item) => {
        // 3. create html overlay
        const htmlOverlay = document.createElement('div');
        htmlOverlay.setAttribute('id', item.id);
        // Ad element-class and element-handle (to query it)
        htmlOverlay.classList.add('overlay-element', ELEMENT_HANDLE);
        if (item.highlight) htmlOverlay.classList.add(MATCH_CLASS);

        const parent = document.createElement('p');
        // add label-class and unselectable-class
        parent.classList.add('overlay-label', 'is-unselectable');

        if (item.segments && item.segments.length > 0) {
          // 4. create an HTML Overlay label
          const nodes = item.segments.map((segment) => {
            let node;
            if (segment.isMatch) {
              node = document.createElement('strong');
            } else {
              node = document.createElement('span');
            }
            node.textContent = segment.string;
            return node;
          });
          nodes.forEach((node) => parent.appendChild(node));
        } else {
          parent.textContent = item.content;
        }

        htmlOverlay.setAttribute('title', TOOLTIP_TEXT_VISIBLE);
        htmlOverlay.appendChild(parent);

        // 5. create the actual openSeadragon overlay
        const overlay = {
          element: htmlOverlay,
          location: openSeadragon.viewport.imageToViewportRectangle(
            item.rect.x, item.rect.y, item.rect.width, item.rect.height,
          ),
          onDraw(position, size, element) {
            Object.assign(element.style, {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${size.x}px`,
              height: `${size.y}px`,
            });

            // FIXME: use width for resizing
            // eslint-disable-next-line no-mixed-operators
            const ratio = Math.min(1, Math.floor(0.75 * 10 * size.y / LABEL_FONT_SIZE) / 10);

            // eslint-disable-next-line no-param-reassign
            element.children[0].style.transform = `scale(${ratio})`;
          },
        };
        elementsById[item.id] = overlay;

        if (typeof onOverlayClick === 'function') {
          overlay.element.addEventListener('click', () => onOverlayClick(item));
        }

        openSeadragon.addOverlay(overlay);
      });

      const setVisibility = (value) => {
        const nodes = [
          document.querySelector(`.${BACKDROP_HANDLE}`),
          ...Array.from(document.querySelectorAll(`.${ELEMENT_HANDLE}`)),
        ];

        nodes.forEach((node) => (value === true
          ? node.classList.remove(TEXT_VISIBLE_CLASS)
          : node.classList.add(TEXT_VISIBLE_CLASS)));
      };

      const setElementClassName = (element, className, isFlagSet) => {
        if (isFlagSet && !element.classList.contains(className)) {
          element.classList.add(className);
        } else if (!isFlagSet && element.classList.contains(className)) {
          element.classList.remove(className);
        }
      };

      const panTo = (viewer, rect) => {
        const isImmediate = false;
        const point = {
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        };
        viewer.viewport
          .panTo(new Point(point.x, point.y), isImmediate)
          .applyConstraints(isImmediate);
      };

      return {
        setVisibility,
        update(elements) {
          // this is the place where declarative vs. imperative paradigms clash, so this method is quite weird
          let elementToPanTo = null;
          elements.forEach((element) => {
            // Set visibility css-class based on elements parameter
            if ([true, false].includes(element.isTextVisible)) {
              setElementClassName(elementsById[element.id].element, TEXT_VISIBLE_CLASS, element.isTextVisible);
              // Set element tooltip text
              if (element.isTextVisible) {
                elementsById[element.id].element.setAttribute('title', TOOLTIP_TEXT_VISIBLE);
              } else elementsById[element.id].element.setAttribute('title', 'Klicken, um text anzuzeigen');
            }

            // Set selection css-class based on elements parameter
            if ([true, false].includes(element.isSelected)) {
              setElementClassName(elementsById[element.id].element, 'is-highlighted', element.isSelected);
            }

            // Set highlight css-class based on elements parameter
            if ([true, false].includes(element.isHighlighted)) {
              setElementClassName(elementsById[element.id].element, MATCH_CLASS, element.isHighlighted);
            }
            if (element.isFocused === true && element.eventSource === 'content') {
              elementToPanTo = elementsById[element.id];
            }
          });

          if (elementToPanTo !== null) panTo(openSeadragon, elementToPanTo.location);
        },
        destroy() {
          // remove event listeners, etc.
        },
      };
    },
    handleOpen() {
      // zoom to right location.
      const { zoom } = this.$route.query;
      if (zoom && !isNaN(zoom)) {
        this.$nextTick(() => {
          this.viewer.viewport.zoomTo(parseFloat(zoom));
          this.viewer.viewport.applyConstraints(true);
        });
      } else {
        // Initially, set the zoom to that value so that the entire page is shown.
        this.$nextTick(() => {
          this.viewer.viewport.zoomTo(parseFloat(0.52));
          this.viewer.viewport.applyConstraints(true);
        });
      }

      // Apply new bounds after zoom.
      const viewportBounds = this.viewer.viewport.getBounds();
      const viewportAspect = viewportBounds.height / viewportBounds.width;
      const newBounds = this.viewer.world.getHomeBounds();
      newBounds.height = newBounds.width * viewportAspect;
      this.viewer.viewport.fitBounds(newBounds, true);

      // Add handler for zooming.
      this.viewer.addHandler('zoom', this.zooming);

      // Create overlay
      this.viewerOverlay = this.createOverlay({
        openSeadragon: this.viewer,
        elements: this.elements,
        onOverlayClick: (...args) => this.handleOverlayClick(...args),
      });

      this.$nextTick(() => this.viewerOverlay.update(this.elements));

      // leave some time for openseadragon to render tiles
      setTimeout(() => (this.isReady = true), 250);
    },
    handleOverlayClick(element) {
      this.$emit('click', element.id, 'canvas');
    },
    handleIncreaseZoom() {
      this.viewer.viewport.zoomBy(this.viewer.zoomPerClick);
      this.viewer.viewport.applyConstraints();
    },
    handleDecreaseZoom() {
      this.viewer.viewport.zoomBy(1 / this.viewer.zoomPerClick);
      this.viewer.viewport.applyConstraints();
    },
    zooming(event) {
      this.$router.push({
        ...this.$route,
        query: {
          ...this.$route.query,
          zoom: event.zoom,
        },
      });
    },
  },
};
</script>

<style>
.toolbar-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  padding: 1rem;
}

.overlay-backdrop {
  background: transparent;
}

.overlay-backdrop.is-hidden {
  background: transparent;
}

.overlay-element .overlay-label {
  display: none;
}

.overlay-element.is-text-visible .overlay-label {
  display: flex;
}

.overlay-label {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  white-space: pre;
  text-overflow: ellipsis;
  height: 100%;
  will-change: transform;
}
</style>
