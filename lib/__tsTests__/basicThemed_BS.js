"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const ThemeContext_1 = require("../ThemeContext");
const creators_1 = require("../creators");
const common_1 = require("./common");
const cacheManager = (0, creators_1.createThemedDefaultCacheManager)(); // or create your own cacheManager
/* create globally available styles, see further how these can be accessed */
const baseStylesCreator = (0, creators_1.createThemedBaseStylesCreator)()((t) => ({
    page: {
        flex: 1,
        backgroundColor: t.blue,
    },
}));
const themedUseStyle = (0, creators_1.createThemedUseStyle)();
const themedUseStyleParams = (0, creators_1.createThemedUseStyleWithParams)();
const themedCreateStyle = (0, creators_1.createThemedStyleCreator)(cacheManager);
const themedCreateUseStyle = (0, creators_1.createThemedUseStyleCreator)(cacheManager);
/* theme style creators */
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
/* theme use style creators */
const themedUseStyleCreator = themedCreateUseStyle((t) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: 'blue',
    },
}));
const themedUseStyleCreatorParams = themedCreateUseStyle((t, { val }) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: val,
    },
}));
const App = () => {
    return (<ThemeContext_1.ThemeProvider themes={common_1.themes} initialTheme="light">
      <ThemedStyles />
      <ThemedUseStyles />
    </ThemeContext_1.ThemeProvider>);
};
exports.App = App;
const ThemedStyles = () => {
    const styles = themedUseStyle(themedStyleCreator);
    const stylesParams = themedUseStyleParams(themedStyleCreatorParams, common_1.styleParams);
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stylesParamsFail = themedUseStyle(themedStyleCreatorParams);
    (0, common_1.checkStyleWithBS)(styles);
    (0, common_1.checkStyleWithBS)(stylesParams);
    return null;
};
const ThemedUseStyles = () => {
    const styles = themedUseStyleCreator();
    const stylesParams = themedUseStyleCreatorParams(common_1.styleParams);
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stylesParamsFail = themedUseStyleCreatorParams();
    (0, common_1.checkStyleWithBS)(styles);
    (0, common_1.checkStyleWithBS)(stylesParams);
    return null;
};
//# sourceMappingURL=basicThemed_BS.js.map