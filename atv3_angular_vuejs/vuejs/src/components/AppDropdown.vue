<script>
import { useId } from 'vue';

export default {
  props: {
    options: { type: Array, required: true },
    value: { type: [String, Number], required: true },
    label: { type: String, default: 'Filtrar por tipo' },
  },
  emits: ['change'],
  data() {
    return {
      open: false,
      componentId: useId(),
    };
  },
  computed: {
    selectedLabel() {
      return this.options.find((option) => option.value === this.value)?.label;
    },
  },
  mounted() {
    document.addEventListener('pointerdown', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleEscape);
  },
  beforeUnmount() {
    document.removeEventListener('pointerdown', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleEscape);
  },
  methods: {
    selectOption(value) {
      this.$emit('change', value);
      this.open = false;
      this.$refs.trigger.focus();
    },
    handleOutsideClick(event) {
      if (!this.$refs.container.contains(event.target)) this.open = false;
    },
    handleEscape(event) {
      if (!this.open || event.key !== 'Escape') return;
      this.open = false;
      this.$refs.trigger.focus();
    },
  },
};
</script>

<template>
  <div ref="container" class="dropdown">
    <button
      ref="trigger"
      type="button"
      class="dropdown-trigger"
      :aria-expanded="open"
      :aria-controls="`${componentId}-options`"
      @click="open = !open"
    >
      {{ label }}: {{ selectedLabel }}
      <span aria-hidden="true">▾</span>
    </button>
    <ul v-show="open" :id="`${componentId}-options`" class="dropdown-menu">
      <li v-for="option in options" :key="option.value">
        <button
          type="button"
          class="dropdown-option"
          :class="{ 'is-selected': option.value === value }"
          :aria-pressed="option.value === value"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </button>
      </li>
    </ul>
  </div>
</template>
