import { Styles, StyleObj, Themes, StyleCacheManager } from './types';

const createKeyGenerator = () => {
  let lastKey: number = 0;

  return {
    getNextKey: (): number => {
      lastKey += 1;
      return lastKey;
    },
  };
};

const KeyGenerator = createKeyGenerator();

const createStylesCache = <S extends Styles<S>>() => {
  const styles: Record<string | number, StyleObj<S>> = {};

  return {
    generateId: () => KeyGenerator.getNextKey(),
    addStyle: (key: string | number, style: StyleObj<S>, params: any) => {
      if (params) {
        return;
      }
      styles[key] = style;
    },
    getStyle: (key: string | number, _params: any): StyleObj<S> | undefined => {
      return styles[key];
    },
    resetAll: () => {
      Object.keys(styles).forEach(function (key) {
        delete styles[key];
      });
    },
  };
};
const DefaultStylesCache = createStylesCache<any>();

export function createDefaultCacheManager<
  T extends Themes,
  S extends Styles<S>,
  P,
>(): StyleCacheManager<T, S, P> {
  return {
    /*
      Clearing the cache on mount fixes duplicates in cache during development with enabled fast refresh.
      This should not affect production app anyhow, since it should be mounted only once
    */
    onProviderMount: () => DefaultStylesCache.resetAll(),
    onThemeChange: () => DefaultStylesCache.resetAll(),
    onThemeParamsChange: () => DefaultStylesCache.resetAll(),
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

export const DefaultCacheManager = createDefaultCacheManager<any, any, any>();
