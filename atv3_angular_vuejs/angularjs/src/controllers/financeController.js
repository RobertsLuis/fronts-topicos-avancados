export default function registerFinanceController(app) {
  app.controller('FinanceController', [
    '$scope',
    'FinanceData',
    function FinanceController($scope, FinanceData) {
      $scope.transactions = FinanceData.getTransactions();
      const pageSize = 4;
      $scope.currentPage = 1;
      $scope.selectedType = 'all';
      $scope.typeOptions = [
        { value: 'all', label: 'Todos' },
        { value: 'income', label: 'Receitas' },
        { value: 'expense', label: 'Despesas' },
      ];

      function updateTransactions() {
        const filteredTransactions = $scope.transactions.filter(
          (transaction) =>
            $scope.selectedType === 'all' ||
            transaction.type === $scope.selectedType,
        );
        $scope.totalPages = Math.max(
          1,
          Math.ceil(filteredTransactions.length / pageSize),
        );
        const start = ($scope.currentPage - 1) * pageSize;
        $scope.visibleTransactions = filteredTransactions.slice(
          start,
          start + pageSize,
        );
      }

      $scope.changePage = (page) => {
        $scope.currentPage = page;
        updateTransactions();
      };

      $scope.changeType = (value) => {
        $scope.selectedType = value;
        $scope.currentPage = 1;
        updateTransactions();
      };

      updateTransactions();
    },
  ]);
}
