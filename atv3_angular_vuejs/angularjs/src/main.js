import app from './app.js';
import template from './finance.html?raw';
import './styles.css';

const root = document.getElementById('app');
root.innerHTML = template;
window.angular.bootstrap(root, [app.name], { strictDi: true });
