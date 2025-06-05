<template>
  <div class="footer primary-background">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div v-if="footerLogos && footerLogos.length !== 0">
            <div class="level-item">
              <div
                v-for="(logo, key) in footerLogos"
                :key="`logo-${key}`"
                style="display: flex; justify-content: space-evenly;">
                <template>
                  <a :href="logo.link">
                    <figure>
                      <img class="footer-logo" :alt="logo.alt" :src="require(`@/assets/logos/${logo.src}`)">
                    </figure>
                  </a>
                </template>
                <div class="footer-divider" />
              </div>
            </div>
          </div>
        </div>
        <div class="level-right" style="margin-bottom: auto">
          <div class="level-item">
            <div class="content">
              <p>
                <router-link
                  :to="{
                    name: 'Dynamic',
                    params: {
                      edition: editionLink,
                      componentType: 'impressum',
                      lang: locale
                    },
                  }"
                  class="is-family-secondary has-text-white has-text-weight-bold"
                >
                  {{ $t("navTitles.imprint") }}
                </router-link>
              </p>
              <p>
                <router-link
                  :to="{
                    name: 'Dynamic',
                    params: {
                      edition: editionLink,
                      componentType: 'privacy',
                      lang: locale
                    },
                  }"
                  class="is-family-secondary has-text-white has-text-weight-bold"
                >
                  {{ $t("navTitles.privacy") }}
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    locale() {
      return this.$i18n.locale;
    },
    footerLogos() {
      return this.$store.state.editionObject.footerLogos;
    },
  },
};
</script>

<style>
 .footer-logo {
   height: 4rem;
 }

 .footer-divider {
   margin: 0 1rem;
   width: 0.075rem;
   height: 4rem;
   background-color: white;
 }
</style>
