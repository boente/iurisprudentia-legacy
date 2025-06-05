import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import VueHead from 'vue-head';
import Buefy from 'buefy';
import api from '@/api';
import VueMatomo from 'vue-matomo';
import VueI18n from 'vue-i18n';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import fontawesome from '@/plugins/fontawesome';

import Layout from '@/components/Layout.vue';

import config from '@/config.json';
import store from './store';
import i18n from './i18n';

Vue.use(fontawesome);
Vue.use(VueI18n);

Vue.use(VueHead, {
  separator: '-',
  complement: config.title,
});

Vue.use(Buefy, {
  defaultIconComponent: FontAwesomeIcon,
  defaultIconPack: 'fas',
});

Vue.use(VueMatomo, {
  host: 'https://matomo.rwi.app',
  siteId: 4,
  trackerFileName: 'matomo',
  router,
  enableLinkTracking: true,
  requireConsent: true,
  trackInitialView: true,
  disableCookies: false,
  enableHeartBeatTimer: false,
  heartBeatTimerInterval: 15,
  debug: false,
  userId: undefined,
  cookieDomain: undefined,
  domains: undefined,
  preInitActions: [],
});

Vue.component('Layout', Layout);
Vue.config.productionTip = false;

Vue.prototype.api = api;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
