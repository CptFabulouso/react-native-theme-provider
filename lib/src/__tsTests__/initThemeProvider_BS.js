"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const creators_1 = require("../creators");
const hooks_1 = require("../hooks");
const common_1 = require("./common");
/* create globally available styles, see further how these can be accessed */
const baseStylesCreator = (0, creators_1.createThemedBaseStylesCreator)()((t) => ({
    page: {
        flex: 1,
        backgroundColor: t.blue,
    },
}));
const { createStyle: themedCreateStyle, createUseStyle: themedCreateUseStyle, ThemeProvider, useStyle: useStyleThemed, useStyleWithParams: useStyleThemedWithParams, } = (0, creators_1.initThemeProvider)({ themes: common_1.themes, initialTheme: 'light', baseStylesCreator });
/* style creators */
const themedStyleCreator = themedCreateStyle((t) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: 'blue',
    },
}));
const themedStyleCreatorParams = themedCreateStyle((t, { val }) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: val,
    },
}));
/* use style creators */
const themedUseStyle = themedCreateUseStyle((t) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: 'blue',
    },
}));
const themedUseStyleParams = themedCreateUseStyle((t, { val }) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: val,
    },
}));
const App = () => {
    return (<ThemeProvider themes={common_1.themes} initialTheme="light">
      <ThemedStyles />
      <ThemedUseStyles />
    </ThemeProvider>);
};
exports.App = App;
const ThemedStyles = () => {
    const styles = useStyleThemed(themedStyleCreator);
    const stylesParams = useStyleThemedWithParams(themedStyleCreatorParams, common_1.styleParams);
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stylesParamsFail = (0, hooks_1.useStyle)(themedStyleCreatorParams);
    (0, common_1.checkStyleWithBS)(styles);
    (0, common_1.checkStyleWithBS)(stylesParams);
    return null;
};
const ThemedUseStyles = () => {
    const styles = themedUseStyle();
    const stylesParams = themedUseStyleParams(common_1.styleParams);
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stylesParamsFail = themedUseStyleParams();
    (0, common_1.checkStyleWithBS)(styles);
    (0, common_1.checkStyleWithBS)(stylesParams);
    return null;
};
//# sourceMappingURL=initThemeProvider_BS.js.map