<template>
  <LayoutDefault>
    <section v-if="isReady" class="main-section section">
      <div class="content">
        <h1>{{ documentData.title }}</h1>
        <div>
          <p>
            {{ documentData.institution }} <RouterLink :to='{
              name: "Metadata",
              params: { documentId: documentData.id, edition: editionLink }
            }
            '>
              <font-awesome-icon class="primary-color" style="font-size: smaller" icon="info" />
            </RouterLink>
          </p>
        </div>
      </div>
      <div class="is-margin-bottom">
        <form @submit="submitSearch">
          <b-field>
            <b-input
              v-model="term"
              :expanded="true"
              :placeholder="placeholderDoc"
              type="search"
              icon="search"
            ></b-input>
            <p class="control">
              <b-button
                v-if="term !== ''" @click="reset" icon-left="times" type="button">
              </b-button>
            </p>
            <p class="control">
              <b-button
                @click="submitSearch"
                :disabled="!hasTerm"
                tag="button"
                type="submit"
                class="is-primary"
              >
                {{ $t("navTitles.search") }}
              </b-button>
            </p>
          </b-field>
        </form>
      </div>
      <div>
        <PagePreview :id="document.id">
          <template #default="{ number, previewImage }">
            <section v-if="directoryType === 'static'">
              <router-link
                :to="{
                  name: 'Viewer',
                  params: {
                    documentId: document.id,
                    type: 'static',
                    pageNum: number,
                    edition: editionLink,
                    lang: locale
                  },
                }"
              >
                <figure class="image">
                  <legend class="has-background-white" style="padding: 0.25rem">
                    {{ $t("general.page") }} {{ number }}
                    <font-awesome-icon class="primary-color" style="float: right" icon="eye" />
                  </legend>
                  <img
                    ref="image"
                    :src="previewImage"
                    :alt="`Vorschaubild Seite ${number}`"
                    @load="loadPreview"
                    :style="styles">
                </figure>
              </router-link>
            </section>
            <section v-else-if="directoryType === 'crowd'">
              <a
                :href="'https://app.transkribus.org/collection/' + colId +
                  '/doc/' + document.id + '/edit?pageid=' + number">
                <figure class="image">
                  <legend class="has-background-white" style="padding: 0.25rem">
                    {{ $t("general.page") }} {{ number }}
                    <font-awesome-icon class="primary-color" style="float: right" icon="edit" />
                  </legend>
                  <img
                    ref="image"
                    :src="previewImage"
                    :alt="`Vorschaubild Seite ${number}`"
                    @load="loadPreview"
                    :style="styles">
                </figure>
              </a>
            </section>
          </template>
        </PagePreview>
      </div>
    </section>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '@/components/LayoutDefault.vue';
import PagePreview from './PagePreview.vue';

export default {
  components: {
    PagePreview,
    LayoutDefault,
  },
  head: {
    title() {
      return this.document === null ? null : { inner: this.documentData.title };
    },
  },
  watch: {
    isReady(value) {
      if (value === true) {
        this.$emit('updateHead');
      }
    },
  },
  data() {
    return {
      placeholderDoc: this.$i18n.t('search.general.placeholderDoc'),
      document: null,
      term: '',
      isError: false,
      isReady: false,
      imageSource: null,
      width: 120,
      height: 100,
    };
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    locale() {
      return this.$i18n.locale;
    },
    crowdId() {
      return this.$store.state.editionObject.crowd_id;
    },
    colId() {
      return this.$store.state.editionObject.col_id;
    },
    staticDirectory() {
      return this.$store.state.editionObject.staticDirectory;
    },
    crowdDirectory() {
      return this.$store.state.editionObject.crowdDirectory;
    },
    hasTerm() {
      return !!this.term;
    },
    directoryType() {
      return this.$route.params.type;
    },
    styles() {
      return {
        display: 'inline-block',
        width: `${this.width}px`,
        height: `${this.height}px`,
        backgroundColor: 'rgb(0, 0, 0, 0.075)',
      };
    },
    /*
    Uses document ID to render our statically saved document-title and document-metadata.
    */
    documentData() {
      const docData = {
        id: parseInt(this.$route.params.documentId, 10),
        title: this.$i18n.t('general.noDoc'), // in case no title was found.
        institution: '',
      };
      // Search in our directories
      if (this.directoryType === 'static') {
        this.staticDirectory.forEach((index) => {
          index.documents.forEach((doc) => {
            if (doc.docId === docData.id) {
              docData.title = doc.title;
              docData.institution = doc.metadata.Institution;
            }
          });
        });
      } else if (this.directoryType === 'crowd') {
        this.crowdDirectory.forEach((index) => {
          index.documents.forEach((doc) => {
            if (doc.docId === docData.id) {
              docData.title = doc.title;
              docData.institution = doc.metadata.Institution;
            }
          });
        });
      }
      return docData;
    },
  },
  async mounted() {
    await this.load();
  },
  methods: {
    /*
    Uses document ID to load dynamic document from the Transkribus Servers.
    */
    async load() {
      this.document = await this.api.fetchDocument(this.$route.params.documentId);
      this.isReady = true;
    },
    loadPreview(event) {
      this.width = event.target.naturalWidth;
      this.height = event.target.naturalHeight;
    },
    reset() { this.term = ''; },
    submitSearch() {
      if (this.hasTerm) {
        // construct query
        const query = {
          t: this.term,
          f: 1,
          cId: [this.colId],
          dId: [this.document.id],
        };
        // pass it
        this.$router.push({ name: 'Search', query });
      }
    },
  },
};
</script>
