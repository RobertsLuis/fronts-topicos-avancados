<script>
import { transactions } from './transactions.js';
import { formatCurrency } from './formatCurrency.js';
import AppTabs from './components/AppTabs.vue';

export default {
  components: { AppTabs },
  data() {
    return {
      transactions,
      tabs: [
        { id: 'transactions', title: 'Lançamentos' },
        { id: 'budget', title: 'Orçamento' },
      ],
    };
  },
  computed: {
    visibleTransactions() {
      return this.transactions;
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
