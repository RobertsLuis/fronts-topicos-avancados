import { useState } from 'react';
import Accordion from './components/Accordion.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Tabs from './components/Tabs.jsx';
import Toast from './components/Toast.jsx';
import TransactionList from './TransactionList.jsx';
import {
  sampleTransactions,
  monthlyBudget,
  formatCurrency,
} from './sampleTransactions.js';

const information = [
  {
    id: 'transactions',
    title: 'Sobre os lançamentos',
    content:
      'Os valores são exemplos fictícios de receitas e despesas. Use o filtro para escolher o tipo e os botões de página para ver os demais lançamentos.',
  },
  {
    id: 'budget',
    title: 'Como funciona o orçamento?',
    content:
      'A barra mostra a porcentagem do limite mensal utilizada pelas despesas. Receitas não entram nesse cálculo.',
  },
];

export default function FinancePage() {
  const [toast, setToast] = useState(null);
  const dismissToast = () => setToast(null);
  const expenses = sampleTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
  const tabs = [
    {
      id: 'transactions',
      label: 'Lançamentos',
      content: (
        <TransactionList
          transactions={sampleTransactions}
          onReview={() =>
            setToast({ message: 'Revisão dos lançamentos concluída.' })
          }
        />
      ),
    },
    {
      id: 'budget',
      label: 'Orçamento',
      content: (
        <section className="budget">
          <h2>Orçamento mensal</h2>
          <p>
            Despesas: <strong>{formatCurrency(expenses)}</strong>
          </p>
          <p>
            Limite: <strong>{formatCurrency(monthlyBudget)}</strong>
          </p>
          <ProgressBar
            value={(expenses / monthlyBudget) * 100}
            label="Orçamento utilizado"
          />
        </section>
      ),
    },
  ];

  return (
    <main className="app">
      <header>
        <h1>Controle de finanças</h1>
        <p>Exemplo de receitas, despesas e orçamento mensal.</p>
      </header>
      <Tabs tabs={tabs} label="Seções do controle financeiro" />
      <section className="information" aria-label="Informações">
        <Accordion items={information} />
      </section>
      <Toast toast={toast} onDismiss={dismissToast} />
    </main>
  );
}
