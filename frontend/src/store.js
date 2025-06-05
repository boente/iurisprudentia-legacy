/* eslint no-param-reassign: "error" */
import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config.json';
import iurisprudentia from '../public/iurisprudentia';

Vue.use(Vuex);

/*
We use a global store to set the current edition the user has chosen from the timeline
*/

const store = new Vuex.Store({
  state: {
    editionObject: iurisprudentia,
    availableLangs: config.availableLangs,
  },
  mutations: {
    setEditionObject(state, value) {
      state.editionObject = value;
    },
  },
});

export default store;
