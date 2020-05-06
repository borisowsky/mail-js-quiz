function parallel(tasks = [], callback) {
  let checkInterval = null;
  const result = [];

  for (const i in tasks) {
    const task = tasks[i];

    if (task.length) {
      task((value) => result.splice(i, 0, value));
      continue;
    }

    result.splice(i, 0, task());
  }

  checkInterval = setInterval(() => {
    if (result.length === tasks.length) {
      clearInterval(checkInterval);

      return callback(result);
    }
  }, 0);
}

parallel(
  [
    function (resolve) {
      setTimeout(function () {
        resolve(10);
      }, 50);
    },
    function () {
      return 5;
    },
    function (resolve) {
      setTimeout(function () {
        resolve(0);
      }, 10);
    },
  ],
  function (results) {
    console.log(results); // [10, 5, 0]
  },
);
