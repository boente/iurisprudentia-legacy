<template>
  <cookie-law
    theme="iurisprudentia"
    storageType="cookies"
    :button-text="accept"
    :button-decline="true"
    :button-decline-text="decline"
    button-decline-class="Cookie__button"
    :button-link="{ name: 'Dynamic', params: { edition: editionLink, componentType: 'privacy' }, }"
    :button-link-text="more"
    :message="message"
    @accept="enableTracking"
  />
</template>

<script>
import CookieLaw from 'vue-cookie-law';

export default {
  components: { CookieLaw },
  data() {
    return {
      message: this.$i18n.t('cookieConsent.message'),
      accept: this.$i18n.t('cookieConsent.accept'),
      decline: this.$i18n.t('cookieConsent.decline'),
      more: this.$i18n.t('cookieConsent.more'),
    };
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
  },
  methods: {
    // tracking is disable by default, we only need to do something if the user click ok
    enableTracking() {
      window._paq.push(['rememberConsentGiven']);
    },
  },
};
</script>
