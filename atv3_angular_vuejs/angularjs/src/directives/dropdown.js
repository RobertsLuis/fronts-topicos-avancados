export default function registerDropdown(app) {
  app.directive('financeDropdown', [
    '$document',
    ($document) => ({
      restrict: 'E',
      scope: {
        options: '<',
        value: '<',
        onChange: '&',
        label: '@',
      },
      template: `
      <div class="dropdown">
        <button type="button" class="dropdown-trigger"
          ng-attr-aria-controls="{{ menuId }}" ng-attr-aria-expanded="{{ open }}"
          ng-click="open = !open">
          {{ label }}: {{ selectedLabel() }} <span aria-hidden="true">▾</span>
        </button>
        <ul class="dropdown-menu" ng-attr-id="{{ menuId }}" ng-show="open">
          <li ng-repeat="option in options track by option.value">
            <button type="button" class="dropdown-option" ng-class="{ 'is-selected': value === option.value }"
              ng-attr-aria-pressed="{{ value === option.value }}"
              ng-click="selectOption(option.value)">{{ option.label }}</button>
          </li>
        </ul>
      </div>
    `,
      link(scope, element) {
        const trigger = element[0].querySelector('.dropdown-trigger');
        scope.menuId = `dropdown-${scope.$id}`;
        scope.open = false;
        scope.selectedLabel = () =>
          scope.options?.find((option) => option.value === scope.value)
            ?.label || '';
        scope.selectOption = (value) => {
          scope.onChange({ value });
          scope.open = false;
          trigger.focus();
        };

        function handleOutsideClick(event) {
          if (!scope.open || element[0].contains(event.target)) return;
          scope.$applyAsync(() => {
            scope.open = false;
          });
        }

        function handleEscape(event) {
          if (!scope.open || event.key !== 'Escape') return;
          scope.$applyAsync(() => {
            scope.open = false;
          });
          trigger.focus();
        }

        $document.on('pointerdown', handleOutsideClick);
        $document.on('keydown', handleEscape);
        scope.$on('$destroy', () => {
          $document.off('pointerdown', handleOutsideClick);
          $document.off('keydown', handleEscape);
        });
      },
    }),
  ]);
}
