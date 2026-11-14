<script>
import { transactions } from './transactions.js';
import { formatCurrency } from './formatCurrency.js';
import AppTabs from './components/AppTabs.vue';
import AppPagination from './components/AppPagination.vue';
import AppDropdown from './components/AppDropdown.vue';
import AppProgress from './components/AppProgress.vue';

export default {
  components: { AppTabs, AppPagination, AppDropdown, AppProgress },
  data() {
    return {
      transactions,
      tabs: [
        { id: 'transactions', title: 'Lançamentos' },
        { id: 'budget', title: 'Orçamento' },
      ],
      currentPage: 1,
      pageSize: 4,
      selectedType: 'all',
      typeOptions: [
        { value: 'all', label: 'Todos' },
        { value: 'income', label: 'Receitas' },
        { value: 'expense', label: 'Despesas' },
      ],
      budgetLimit: 2000,
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(
        (transaction) =>
          this.selectedType === 'all' || transaction.type === this.selectedType,
      );
    },
    totalPages() {
      return Math.max(
        1,
        Math.ceil(this.filteredTransactions.length / this.pageSize),
      );
    },
    visibleTransactions() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredTransactions.slice(start, start + this.pageSize);
    },
    expenses() {
      return this.transactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);
    },
    budgetValid() {
      return (
        Number.isInteger(this.budgetLimit) &&
        this.budgetLimit >= 1 &&
        this.budgetLimit <= 1000000
      );
    },
    budgetPercentage() {
      return this.budgetValid
        ? (this.expenses / (this.budgetLimit * 100)) * 100
        : 0;
    },
  },
  methods: {
    formatCurrency,
    changeType(value) {
      this.selectedType = value;
      this.currentPage = 1;
    },
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
        <div class="list-toolbar">
          <h2>Lançamentos do mês</h2>
          <AppDropdown
            :options="typeOptions"
            :value="selectedType"
            label="Tipo"
            @change="changeType"
          />
        </div>
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
          <p>
            Despesas: <strong>{{ formatCurrency(expenses) }}</strong>
          </p>
          <div class="form-field">
            <label for="budget-limit">Limite mensal em reais</label>
            <input
              id="budget-limit"
              v-model.number="budgetLimit"
              type="number"
              min="1"
              max="1000000"
              step="1"
              required
              aria-describedby="budget-hint budget-error"
              :aria-invalid="!budgetValid"
            />
            <p id="budget-hint" class="field-hint">
              Informe um valor inteiro de R$ 1 a R$ 1.000.000.
            </p>
            <p
              id="budget-error"
              class="error"
              role="status"
              v-show="!budgetValid"
            >
              Informe um limite válido para calcular o percentual.
            </p>
          </div>
          <AppProgress
            v-if="budgetValid"
            :value="budgetPercentage"
            label="Orçamento utilizado"
          />
        </section>
      </template>
    </AppTabs>
    <footer>Dados fictícios para a atividade de Vue.js.</footer>
  </main>
</template>
