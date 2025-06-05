<template>
  <LayoutDefault>
    <section v-if="layout === 'narrow'" class="main-section section" style="margin-top: 0.75rem;">
      <div class="container">
        <main class="columns is-fullwidth">
          <div class="column is-offset-one-fifth is-three-fifths">
            <div v-if="searchText && searchText.length !== 0" style="margin-bottom: 1.5rem">
              <p v-for="(paragraph, paraKey) in searchText" :key="`paraKey-${paraKey}`">
                <DynamicParagraph :paragraph="paragraph" />
              </p>
            </div>
            <SearchForm
              :isLoading="isLoading"
              :launchExpertMode="launchExpertMode" />
          </div>
        </main>
      </div>
    </section>
    <section v-else-if="layout === 'sidebar'" class="main-section section" style="margin-top: 0.75rem;">
      <div class="container">
        <main>
          <div class="columns is-fullwidth">
            <div class="column is-one-third is-hidden-mobile">
              <div>
                <SearchSidebarFacet
                  v-model="searchFacets.selected"
                  :items="searchFacets.titles"
                  :loading="isLoading"
                  style="margin-bottom: 0.75rem;"
                />
              </div>
            </div>
            <div class="column">
              <SearchForm
                :isLoading="isLoading"
                :launchExpertMode="launchExpertMode" />
              <SearchResult
                :isLoading="isLoading"
                :total="searchResults.length"
                :results="searchResults.data"
                :error="searchResults.error"
                :itemsPerPage="searchResults.itemsPerPage"
                :getSearchResults="getSearchResults" />
            </div>
          </div>
        </main>
        <footer></footer>
      </div>
    </section>
  </LayoutDefault>
</template>

<script>
/* eslint-disable no-param-reassign */
import LayoutDefault from '@/components/LayoutDefault.vue';
import DynamicParagraph from '@/components/shared/DynamicParagraph.vue';
import { fetchSearchResults, fetchSearchFacets } from '@/api/Search';
import SearchForm from './SearchForm.vue';
import SearchResult from './SearchResult.vue';
import SearchSidebarFacet from './SearchSidebarFacet.vue';
import model from '../../../public/model';
import iurisprudentia from '../../../public/iurisprudentia';
import store from '../../store';

export default {
  components: {
    LayoutDefault,
    SearchForm,
    SearchResult,
    SearchSidebarFacet,
    DynamicParagraph,
  },
  watch: {
    activeTab() {
      this.$router.push({ query: {} });
    },
    'searchFacets.selected': {
      handler: 'updateSelectedFacets',
    },
    '$route.query.x': {
      handler: 'getFacetsFromQuery',
      immediate: true,
    },
    '$route.query': {
      handler: 'tryToLoad',
    },
  },
  data() {
    return {
      isLoading: false,
      activeTab: 0,
      availableDocuments: [],
      searchResults: {
        length: NaN,
        data: [], // shownResults
        error: null,
        itemsPerPage: 10,
        pageLimit: 10,
        queryOffset: 100,
        allResults: [],
      },
      searchFacets: {
        titles: [],
        error: null,
        selected: [],
      },
    };
  },
  async mounted() {
    this.availableDocuments = this.getAllDocuments();
    await this.tryToLoad();
  },
  computed: {
    layout() {
      const term = this.query.t;
      return !term ? 'narrow' : 'sidebar';
    },
    query() {
      return { ...this.$route.query };
    },
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    searchText() {
      // extract the home component-text based on the edition, with iurisprudentia as fallback
      return this.$i18n.t('search')[this.editionLink] || this.$i18n.t('search').iurisprudentia;
    },
  },
  methods: {
    async tryToLoad() {
      if (!!this.query.t && !this.isLoading && Object.keys(this.query).length !== 0) {
        await this.getSearchResults();
      }
    },
    filterResults(results) {
      // Filters returned results to include only documents in our static directory
      results.forEach((result) => {
        this.availableDocuments.forEach((doc) => {
          // If we have it, clean the returned result
          if (parseInt(result.id, 10) === doc.docId) {
            // First we save the result's title as a facet to use it later
            doc.facet = result.title;
            // then we clean the result
            result.title = doc.title;
            result.id = parseInt(result.id, 10);
            result.status = 'clean';
            result.editionLink = doc.editionLink;
          }
        });
        if (result.status !== 'clean') {
          result.title = this.$i18n.t('search.general.resultNoTitle');
          result.status = 'unclean';
        }
      });
      // Do something with all the results that we don't have
      return results;
    },
    filterFacets(titles) {
      // We match the facets to the results we have
      titles.forEach((title) => {
        this.availableDocuments.forEach((doc) => {
          // if we find a match, we add a parameter that we will show
          if (title.value === doc.facet) title.clean = doc.title;
        });
      });
      return titles;
    },
    getAllDocuments() {
      const documents = [];
      model.forEach((edition) => {
        edition.staticDirectory.forEach((index) => {
          index.documents.forEach((document) => {
            const doc = { ...document };
            doc.editionLink = edition.editionLink;
            documents.push(doc);
          });
        });
      });
      return documents;
    },
    launchExpertMode() {
      /*
      Move from normal edition to iurisprudentia, where all editions and collections can be searched.
      */
      store.commit('setEditionObject', iurisprudentia);
      this.$router.push({ name: 'Search', params: { edition: iurisprudentia.editionLink } });
    },
    async getFacetsFromQuery() {
      // TODO: implement
    },
    async updateSelectedFacets() {
      const titles = this.searchFacets.selected;
      const query = { ...this.query };
      // remove page
      if (query.p) delete query.p;
      // Add titles
      query.x = titles;
      this.$router.push({ query });
      await this.tryToLoad();
    },
    async getSearchResults() {
      this.isLoading = true;
      const query = { ...this.query };
      query.l = 100;
      // We make the api call in steps with multiples of 10, so that the facets and the results are synced
      if (query.p && query.p > this.searchResults.pageLimit) {
        // calculate the offset
        this.searchResults.queryOffset += 100;
        query.o = this.searchResults.queryOffset;
        // Get results and clean them
        const results = await fetchSearchResults(query);
        this.searchResults.allResults.push(...this.filterResults(results.results));
        // update facets
        const updatedTitles = this.filterFacets(this.searchFacets.titles);
        this.searchFacets.titles = updatedTitles;
        // update the new page limit
        this.searchResults.pageLimit += 10;
      }
      // If we have a page, we need to calculate which pages to show
      if (query.p) {
        // Calculate which results to show, we don't make an api call here
        const offset = (query.p - 1) * this.searchResults.itemsPerPage;
        const limit = offset + this.searchResults.itemsPerPage;
        this.searchResults.data = this.searchResults.allResults.slice(offset, limit);
      } else {
        // If we don't have a page, then this is the initial load
        const searchResults = await fetchSearchResults(query);
        // TODO: Do error handling
        // Clean them to use only the results available in our static directories
        this.searchResults.allResults = this.filterResults(searchResults.results);
        this.searchResults.length = searchResults.total;
        this.searchResults.data = this.searchResults.allResults.slice(0, 10);
        // Get facets
        const searchFacets = await fetchSearchFacets(query);
        const titles = this.filterFacets(searchFacets.facets.titles);
        this.searchFacets.titles = titles;
      }
      this.isLoading = false;
    },
  },
};
</script>
