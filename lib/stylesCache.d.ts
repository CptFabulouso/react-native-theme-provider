import { Styles, Themes, StyleCacheManager } from './types';
export declare function createDefaultCacheManager<T extends Themes, S extends Styles<S>, P>(): StyleCacheManager<T, S, P>;
export declare const DefaultCacheManager: StyleCacheManager<any, any, any>;
