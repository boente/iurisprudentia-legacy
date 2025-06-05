<template>
  <LayoutDefault>
    <Layout kind="narrow">
      <section class="main-section section">
        <div class="container">
          <div class="content">
            <h1>{{ $t("general.meta") }}</h1>
            <hr />
            <template v-if="metadata && Object.keys(metadata).length !== 0">
              <ul style="list-style:none;">
                <li v-for="(value, key) in metadata" :key="key">

                  <span style="font-weight:bold;">{{ key }}: </span>

                  <template v-if="isLink(value)">
                    <a target="_" :href="value">{{ value }}</a>
                  </template>

                  <template v-else>
                    {{ value }}
                  </template>
                </li>
              </ul>
            </template>
            <template v-else>
              {{ $t("general.noMeta") }}
            </template>
          </div>
        </div>
      </section>
    </Layout>
  </LayoutDefault>

</template>

<script>
import LayoutDefault from '@/components/LayoutDefault.vue';

export default {
  components: {
    LayoutDefault,
  },
  data() {
    return {
      metadata: {},
    };
  },
  watch: {
    $route: {
      async handler(to, from) {
        this.setMetadata(to.params.documentId);
      },
      immediate: true,
    },
  },
  computed: {
    staticDirectory() {
      return this.$store.state.editionObject.staticDirectory;
    },
  },
  methods: {
    setMetadata(documentId) {
      this.staticDirectory.forEach((index) => {
        index.documents.forEach((doc) => {
          if (doc.docId === parseInt(documentId, 10)) this.metadata = doc.metadata;
        });
      });
    },
    isLink(str) {
      str = str.toString();
      return str.startsWith('http');
    },
  },
};
</script>

<style></style>
