<script>
import { transactions } from './transactions.js';
import { formatCurrency } from './formatCurrency.js';
import AppTabs from './components/AppTabs.vue';
import AppPagination from './components/AppPagination.vue';

export default {
  components: { AppTabs, AppPagination },
  data() {
    return {
      transactions,
      tabs: [
        { id: 'transactions', title: 'Lançamentos' },
        { id: 'budget', title: 'Orçamento' },
      ],
      currentPage: 1,
      pageSize: 4,
    };
  },
  computed: {
    totalPages() {
      return Math.max(1, Math.ceil(this.transactions.length / this.pageSize));
    },
    visibleTransactions() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.transactions.slice(start, start + this.pageSize);
    },
  },
  methods: {
    formatCurrency,
  },
};
</script>

<template>
  <main class="app">
    <header>
      <h1>Controle de finanças</h1>
      <p>Exemplo de receitas, despesas e orçamento mensal.</p>
    </header>
    <AppTabs :items="tabs">
      <template #transactions>
        <div class="list-toolbar"><h2>Lançamentos do mês</h2></div>
        <div
          class="table-container"
          role="region"
          aria-label="Lançamentos"
          tabindex="0"
        >
          <table>
            <caption class="visually-hidden">
              Receitas e despesas do mês
            </caption>
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Tipo</th>
                <th scope="col" class="amount">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in visibleTransactions"
                :key="transaction.id"
              >
                <td>{{ transaction.description }}</td>
                <td>
                  {{ transaction.type === 'income' ? 'Receita' : 'Despesa' }}
                </td>
                <td class="amount">{{ formatCurrency(transaction.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <AppPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change="currentPage = $event"
        />
      </template>
      <template #budget>
        <section class="budget">
          <h2>Orçamento mensal</h2>
          <p>Consulte o limite mensal para planejar suas despesas.</p>
        </section>
      </template>
    </AppTabs>
    <footer>Dados fictícios para a atividade de Vue.js.</footer>
  </main>
</template>
