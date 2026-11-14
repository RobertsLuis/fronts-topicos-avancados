export default function registerProgress(app) {
  app.directive('financeProgress', () => ({
    restrict: 'E',
    scope: { value: '<', label: '@' },
    template: `
      <div class="progress">
        <p class="progress-caption">{{ label }}: {{ percentage | number:0 }}%</p>
        <div class="progress-track" role="progressbar"
          ng-attr-aria-label="{{ label }}" ng-attr-aria-valuenow="{{ percentage }}"
          aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" ng-style="{ width: percentage + '%' }"></div>
        </div>
      </div>
    `,
    link(scope) {
      scope.$watch('value', (value) => {
        scope.percentage = Math.min(
          100,
          Math.max(0, Number.isFinite(value) ? value : 0),
        );
      });
    },
  }));
}
