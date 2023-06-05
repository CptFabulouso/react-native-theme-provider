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
exports.ThemeProvider = exports.ThemeDispatchContext = exports.ThemeBaseStylesContext = exports.ThemeContext = void 0;
const React = __importStar(require("react"));
const creators_1 = require("./creators");
exports.ThemeContext = React.createContext(null);
exports.ThemeBaseStylesContext = React.createContext(null);
exports.ThemeDispatchContext = React.createContext(null);
function ThemeProvider({ children, initialTheme, onThemeChange, onThemeParamsChange, themes, baseStylesCreator, initialThemeParams, styleCacheManager = (0, creators_1.createThemedDefaultCacheManager)(), baseStylesKey = 'bs', }) {
    const [themeName, setThemeName] = React.useState(initialTheme);
    const [themeParams, setThemeParams] = React.useState(initialThemeParams);
    React.useEffect(() => {
        styleCacheManager.onProviderMount && styleCacheManager.onProviderMount();
    }, [styleCacheManager]);
    const t = React.useMemo(() => typeof themes === 'function'
        ? themes(themeParams)[themeName]
        : themes[themeName], [themes, themeName, themeParams]);
    const baseStyles = React.useMemo(() => (baseStylesCreator ? baseStylesCreator(t) : null), [baseStylesCreator, t]);
    const changeTheme = React.useCallback((nextTheme) => {
        onThemeChange && onThemeChange(nextTheme);
        setThemeName(nextTheme);
        styleCacheManager.onThemeChange(nextTheme);
    }, [onThemeChange, styleCacheManager]);
    const changeThemeParams = React.useCallback((nextParams) => {
        onThemeParamsChange && onThemeParamsChange(nextParams);
        setThemeParams(nextParams);
    }, [onThemeParamsChange]);
    return (<exports.ThemeContext.Provider value={{ selectedTheme: themeName, themes, t, themeParams }}>
      <exports.ThemeBaseStylesContext.Provider value={{ baseStyles, baseStylesKey: baseStylesKey }}>
        <exports.ThemeDispatchContext.Provider value={{ setTheme: changeTheme, setThemeParams: changeThemeParams }}>
          {children}
        </exports.ThemeDispatchContext.Provider>
      </exports.ThemeBaseStylesContext.Provider>
    </exports.ThemeContext.Provider>);
}
exports.ThemeProvider = ThemeProvider;
//# sourceMappingURL=ThemeContext.js.map