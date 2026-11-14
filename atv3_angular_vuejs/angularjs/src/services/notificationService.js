export default function registerNotificationService(app) {
  app.service('NotificationService', [
    '$timeout',
    function NotificationService($timeout) {
      const state = { message: '' };
      let timeout;

      this.state = state;
      this.dismiss = () => {
        $timeout.cancel(timeout);
        state.message = '';
      };
      this.show = (message) => {
        $timeout.cancel(timeout);
        state.message = message;
        timeout = $timeout(this.dismiss, 5000);
      };
    },
  ]);
}
