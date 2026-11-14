import 'angular/angular';
import registerFinanceData from './services/financeData.js';
import registerFinanceController from './controllers/financeController.js';
import registerMoneyFilter from './filters/money.js';
import registerTabs from './directives/tabs.js';

const dataModule = window.angular.module('finance.data', []);
registerFinanceData(dataModule);
registerMoneyFilter(dataModule);

const componentsModule = window.angular.module('finance.components', []);
registerTabs(componentsModule);

const app = window.angular.module('financeApp', [
  dataModule.name,
  componentsModule.name,
]);
registerFinanceController(app);

export default app;
