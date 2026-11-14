export default function registerTabs(app) {
  app.directive('financeTabs', () => ({
    restrict: 'E',
    scope: {},
    transclude: true,
    template: `
      <div class="tabs">
        <div class="tab-list" role="tablist" aria-label="Informações financeiras">
          <button type="button" class="tab-button" role="tab" ng-repeat="tab in tabs track by tab.tabId"
            ng-attr-id="{{ tab.tabId }}-tab" ng-attr-aria-controls="{{ tab.tabId }}-panel"
            ng-attr-aria-selected="{{ tab.active }}" ng-attr-tabindex="{{ tab.active ? 0 : -1 }}"
            ng-class="{ 'is-active': tab.active }" ng-click="selectTab(tab)"
            ng-keydown="handleKeyDown($event, $index)">{{ tab.title }}</button>
        </div>
        <div class="tab-content" ng-transclude></div>
      </div>
    `,
    controller: [
      '$scope',
      '$element',
      function TabsController($scope, $element) {
        $scope.tabs = [];

        $scope.selectTab = (selectedTab) => {
          $scope.tabs.forEach((tab) => {
            tab.active = tab === selectedTab;
          });
        };

        this.addTab = (tab) => {
          tab.active = $scope.tabs.length === 0;
          $scope.tabs.push(tab);
        };

        this.removeTab = (tab) => {
          $scope.tabs = $scope.tabs.filter((item) => item !== tab);
          if (tab.active && $scope.tabs.length > 0)
            $scope.selectTab($scope.tabs[0]);
        };

        $scope.handleKeyDown = (event, index) => {
          let nextIndex;
          if (event.key === 'ArrowRight')
            nextIndex = (index + 1) % $scope.tabs.length;
          else if (event.key === 'ArrowLeft')
            nextIndex = (index - 1 + $scope.tabs.length) % $scope.tabs.length;
          else if (event.key === 'Home') nextIndex = 0;
          else if (event.key === 'End') nextIndex = $scope.tabs.length - 1;
          else return;

          event.preventDefault();
          $scope.selectTab($scope.tabs[nextIndex]);
          $element[0].querySelectorAll('.tab-list > button')[nextIndex].focus();
        };
      },
    ],
  }));

  app.directive('financeTab', () => ({
    restrict: 'E',
    require: '^financeTabs',
    scope: { title: '@', tabId: '@' },
    transclude: true,
    template: `
      <section class="tab-panel" role="tabpanel" tabindex="0" ng-show="active"
        ng-attr-id="{{ tabId }}-panel" ng-attr-aria-labelledby="{{ tabId }}-tab">
        <div ng-transclude></div>
      </section>
    `,
    link(scope, element, attributes, tabsController) {
      tabsController.addTab(scope);
      scope.$on('$destroy', () => tabsController.removeTab(scope));
    },
  }));
}
