"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyGenerator = exports.StylesCache = void 0;
const createStylesCache = () => {
    const styles = {};
    return {
        addStyle: (key, style) => {
            styles[key] = style;
        },
        getStyle: (key) => {
            return styles[key];
        },
        resetAll: () => {
            Object.keys(styles).forEach(function (key) {
                delete styles[key];
            });
        },
    };
};
const createKeyGenerator = () => {
    let lastKey = 0;
    return {
        getNextKey: () => {
            lastKey += 1;
            return lastKey;
        },
    };
};
const StylesCache = createStylesCache();
exports.StylesCache = StylesCache;
const KeyGenerator = createKeyGenerator();
exports.KeyGenerator = KeyGenerator;
//# sourceMappingURL=stylesCache.js.map