export type ValidateShape<T, Shape> = T extends Shape ? Exclude<keyof T, keyof Shape> extends never ? T : never : never;
type StyleWithoutParams = {
    container: {
        backgroundColor: string;
        borderBottomColor: string;
    };
};
type StyleWithParams = {
    container: {
        backgroundColor: string;
        borderBottomColor: string;
    };
    bs: {
        page: {
            flex: number;
            backgroundColor: string;
        };
    };
};
export declare const checkStyle: <T extends StyleWithoutParams>(style: ValidateShape<T, {
    container: ValidateShape<T["container"], {
        backgroundColor: string;
        borderBottomColor: string;
    }>;
}>) => ValidateShape<T, {
    container: ValidateShape<T["container"], {
        backgroundColor: string;
        borderBottomColor: string;
    }>;
}>;
export declare const checkStyleWithBS: <T extends StyleWithParams>(style: ValidateShape<T, {
    container: ValidateShape<T["container"], {
        backgroundColor: string;
        borderBottomColor: string;
    }>;
    bs: ValidateShape<T["bs"], {
        page: ValidateShape<T["bs"]["page"], {
            flex: number;
            backgroundColor: string;
        }>;
    }>;
}>) => ValidateShape<T, {
    container: ValidateShape<T["container"], {
        backgroundColor: string;
        borderBottomColor: string;
    }>;
    bs: ValidateShape<T["bs"], {
        page: ValidateShape<T["bs"]["page"], {
            flex: number;
            backgroundColor: string;
        }>;
    }>;
}>;
export declare const themes: {
    light: {
        blue: string;
    };
};
export declare const styleParams: {
    val: string;
};
export type Themes = typeof themes;
export {};
