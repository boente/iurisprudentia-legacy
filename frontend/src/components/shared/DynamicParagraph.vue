<template>
  <span>
    <span v-for="(part, partKey) in paragraph" :key="`part-${partKey}`">
      <template v-if="isLink(part)"><a target="_" :href="part.link">{{ part.text }}</a></template>
      <template v-else-if="isRouterLink(part)">
        <router-link :to="{
          name: part.componentName,
          params: part.params
        }">
          {{ part.text }}
        </router-link>
      </template>
      <template v-else>{{ part }}</template>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    paragraph: { type: Array },
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    isLink(e) {
      return e && typeof e === 'object' && e.link && e.text;
    },
    isRouterLink(e) {
      if (e && typeof e === 'object' && e.text && e.componentName && e.params) {
        e.params.lang = this.locale;
        return e;
      }
      return undefined;
    },
  },
};
</script>
