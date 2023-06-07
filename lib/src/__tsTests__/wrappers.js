"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.ClassCompWithCreateStyleParams = exports.ClassCompWithCreateStyleParamsMissing = exports.ClassCompWithCreateStyle = exports.ClassCompCreateStyle = exports.ClassCompWithUseStyleParams = exports.ClassCompWithUseStyleParamsMissing = exports.ClassCompWithUseStyle = exports.ClassCompUseStyle = void 0;
const React = __importStar(require("react"));
const creators_1 = require("../creators");
const wrappers_1 = require("../wrappers");
const common_1 = require("./common");
/* style creators */
const styleCreator = (0, creators_1.createStyle)((t) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: 'blue',
    },
}));
const styleCreatorParams = (0, creators_1.createStyle)((t, { val }) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: val,
    },
}));
/* use style creators */
const useStyleTest = (0, creators_1.createUseStyle)((t) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: 'blue',
    },
}));
const useStyleTestParams = (0, creators_1.createUseStyle)((t, { val }) => ({
    container: {
        backgroundColor: t.blue,
        borderBottomColor: val,
    },
}));
class ClassCompUseStyle extends React.Component {
    render() {
        const { styles } = this.props;
        (0, common_1.checkStyle)(styles);
        return null;
    }
}
exports.ClassCompUseStyle = ClassCompUseStyle;
exports.ClassCompWithUseStyle = (0, wrappers_1.withUseStyle)(ClassCompUseStyle, useStyleTest);
exports.ClassCompWithUseStyleParamsMissing = (0, wrappers_1.withUseStyle)(ClassCompUseStyle, 
// @ts-expect-error
useStyleTestParams);
exports.ClassCompWithUseStyleParams = (0, wrappers_1.withUseStyle)(ClassCompUseStyle, useStyleTestParams, (props) => ({
    val: props.val,
}));
class ClassCompCreateStyle extends React.Component {
    render() {
        const { styles } = this.props;
        (0, common_1.checkStyle)(styles);
        return null;
    }
}
exports.ClassCompCreateStyle = ClassCompCreateStyle;
exports.ClassCompWithCreateStyle = (0, wrappers_1.withCreateStyle)(ClassCompCreateStyle, styleCreator);
exports.ClassCompWithCreateStyleParamsMissing = (0, wrappers_1.withCreateStyle)(ClassCompCreateStyle, 
// @ts-expect-error
styleCreatorParams);
exports.ClassCompWithCreateStyleParams = (0, wrappers_1.withCreateStyle)(ClassCompCreateStyle, styleCreatorParams, (props) => ({
    val: props.val,
}));
//# sourceMappingURL=wrappers.js.map