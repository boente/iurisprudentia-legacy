<template>
  <LayoutDefault>
    <section class="main-section section">
      <div class="content">
        <h1>Cookies</h1>
        <div>
          <iframe
            style="border: 0; height: 200px; width: 600px;"
            src="https://matomo.rwi.app/index.php?module=CoreAdminHome&action=optOut&language=de&backgroundColor=feffff&fontColor=000000&fontSize=1em&fontFamily=Merriweather%20Regular"
          ></iframe>
        </div>
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
