<template>
  <div>
    <b-collapse class="panel" :open="true">
      <template #trigger>
        <p class="panel-heading"
        >
          {{ $t("search.general.facet") }}
        </p>
      </template>
      <div style="position: relative">
        <label :class="['panel-block', { 'is-active': false }]" v-show="items.length > 0">
          <p class="control">
            <b-input v-model="filterValue" type="search" icon="search" expanded />
          </p>
        </label>
        <label v-if="item.clean" :class="['panel-block', { 'is-active': false }]" v-for="item in filteredItems" :key="item.value">
          <b-field>
            <template #label>
              <b-checkbox
                :value="item.selected"
                @input="handleInput(item.value, $event)"
              >
                {{ item.clean }} ({{ item.count }})
              </b-checkbox>
            </template>
          </b-field>
        </label>
        <!-- show selected items if no matches -->
        <label v-if="item.clean" :class="['panel-block', { 'is-active': false }]" v-for="item in selectedItems" :key="item.value">
          <b-field>
            <template #label>
              <b-checkbox
                :value="item.selected"
                @input="handleInput(item.value, $event)"
              >
                {{ item.clean }} ({{ item.count }})
              </b-checkbox>
            </template>
          </b-field>
        </label>
        <b-loading :active="loading" :is-full-page="false"></b-loading>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'selected',
    event: 'input',
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterValue: '',
    };
  },
  watch: {
    items() {
      if (this.filterValue !== '') {
        this.filterValue = '';
      }
    },
  },
  computed: {
    filteredItems() {
      return this.selectableItems.filter((item) => item
        .value
        .toString()
        .toLowerCase()
        .indexOf(this.filterValue.toLowerCase()) !== -1);
    },
    selectableItems() {
      return this
        .items
        .filter((item) => !this.selected.includes(item.value))
        .map((item) => ({
          ...item,
          selected: this.selected.includes(item.value),
        }));
    },
    selectedItems() {
      if (this.items.length === 0) {
        return this.selected.map((value) => ({
          name: value,
          value,
          count: 0,
          selected: true,
        }));
      }

      return this
        .items
        .filter((item) => this.selected.includes(item.value))
        .map((item) => ({
          ...item,
          selected: this.selected.includes(item.value),
        }));
    },
  },
  methods: {
    handleInput(id, value) {
      const { selected } = this;

      // only allow single item to be selected
      if (value === true) {
        if (!selected.includes(id)) {
          selected.splice(0);
          selected.push(id);
        }
      } else if (selected.includes(id)) {
        selected.splice(selected.indexOf(id), 1);
      }

      this.$emit('input', this.selected.slice());
    },
  },
};
</script>
