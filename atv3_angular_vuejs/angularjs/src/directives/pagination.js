export default function registerPagination(app) {
  app.directive('financePagination', () => ({
    restrict: 'E',
    scope: {
      totalPages: '<',
      currentPage: '<',
      onPageChange: '&',
    },
    template: `
      <nav class="pagination" aria-label="Páginas dos lançamentos">
        <div class="pagination-buttons">
        <button type="button" class="page-button" ng-disabled="currentPage <= 1"
          ng-click="onPageChange({ page: currentPage - 1 })">Anterior</button>
        <button type="button" class="page-button" ng-repeat="page in pages track by page"
          ng-class="{ 'is-active': page === currentPage }"
          ng-attr-aria-label="Página {{ page }}"
          ng-attr-aria-current="{{ page === currentPage ? 'page' : undefined }}"
          ng-click="onPageChange({ page: page })">{{ page }}</button>
        <button type="button" class="page-button" ng-disabled="currentPage >= totalPages"
          ng-click="onPageChange({ page: currentPage + 1 })">Próxima</button>
        </div>
      </nav>
    `,
    link(scope) {
      scope.$watch('totalPages', (totalPages) => {
        scope.pages = Array.from(
          { length: Math.max(1, totalPages || 1) },
          (_, index) => index + 1,
        );
      });
    },
  }));
}
