export default function registerMoneyFilter(app) {
  app.filter('money', () => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return (amount) => formatter.format(amount / 100);
  });
}
