<template>
  <b-navbar class="primary-background" wrapper-class="container" :close-on-click="true">
    <template #brand>
      <a class="is-relative" style="padding: 0" href="https://www.uzh.ch/">
        <div class="is-relative">
          <figure>
            <img @load="isReady = true" src="@/assets/logos/logo-uzh.svg" style="height: 5.5rem; width: 12rem" />
          </figure>
        </div>
      </a>
    </template>
    <template #end>
      <b-navbar-item
        tag="router-link"
        :to="{
          name: 'Dynamic',
          params: {
            edition: 'iurisprudentia',
            componentType: 'about',
            lang: locale
          },
        }"
        class="has-text-weight-bold nav-link">
        {{ $t("navTitles.about") }}
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{
          name: 'Newsletter',
          params: {
            lang: locale
          }
        }"
        class="has-text-weight-bold nav-link">
        {{ $t("navTitles.news") }}
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{
          name: 'Dynamic',
          params: {
            edition: 'iurisprudentia',
            componentType: 'impressum',
            lang: locale
          },
        }"
        class="has-text-weight-bold nav-link">
        {{ $t("navTitles.imprint") }}
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{
          name: 'Dynamic',
          params: {
            edition: 'iurisprudentia',
            componentType: 'privacy',
            lang: locale
          },
        }"
        class="has-text-weight-bold nav-link">
        {{ $t("navTitles.privacy") }}
      </b-navbar-item>
      <LocaleSwitcher />
    </template>
  </b-navbar>
</template>

<script>
import LocaleSwitcher from '@/components/shared/LocaleSwitcher';

export default {
  components: {
    LocaleSwitcher,
  },
  mounted() {
    if (!this.$route.params.lang) {
      this.$router.push({
        name: 'Timeline',
        params: {
          lang: this.locale,
        },
      });
    }
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
