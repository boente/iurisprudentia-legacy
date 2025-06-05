<template>
  <router-view id="app" />
</template>

<script>
import model from '../public/model';
import iurisprudentia from '../public/iurisprudentia';
import store from './store';

export default {
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    primaryColor() {
      return this.$store.state.editionObject.colors.primaryColor;
    },
    secondaryColor() {
      return this.$store.state.editionObject.colors.secondaryColor;
    },
    primaryColorLight() {
      return this.$store.state.editionObject.colors.primaryColorLight;
    },
    primaryColorDark() {
      return this.$store.state.editionObject.colors.primaryColorDark;
    },
    layout() {
      try {
        return this.$route.meta.layout;
      } catch (err) {
        return 'default';
      }
    },
  },
  methods: {
    setEditionStyling() {
      // Page was not routed from timeline, but directly from link
      if (this.editionLink !== this.$route.params.edition) {
      // Get current edition from route
        const currentEdition = model.filter((item) => item.editionLink === this.$route.params.edition);
        // Set the edition parameters
        if (currentEdition.length === 0) store.commit('setEditionObject', iurisprudentia);
        else store.commit('setEditionObject', currentEdition[0]);
      }
      // Set edition styling
      document.body.style.setProperty('--primary-color', this.primaryColor);
      document.body.style.setProperty('--secondary-color', this.secondaryColor);
      document.body.style.setProperty('--primary-color-light', this.primaryColorLight);
      document.body.style.setProperty('--primary-color-dark', this.primaryColorDark);
    },
    setLanguage() {
      // TODO: get available langs from i18n instead of hardcoding.
      const availableLangs = ['de', 'en', 'fr', 'it'];
      const { lang } = this.$route.params;
      if (lang && availableLangs.indexOf(lang) > -1) this.$i18n.locale = lang;
    },
  },
  created() {
    this.setEditionStyling();
    this.setLanguage();
  },
  updated() {
    this.setEditionStyling();
    this.setLanguage();
  },
};
</script>

