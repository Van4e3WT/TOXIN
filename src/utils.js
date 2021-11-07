function num2str(i, textForms) {
  const [one, two, many] = textForms;
  const n = Math.abs(i) % 100;
  const n1 = n % 10;

  const isMany = n > 10 && n < 20;
  const isTwo = n1 > 1 && n1 < 5;
  const isOne = n1 === 1;

  if (isMany) return many;
  if (isTwo) return two;
  if (isOne) return one;

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
