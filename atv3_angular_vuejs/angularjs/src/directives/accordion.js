export default function registerAccordion(app) {
  app.directive('financeAccordion', () => ({
    restrict: 'E',
    scope: { items: '<' },
    template: `
      <div class="accordion">
        <div class="accordion-item" ng-repeat="item in items track by item.id">
          <h3 class="accordion-heading">
            <button type="button" class="accordion-trigger"
              ng-attr-id="{{ componentId }}-{{ item.id }}-trigger"
              ng-attr-aria-controls="{{ componentId }}-{{ item.id }}-panel"
              ng-attr-aria-expanded="{{ expandedId === item.id }}"
              ng-click="toggleItem(item.id)">
              {{ item.title }}
              <span aria-hidden="true">{{ expandedId === item.id ? '−' : '+' }}</span>
            </button>
          </h3>
          <div class="accordion-content" ng-class="{ 'is-open': expandedId === item.id }"
            role="region" ng-attr-id="{{ componentId }}-{{ item.id }}-panel"
            ng-attr-aria-labelledby="{{ componentId }}-{{ item.id }}-trigger"
            ng-attr-aria-hidden="{{ expandedId !== item.id }}">
            <div class="accordion-inner">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    `,
    link(scope) {
      scope.componentId = `accordion-${scope.$id}`;
      scope.expandedId = null;
      scope.toggleItem = (itemId) => {
        scope.expandedId = scope.expandedId === itemId ? null : itemId;
      };
    },
  }));
}
