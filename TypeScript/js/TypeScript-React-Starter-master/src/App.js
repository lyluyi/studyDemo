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
require("./App.css");
var Hello_1 = __importDefault(require("./components/Hello"));
var logo = require('./logo.svg');
function App() {
    return (<div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Hello_1.default name="TypeScript"/>
    </div>);
}
exports.default = App;
