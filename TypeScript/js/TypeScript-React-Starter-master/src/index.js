"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var Hello_1 = __importDefault(require("./containers/Hello"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var index_1 = require("./reducers/index");
require("./index.css");
var store = redux_1.createStore(index_1.enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});
ReactDOM.render(<react_redux_1.Provider store={store}>
    <Hello_1.default />
  </react_redux_1.Provider>, document.getElementById('root'));
