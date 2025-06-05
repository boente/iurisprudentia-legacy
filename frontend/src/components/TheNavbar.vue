<template>
  <b-navbar class="primary-background" wrapper-class="container" :close-on-click="true" :spaced="spaced">
    <template #brand>
      <b-navbar-item
        tag="router-link"
        :to='{
          name: "Home",
          params: {
            edition: editionLink,
            lang: locale
          },
        }'
        class="is-relative"
        style="padding: 0">
        <div v-if="!spaced" class="is-relative">
          <img @load="isReady = true" :src="logoImage" style="height: 2.5rem; max-height: none" />
        </div>
        <div v-else class="is-relative">
          <div>
            <img @load="isReady = true" :src="logoImage" style="height: 5.5rem; max-height: none" />
          </div>
        </div>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item
        v-if="editionLink !== 'iurisprudentia'"
        @click="openDirectory('static')"
        class="has-text-weight-bold nav-link"
      >
        {{ $t("navTitles.staticDirectory") }}
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to='{
          name: "Search",
          params: {
            edition: editionLink,
            lang: locale
          },
        }'
        class="has-text-weight-bold nav-link"
      >
        {{ $t("navTitles.search") }}
      </b-navbar-item>
      <b-navbar-item
        v-if="editionLink !== 'iurisprudentia'"
        @click="openDirectory('crowd')"
        class="has-text-weight-bold nav-link"
      >
        {{ $t("navTitles.crowdDirectory") }}
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item
        tag="router-link"
        :to='{
          name: "Timeline",
          params: {
            lang: locale
          },
        }'
        class="has-text-weight-bold nav-link"
      >
        iurisprudentia
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        :to="{
          name: 'Dynamic',
          params: {
            edition: editionLink,
            componentType: 'about',
            lang: locale
          },
        }"
        class="has-text-weight-bold nav-link"
      >
        {{ $t("navTitles.about") }}
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
  props: {
    spaced: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isReady: false,
    };
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    logo() {
      return this.$store.state.editionObject.logo;
    },
    logoImage() {
      if (this.logo) return require(`../assets/logos/${ this.logo }`);
      return '';
    },
    locale() {
      return this.$i18n.locale;
    },
    availableLangs() {
      return this.$store.state.availableLangs;
    },
  },
  methods: {
    openDirectory(directoryType) {
      this.$router.push({ name: 'Directory', params: { edition: this.editionLink, type: directoryType } });
    },
  },
};
</script>

<style>
.brand-label {
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 0.75rem;
  letter-spacing: 0.375rem;
  z-index: -1;
}

.brand-label.is-small {
  top: 50%;
  transform: translate(-50%, -50%);
  margin-left: -0.2rem;
  padding-top: 0.75rem;
  font-size: 0.75rem;
}
</style>
