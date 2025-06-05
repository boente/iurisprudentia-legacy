<template>
  <div>
    <ul v-if="contactData && contactData.length !== 0" style="list-style:none; margin-left: 0;">
      <!-- Loop through section and extract title -->
      <li v-for="(section, key) in contactData" :key="`section-${key}`">
        <address style="margin-bottom: 1em;">
          <strong>{{ section.title }}</strong><br>
          <span v-for="(paragraph, paraKey) in section.text" :key="`paraKey-${paraKey}`">
            <template v-if="isLink(paragraph)">
              <a target="_" :href="paragraph.link">{{ paragraph.text }}</a><br>
            </template>
            <template v-else>{{ paragraph }}<br></template>
          </span>
        </address>
      </li>
    </ul>
    <div v-else>
      <p>
        {{ $t("general.noInfo") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    contactData() {
      // extract the home component-text based on the edition, with iurisprudentia as fallback
      return this.$i18n.t('contact')[this.editionLink] || this.$i18n.t('contact').iurisprudentia;
    },
  },
  methods: {
    isLink(e) {
      return e && typeof e === 'object' && e.link && e.text;
    },
  },
};
</script>

<style>
 address {
   font-style: normal;
 }
</style>
