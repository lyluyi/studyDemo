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
var enzyme = __importStar(require("enzyme"));
var Hello_1 = __importDefault(require("./Hello"));
it('renders the correct text when no enthusiasm level is given', function () {
    var hello = enzyme.shallow(<Hello_1.default name="Daniel"/>);
    expect(hello.find('.greeting').text()).toEqual('Hello Daniel!');
});
it('renders the correct text with an explicit enthusiasm of 1', function () {
    var hello = enzyme.shallow(<Hello_1.default name="Daniel" enthusiasmLevel={1}/>);
    expect(hello.find('.greeting').text()).toEqual('Hello Daniel!');
});
it('renders the correct text with an explicit enthusiasm level of 5', function () {
    var hello = enzyme.shallow(<Hello_1.default name="Daniel" enthusiasmLevel={5}/>);
    expect(hello.find('.greeting').text()).toEqual('Hello Daniel!!!!!');
});
it('throws when the enthusiasm level is 0', function () {
    expect(function () {
        enzyme.shallow(<Hello_1.default name="Daniel" enthusiasmLevel={0}/>);
    }).toThrow();
});
it('throws when the enthusiasm level is negative', function () {
    expect(function () {
        enzyme.shallow(<Hello_1.default name="Daniel" enthusiasmLevel={-1}/>);
    }).toThrow();
});
