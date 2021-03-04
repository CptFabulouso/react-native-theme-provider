import { NamedStyles, StyleObj } from './types';

const createStylesCache = <S extends NamedStyles<S> | NamedStyles<any>>() => {
  const styles: Record<string | number, StyleObj<S>> = {};

  return {
    addStyle: (key: string | number, style: StyleObj<S>) => {
      styles[key] = style;
    },
    getStyle: (key: string | number): StyleObj<S> | undefined => {
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
  let lastKey: number = 0;

  return {
    getNextKey: (): number => {
      lastKey += 1;
      return lastKey;
    },
  };
};

const StylesCache = createStylesCache();
const KeyGenerator = createKeyGenerator();

export { StylesCache, KeyGenerator };
