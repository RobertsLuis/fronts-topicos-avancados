import { useState } from 'react';
import Dropdown from './components/Dropdown.jsx';
import Pagination from './components/Pagination.jsx';
import { formatCurrency } from './sampleTransactions.js';

const pageSize = 4;
const typeOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'income', label: 'Receitas' },
  { value: 'expense', label: 'Despesas' },
];

export default function TransactionList({ transactions, onReview }) {
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const filteredTransactions = transactions.filter(
    (transaction) => type === 'all' || transaction.type === type,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / pageSize),
  );
  const visibleTransactions = filteredTransactions.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function changeType(value) {
    setType(value);
    setPage(1);
  }

  return (
    <section aria-label="Lista de lançamentos">
      <div className="list-toolbar">
        <h2>Lançamentos</h2>
        <div className="filter">
          <span>Tipo:</span>
          <Dropdown
            label="Filtrar tipo"
            value={type}
            options={typeOptions}
            onChange={changeType}
          />
        </div>
      </div>
      <div
        className="table-container"
        tabIndex={0}
        role="region"
        aria-label="Tabela de lançamentos"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tipo</th>
              <th scope="col" className="amount">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.type === 'income' ? 'Receita' : 'Despesa'}</td>
                <td className="amount">{formatCurrency(transaction.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filteredTransactions.length}
        pageSize={pageSize}
      />
      <button className="primary-button" type="button" onClick={onReview}>
        Concluir revisão
      </button>
    </section>
  );
}
