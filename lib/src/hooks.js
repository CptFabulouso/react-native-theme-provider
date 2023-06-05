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
exports.useThemeDispatch = exports.useThemeBaseStyles = exports.useTheme = exports.useStyle = void 0;
const React = __importStar(require("react"));
const ThemeContext_1 = require("./ThemeContext");
function useStyle(styleCreator, params) {
    const { baseStyles, baseStylesKey } = useThemeBaseStyles();
    const { t } = useTheme();
    const styles = React.useMemo(() => {
        const createdStyles = styleCreator(t, params);
        if (baseStyles) {
            return {
                ...createdStyles,
                [baseStylesKey]: baseStyles,
            };
        }
        return createdStyles;
    }, [styleCreator, t, params, baseStylesKey, baseStyles]);
    return styles;
}
exports.useStyle = useStyle;
function useTheme() {
    const context = React.useContext(ThemeContext_1.ThemeContext);
    if (context === null) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
exports.useTheme = useTheme;
function useThemeBaseStyles() {
    const context = React.useContext(ThemeContext_1.ThemeBaseStylesContext);
    if (context === null) {
        throw new Error('useThemeBaseStyles must be used within a ThemeProvider');
    }
    return context;
}
exports.useThemeBaseStyles = useThemeBaseStyles;
function useThemeDispatch() {
    const context = React.useContext(ThemeContext_1.ThemeDispatchContext);
    if (context === null) {
        throw new Error('useThemeDispatch must be used within a ThemeProvider');
    }
    return context;
}
exports.useThemeDispatch = useThemeDispatch;
//# sourceMappingURL=hooks.js.map