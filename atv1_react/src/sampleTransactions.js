export const sampleTransactions = [
  { id: 1, description: 'Salário', type: 'income', amount: 300000 },
  { id: 2, description: 'Aluguel', type: 'expense', amount: 90000 },
  { id: 3, description: 'Supermercado', type: 'expense', amount: 25000 },
  { id: 4, description: 'Transporte', type: 'expense', amount: 12000 },
  { id: 5, description: 'Internet', type: 'expense', amount: 10000 },
  { id: 6, description: 'Freelance', type: 'income', amount: 50000 },
  { id: 7, description: 'Farmácia', type: 'expense', amount: 8000 },
  { id: 8, description: 'Cinema', type: 'expense', amount: 5000 },
];

export const monthlyBudget = 200000;

export function formatCurrency(amount) {
  return (amount / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
