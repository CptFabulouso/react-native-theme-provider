"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initThemeProvider = exports.createThemedUseStyleCreator = exports.createThemedStyleCreator = exports.createThemedUseStyleWithParams = exports.createThemedUseStyle = exports.createUseStyle = exports.createStyle = exports.createStyleCreator = exports.createThemedBaseStylesCreator = exports.createThemedDefaultCacheManager = exports.createThemedUseThemeDispatch = exports.createThemedUseTheme = void 0;
const React = __importStar(require("react"));
const ThemeContext_1 = require("./ThemeContext");
const hooks_1 = require("./hooks");
const stylesCache_1 = require("./stylesCache");
function createThemedUseTheme() {
    return function () {
        return (0, hooks_1.useTheme)();
    };
}
exports.createThemedUseTheme = createThemedUseTheme;
function createThemedUseThemeDispatch() {
    return function () {
        return (0, hooks_1.useThemeDispatch)();
    };
}
exports.createThemedUseThemeDispatch = createThemedUseThemeDispatch;
function createThemedDefaultCacheManager() {
    function themedCacheManager() {
        return (0, stylesCache_1.createDefaultCacheManager)();
    }
    return themedCacheManager();
}
exports.createThemedDefaultCacheManager = createThemedDefaultCacheManager;
function createThemedBaseStylesCreator() {
    return function (baseStylesCreator) {
        return baseStylesCreator;
    };
}
exports.createThemedBaseStylesCreator = createThemedBaseStylesCreator;
function createStyleCreator(styleCreator, styleCacheManager) {
    return styleCacheManager.onCacheStyleCreator(styleCreator);
}
exports.createStyleCreator = createStyleCreator;
function createStyle(fn) {
    return fn;
}
exports.createStyle = createStyle;
function createUseStyle(styleCreator) {
    return (params) => {
        return (0, hooks_1.useStyle)(styleCreator, params);
    };
}
exports.createUseStyle = createUseStyle;
function createThemedUseStyle() {
    return function (styleCreator) {
        return (0, hooks_1.useStyle)(styleCreator, undefined);
    };
}
exports.createThemedUseStyle = createThemedUseStyle;
function createThemedUseStyleWithParams() {
    return function (styleCreator, params) {
        return (0, hooks_1.useStyle)(styleCreator, params);
    };
}
exports.createThemedUseStyleWithParams = createThemedUseStyleWithParams;
function createThemedStyleCreator(styleCacheManager) {
    return function (styleCreator) {
        return createStyleCreator(styleCreator, styleCacheManager);
    };
}
exports.createThemedStyleCreator = createThemedStyleCreator;
function createThemedUseStyleCreator(styleCacheManager) {
    return function (styleCreator) {
        return createUseStyle(createStyleCreator(styleCreator, styleCacheManager));
    };
}
exports.createThemedUseStyleCreator = createThemedUseStyleCreator;
function initThemeProvider({ themes, initialTheme, onThemeChange, onThemeParamsChange, styleCacheManager = createThemedDefaultCacheManager(), baseStylesCreator, initialThemeParams, }) {
    const ThemedThemedProvider = ({ children, onThemeChange: propsOnThemeChange, onThemeParamsChange: propsOnThemeParamsChange, initialTheme: propsInitialTheme, baseStylesCreator: propsBaseStylesCreator, initialThemeParams: propsInitialThemeParams, }) => {
        const handleThemeChange = React.useCallback((nextThemeName) => {
            propsOnThemeChange && propsOnThemeChange(nextThemeName);
            onThemeChange && onThemeChange(nextThemeName);
        }, [propsOnThemeChange]);
        const handleThemeParamsChange = React.useCallback((nextParams) => {
            propsOnThemeParamsChange && propsOnThemeParamsChange(nextParams);
            onThemeParamsChange && onThemeParamsChange(nextParams);
        }, [propsOnThemeParamsChange]);
        return (<ThemeContext_1.ThemeProvider initialTheme={propsInitialTheme ?? initialTheme} themes={themes} onThemeChange={handleThemeChange} onThemeParamsChange={handleThemeParamsChange} baseStylesCreator={propsBaseStylesCreator ?? baseStylesCreator} initialThemeParams={propsInitialThemeParams ?? initialThemeParams}>
        {children}
      </ThemeContext_1.ThemeProvider>);
    };
    const ThemedProviderComponent = ThemeContext_1.ThemeProvider;
    return {
        ThemeProvider: ThemedThemedProvider,
        ThemedProviderComponent,
        createUseStyle: createThemedUseStyleCreator(styleCacheManager),
        createStyle: createThemedStyleCreator(styleCacheManager),
        useTheme: createThemedUseTheme(),
        useThemeDispatch: createThemedUseThemeDispatch(),
        useStyle: createThemedUseStyle(),
        useStyleWithParams: createThemedUseStyleWithParams(),
    };
}
exports.initThemeProvider = initThemeProvider;
//# sourceMappingURL=creators.js.map