export default function registerToast(app) {
  app.directive('financeToast', () => ({
    restrict: 'E',
    scope: {},
    template: `
      <div class="toast-region" aria-live="polite" aria-atomic="true">
        <div class="toast" ng-if="notification.message">
          <p class="toast-message">{{ notification.message }}</p>
          <button type="button" class="toast-close" aria-label="Fechar notificação"
            ng-click="dismiss()">×</button>
        </div>
      </div>
    `,
    controller: [
      '$scope',
      'NotificationService',
      function ToastController($scope, NotificationService) {
        $scope.notification = NotificationService.state;
        $scope.dismiss = NotificationService.dismiss;
      },
    ],
  }));
}
