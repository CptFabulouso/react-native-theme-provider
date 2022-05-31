"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCacheManager = exports.createDefaultCacheManager = void 0;
const createKeyGenerator = () => {
    let lastKey = 0;
    return {
        getNextKey: () => {
            lastKey += 1;
            return lastKey;
        },
    };
};
const KeyGenerator = createKeyGenerator();
const createStylesCache = () => {
    const styles = {};
    return {
        generateId: () => KeyGenerator.getNextKey(),
        addStyle: (key, style, params) => {
            if (params) {
                return;
            }
            styles[key] = style;
        },
        getStyle: (key, _params) => {
            return styles[key];
        },
        resetAll: () => {
            Object.keys(styles).forEach(function (key) {
                delete styles[key];
            });
        },
    };
};
const DefaultStylesCache = createStylesCache();
function createDefaultCacheManager() {
    return {
        /*
          Clearing the cache on mount fixes duplicates in cache during development with enabled fast refresh.
          This should not affect production app anyhow, since it should be mounted only once
        */
        onProviderMount: () => DefaultStylesCache.resetAll(),
        onThemeChange: () => DefaultStylesCache.resetAll(),
        onCacheStyleCreator: (styleCreator) => {
            // generate id for each style creator
            const id = DefaultStylesCache.generateId();
            return (t, params) => {
                const cachedStyle = DefaultStylesCache.getStyle(id, params);
                if (cachedStyle) {
                    return cachedStyle;
                }
                const style = styleCreator(t, params);
                DefaultStylesCache.addStyle(id, style, params);
                return style;
            };
        },
    };
}
exports.createDefaultCacheManager = createDefaultCacheManager;
exports.DefaultCacheManager = createDefaultCacheManager();
//# sourceMappingURL=stylesCache.js.map