<template>
  <form v-on:keyup.enter="submit" style="margin-bottom: 0.75rem">
    <!-- Search Term -->
    <b-field>
      <b-input
        v-model="term"
        :expanded="true"
        :placeholder="placeholder"
        type="search"
        icon="search"
      />
      <p class="control">
        <b-button
          v-if="!noSearchTerm"
          @click="term = ''"
          icon-left="times"
          type="button"
        />
      </p>
      <p class="control">
        <b-button
          @click="submit"
          :disabled="noSearchTerm"
          tag="button"
          :loading="isLoading"
          type="submit"
          class="is-primary"
        >
          {{ $t("navTitles.search") }}
        </b-button>
      </p>
    </b-field>
    <!-- Search Options -->
    <div>
      <b-collapse :open.sync="isOptionsOpen">
        <template #trigger>
          <div v-if="!isOptionsOpen" class="has-text-right">
            <a>{{ $t("search.general.options") }}</a>
          </div>
        </template>
        <b-notification :active.sync="isOptionsOpen">
          <b-field>
            <template #label horizontal>
              {{ $t("search.general.faultTolerance") }}
              <b-tooltip
                :label="faultTooltip"
                multilined
                style="vertical-align: bottom">
                <b-icon icon="question-circle"/>
              </b-tooltip>
            </template>
            <b-field>
              <b-radio-button
                v-for="(level, index) in fuzzinessLevels"
                :key="index"
                v-model="fuzziness"
                :native-value="level"
                expanded
              >
                {{ fuzzinessLabels[level] }}
              </b-radio-button>
            </b-field>
          </b-field>
          <section>
            <label v-if="editionLink === 'iurisprudentia'" class="label" v-bind:style="{ marginTop: '2em'}">
              {{ $t("search.general.docsEds") }}
              <b-tooltip
                :label="docsEdsTooltip"
                multilined
                position="is-right"
                style="vertical-align: bottom">
                <b-icon icon="question-circle"/>
              </b-tooltip>
            </label>
            <label v-else class="label" v-bind:style="{ marginTop: '2em'}">
              {{ $t("search.general.docs") }}
              <b-tooltip
                :label="docsTooltip"
                multilined
                position="is-right"
                style="vertical-align: bottom">
                <b-icon icon="question-circle"/>
              </b-tooltip>
            </label>
            <b-field>
              <treeselect
                :limit=3
                :limitText="(count) => `and ${count} others`"
                :noChildrenText="treeselectNoChildren"
                valueFormat="object"
                v-model="treeselectValues"
                :multiple="true"
                :searchable="true"
                :open-on-focus="true"
                :defaultExpandLevel="expandLevel"
                :placeholder="treeselectPlaceholder"
                :options="treeselectOptions" />
            </b-field>

            <b-field v-if="editionLink !== 'iurisprudentia'" >
              <button
                type="button"
                class="button is-text"
                style="padding-left: 0; margin-top: 1em"
                @click="launchExpertMode"
              >
                {{ $t("search.general.docsEdsAll") }}
              </button>
            </b-field>

          </section>
        </b-notification>
      </b-collapse>
    </div>
  </form>
</template>

<script>
import _ from 'lodash';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import iurisprudentia from '../../../public/iurisprudentia';
import model from '../../../public/model';

