<template>
  <LayoutDefault>
    <section class="main-section section">
      <div class="content">
        <h1 v-if="componentType === 'labor'">{{ $t("navTitles.labor") }}</h1>
        <h1 v-else-if="componentType === 'about'">{{ $t("navTitles.about") }}</h1>
        <h1 v-else-if="componentType === 'privacy'">{{ $t("navTitles.privacy") }}</h1>
        <h1 v-else-if="componentType === 'impressum'">{{ $t("navTitles.imprint") }}</h1>
        <ul v-if="componentData && componentData.length !== 0" style="list-style:none; margin-left: 0;">
          <!-- Loop through section and extract title -->
          <li v-for="(section, key) in componentData" :key="`section-${key}`">
            <h2 style="margin-top: 1.5em">{{ section.title }} </h2>
            <!-- For every text of every section, extract the paragraphs, stored as arrays -->
            <p v-for="(paragraph, paraKey) in section.text" :key="`paraKey-${paraKey}`" style="margin-bottom: 1em;">
              <DynamicParagraph
                :paragraph="paragraph"
              />
            </p>
          </li>
        </ul>
        <div v-if="componentType === 'impressum'">
          <Contact />
        </div>
      </div>
    </section>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '@/components/LayoutDefault.vue';
import Contact from '@/components/shared/Contact.vue';
import DynamicParagraph from '@/components/shared/DynamicParagraph.vue';

export default {
  components: {
    LayoutDefault,
    Contact,
    DynamicParagraph,
  },
  computed: {
    componentType() {
      return this.$route.params.componentType;
    },
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    componentData() {
      // extract the component-text based on the edition, with iurisprudentia as fallback
      if (this.componentType === 'labor') {
        return this.$i18n.t('laborVersion')[this.editionLink] || this.$i18n.t('laborVersion').iurisprudentia;
      }
      if (this.componentType === 'about') {
        return this.$i18n.t('about')[this.editionLink] || this.$i18n.t('about').iurisprudentia;
      }
      if (this.componentType === 'privacy') {
        return this.$i18n.t('privacy')[this.editionLink] || this.$i18n.t('privacy').iurisprudentia;
      }
      return [];
    },
  },
};
</script>
