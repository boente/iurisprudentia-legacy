<template>
  <div class="page-nav">
    <b-field :addons="true">
      <div class="control">
        <b-tooltip
          position="is-left"
          :active="hasPrev"
          :label="prevPage"
          class="is-family-primary"
        >
          <button
            class="button"
            :disabled="!hasPrev"
            @click="handleClick(value - 1)"
          >
            <b-icon icon="chevron-left" />
          </button>
        </b-tooltip>
      </div>
      <div class="control">
        <b-tooltip
          position="is-left"
          :label="changePage"
          class="is-family-primary"
        >
          <input
            ref="input"
            class="input is-family-primary"
            :value="Number.isNaN(value) ? '' : value"
            @focus="handleFocus"
            @keypress.enter="handleKeypress($event)"
            style="text-align: center; width: 4rem"
          />
        </b-tooltip>
      </div>
      <div class="control">
        <b-tooltip
          position="is-left"
          :label="pageNum"
          class="is-family-primary"
        >
          <div class="button is-family-primary" style="width: 4rem">
            {{ Number.isNaN(max) ? "" : max }}
          </div>
        </b-tooltip>
      </div>
      <div class="control">
        <b-tooltip
          position="is-left"
          :label="meta"
          class="is-family-primary"
        >
          <RouterLink class="button" :to='{
            name: "Metadata",
            params: { documentId: $route.params.documentId, edition: editionLink }}
          '>
            <font-awesome-icon style="color: black;" icon="info" />
          </RouterLink>
        </b-tooltip>
      </div>
      <div class="control">
        <b-tooltip
          position="is-left"
          :active="hasNext"
          :label="nextPage"
          class="is-family-primary"
        >
          <button
            class="button"
            :disabled="!hasNext"
            @click="handleClick(value + 1)"
          >
            <b-icon icon="chevron-right" />
          </button>
        </b-tooltip>
      </div>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prevPage: this.$i18n.t('viewer.navigationPager.prevPage'),
      changePage: this.$i18n.t('viewer.navigationPager.changePage'),
      pageNum: this.$i18n.t('viewer.navigationPager.pageNum'),
      meta: this.$i18n.t('general.meta'),
      nextPage: this.$i18n.t('viewer.navigationPager.nextPage'),
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  computed: {
    editionLink() {
      return this.$store.state.editionObject.editionLink;
    },
    hasNext() {
      return this.value < this.max;
    },
    hasPrev() {
      return this.value > 1;
    },
  },
  methods: {
    handleKeypress(event) {
      if (event.target) this.$emit('input', this.sanitize(event.target.value));
    },
    handleSubmit() {
      if (this.$refs.input) { this.$emit('input', this.sanitize(this.$refs.input.value)); }
    },
    handleClick(value) {
      this.$emit('input', this.sanitize(value));
    },
    handleFocus(event) {
      if (event.target) this.select();
    },
    select(event) {
      if (this.$refs.input) this.$refs.input.select();
    },
    restore() {
      this.$refs.input.value = this.value;
    },
    sanitize(value) {
      if (typeof value !== 'number') value = Number(value);
      if (Number.isNaN(value)) {
        this.restore();
        this.select();
        return this.value;
      }
      return Math.min(Math.max(1, value), this.max);
    },
  },
};
</script>

<style>
.nav-page {
  display: flex !important;
  flex-flow: row nowrap !important;

  align-items: center;
}

.nav-page .input {
  text-align: center;
  min-width: 70px;
  flex: 0;
}

.nav-page span.button {
  text-align: center;
}
</style>
