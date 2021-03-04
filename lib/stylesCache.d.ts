import { NamedStyles, StyleObj } from './types';
declare const StylesCache: {
    addStyle: (key: string | number, style: NamedStyles<any> | NamedStyles<unknown>) => void;
    getStyle: (key: string | number) => NamedStyles<any> | NamedStyles<unknown> | undefined;
    resetAll: () => void;
};
declare const KeyGenerator: {
    getNextKey: () => number;
};
export { StylesCache, KeyGenerator };
