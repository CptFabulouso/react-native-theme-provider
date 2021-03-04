"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCreateStyle = exports.withUseStyle = void 0;
const hooks_1 = require("./hooks");
const react_1 = __importDefault(require("react"));
function withUseStyle(WrappedComponent, useStyleParam, mapPropsToParams) {
    return (props) => {
        const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
        const styles = params ? useStyleParam(params) : useStyleParam();
        return <WrappedComponent {...props} styles={styles}/>;
    };
}
exports.withUseStyle = withUseStyle;
function withCreateStyle(WrappedComponent, styleCreator, mapPropsToParams, key) {
    return (props) => {
        const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
        const styles = params
            ? hooks_1.useStyle(styleCreator, params, key)
            : key
                ? hooks_1.useCachedStyle(styleCreator, key)
                : hooks_1.useStyle(styleCreator);
        return <WrappedComponent {...props} styles={styles}/>;
    };
}
exports.withCreateStyle = withCreateStyle;
//# sourceMappingURL=wrappers.js.map