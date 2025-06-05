<template>
  <div class="is-relative" style="min-height: 8rem">
    <div v-if="isError" class="message is-danger">
      <div class="message-body">
        {{ $t("general.error") }} <code>{{ error }}</code>
      </div>
    </div>
    <header style="margin-bottom: 0.75rem;">
      <div v-if="itemsTotal > 0" style="margin-bottom: 0.75rem">
        <strong>
          {{ itemsTotal }} {{ itemsTotal > 1 ? $t("general.pages") : $t("general.page") }}
        </strong>
      </div>
      <b-pagination
        v-if="pagesTotal > 1"
        :total="itemsTotal"
        :current.sync="currentPage"
        :range-before="3"
        :range-after="4"
        order="is-right"
        :per-page="itemsPerPage"
        icon-prev="chevron-left"
        icon-next="chevron-right"
      />
    </header>
    <div v-show="!isLoading && itemsTotal === 0" class="message is-dark">
      <div class="message-body">
        {{ $t("search.general.noResults") }} <strong class="is-italic">{{ query.t }}</strong>
      </div>
    </div>
    <div v-if="itemsTotal > 0" style="margin-bottom: 0.75rem">
      <div>
        <router-link
          v-for="(searchResult, index) in results"
          :key="index"
          :to="searchResultRoutes[index]"
          target="_blank"
          class="card"
          style="display: block; margin-bottom: 0.75rem"
        >
          <header class="card-header">
            <p class="card-header-title">
              {{ searchResult.title }} - {{ $t("general.page") }} {{ searchResult.page }}
            </p>
          </header>
          <div class="card-content has-background-white-bis">
            <SearchResultSnippet :data="searchResult.snippets" />
          </div>
          <footer class="card-footer">
            <slot name="footer"></slot>
          </footer>
        </router-link>
      </div>
    </div>
    <footer>
      <b-pagination
        v-if="pagesTotal > 1"
        :total="itemsTotal"
        :current.sync="currentPage"
        :range-before="3"
        :range-after="4"
        order="is-right"
        :per-page="itemsPerPage"
        icon-prev="chevron-left"
        icon-next="chevron-right"
      />
    </footer>
    <b-loading :active="isLoading" :is-full-page="false"></b-loading>
  </div>
</template>

<script>
import SearchResultSnippet from './SearchResultSnippet.vue';

export default {
  components: {
    SearchResultSnippet,
  },
  props: {
    order: {
      type: Array,
      default: () => [],
    },
    isLoading: { type: Boolean },
    total: { type: Number },
    results: { type: Array },
    error: { type: String },
    getSearchResults: { type: Function },
    itemsPerPage: { type: Number, default: 10 },
  },
  watch: {
    '$route.query.p': {
      handler: 'getPageFromQuery',
      immediate: true,
    },
    currentPage: {
      handler: 'updateCurrentPage',
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    query() {
      return { ...this.$route.query };
    },
    locale() {
      return this.$i18n.locale;
    },
    isError() {
      return this.error !== null;
    },
    searchResultRoutes() {
      // console.log(this.results);
      return this.results.map((result) => {
        if (result.status === 'clean') {
          return {
            name: 'Viewer',
            params: {
              edition: result.editionLink,
              type: 'static',
              documentId: result.id,
              pageNum: result.page,
              lang: this.locale,
            },
            query: {
              t: this.query.t,
            },
          };
        }
        // TODO: Create 404 error page to handle this, or route to iurisprudentia
        return {
          name: 'Timeline',
        };
      });
    },
    itemsTotal() {
      if (!Number.isInteger(this.total)) {
        return null;
      }
      return this.total;
    },
    pagesTotal() {
      return Math.ceil(this.total / this.itemsPerPage);
    },
  },
  methods: {
    getPageFromQuery(value) {
      const parsedValue = parseInt(value, 10);
      if (Number.isFinite(parsedValue)) {
        // pagesTotal might be NaN
        if (!Number.isFinite(this.pagesTotal)) {
          this.currentPage = parsedValue;
        } else {
          this.currentPage = Math.max(1, Math.min(this.pagesTotal, parsedValue));
        }
      } else {
        // no url param provided, default to 1
        this.currentPage = 1;
      }
    },
    updateCurrentPage() {
      const query = { ...this.$route.query };
      if (this.currentPage === 1) {
        delete query.p;
      } else {
        query.p = this.currentPage;
      }
      this.$router.push({ query });
    },
  },
};
</script>
