"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThemedUseStyleCreator = exports.createThemedStyleCreator = exports.createUseStyle = exports.createStyle = exports.createUseThemeDispatch = exports.createUseTheme = void 0;
const stylesCache_1 = require("./stylesCache");
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
    const key = stylesCache_1.KeyGenerator.getNextKey();
    return (params) => {
        if (params) {
            return hooks_1.useStyle(styleCreator, params);
        }
        return hooks_1.useCachedStyle(styleCreator, key);
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
//# sourceMappingURL=creators.js.map