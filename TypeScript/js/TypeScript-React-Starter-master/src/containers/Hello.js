"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hello_1 = __importDefault(require("../components/Hello"));
var actions = __importStar(require("../actions/"));
var react_redux_1 = require("react-redux");
function mapStateToProps(_a) {
    var enthusiasmLevel = _a.enthusiasmLevel, languageName = _a.languageName;
    return {
        enthusiasmLevel: enthusiasmLevel,
        name: languageName,
    };
}
exports.mapStateToProps = mapStateToProps;
function mapDispatchToProps(dispatch) {
    return {
        onIncrement: function () { return dispatch(actions.incrementEnthusiasm()); },
        onDecrement: function () { return dispatch(actions.decrementEnthusiasm()); },
    };
}
exports.mapDispatchToProps = mapDispatchToProps;
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Hello_1.default);
