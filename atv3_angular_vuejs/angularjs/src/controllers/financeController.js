export default function registerFinanceController(app) {
  app.controller('FinanceController', [
    '$scope',
    'FinanceData',
    function FinanceController($scope, FinanceData) {
      $scope.transactions = FinanceData.getTransactions();
      const pageSize = 4;
      $scope.currentPage = 1;

      function updateTransactions() {
        const filteredTransactions = $scope.transactions;
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

      updateTransactions();
    },
  ]);
}
