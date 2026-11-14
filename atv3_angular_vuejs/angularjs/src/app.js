import 'angular/angular';
import registerFinanceData from './services/financeData.js';
import registerFinanceController from './controllers/financeController.js';
import registerMoneyFilter from './filters/money.js';

const dataModule = window.angular.module('finance.data', []);
registerFinanceData(dataModule);
registerMoneyFilter(dataModule);

const app = window.angular.module('financeApp', [dataModule.name]);
registerFinanceController(app);

export default app;
