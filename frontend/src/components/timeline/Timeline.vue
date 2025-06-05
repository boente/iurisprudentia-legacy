<template>
  <main>
    <div class="container-timeline"  v-bind:style="{ 'background-image': 'url(' + backgroundUrl + ')' }">
      <div class="container-overlay"></div>
      <TimelineHeader />
      <div style="text-align: center; display: block; position: relative">
        <img
          style="height: 9rem; margin-top: 10vh; max-width: 70%;"
          src="@/assets/logos/iurisprudentia_Merriweather.svg"
          alt="title" />
        <router-link
          style="position: absolute; top: 20%;"
          :to="{
            name: 'Dynamic',
            params: {
              edition: 'iurisprudentia',
              componentType: 'labor',
              lang: locale
            },
          }">
          <img
            style="max-width: 120%"
            src="../../assets/laborversion.svg"
            alt="Eugen Huber Portrait"
          >
        </router-link>
      </div>
      <div class="notice" v-html="$t('notice.text')"></div>
      <TimelineSearchSlot />

      <div class="timeline">
        <div class="vbar"></div>
        <template v-for="(event, index) in $options.timlineEventsData">
          <TimelineEvent
            ref="eventList"
            :event="event"
            :id="index"
            :key="index"
          ></TimelineEvent>
        </template>
      </div>
    </div>
    <TimelineFooter />
  </main>
</template>

<script>
import TimelineEvent from '@/components/timeline/TimelineEvent';
import TimelineSearchSlot from '@/components/search/TimelineSearchSlot';
import TimelineFooter from '@/components/timeline/TimelineFooter.vue';
import TimelineHeader from '@/components/timeline/TimelineHeader.vue';
import model from '../../../public/model';

export default {
  components: {
    TimelineEvent,
    TimelineSearchSlot,
    TimelineFooter,
    TimelineHeader,
  },
  timlineEventsData: model,
  data() {
    return {
      eventsFullInViewport: [],
      backgroundUrl: '',
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  //   activeEvent: function() {
  //     return this.eventsFullInViewport[0];
  //   },
  },
  watch: {
    eventsFullInViewport: {
      // every time an event gets added or removed, re-evaluate active element
      handler(now /* before */) {
        if (now[0] !== undefined) {
          now[0].setActive();
          // this.backgroundUrl = '';
        } else {
          // this.backgroundUrl = '';
        }
      },
      immediate: true,
    },
  },
  mounted() {
    const options = {
      rootMargin: '0px 50px 0px 0px', // right Margin because of scrollbar
      threshold: [0.5, 1],
    };

    const callback = (entries /* observer */) => {
      entries.forEach((entry) => {
        // Each entry is an IntersectionObserverEntry
        // Get the underlying vue component from the DOM element. DOM elements that are vue components have a __vue__ property
        const timelineEventComponent = entry.target.__vue__;

        // by default callback is executed for all on instantiation
        if (entry.intersectionRatio === 1) {
          // console.log(timelineEventComponent.$el, 'fully visible');
          this.eventsFullInViewport.push(timelineEventComponent);
        } else {
          // unset active toggle here and remove from eventFullInViewPort array
          timelineEventComponent.setInactive();
          const { id } = timelineEventComponent;
          this.eventsFullInViewport = this.eventsFullInViewport.filter(
            (obj) => obj.id !== id,
          );
        }
      });
      // console.log(this.eventsFullInViewport.length);
    };
    const observer = new IntersectionObserver(callback, options);

    // target must be dom elements. Map dom element from each component with .$el
    const targets = this.$refs.eventList.map((component) => component.$el);

    // use timeout instead of this.$nexTick(),
    // timemout lets the browser render first, nextTick is called after view updated the DOM, BUT before the browser can render the changes
    // google javascript/ vue microtasks https://stackoverflow.com/questions/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
    setTimeout(() => {
      targets.forEach((target) => {
        observer.observe(target);
      });
    }, 100);
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;

}

html {
  height: 100%;
  width: 100vw;
  overflow-x: hidden;

}

:root {
  --timeline-width: 80vw; /* use value between 60vh and 100vh*/
  --event-width: calc(var(--timeline-width) / 4 * 1.5); /* use multiplier between 1.0 and 1.8 for wider events*/
}

.container-timeline {
  background-color: rgb(61,125,156);
  min-height: 100%;
  padding-bottom: 15vh;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
}

.container-overlay {
  /* background-color: rgba(0 , 0, 0, 0.7);*/
  height: 100%;
  width: 100%;
  position: fixed;

}

.notice {
  background-color: rgba(var(--primary-color), 1);
  position: relative;
  max-width: 700px;
  padding: 20px;
  margin: 30px auto 0 auto;
  color: white;
  text-align: center;
  a {
    color: white;
    text-decoration: underline
  }
}

.timeline {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  margin: 0 auto;
  width: var(--timeline-width);
  height: 100%;
  position: relative;
}

.vbar::before {
  position: absolute;
  left: 50%;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  content: "";
  background: rgba(255, 255, 255, 0.5);
}

.timeline-header-title {
  color: #fff;
  font-size: 48px;
  font-weight: normal;
  margin: 0;
  text-align: center;
  position: relative;
}
.timeline-header-subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  letter-spacing: 5px;
  margin: 10px 0 0 0;
  font-weight: normal;
  text-align: center;
  position: relative;
}

.event-img {
  max-height: 30;
  object-fit: contain;
  width: 100%;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: white !important;
}

.navbar-link:hover {
  color: rgba(var(--primary-color-light), 1) !important;
}

.navbar-link:focus {
  color: rgba(var(--primary-color-light), 1) !important;
}

@media screen and (max-width: 768px) {
  .timeline {
    width: 100%;
  }

  .vbar::before {
    left: 10vw;
  }
}

/* * {
    border: 1px solid #f00 !important;
  } */

</style>
