// Параллельные вычисления
function parallel(functions, callback) {
  const results = {};
  // Количество функций в очереди
  const toResolveAmount = functions.length;
  // Количество разрешённых
  let toResolveCompleted = 0;

  const resolve = (index) => {
    return function resolver(result) {
      // setTimeout чтобы тяжеловестные операции выполнились асинхронно (параллельно!)
      setTimeout(() => {
        const resolved = true;

        while (true) {
          if (typeof result !== 'undefined') {
            // Записываем результат в очередь
            results[index] = result;
            toResolveCompleted++;

            if (toResolveCompleted === toResolveAmount) {
              callback(prepareResult(results));
            }

            break;
          }
        }
      }, 0);
    };
  };

  for (const i in functions) {
    // Если функция асинхронная, то она вернёт undefined
    const immidiateResult = functions[i](resolve(i));

    if (typeof immidiateResult !== 'undefined') {
      results[i] = immidiateResult;
      toResolveCompleted++;
    }
  }
}

function prepareResult(resultsObj) {
  const results = [];

  for (const result in resultsObj) {
    results.push(resultsObj[result]);
  }

  return results;
}

parallel(
  [
    function (resolve) {
      setTimeout(function () {
        resolve(10);
      }, 1000);
    },
    function () {
      return 5;
    },
    function (resolve) {
      setTimeout(function () {
        resolve(0);
      }, 2000);
    },
  ],
  function (results) {
    console.log(results); // [10, 5, 0]
  },
);
