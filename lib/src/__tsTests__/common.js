"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleParams = exports.themes = exports.checkStyleWithBS = exports.checkStyle = void 0;
const checkStyle = (style) => {
    return style;
};
exports.checkStyle = checkStyle;
const checkStyleWithBS = (style) => {
    return style;
};
exports.checkStyleWithBS = checkStyleWithBS;
exports.themes = {
    light: {
        blue: 'blue',
    },
};
exports.styleParams = {
    val: '#aaaaaa',
};
/* CHECKS */
const checkStyleWrong1 = {
    container: {
        backgroundColor: 'blue',
    },
};
const checkStyleWrong2 = {
    container: {
        backgroundColor: 'blue',
        borderBottomColor: 'blue',
        flex: 1,
    },
};
const checkStyleCorrect = {
    container: {
        backgroundColor: 'blue',
        borderBottomColor: 'blue',
    },
};
// @ts-expect-error
(0, exports.checkStyle)(checkStyleWrong1);
// @ts-expect-error
(0, exports.checkStyle)(checkStyleWrong2);
(0, exports.checkStyle)(checkStyleCorrect);
const checkStyleWithBSWrong1 = {
    container: {
        backgroundColor: 'blue',
        borderBottomColor: 'blue',
    },
    bs: {
        page: {
            flex: 1,
        },
    },
};
const checkStyleWithBSWrong2 = {
    container: {
        backgroundColor: 'blue',
        borderBottomColor: 'blue',
    },
    bs: {
        page: {
            flex: 1,
            backgroundColor: 'blue',
            borderBottomColor: 'blue',
        },
    },
};
const checkStyleWithBSWrong3 = {
    container: {
        backgroundColor: 'blue',
    },
    bs: {
        page: {
            flex: 1,
            backgroundColor: 'blue',
        },
    },
};
const checkStyleWithBSWrong4 = {
    container: {
        backgroundColor: 'blue',
        borderBottomColor: 'blue',
        flex: 1,
    },
    bs: {
        page: {
            flex: 1,
            backgroundColor: 'blue',
        },
    },
};
const checkStyleWithBSCorrect = {
    container: {
        backgroundColor: 'blue',
        borderBottomColor: 'blue',
    },
    bs: {
        page: {
            flex: 1,
            backgroundColor: 'blue',
        },
    },
};
// @ts-expect-error
(0, exports.checkStyleWithBS)(checkStyleWithBSWrong1);
// @ts-expect-error
(0, exports.checkStyleWithBS)(checkStyleWithBSWrong2);
// @ts-expect-error
(0, exports.checkStyleWithBS)(checkStyleWithBSWrong3);
// @ts-expect-error
(0, exports.checkStyleWithBS)(checkStyleWithBSWrong4);
(0, exports.checkStyleWithBS)(checkStyleWithBSCorrect);
//# sourceMappingURL=common.js.map