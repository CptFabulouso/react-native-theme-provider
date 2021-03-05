"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCreateStyle = exports.withUseStyle = void 0;
const React = __importStar(require("react"));
const hooks_1 = require("./hooks");
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