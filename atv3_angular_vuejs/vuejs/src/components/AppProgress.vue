<script>
export default {
  props: {
    value: { type: Number, required: true },
    label: { type: String, default: 'Orçamento utilizado' },
  },
  computed: {
    percentage() {
      const value = Number.isFinite(this.value) ? this.value : 0;
      return Math.min(100, Math.max(0, value));
    },
  },
};
</script>

<template>
  <div class="progress">
    <p class="progress-caption">{{ label }}: {{ Math.round(percentage) }}%</p>
    <div
      class="progress-track"
      role="progressbar"
      :aria-label="label"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress-fill" :style="{ width: `${percentage}%` }" />
    </div>
  </div>
</template>
