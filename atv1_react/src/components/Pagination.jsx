export default function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) {
  const pageCount = Math.max(1, Math.trunc(totalPages) || 1);
  const currentPage = Math.min(pageCount, Math.max(1, Math.trunc(page) || 1));
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const firstItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const lastItem = Math.min(currentPage * pageSize, totalItems || 0);

  return (
    <nav className="pagination" aria-label="Paginação das movimentações">
      <p className="pagination-summary">
        {totalItems
          ? `${firstItem}–${lastItem} de ${totalItems} movimentações`
          : 'Nenhuma movimentação'}
      </p>
      <div className="pagination-buttons">
        <button
          type="button"
          className="page-button"
          aria-label="Página anterior"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
        {pages.map((number) => (
          <button
            key={number}
            type="button"
            className={`page-button${number === currentPage ? ' is-active' : ''}`}
            aria-label={`Página ${number}`}
            aria-current={number === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          className="page-button"
          aria-label="Próxima página"
          disabled={currentPage === pageCount}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Próxima
        </button>
      </div>
    </nav>
  );
}
