// Реализовать класс Futures

function Futures(executor) {
  this._executor = executor;

  this._onSuccess = function (data) {
    this._onSuccessFunction(data);
  };

  this._onError = function (data) {
    if (typeof this._onErrorFunction === 'function') {
      this._onErrorFunction(data);
    }
  };
}

Futures.prototype.then = function (onSuccess, onError) {
  this._onSuccessFunction = onSuccess;
  this._onErrorFunction = onError;

  this._executor(this._onSuccess.bind(this), this._onError.bind(this));
};

// Тест #1
var foo = new Futures(function (resolve, reject) {
  resolve(123);
});

foo.then(
  function (val) {
    console.log('foo.resolved:', val === 123);
  },
  function () {
    console.log('foo.resolved: fail');
  },
);

// Тест #2
var bar = new Futures(function (resolve, reject) {
  setTimeout(resolve.bind(null, 'fail'), 300);
  setTimeout(reject.bind(null, 'ok'), 200);
});

bar.then(
  function () {
    console.log('bar.rejected: fail');
  },
  function (val) {
    console.log('bar.rejected:', val === 'ok');
  },
);
