/**
 * Вывод чисел в колонках
 * @param   {Number}  max    от 0 до max
 * @param   {Number}  cols   количество колонок
 * @returns {String}
 */
const printNumbers = function (max, cols) {
  const numbers = [...Array(max)].map((value, index) => index);
  const amountOfNumbersInOneColumn = Math.ceil(max / cols);

  const columns = splitIntoChunks(numbers, amountOfNumbersInOneColumn);
  let grid = '';

  for (let i = 0; i < amountOfNumbersInOneColumn; i++) {
    const row = [];

    for (const column of columns) {
      if (column[i] !== undefined) {
        row.push(column[i]);
      }
    }

    grid += row.join(' ') + '\n';
  }

  return grid.trim();
};

const splitIntoChunks = function (array, size) {
  const results = [];

  while (array.length) {
    results.push(array.splice(0, size));
  }

  return results;
};

console.log(printNumbers(12, 3));
/*
Пример работы:
0 4 8
1 5 9
2 6 10
3 7 11
*/
