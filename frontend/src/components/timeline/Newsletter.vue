<template>
  <LayoutDefault>
    <section class="main-section section">
      <div class="content">
        <h1>Newsletter</h1>
        <p style="margin-bottom: 1em;">
          {{ $t("newsletter.text") }} <a href="mailto:iurisprudentia@rwi.uzh.ch">iurisprudentia@rwi.uzh.ch</a>.
        </p>
      </div>
    </section>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from '@/components/LayoutDefault.vue';

export default {
  components: {
    LayoutDefault,
  },
};
</script>
