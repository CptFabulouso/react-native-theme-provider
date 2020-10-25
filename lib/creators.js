"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStyleCreator = exports.createStyle = exports.createUseThemeDispatch = exports.createUseTheme = void 0;
const hooks_1 = require("./hooks");
function createUseTheme() {
    return function () {
        return hooks_1.useTheme();
    };
}
exports.createUseTheme = createUseTheme;
function createUseThemeDispatch() {
    return function () {
        return hooks_1.useThemeDispatch();
    };
}
exports.createUseThemeDispatch = createUseThemeDispatch;
function createStyle(fn) {
    return fn;
}
exports.createStyle = createStyle;
function createStyleCreator() {
    return function (fn) {
        return createStyle(fn);
    };
}
exports.createStyleCreator = createStyleCreator;
//# sourceMappingURL=creators.js.map