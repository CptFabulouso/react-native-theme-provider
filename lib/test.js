"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const react_native_1 = require("react-native");
const react_1 = __importDefault(require("react"));
const Test = (props) => {
    return (<react_native_1.View style={[styles.container, props.style]}>
			<react_native_1.Text>Test Component</react_native_1.Text>
		</react_native_1.View>);
};
exports.Test = Test;
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});
//# sourceMappingURL=test.js.map