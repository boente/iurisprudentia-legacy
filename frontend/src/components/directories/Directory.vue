<template>
  <LayoutDefault>
    <Layout kind="narrow">
      <section class="main-section section">
        <div class="content">
          <h1 v-if="directoryType === 'crowd'">{{ $t("navTitles.crowdDirectory") }}</h1>
          <h1 v-else>{{ $t("navTitles.staticDirectory") }}</h1>
          <div v-if="directoryText && directoryText.length !== 0" style="padding-top: 0.5em">
            <p v-for="(paragraph, paraKey) in directoryText" :key="`paraKey-${paraKey}`">
              <DynamicParagraph :paragraph="paragraph.text"/>
            </p>
          </div>
          <hr />
          <ul v-for="entry in directoryData" :key="entry.index" class="is-unstyled">
            <h3>{{entry.index}}</h3>
            <ul class="is-unstyled">
              <li v-for="doc in entry.documents" :key="doc.docId">
                <RouterLink :to='{
                  name: "Document",
                  params: { documentId: doc.docId, edition: editionLink, type: directoryType }}
                '>
                  {{ doc.title }}
                </RouterLink>
                <RouterLink :to='{
                  name: "Metadata",
                  params: { documentId: doc.docId, edition: editionLink }}
                '>
                  <font-awesome-icon class="primary-color" style="font-size: smaller" icon="info" />
                </RouterLink>
              </li>
            </ul>
            <hr />
          </ul>
        </div>
      </section>
    </Layout>
  </LayoutDefault>

</template>

<script>
import LayoutDefault from '@/components/LayoutDefault.vue';
import DynamicParagraph from '@/components/shared/DynamicParagraph.vue';

export default {
  components: {
    LayoutDefault,
    DynamicParagraph,
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    staticDirectory() {
      return this.$store.state.editionObject.staticDirectory;
    },
    crowdDirectory() {
      return this.$store.state.editionObject.crowdDirectory;
    },
    directoryType() {
      return this.$route.params.type;
    },
    directoryData() {
      if (this.directoryType === 'static') return this.staticDirectory;
      return this.crowdDirectory;
    },
    directoryText() {
      const directoryText = this.$i18n.t('directoryText')[this.editionLink] || this.$i18n.t('directoryText').iurisprudentia;
      if (this.directoryType === 'static') {
        return directoryText.filter((directory) => (directory.type === 'static'));
      }
      return directoryText.filter((directory) => (directory.type === 'crowd'));
    },
  },
};
</script>

<style>
 .is-unstyled {
   list-style: none !important;
   margin-left: 0 !important;
 }
</style>