<style lang="scss">
  :root {
    --primary-color: 220, 96, 39;
    --primary-color-light: 245, 209, 192;
    --primary-color-dark: 156, 67, 25;
    --secondary-color: 227, 128, 82;
  }
  html,
  body,
  #app {
    height: 100%;
  }

  .main-section {
    height: 100%;
  }

  .is-margin-top {
    margin-top: 1.5rem;
  }

  .is-margin-bottom {
    margin-bottom: 1.25rem;
  }

  // We have to use !important when coloring to override bulmas color values
  // We use rgb-color values to be able to change the opacity on the viewer as needed.
  .primary-color {
    color: rgba(var(--primary-color), 1) !important;
  }

  .primary-background {
    background-color: rgba(var(--primary-color), 1) !important;
  }

  .secondary-background {
    background-color: rgba(var(--secondary-color), 1) !important;
  }

  // For the shadow of the navbar
  .has-shadow {
    box-shadow: 0 2px 0 0 rgba(var(--primary-color), 1) !important;
    --webkit-box-shadow: 0 2px 0 0 rgba(var(--primary-color), 1) !important;
  }

  // For the burger menu when navbar is on phone
  .navbar-menu.is-active {
    background-color: rgba(var(--primary-color), 1) !important;
  }

  // For the dropdown that choses languages
  .navbar-dropdown {
    background-color: rgba(var(--primary-color), 1) !important;
    border-top: 2px solid rgba(var(--primary-color), 1) !important;
  }

  // For the bullet separators navigation
  .separator::before {
    color: rgba(var(--primary-color), 1) !important;
  }

  // for breadcrumbs used in navigation
  .breadcrumb-link {
    color: rgba(var(--primary-color), 1) !important;
  }
  .breadcrumb-link:hover {
    color: rgba(var(--primary-color-dark), 1) !important;
  }

  // Tooltip
  .b-tooltip.is-primary::after {
    background-color: rgba(var(--primary-color), 1) !important;
  }
  .b-tooltip.is-right.is-primary::before {
    border-right: 5px solid rgba(var(--primary-color), 1) !important;
  }
  .b-tooltip.is-left.is-primary::before {
    border-left: 5px solid rgba(var(--primary-color), 1) !important;
  }
  .b-tooltip.is-top.is-primary::before {
    border-top: 5px solid rgba(var(--primary-color), 1) !important;
  }
  .b-tooltip.is-bottom.is-primary::before {
    border-bottom: 5px solid rgba(var(--primary-color), 1) !important;
  }

  // Dropdown Items
  a.dropdown-item.is-active {
    background-color: rgba(var(--primary-color), 1) !important;
  }

  // for navigation links in TheNavbar
  .nav-link:hover {
    color: rgba(var(--primary-color-light), 1) !important;
  }
  .nav-link:focus {
    color: rgba(var(--primary-color-light), 1) !important;
  }

  // Pagination Links
  .pagination-link.is-current {
    background-color: rgba(var(--primary-color), 1) !important;
    border-color: rgba(var(--primary-color), 1) !important;
  }

  // Buttons
  .button.is-primary {
    background-color: rgba(var(--primary-color), 1) !important;
  }
  .button.is-primary.is-focused {
    box-shadow: 0 0 0 0.125em rgba(var(--primary-color), 0.25) !important;
  }
  .button.is-primary:hover,
  .button.is-primary.is-hovered {
    background-color: rgba(var(--primary-color), 0.85) !important;
  }
  .button.is-primary:active,
  .button.is-primary.is-active {
    background-color: rgba(var(--primary-color), 0.85) !important;
  }

  // Viewer Styling
  .browser-content {
    padding: 0.75rem;
    height: 100%;
  }

  ::-moz-selection {
    background: rgba(var(--primary-color), 0.125);
  }

  .browser-content::selection {
    background: rgba(var(--primary-color), 0.125);
  }

  .browser-content-element {
    padding: 0.25rem 0.75rem;
  }

  .browser-content-element:hover {
    background-color: rgba(var(--primary-color), 0.075);
  }

  .browser-content-element.is-highlighted {
    font-weight: bold;
    background-color: rgba(var(--primary-color), 0.125);
  }

  .browser-content-label.is-highlighted {
    font-weight: bold;
    border-bottom: 2px solid rgba(var(--primary-color), 0.75);
  }

  .browser-content-element {
    cursor: pointer;
  }

  .overlay-element {
    overflow: hidden;
    cursor: pointer;
    text-overflow: ellipsis;
    background-color: rgba(255, 255, 255, 0.125);
    border: 2px solid rgba(0, 0, 0, 0.125);
    box-sizing: border-box;
  }

  .overlay-element.is-match {
    border-color: rgba(var(--secondary-color), 0.3);
    background-color: rgba(var(--secondary-color), 0.05);
  }

  .overlay-element.is-highlighted {
    border-color: rgba(var(--primary-color), 0.3);
    background-color: rgba(var(--primary-color), 0.05);
  }

  .overlay-element.is-text-visible.is-highlighted {
    border-color: rgba(var(--primary-color), 0.75);
    background-color: rgba(255, 255, 255, 0.75);
  }

  .overlay-element.is-text-visible {
    display: block !important;
    background-color: rgba(255, 255, 255, 0.75);
    border: 2px solid rgba(0, 0, 0, 0.25);
  }

  @import "~bulma/sass/utilities/_all";

  @font-face {
    font-family: 'Tex Gyre Pagella';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('~@/assets/fonts/texgyrepagella-regular.otf') format('opentype');
  }

  @font-face {
    font-family: 'Tex Gyre Pagella';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url('~@/assets/fonts/texgyrepagella-italic.otf') format('opentype');
  }

  @font-face {
    font-family: 'Tex Gyre Pagella';
    font-style: normal;
    font-weight: 600;
    src: url('~@/assets/fonts/texgyrepagella-bold.otf') format('opentype');
  }

  @font-face {
    font-family: 'Tex Gyre Pagella';
    font-style: italic;
    font-weight: 600;
    src: url('~@/assets/fonts/texgyrepagella-bolditalic.otf') format('opentype');
  }

  // Timeline Fonts Serif
  @font-face {
    font-family: 'Merriweather Regular';
    font-weight: 400;
    font-style: normal;
    src: url('~@/assets/fonts/Merriweather-Regular.ttf');
  }

  @font-face {
    font-family: 'Merriweather Italic';
    font-weight: 400;
    font-style: italic;
    src: url('~@/assets/fonts/Merriweather-Italic.ttf');
  }

  @font-face {
    font-family: 'Merriweather Bold';
    font-weight: 600;
    font-style: normal;
    src: url('~@/assets/fonts/Merriweather-Bold.ttf');
  }

  @font-face {
    font-family: 'Merriweather Bold-italic';
    font-weight: 600;
    font-style: italic;
    src: url('~@/assets/fonts/Merriweather-BoldItalic.ttf');
  }

  // Timeline Fonts Sans Serif
  @font-face {
    font-family: 'Merriweather-Sans Regular';
    font-weight: 400;
    font-style: normal;
    src: url('~@/assets/fonts/MerriweatherSans-Regular.ttf');
  }

  @font-face {
    font-family: 'Merriweather-Sans Italic';
    font-weight: 400;
    font-style: italic;
    src: url('~@/assets/fonts/MerriweatherSans-Italic.ttf');
  }

  @font-face {
    font-family: 'Merriweather-Sans Bold';
    font-weight: 600;
    font-style: normal;
    src: url('~@/assets/fonts/MerriweatherSans-Bold.ttf');
  }

  @font-face {
    font-family: 'Merriweather-Sans Bold-italic';
    font-weight: 600;
    font-style: italic;
    src: url('~@/assets/fonts/MerriweatherSans-BoldItalic.ttf');
  }

  $family-serif: "Merriweather Regular", serif;
  $family-sans-serif: "Merriweather-Sans Regular", "The Sans", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  $family-primary: $family-serif;
  $family-secondary: $family-sans-serif;

  $navbar-height: 4rem;
  $navbar-padding-vertical: 0.25rem;
  $navbar-box-shadow-size: 0 2px 0 0;
  $navbar-item-color: $white;
  $navbar-item-hover-background-color: transparent;

  .navbar-item {
    font-family: $family-serif;
    font-size: 0.875rem;
  }

  $footer-padding: 1.5rem 1.5rem 1.5rem;

  $primary: #dc6027;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);

  $colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
  );

  @import "bulma";
  @import "buefy/src/scss/buefy";

  // Override bulmas link styling
  a {
    color: rgba(var(--secondary-color), 1);
    cursor: pointer;
    text-decoration: none;
  }

  // Cookie-Consent styling
  .Cookie--iurisprudentia {
    background: rgba(36, 74, 93, 1);
    color: #fff;
    padding: 1.250em;
  }
  .Cookie--iurisprudentia .Cookie__button {
    background: rgba(184, 153, 90, 1);
    padding: 0.625em 3.125em;
    color: #fff;
    border-radius: 0;
    border: 0;
    font-size: 1em;
  }
  .Cookie--iurisprudentia .Cookie__button:hover {
    background: rgba(208, 188, 147, 1);
  }

  // Set Font for entire website
  /*
  html,
  body,
  #app {
    font-family: "Merriweather Regular";
  }
*/
</style>
