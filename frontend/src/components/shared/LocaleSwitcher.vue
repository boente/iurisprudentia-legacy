<template>
  <b-navbar-dropdown :label="locale" :collapsible="true">
    <b-navbar-item
      v-for="(value, key) in availableLangs"
      :key="key"
      @click="setLanguage(key)">
      {{ value }}
    </b-navbar-item>
  </b-navbar-dropdown>
</template>

<script>
export default {
  methods: {
    setLanguage(val) {
      this.$i18n.locale = val;
      this.$router.push({
        name: this.$route.name,
        params: {
          ...this.$route.params,
          lang: val,
        },
      });
    },
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    availableLangs() {
      return this.$store.state.availableLangs;
    },
  },
};
</script>
