<template>
  <Layout :kind="layout">
    <template #header>
      <TheNavbar :spaced="!['browser'].includes(layout)"></TheNavbar>
    </template>
    <template #subheader>
      <BreadcrumbNavigation :key="$route.path" />
    </template>
    <template #default>
      <slot />
    </template>
    <template #footer>
      <TheFooter></TheFooter>
      <TheCookieConsent />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheCookieConsent from '@/components/TheCookieConsent.vue';

export default {
  components: {
    Layout,
    TheNavbar,
    BreadcrumbNavigation,
    TheFooter,
    TheCookieConsent,
  },
  head: {
    title() {
      const { meta } = this.$route;
      if (!meta || !meta.title) return null;
      return {
        inner: meta.title,
      };
    },
  },
  watch: {
    $route: {
      handler(value) {
        // tell vue-head to update
        this.$emit('updateHead');
      },
      immediate: true,
    },
  },
  computed: {
    layout() {
      try {
        return this.$route.meta.layout;
      } catch (err) {
        return 'default';
      }
    },
  },
};
</script>
