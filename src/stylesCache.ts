import { Styles, StyleObj } from './types';

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

export { createStylesCache, createKeyGenerator };
