"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../constants/index");
function enthusiasm(state, action) {
    switch (action.type) {
        case index_1.INCREMENT_ENTHUSIASM:
            return __assign({}, state, { enthusiasmLevel: state.enthusiasmLevel + 1 });
        case index_1.DECREMENT_ENTHUSIASM:
            return __assign({}, state, { enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) });
        default:
            return state;
    }
}
exports.enthusiasm = enthusiasm;
