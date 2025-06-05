<template>
  <div class="search-result-snippet">
    <p v-for="(parts, index) in cleanedSnippets" :key="index" class="search-result-snippet-part">
      <span v-if="index === 0">
        &hellip;
      </span>
      <span
        v-for="(part, index) in parts"
        v-if="!part.isGap"
        :key="index"
        :class="[{ 'has-text-weight-bold': part.isMatch }, 'search-result-snippet-part']"
      >
        {{ part.string }}
      </span>
      <span v-else>
        &hellip;
      </span>
      <template v-if="index < cleanedSnippets.length">
        &hellip;
      </template>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SearchResultSnippet',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cleanedSnippets() {
      return this.data.map(
        (parts) => parts
          .map((part) => ({
            isMatch: part.isMatch,
            string: !part.isMatch ? this.clean(part.string) : part.string,
          }))
          .filter((part) => !!part.string),
      );
    },
  },
  methods: {
    clean(s) {
      const stack = [
        (t) => t.replace(/¬ /g, ''),
      ];
      let t = s;
      while (t && stack.length > 0) {
        const f = stack.shift();
        t = f(t);
      }
      return t.trim();
    },
  },
};
</script>

<style>
 .search-result-snippet-part {
   display: inline;
 }
</style>
