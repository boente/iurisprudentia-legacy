<template>
  <nav class="navbar has-shadow" style="z-index: 0; background: rgba(0, 0, 0, 0) none repeat scroll 0% 0%;">
    <div class="container">
      <div style="display: flex !important; overflow: auto; width: 100%; justify-content: space-around">
        <div class="navbar-start" style="overflow: auto">
          <div class="navbar-item is-family-primary" style="background: none !important; padding-left: 0">
            <nav class="breadcrumb has-bullet-separator">
              <ul style="flex-wrap: nowrap">
                <li v-for="({ label, toComponentName }, index) in breadcrumbs" class="separator" :key="index">
                  <a
                    v-if="toComponentName"
                    @click="navigate($event, toComponentName)"
                    :class="[index + 1 === breadcrumbs.length ? 'is-active' : '', 'breadcrumb-link']"
                  >{{ getLabel(label) }}</a>
                  <span v-else>{{ getLabel(label) }}</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item" style="background: none !important;">
            <ViewerNavigationPager
              v-if="hasPager"
              @input="handlePager"
              :value="pageNum"
              :max="totalPages"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ViewerNavigationPager from '@/components/viewer/ViewerNavigationPager.vue';

export default {
  components: { ViewerNavigationPager },
  props: {
    hasPager: {
      type: Boolean,
      default: false,
    },
    setPageContent: {
      type: Function,
    },
  },
  data() {
    return {
      document: null,
      staticDocTitle: '',
    };
  },
  async mounted() {
    // If it is the viewer navigation, more setup has to be performed
    if (this.hasPager) {
      // Get the document from the api
      this.document = await this.api.fetchDocument(this.documentId);
      // Get its name from our static directories
      this.staticDocTitle = this.$i18n.t('general.noDoc');
      this.staticDirectory.forEach((index) => {
        index.documents.forEach((doc) => {
          if (doc.docId === parseInt(this.documentId, 10)) this.staticDocTitle = doc.title;
        });
      });
    }
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    staticDirectory() {
      return this.$store.state.editionObject.staticDirectory;
    },
    documentId() {
      return this.$route.params.documentId;
    },
    pageNum() {
      return parseInt(this.$route.params.pageNum, 10);
    },
    totalPages() {
      return this.document === null ? 0 : this.document.pageCount;
    },
    breadcrumbs() {
      return this.$route.meta.breadcrumbs.map((breadcrumb) => {
        // If it points to a document, the label has to be the current document title
        if (breadcrumb.toComponentName === 'Document') breadcrumb.label = this.staticDocTitle;
        // if it points to the viewer, the label has to be the current page number
        else if (breadcrumb.toComponentName === 'Viewer') breadcrumb.label = this.pageNum;
        return breadcrumb;
      });
    },
  },
  methods: {
    navigate(event, toComponentName) {
      // Those routes are dynamic
      if (toComponentName === ('Document' || 'Viewer' || 'Directory')) {
        this.$router.push({
          name: toComponentName,
          params: {
            edition: this.editionLink,
            type: this.$route.params.type,
            documentId: this.documentId,
            pageNum: this.pageNum,
          },
        });
      } else {
        // those are regular
        this.$router.push({ name: toComponentName, params: { edition: this.editionLink } });
      }
    },
    // Takes the label from the router, which contains the localization path for i18n, and renders a localized label.
    getLabel(param) {
      return this.$i18n.t(param);
    },
    async handlePager(pageNumber) {
      // Get new page
      const { content } = await this.api.fetchPageByNum({ id: this.documentId, pageNum: pageNumber });
      const pageContent = await this.api.fetchPageContent(content);
      // Set new page in parent component
      this.setPageContent(pageContent);
      // Add params for routing
      this.$router.push({
        params: {
          ...this.$route.params,
          pageNum: pageNumber,
        },
        query: {
          ...this.$route.query,
        },
      });
    },
  },
};

</script>
