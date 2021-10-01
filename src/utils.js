function num2str(i, textForms) {
  const [one, two, many] = textForms;
  const n = Math.abs(i) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return many;
  if (n1 > 1 && n1 < 5) return two;
  if (n1 === 1) return one;

  return many;
}

function getGroupSum(items) {
  const values = items.map((item) => Number(item.root.dataset.value));
  return values.reduce((sum, value) => sum + value);
}

export {
  num2str,
  getGroupSum,
};
