"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStylesWithProps = exports.createThemedUseStyleCreator = exports.createThemedStyleCreator = exports.createUseStyle = exports.createStyle = exports.createUseThemeDispatch = exports.createUseTheme = void 0;
const hooks_1 = require("./hooks");
const stylesCache_1 = require("./stylesCache");
function createUseTheme() {
    return function () {
        return (0, hooks_1.useTheme)();
    };
}
exports.createUseTheme = createUseTheme;
function createUseThemeDispatch() {
    return function () {
        return (0, hooks_1.useThemeDispatch)();
    };
}
exports.createUseThemeDispatch = createUseThemeDispatch;
function createStyle(fn) {
    return fn;
}
exports.createStyle = createStyle;
function createUseStyle(styleCreator) {
    const key = stylesCache_1.KeyGenerator.getNextKey();
    return (params) => {
        if (params) {
            return (0, hooks_1.useStyle)(styleCreator, params);
        }
        return (0, hooks_1.useCachedStyle)(styleCreator, key);
    };
}
exports.createUseStyle = createUseStyle;
function createThemedStyleCreator() {
    return function (styleCreator) {
        return createStyle(styleCreator);
    };
}
exports.createThemedStyleCreator = createThemedStyleCreator;
function createThemedUseStyleCreator() {
    return function (styleCreator) {
        return createUseStyle(styleCreator);
    };
}
exports.createThemedUseStyleCreator = createThemedUseStyleCreator;
function createStylesWithProps(fn) {
    return function (props) {
        return fn(props);
    };
}
exports.createStylesWithProps = createStylesWithProps;
//# sourceMappingURL=creators.js.map