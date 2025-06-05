<template>
  <div class="preview">
    <div class="is-relative" style="min-height: 8rem;">
      <header>
        <slot name="header" v-bind="{ itemsTotal }"></slot>
      </header>
      <main>
        <strong style="line-height: 3.75rem">{{ itemsTotal }} {{ $t("general.pages") }}</strong>
        <ul class="preview-list">
          <li
            v-for="item in items"
            :key="item.number"
            class="preview-item"
          >
            <slot v-bind="item"></slot>
          </li>
        </ul>
      </main>
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
          icon-next="chevron-right">
        </b-pagination>
      </footer>
      <b-loading :active="isLoading" :is-full-page="false"></b-loading>
    </div>
  </div>
</template>

<script>
// TODO: Fix duplicate route.query watchers with unexpected behavior.
// TODO: Fix getting page number from query and setting preview with it.
import _ from 'lodash';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      total: NaN,
      isLoading: false,
      currentPage: 1,
      items: [],
      isReady: false,
      itemsPerPage: 16,
    };
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        if (newQuery.p !== oldQuery.p) {
          const parsedValue = newQuery.p;
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
        }
      },
      immediate: true,
    },
    currentPage: {
      handler() {
        const query = { ...this.$route.query };
        if (this.currentPage === 1) {
          delete query.p;
        } else {
          query.p = this.currentPage;
        }
        this.$router.push({ query });
      },
    },
    '$route.query': {
      handler: 'tryToLoad',
    },
  },
  computed: {
    canLoad() {
      return !this.isLoading;
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
    offset() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    limit() {
      return this.itemsPerPage;
    },
    params() {
      return { offset: this.offset, limit: this.limit };
    },
  },
  async mounted() {
    await this.tryToLoad();
  },
  methods: {
    async tryToLoad() {
      if (this.canLoad) {
        await this.load();
      }
    },
    load: _.debounce(async function load() {
      this.isLoading = true;
      const data = await this.fetchNextPage(this.params);
      this.items = data.items;
      this.total = data.total;
      this.isLoading = false;
      this.$emit('load');
    }, 50),
    async fetchNextPage({ offset, limit }) {
      const data = await this.api.fetchDocumentPages(this.id, { offset, limit });
      this.isReady = true;
      return data;
    },
  },
};
</script>

<style>
 .preview-list {
   display: flex;
   flex-flow: row wrap;
   margin: 1.25rem 0;
   padding: 1.25rem 0 0 1.25rem;
   background-color: rgba(0, 0, 0, 0.025);
 }

 .preview-item {
   margin: 0 1.25rem 0.75rem 0;
 }

 .preview {
   min-height: 240px;
 }

</style>
