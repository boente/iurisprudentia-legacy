<template>
  <div>
    <div class="footer primary-background" style="padding-bottom: 7vh; padding-top: 7vh">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <a href="https://www.uzh.ch/">
                <figure>
                  <img class="footer-logo" alt="Universität Zürich" src="@/assets/logos/logo-uzh.svg">
                </figure>
              </a>
              <div class="footer-divider"></div>
              <a href="https://readcoop.eu/readsearch/">
                <figure>
                  <img class="footer-logo" alt="Read COOP" src="@/assets/logos/logo-readcoop1.svg">
                </figure>
              </a>
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
                        edition: 'iurisprudentia',
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
                        edition: 'iurisprudentia',
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
    <TheCookieConsent />
  </div>
</template>

<script>
import TheCookieConsent from '@/components/TheCookieConsent.vue';

export default {
  components: {
    TheCookieConsent,
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
};
</script>
