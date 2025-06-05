import Vue from 'vue';
import Router from 'vue-router';
import config from '@/../vue.config';
import Home from '@/components/Home.vue';
import Metadata from '@/components/shared/Metadata';
import Search from '@/components/search/Search';
import Viewer from '@/components/viewer/Viewer';
import Dynamic from '@/components/shared/Dynamic';
import Cookies from '@/components/shared/Cookies';
import Timeline from '@/components/timeline/Timeline.vue';
import Newsletter from '@/components/timeline/Newsletter';
import Directory from '@/components/directories/Directory.vue';
import Document from '@/components/directories/Document.vue';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: config.publicPath,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Timeline,
      meta: {
        title: 'Timeline',
      },
    },
    {
      path: '/:lang',
      name: 'Timeline',
      component: Timeline,
      meta: {
        title: 'Timeline',
      },
    },
    {
      path: '/:lang/:edition',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Startseite',
        layout: 'default-without-subheader',
      },
    },
    {
      path: '/:lang/:edition/directory/:type',
      name: 'Directory',
      component: Directory,
      meta: {
        title: 'Verzeichnis',
        breadcrumbs: [
          { label: 'navTitles.home', toComponentName: 'Home' },
          { label: 'navTitles.staticDirectory', toComponentName: 'Directory' },
        ],
      },
    },
    {
      path: '/:lang/:edition/documents/:type/:documentId',
      name: 'Document',
      component: Document,
      meta: {
        layout: 'document',
        breadcrumbs: [
          { label: 'navTitles.home', toComponentName: 'Home' },
          { label: 'navTitles.staticDirectory', toComponentName: 'Directory' },
        ],
      },
    },
    {
      path: '/:lang/:edition/documents/:type/:documentId/pages/:pageNum',
      name: 'Viewer',
      component: Viewer,
      meta: {
        layout: 'browser',
        breadcrumbs: [
          { label: 'navTitles.home', toComponentName: 'Home' },
          { label: 'navTitles.staticDirectory', toComponentName: 'Directory' },
          { label: '', toComponentName: 'Document' },
          { label: '', toComponentName: 'Viewer' },
        ],
      },
    },
    {
      path: '/:lang/:edition/metadata/:documentId',
      name: 'Metadata',
      component: Metadata,
      meta: {
        title: 'Meta-Daten',
        layout: 'default-without-subheader',
      },
    },
    {
      path: '/:lang/:edition/search',
      name: 'Search',
      component: Search,
      meta: {
        title: 'Suche',
        layout: 'default',
        breadcrumbs: [
          { label: 'navTitles.home', toComponentName: 'Home' },
          { label: 'navTitles.search', toComponentName: 'Search' },
        ],
      },
    },
    {
      path: '/:lang/:edition/:componentType',
      name: 'Dynamic',
      component: Dynamic,
      meta: {
        title: 'Dynamic',
        layout: 'narrow',
        breadcrumbs: [
          { label: 'navTitles.home', toComponentName: 'Home' },
        ],
      },
    },
    {
      path: '/:lang/iurisprudentia/info/newsletter',
      name: 'Newsletter',
      component: Newsletter,
      meta: {
        title: 'Newsletter',
        layout: 'narrow',
        breadcrumbs: [
          { label: 'navTitles.home', toComponentName: 'Home' },
        ],
      },
    },
    {
      path: '/:lang/:edition/privacy/cookies',
      name: 'Cookies',
      component: Cookies,
      meta: {
        title: 'Cookies',
        layout: 'narrow',
        breadcrumbs: [
          { label: 'navTitles.home', toComponentName: 'Home' },
        ],
      },
    },
  ],
});
