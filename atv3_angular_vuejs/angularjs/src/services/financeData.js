import { transactions } from '../transactions.js';

export default function registerFinanceData(app) {
  app.factory('FinanceData', () => ({
    getTransactions() {
      return transactions;
    },
    getExpenses() {
      return transactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);
    },
  }));
}
