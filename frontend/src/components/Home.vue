<template>
  <LayoutDefault>
    <section
      :style="{ backgroundImage: backgroundImage }"
      class="main-section section has-background-image secondary-background">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds-tablet is-two-thirds-desktop is-three-fifths-widescreen is-half-fullhd">
            <div class="columns">
              <div class="column">
                <div class="box">
                  <div class="content">
                    <div style="position: relative">
                      <h1 style="margin-right: 1.3em">{{this.editionName}}</h1>
                      <router-link
                        :to="{
                          name: 'Dynamic',
                          params: {
                            edition: this.editionLink,
                            componentType: 'labor',
                            lang: locale
                          },
                        }">
                        <img
                          src="../assets/laborversion.svg"
                          alt="Eugen Huber Portrait"
                          style="position: absolute; left: 95%; top: -95%; height: 300%"
                        >
                      </router-link>
                    </div>
                  </div>
                  <div class="media">
                    <div v-if="portrait" class="media-left is-hidden-mobile">
                      <img
                        :src="portraitImage"
                        alt="Eugen Huber Portrait"
                        style="width: 8rem"
                      >
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <div v-if="homeText && homeText.length !== 0">
                          <p v-for="(paragraph, paraKey) in homeText" :key="`paraKey-${paraKey}`">
                            <DynamicParagraph
                              :paragraph="paragraph"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '@/components/LayoutDefault.vue';
import DynamicParagraph from '@/components/shared/DynamicParagraph.vue';

export default {
  components: {
    LayoutDefault,
    DynamicParagraph,
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    locale() {
      return this.$i18n.locale;
    },
    homeText() {
      // extract the home component-text based on the edition, with iurisprudentia as fallback
      return this.$i18n.t('home')[this.editionLink] || this.$i18n.t('home').iurisprudentia;
    },
    editionName() {
      return this.$store.state.editionObject.editionName;
    },
    name() {
      return this.$store.state.editionObject.name;
    },
    background() {
      return this.$store.state.editionObject.background;
    },
    portrait() {
      return this.$store.state.editionObject.portrait;
    },
    backgroundImage() {
      if (this.background) return `url(${require(`../assets/backgrounds/${ this.background }`)})`;
      return '';
    },
    portraitImage() {
      return require(`../assets/portraits/${ this.portrait }`);
    },
  },
};
</script>

<style>
 .has-background-image {
   background-repeat: no-repeat;
   background-size: cover;
   background-position: top center;
   position: relative;
 }

 /* Tablet */
 @media (max-width: 1024px) {
   .content h1 {
     font-size: 1.5em;
    }
  }

 /* Mobile */
 @media (max-width: 768px) {
   .content h1 {
     font-size: 1em;
    }
  }
</style>
