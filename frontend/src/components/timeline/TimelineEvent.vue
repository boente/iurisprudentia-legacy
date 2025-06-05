<template>
  <div
    @click="openLink()"
    class="event"
    :class="{ 'event-active': isActive }"
    :data-duration="timelineData[`${event.editionLink}`].duration"
  >
    <img class="event-img"
         :src="require(`../../assets/thumbnails/${event.timelineThumbnail}`)"
         alt="not found"
    />
    <h2 class="event-title" :class="{ 'event-title-active': isActive }">
      {{ timelineData[`${event.editionLink}`].name }}
    </h2>
    <p class="event-description">
      {{ timelineData[`${event.editionLink}`].description }}
    </p>
  </div>
</template>

<script>
import store from '../../store';

export default {
  props: ['event', 'id'],
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    timelineData() {
      return this.$i18n.t('timeline');
    },
  },
  methods: {
    setActive() {
      // console.log('i am active', this.id);
      this.isActive = true;
    },
    setInactive() {
      // console.log('i am inactive', this.id);
      this.isActive = false;
    },
    openLink() {
      store.commit('setEditionObject', this.event);
      this.$router.push({ name: 'Home', params: { edition: this.editionLink } });
    },
  },
};
</script>

<style>
.event-title {
  color: white;
  font-size: clamp(2em,2.5vw,2.5em);
  margin: 0 0 0 0;
  font-weight: normal;
  transition: margin 1s ;
  overflow: auto;
  overflow-wrap: break-word;
}

.event-title-active {
  margin: -50px 0 0 0;
}

.event {
  width: var(--event-width);
  padding: 20px;
  position: relative;
  /*margin-bottom of heading subtitle is 20vh, which leaves 80vh for timeline --> thus 41vh as min-height for event so that first event can be scrolled up far
  enough to be set active and second element is set inactive */
  min-height: 41vh;
  opacity: 0.5;
  transition: opacity 0.5s;
}

.event:hover {
  cursor: pointer;
}

.event::before{
  content: attr(data-duration);
  letter-spacing: 3px;
  position: absolute;
  color: white;
  font-size: 2em;
  bottom: 50%;
  width: 100%;
  text-align: center;
  opacity: 0;
  transition: opacity 1s;
}

.event:nth-child(even)::before {
  right:  calc(var(--timeline-width) / 4 * 2);
  border-right: solid rgba(255, 255, 255, 1);
  margin-right: -1px;
}

.event:nth-child(odd)::before {
  left:  calc(var(--timeline-width) / 4 * 2);
  border-left: solid rgba(255, 255, 255, 1);
  margin-left: -1px;

}

.event:nth-child(even) {
  align-self: flex-end;
}

.event-active {
  /* background-color: rgba(0 , 0, 0, 0.5); */
  border-radius: 5px;
  opacity: 1;

}

.event-active::before {
 opacity: 1;
}

.event-description {
  margin: 0;
  font-size: clamp(1em,1vw,1.5em);
  color: rgba(255, 255, 255, 0.7);
  overflow-wrap: break-word;
  overflow: auto;
}

@media screen and (max-width: 768px) {
  .event {
    align-self: flex-end;
    margin-bottom: 15vh;
    width: 50vw;
  }

  .event:nth-child(even)::before {
    width: 40vw;
    right: 50vw;
    border-right: none;
    border-left: solid rgba(255, 255, 255, 1);
    margin-left: -10px;
    text-align: center;
    font-size: 1em;
  }

  .event:nth-child(odd)::before {
    width: 40vw;
    right: 50vw;
    border-right: none;
    margin-left: -10px;
    text-align: center;
    left: auto;
    font-size: 1em;
  }

  .event-title {
    font-size: 1.5rem;
  }

  .event-title-active {
    margin: -30px 0 0 0;
  }
}
</style>
