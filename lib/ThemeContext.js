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
exports.ThemeProvider = exports.ThemeDispatchContext = exports.ThemeContext = void 0;
const React = __importStar(require("react"));
exports.ThemeContext = React.createContext(null);
exports.ThemeDispatchContext = React.createContext(null);
function ThemeProvider({ children, initialTheme, onThemeChange, themes, }) {
    const [themeName, setThemeName] = React.useState(initialTheme);
    const changeTheme = React.useCallback((t) => {
        onThemeChange && onThemeChange(t);
        setThemeName(t);
    }, [onThemeChange]);
    return (<exports.ThemeContext.Provider value={{ selectedTheme: themeName, themes, t: themes[themeName] }}>
      <exports.ThemeDispatchContext.Provider value={{ setTheme: changeTheme }}>
        {children}
      </exports.ThemeDispatchContext.Provider>
    </exports.ThemeContext.Provider>);
}
exports.ThemeProvider = ThemeProvider;
//# sourceMappingURL=ThemeContext.js.map