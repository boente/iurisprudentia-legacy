<template>
  <form @submit="submit" class="form-container">
    <b-field style="justify-content: center">
      <b-input
        v-model="term"
        :placeholder="placeholder"
        type="search"
        icon="search"
      >
      </b-input>
      <p class="control">
        <b-button
          v-if="term !== ''" @click="reset" icon-left="times" type="button">
        </b-button>
      </p>
      <p class="control">
        <b-button
          @click="submit"
          :disabled="!hasTerm"
          tag="button"
          :loading="isLoading"
          type="submit"
          class="is-primary"
        >
          {{ $t("navTitles.search") }}
        </b-button>
      </p>
    </b-field>
    <b-field class="has-addons" style="justify-content: center">
      <div class="has-text-right control" @click="launchExpertMode">
        <a style="color: white">
          {{ $t("search.general.expert") }}
        </a>
      </div>
    </b-field>
  </form>
</template>

<script>
import model from '../../../public/model';
import iurisprudentia from '../../../public/iurisprudentia';
import store from '../../store';

export default {
  data() {
    return {
      term: '',
      isLoading: false,
      placeholder: this.$i18n.t('search.general.placeholder'),
    };
  },
  computed: {
    hasTerm() {
      return !!this.term;
    },
  },
  methods: {
    reset() {
      this.term = '';
    },
    submit() {
      if (this.hasTerm) {
        // Get collection ids & construct query
        const colIds = model.map((edition) => edition.col_id);
        const query = {
          t: this.term,
          f: 1,
          cId: colIds,
        };
        store.commit('setEditionObject', iurisprudentia);
        this.$router.push({
          name: 'Search',
          params: { edition: iurisprudentia.editionLink },
          query,
        });
      }
    },
    launchExpertMode() {
      store.commit('setEditionObject', iurisprudentia);
      this.$router.push({ name: 'Search', params: { edition: iurisprudentia.editionLink } });
    },
  },
};
</script>

<style scoped>
.form-container {
    margin: 10vh;
}
</style>
