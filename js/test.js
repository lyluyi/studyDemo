

var  logger = function (store) {
  return function () {
    return function () {
      console.log(store)
    }()
  }()
}

logger(123)