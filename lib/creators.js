"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUseStyleCreator = exports.createStyleCreator = exports.createUseStyle = exports.createStyle = exports.createUseThemeDispatch = exports.createUseTheme = void 0;
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
function createUseStyle(styleCreator) {
    return () => hooks_1.useStyle(styleCreator);
}
exports.createUseStyle = createUseStyle;
function createStyleCreator() {
    return function (fn) {
        return createStyle(fn);
    };
}
exports.createStyleCreator = createStyleCreator;
function createUseStyleCreator() {
    return function (fn) {
        return createUseStyle(createStyle(fn));
    };
}
exports.createUseStyleCreator = createUseStyleCreator;
//# sourceMappingURL=creators.js.map