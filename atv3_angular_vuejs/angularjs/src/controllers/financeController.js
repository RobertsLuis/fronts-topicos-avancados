export default function registerFinanceController(app) {
  app.controller('FinanceController', [
    '$scope',
    'FinanceData',
    'NotificationService',
    function FinanceController($scope, FinanceData, NotificationService) {
      $scope.transactions = FinanceData.getTransactions();
      const pageSize = 4;
      $scope.currentPage = 1;
      $scope.selectedType = 'all';
      $scope.typeOptions = [
        { value: 'all', label: 'Todos' },
        { value: 'income', label: 'Receitas' },
        { value: 'expense', label: 'Despesas' },
      ];
      $scope.expenses = FinanceData.getExpenses();
      $scope.budget = { limit: 2000 };
      $scope.information = [
        {
          id: 'transactions',
          title: 'Sobre os lançamentos',
          content:
            'São oito exemplos fictícios. O filtro escolhe o tipo e a paginação mostra os demais registros.',
        },
        {
          id: 'budget',
          title: 'Como funciona o orçamento?',
          content:
            'O percentual corresponde às despesas divididas pelo limite mensal. As receitas não entram nesse cálculo.',
        },
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

      $scope.updateBudget = () => {
        const limit = $scope.budget.limit;
        $scope.budgetValid =
          Number.isInteger(limit) && limit >= 1 && limit <= 1000000;
        $scope.budgetPercentage = $scope.budgetValid
          ? ($scope.expenses / (limit * 100)) * 100
          : 0;
      };
      $scope.updateBudget();

      $scope.completeReview = () =>
        NotificationService.show('Revisão dos lançamentos concluída.');

      updateTransactions();
    },
  ]);
}
