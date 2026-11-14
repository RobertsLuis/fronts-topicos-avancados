import { transactions } from '../transactions.js';

export default function registerFinanceData(app) {
  app.factory('FinanceData', () => ({
    getTransactions() {
      return transactions;
    },
  }));
}
