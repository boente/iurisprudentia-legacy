<template>
  <div v-if="kind === KINDS.DEFAULT || kind === KINDS.DEFAULT_WITHOUT_SUBHEADER" class="layout is-default">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <header v-if="kind !== KINDS.DEFAULT_WITHOUT_SUBHEADER">
        <slot name="subheader"></slot>
      </header>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
  <div v-else-if="kind === KINDS.BROWSER" class="layout is-layout-browser">
    <header>
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>
  <div v-else-if="kind === KINDS.VOID" class="layout">
    <header>
      <slot name="header"></slot>
      <slot name="subheader"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
  <div v-else-if="kind === KINDS.NARROW" class="layout">
    <header>
      <slot name="header"></slot>
      <slot name="subheader"></slot>
    </header>
    <main class="columns">
      <div class="column is-offset-one-fifth is-three-fifths">
        <slot></slot>
      </div>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
  <div v-else-if="kind === KINDS.DOCUMENT">
    <header>
      <slot name="header"></slot>
    </header>
    <main class="columns">
      <div class="column is-offset-one-fifth is-three-fifths">
        <slot></slot>
      </div>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
  <div v-else-if="kind === KINDS.WORKSPACE" class="layout is-layout-workspace">
    <slot name="header"></slot>
    <slot name="subheader"></slot>
    <slot></slot>
  </div>
  <div v-else-if="kind === KINDS.SEARCH">
    <slot name="header">
      <TheNavbar></TheNavbar>
    </slot>
    <slot name="subheader"></slot>
    <div class="columns" style="margin-top: 0.75rem">
      <div class="column is-three-fifths is-offset-one-fifth">
        <slot></slot>
      </div>
    </div>
  </div>
  <div v-else-if="kind === KINDS.WIDE" style="margin-top: 0.75rem;">
    <div class="columns">
      <div class="column">
        <slot name="header"></slot>
        <slot name="subheader"></slot>
      </div>
      </header>
      <div class="columns">
        <div class="column">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="kind === KINDS.SIDEBAR" style="margin-top: 0.75rem;">
    <div class="section">
      <header>
        <div class="columns">
          <div class="column is-offset-one-third is-two-thirds is-hidden-mobile">
            <slot name="header"></slot>
            <slot name="subheader"></slot>
          </div>
        </div>
      </header>
      <main>
        <div class="columns">
          <div class="column is-one-third is-hidden-mobile">
            <slot name="sidebar"></slot>
          </div>
          <div class="column">
            <slot></slot>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  </div>
</template>

<style>
 html,
 body {
   height: 100%;
 }

 .layout {
   position: relative;
   display: flex;
   flex-direction: column;
   height: 100%;
 }

 .layout > main {
   position: relative;
   flex: 1;
 }

 .layout.is-layout-workspace {
   overflow: hidden;
 }

 .layout.is-layout-browser {
   overflow: hidden;
 }
</style>

<script>
import TheNavbar from '@/components/TheNavbar.vue';

const KINDS = {
  NARROW: 'narrow',
  WIDE: 'wide',
  SIDEBAR: 'sidebar',
  BROWSER: 'browser',
  SEARCH: 'search',
  WORKSPACE: 'workspace',
  VOID: 'void',
  DEFAULT: 'default',
  DEFAULT_WITHOUT_SUBHEADER: 'default-without-subheader',
  DOCUMENT: 'document',
};

export default {
  components: {
    TheNavbar,
  },
  props: {
    kind: {
      type: String,
      default: KINDS.DEFAULT,
    },
  },
  created() {
    this.KINDS = KINDS;
  },
};
</script>