export default {
  components: { Treeselect },
  props: {
    isLoading: { type: Boolean },
    treeselectData: { type: Object },
    launchExpertMode: { type: Function },
  },
  data() {
    return {
      placeholder: this.$i18n.t('search.general.placeholder'),
      faultTooltip: this.$i18n.t('search.general.faultTooltip'),
      docsEdsTooltip: this.$i18n.t('search.general.docsEdsTooltip'),
      docsTooltip: this.$i18n.t('search.general.docsTooltip'),
      treeselectNoChildren: this.$i18n.t('search.general.treeselectNoChildren'),
      isOptionsOpen: false,
      expandLevel: 0,
      treeselectValues: [],
      treeselectOptions: [],
      fuzzinessLevels: [0, 1, 3],
      fuzzinessLabels: {
        0: 'Ohne',
        1: 'Mittel',
        3: 'Hoch',
      },
      term: '', // Search input.
      fuzziness: 1,
    };
  },
  mounted() {
    // Get form data from query.
    this.initFormData();
    // submit if there is a valid query
    this.submit();
  },
  watch: {
    editionLink: {
      handler: 'handleEditionChange',
      immediate: true,
    },
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    noSearchTerm() {
      return (!this.term || this.term.length <= 0);
    },
    treeselectPlaceholder() {
      if (this.editionLink === iurisprudentia.editionLink) {
        return this.$i18n.t('search.general.treeselectAllPlaceholder');
      }
      return `${this.$i18n.t('search.general.treeselectDocsPlaceholder')} ${this.$store.state.editionObject.editionName}`;
    },
    // compute the chosen treeselect documents and collections
    chosenTreeselectValues() {
      // create them as sets to hold only unique values
      const documents = new Set();
      const collections = new Set();

      // get the chosen values from treeselect
      this.treeselectValues.forEach((value) => {
        if (value.type === 'col') collections.add(value.id);
        else {
          documents.add(value.id);
          collections.add(value.parentId);
        }
      });

      // transform them into arrays and add them to query
      const selectedCollections = [...collections];
      const selectedDocuments = [...documents];
      return {
        selectedCollections,
        selectedDocuments,
      };
    },
    query() {
      // TODO: Fix setting fuzziness
      return {
        t: this.term,
        f: this.fuzziness,
        cId: this.chosenTreeselectValues.selectedCollections,
        dId: this.chosenTreeselectValues.selectedDocuments,
      };
    },
  },
  methods: {
    initTreeSelect() {
      /*
      Initialize tree-select component in the SearchForm with available collections and documents,
      and pass the data to the SearchForm component as props.
      */

      // fist create the function that constructs the optionObject
      const constructOptionObject = (edition) => {
        // every index in the static-directory has sub-documents, merge them all together
        const documents = [];
        edition.staticDirectory.forEach((index) => {
          documents.push(...index.documents);
        });
        // construct the edition-objects children:
        // We add an extra attribute to distinguish between collections and documents
        // And another one to get the documents collection id to use it in the query
        const children = documents.map((document) => ({
          id: document.docId,
          label: document.title,
          type: 'doc',
          parentId: edition.col_id,
        }));

        // construct the collection object as specified by the treeselect component, with the added type
        const collection = {
          id: edition.col_id,
          label: edition.editionName,
          children,
          type: 'col',
        };

        return collection;
      };

      // First we clean the old values in the treeselect
      this.treeselectOptions = [];
      this.treeselectValues = [];

      // Now we check for the edition we are in:
      // If the edition is iurisprudentia, we show all editions and all collections.
      // In any other edition, we show only the collections in the respective edition.
      if (this.editionLink === iurisprudentia.editionLink) {
        // We get every edition and all their documents and mark them as chosen by default.
        this.treeselectOptions = model.map((edition) => {
          const optionObject = constructOptionObject(edition);
          this.treeselectValues.push(optionObject);
          return optionObject;
        });
      } else {
        const edition = model.filter((ed) => ed.editionLink === this.editionLink)[0];
        const collectionObject = constructOptionObject(edition);
        this.treeselectValues.push(collectionObject);
        this.treeselectOptions.push(collectionObject);
      }
    },
    initFormData() {
      const query = { ...this.$route.query };

      if (query.t) this.term = query.t;
      if (query.f) this.fuzziness = parseInt(query.f, 10);
      // This solution has a very bad runtime; this should be rethought and changed if possible
      if (query.cId || query.dId) this.treeselectValues = [];
      if (query.cId) {
        // Edge case - query contains only one collection and is therefore not an array
        let cols = [];
        if (!Array.isArray(query.cId)) cols = [query.cId];
        else cols = query.cId;
        // Get the collections from the query, which is composed of only the ids
        cols.forEach((collection) => {
          // compare them to our treeselect, since it stores its objects as complete objects and not only as ids
          this.treeselectOptions.forEach((option) => {
            if (parseInt(collection, 10) === option.id) this.treeselectValues.push(option);
          });
        });
      }
      if (query.dId) {
        let docs = [];
        // Edge case - query contains only one document and is therefore not an array
        if (!Array.isArray(query.dId)) docs = [query.dId];
        else docs = query.dId;
        docs.forEach((doc) => {
          // We have to check every option and its children, since treeselect saves them as nested arrays
          this.treeselectOptions.forEach((option) => {
            option.children.forEach((child) => {
              if (child.id === parseInt(doc, 10)) {
                // if we find a match, we need to remove its parent,
                // because if the parent is chosen, all its children are automatically chosen
                const index = this.treeselectValues.indexOf(option);
                if (index !== -1) this.treeselectValues.splice(index, 1);
                this.treeselectValues.push(child);
              }
            });
          });
        });
      }
    },
    handleEditionChange() {
      /*
      When the user switches between editions (for example by switching to iurisprudentia),
      the available documents in the treeselect-component must be updated, as well as the visibility options.
      */
      this.initTreeSelect();

      if (this.editionLink === 'iurisprudentia') {
        this.isOptionsOpen = true;
        this.expandLevel = 0;
      } else {
        this.expandLevel = 10;
      }
    },
    // submit the actual query to make the API call.
    submit: _.debounce(function callback() {
      // Check if there is a valid search term first
      if (!this.noSearchTerm) {
        // handle case where nothing is chosen in treeselect
        if (this.treeselectValues.length === 0) this.treeselectValues.push(...this.treeselectOptions);
        const { query } = this;
        this.$router.push({ query });
      }
    }, 50),
  },
};
</script>
