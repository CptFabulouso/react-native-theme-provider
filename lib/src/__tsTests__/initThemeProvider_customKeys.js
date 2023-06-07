"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomKeysApp = exports.DefaultKeysApp = void 0;
const react_1 = __importDefault(require("react"));
const creators_1 = require("../creators");
const common_1 = require("./common");
/* create globally available styles, see further how these can be accessed */
const baseStylesCreator = (0, creators_1.createThemedBaseStylesCreator)()((t) => ({
    page: {
        flex: 1,
        backgroundColor: t.blue,
    },
}));
/* Default keys */
const defaultKeysProps = (0, creators_1.initThemeProvider)({
    themes: common_1.themes,
    initialTheme: 'light',
    baseStylesCreator,
});
const defaultKeysThemedUseStyle = defaultKeysProps.createUseStyle((t) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: 'blue',
    },
}));
const DefaultKeysApp = () => {
    return (<defaultKeysProps.ThemeProvider themes={common_1.themes} initialTheme="light">
      <DefaultKeysTestComponent />
    </defaultKeysProps.ThemeProvider>);
};
exports.DefaultKeysApp = DefaultKeysApp;
const DefaultKeysTestComponent = () => {
    const { t } = defaultKeysProps.useTheme();
    const styles = defaultKeysThemedUseStyle();
    (0, common_1.checkStyleWithBS)(styles);
    if (t) {
        //
    }
    return null;
};
/* Custom keys */
const customKeysProps = (0, creators_1.initThemeProvider)({
    themes: common_1.themes,
    initialTheme: 'light',
    baseStylesCreator,
    baseStylesKey: 'customBS',
    themeKey: 'customT',
});
const customKeysThemedUseStyle = customKeysProps.createUseStyle((t) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: 'blue',
    },
}));
const CustomKeysApp = () => {
    return (<customKeysProps.ThemeProvider themes={common_1.themes} initialTheme="light">
      <CustomKeysTestComponent />
    </customKeysProps.ThemeProvider>);
};
exports.CustomKeysApp = CustomKeysApp;
const CustomKeysTestComponent = () => {
    const { customT } = customKeysProps.useTheme();
    const styles = customKeysThemedUseStyle();
    checkStyleWithCustomKeyBS(styles);
    if (customT) {
        //
    }
    return null;
};
const checkStyleWithCustomKeyBS = (style) => {
    return style;
};
//# sourceMappingURL=initThemeProvider_customKeys.js.map