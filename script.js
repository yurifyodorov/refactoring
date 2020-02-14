function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Счет для ${invoice.customer}\n`;
  const format = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);

    // Добавление бонусов
    volumeCredits += Math.max(perf.audience - 30, 0);

    // Дополнительный бонус за каждые 10 комедий
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // Вывод строки счета
    result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience} мест)\n`;
    totalAmount += thisAmount;
  }
  result += `Итого с вас ${format(totalAmount / 100)}\n`;
  result += `Вы заработали ${volumeCredits} бонусов\n`;
  return result;
}
