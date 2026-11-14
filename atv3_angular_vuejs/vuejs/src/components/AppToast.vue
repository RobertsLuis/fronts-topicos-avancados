<script>
export default {
  props: {
    notification: { type: Object, default: null },
  },
  emits: ['dismiss'],
  data() {
    return {
      timerId: null,
    };
  },
  computed: {
    notificationId() {
      return this.notification?.id;
    },
  },
  watch: {
    notificationId: {
      immediate: true,
      handler() {
        window.clearTimeout(this.timerId);
        this.timerId = null;
        if (!this.notification) return;
        this.timerId = window.setTimeout(() => this.$emit('dismiss'), 5000);
      },
    },
  },
  beforeUnmount() {
    window.clearTimeout(this.timerId);
  },
};
</script>

<template>
  <div
    v-if="notification"
    class="toast"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <p class="toast-message">{{ notification.message }}</p>
    <button
      type="button"
      aria-label="Fechar notificação"
      @click="$emit('dismiss')"
    >
      ×
    </button>
  </div>
</template>
