<script>
import { useId } from 'vue';

export default {
  props: {
    items: { type: Array, required: true },
  },
  data() {
    return {
      expandedId: null,
      componentId: useId(),
    };
  },
  methods: {
    toggleItem(itemId) {
      this.expandedId = this.expandedId === itemId ? null : itemId;
    },
  },
};
</script>

<template>
  <div class="accordion">
    <div v-for="item in items" :key="item.id" class="accordion-item">
      <h3>
        <button
          :id="`${componentId}-${item.id}-heading`"
          type="button"
          class="accordion-trigger"
          :aria-expanded="expandedId === item.id"
          :aria-controls="`${componentId}-${item.id}-panel`"
          @click="toggleItem(item.id)"
        >
          {{ item.title }}
          <span aria-hidden="true">{{
            expandedId === item.id ? '−' : '+'
          }}</span>
        </button>
      </h3>
      <div
        :id="`${componentId}-${item.id}-panel`"
        class="accordion-content"
        :class="{ 'is-open': expandedId === item.id }"
        role="region"
        :aria-labelledby="`${componentId}-${item.id}-heading`"
        :aria-hidden="expandedId !== item.id"
        :inert="expandedId !== item.id"
      >
        <div class="accordion-inner">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
