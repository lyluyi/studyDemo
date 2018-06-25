exports.sum = function (arr) {
    var result = 0;
    var length = arr.length
    for (var i = 0; i < length; i++) {
        result += arr[i]
    }
    return result
}      
exports.avg = function (arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
        result += arr[i]
    }
    return result / arr.length
}