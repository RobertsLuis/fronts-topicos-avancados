<script>
import { useId } from 'vue';

export default {
  props: {
    items: { type: Array, required: true },
  },
  data() {
    return {
      activeId: this.items[0]?.id,
      componentId: useId(),
    };
  },
  computed: {
    selectedId() {
      return this.items.some((item) => item.id === this.activeId)
        ? this.activeId
        : this.items[0]?.id;
    },
  },
  methods: {
    handleKeydown(event, index) {
      let nextIndex = index;

      if (event.key === 'ArrowRight')
        nextIndex = (index + 1) % this.items.length;
      else if (event.key === 'ArrowLeft')
        nextIndex = (index - 1 + this.items.length) % this.items.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = this.items.length - 1;
      else return;

      event.preventDefault();
      this.activeId = this.items[nextIndex].id;
      this.$refs.tabButtons[nextIndex].focus();
    },
  },
};
</script>

<template>
  <div>
    <div class="tab-list" role="tablist" aria-label="Seções de finanças">
      <button
        v-for="(item, index) in items"
        :id="`${componentId}-${item.id}-tab`"
        :key="item.id"
        ref="tabButtons"
        type="button"
        role="tab"
        class="tab-button"
        :class="{ 'is-active': selectedId === item.id }"
        :aria-selected="selectedId === item.id"
        :aria-controls="`${componentId}-${item.id}-panel`"
        :tabindex="selectedId === item.id ? 0 : -1"
        @click="activeId = item.id"
        @keydown="handleKeydown($event, index)"
      >
        {{ item.title }}
      </button>
    </div>
    <section
      v-for="item in items"
      :id="`${componentId}-${item.id}-panel`"
      :key="item.id"
      v-show="selectedId === item.id"
      class="tab-panel"
      role="tabpanel"
      :aria-labelledby="`${componentId}-${item.id}-tab`"
      tabindex="0"
    >
      <slot :name="item.id" />
    </section>
  </div>
</template>
