import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'bootstrap/js/dist/carousel';
import Collapse from 'bootstrap/js/dist/collapse';
import Modal from 'bootstrap/js/dist/modal';
import './styles.css';

new Carousel(document.querySelector('#finance-carousel'), { interval: false });

const navigation = document.querySelector('#navigation');
navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navigation.classList.contains('show')) {
      Collapse.getOrCreateInstance(navigation, { toggle: false }).hide();
    }
  });
});

const transactionForm = document.querySelector('#transaction-form');
transactionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!transactionForm.reportValidity()) return;
  document.querySelector('#form-status').textContent =
    'Lançamento validado. Esta demonstração não altera a tabela.';
});

document.querySelector('#confirm-budget').addEventListener('click', () => {
  const budgetModal = document.querySelector('#budget-modal');
  budgetModal.addEventListener('hidden.bs.modal', () => {
    document.querySelector('#budget-status').textContent =
      'Revisão do orçamento confirmada.';
  }, { once: true });
  Modal.getInstance(budgetModal).hide();
});
