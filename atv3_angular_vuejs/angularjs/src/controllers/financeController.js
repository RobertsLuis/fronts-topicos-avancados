export default function registerFinanceController(app) {
  app.controller('FinanceController', [
    '$scope',
    'FinanceData',
    function FinanceController($scope, FinanceData) {
      $scope.transactions = FinanceData.getTransactions();
      $scope.visibleTransactions = $scope.transactions;
    },
  ]);
}
