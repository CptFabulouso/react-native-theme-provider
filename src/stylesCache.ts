import { NamedStyles, StyleObj } from './types';

const createStylesCache = <S extends NamedStyles<S> | NamedStyles<any>>() => {
  const styles: Record<string | number, StyleObj<S>> = {};

  return {
    addStyle: (key: string | number, style: StyleObj<S>) => {
      console.log('addStyle', key);
      styles[key] = style;
    },
    getStyle: (key: string | number): StyleObj<S> | undefined => {
      console.log('getStyle', key);
      return styles[key];
    },
    resetAll: () => {
      Object.keys(styles).forEach(function (key) {
        console.log('resetAll', key);
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
