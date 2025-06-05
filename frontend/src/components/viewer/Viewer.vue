<template>
  <div class="browser-layout" :key="updateWhenParamsChange">
    <header>
      <TheNavbar />
      <BreadcrumbNavigation
        :hasPager="true"
        :setPageContent="setPageContent" />
    </header>
    <main>
      <ViewerPage
        :content="pageContent"
        :image="imageUrl"
        :isReady="isReady" />
    </main>
  </div>
</template>

<script>
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation.vue';
import { from } from 'appcx-lib';
import api from '@/api';
import TheNavbar from '@/components/TheNavbar.vue';
import { fetchDocumentData, fetchPageData, fetchPageContent } from '@/api/Viewer';
import ViewerPage from './ViewerPage.vue';
import model from '../../../public/model';

export default {
  components: {
    BreadcrumbNavigation,
    ViewerPage,
    TheNavbar,
  },
  data() {
    return {
      isReady: false,
      document: null,
      pageContent: [],
      imageUrl: null,
      searchResults: null,
      page: this.$i18n.t('general.page'),
    };
  },
  head: {
    title() {
      return this.document === null ? null : {
        inner: `${this.document.title} - ${this.page} ${this.$route.params.pageNum}`,
      };
    },
  },
  watch: {
    '$route.params.pageNum': {
      handler: 'updatePageOnNavigation',
    },
    isReady: {
      handler(value) {
        if (value === true) {
          this.$emit('updateHead');
        }
      },
      immediate: true,
    },
  },
  computed: {
    updateWhenParamsChange() {
      return this.path;
    },
    path() {
      return this.$route.path;
    },
  },
  async mounted() {
    await this.load();
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    async load() {
      this.isReady = false;
      const params = { ...this.$route.params };

      // Load document data
      this.document = await fetchDocumentData(params.documentId);

      // Load Page Data
      const pageData = await fetchPageData({ id: params.documentId, pageNum: params.pageNum });
      this.imageUrl = pageData.image;

      // Load Page content using the retrieved page data
      const pageContent = await fetchPageContent(pageData.content);

      // Transform it
      this.setPageContent(pageContent);

      // load text data

      // Get search term if being routed from search
      const query = { ...this.$route.query };
      if (!query.t) this.searchResults = [];
      else {
        // If we have a term, we get the edition to make the api call
        const editionId = this.getEditionId(params.edition);
        if (editionId === '') console.log('we need to handle that error');
        const searchData = await api.fetchSearchResults({
          term: query.t,
          documents: [params.documentId],
          collections: [editionId],
          page: params.pageNum,
          fuzziness: query.f,
        }, {
          offset: 0,
          limit: 100,
        });
        const { results } = searchData;
        if (results.length > 0) this.searchResults = results[0].snippets;
        else this.searchResults = [];
      }

      // process search results with highlights?
      try {
        this.pageContent = this.processSearchResults(this.searchResults, this.pageContent);
      } catch (err) {
        // no highlights
        console.log(err);
      }

      this.isReady = true;
    },
    convertPageXML(xml) {
      const toRect = (points) => {
        const xMin = Math.min(...points.map((p) => p.x));
        const xMax = Math.max(...points.map((p) => p.x));
        const yMin = Math.min(...points.map((p) => p.y));
        const yMax = Math.max(...points.map((p) => p.y));

        return {
          x: xMin,
          y: yMin,
          width: xMax - xMin,
          height: yMax - yMin,
        };
      };

      const data = from(xml, {
        what: 'lines',
      });

      return data.map((element) => ({
        id: element.id,
        content: element.text[0],
        rect: toRect(element.coords),
        attributes: element.attributes,
      }));
    },
    processSearchResults(results, content) {
      // deal with case where there is no page content
      if (content === null) return [];

      // get all matching strings from snippets
      const matches = results
        .reduce(
          // flatten, pick matching
          (arr, parts) => [...arr, ...parts.filter((p) => p.isMatch).map((p) => p.string)],
          [],
        )
        .sort() // deduplicate
        .reduce((arr, s) => (arr.includes(s) ? arr : [...arr, s]), []);

      // mark matches in page content text
      return content.map((item) => {
        const segments = this.findMatches(item.content, matches);
        return {
          ...item,
          segments,
          highlight: segments.filter((item) => item.isMatch).length > 0,
        };
      });
    },
    findMatches(text, terms) {
      // find matching segments
      const segments = [];
      const lowerTerms = terms.map((t) => t.toLowerCase());
      lowerTerms.forEach((term) => {
        let s = text.toLowerCase();
        let index = 0;
        let offset = 0;
        do {
          index = s.indexOf(term);
          if (index !== -1) {
            offset += index;
            segments.push({
              start: offset,
              stop: offset + term.length,
            });
            s = s.slice(index + term.length);
            offset += term.length;
          }
        } while (index !== -1 && term.length < s.length);
      });

      // no matches found
      if (segments.length === 0) return [{ string: text }];

      // eliminate overlapping segments
      segments.sort((s, t) => s.start - t.start);
      const cleaned = [];

      let last = null;
      segments.forEach((s) => {
        if (last !== null) {
          // test for overlap, i.e. NOT non-overlap
          if (!(last.stop < s.start || s.stop < last.start)) {
            // elminate shorter segment
            if (last.stop - last.start < s.stop - s.start) cleaned[cleaned.length - 1] = s;
          }
        } else {
          cleaned.push(s);
          last = s;
        }
      });

      // resolve everything
      const parts = [];
      cleaned.forEach((s) => {
        if (s.start > 0) parts.push({ string: text.slice(0, s.start) });
        parts.push({ string: text.slice(s.start, s.stop), isMatch: true });
      });

      if (cleaned.length > 0) parts.push({ string: text.slice(cleaned[cleaned.length - 1].stop) });
      return parts;
    },
    setPageContent(pageContent) {
      this.pageContent = this.convertPageXML(pageContent);
    },
    getEditionId(editionLink) {
      let editionId = '';
      model.forEach((edition) => {
        if (edition.editionLink === editionLink) editionId = edition.col_id;
      });
      return editionId;
    },
    async updatePageOnNavigation() {
      this.isReady = false;
      const params = { ...this.$route.params };
      // Load new Page
      const pageData = await fetchPageData({ id: this.document.id, pageNum: params.pageNum });
      this.imageUrl = pageData.image;
      // Load Page content using the retrieved page data
      const pageContent = await fetchPageContent(pageData.content);
      // Transform it
      this.setPageContent(pageContent);
      // process search results with highlights?
      try {
        this.pageContent = this.processSearchResults(this.searchResults, this.pageContent);
      } catch (err) {
        // no highlights
        console.log(err);
      }
      this.isReady = true;
    },
    destroy() {
      this.pageContent = [];
      this.searchResults = null;
      this.imageUrl = null;
      this.isReady = false;
    },
  },
};
</script>

<style>
 .browser-layout {
   display: flex;
   flex-flow: column nowrap;
   overflow: hidden;
 }

 .browser-layout main {
   flex: 1;
   overflow: hidden;
 }
</style>
