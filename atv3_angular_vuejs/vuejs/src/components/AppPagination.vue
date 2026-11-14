<script>
export default {
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
  },
  emits: ['change'],
  computed: {
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
  },
};
</script>

<template>
  <nav class="pagination" aria-label="Paginação dos lançamentos">
    <div class="pagination-buttons">
      <button
        type="button"
        class="page-button"
        :disabled="currentPage <= 1"
        @click="$emit('change', currentPage - 1)"
      >
        Anterior
      </button>
      <button
        v-for="page in pages"
        :key="page"
        type="button"
        class="page-button"
        :class="{ 'is-active': currentPage === page }"
        :aria-label="`Página ${page}`"
        :aria-current="currentPage === page ? 'page' : undefined"
        @click="$emit('change', page)"
      >
        {{ page }}
      </button>
      <button
        type="button"
        class="page-button"
        :disabled="currentPage >= totalPages"
        @click="$emit('change', currentPage + 1)"
      >
        Próxima
      </button>
    </div>
  </nav>
</template>
