import * as React from 'react';
declare const styleCreator: import("..").StyleCreator<import("..").Themes, {
    container: {
        backgroundColor: any;
        borderBottomColor: string;
    };
}, undefined>;
declare const useStyleTest: () => {
    container: {
        backgroundColor: any;
        borderBottomColor: string;
    };
} | ({
    container: {
        backgroundColor: any;
        borderBottomColor: string;
    };
} & {
    bs: import("..").NamedStyles<any>;
}) | ({
    container: {
        backgroundColor: any;
        borderBottomColor: string;
    };
} & {
    bs: import("..").NamedStyles<unknown>;
});
declare type ClassCompWithUseStyleProps = {
    styles: ReturnType<typeof useStyleTest>;
    val: string;
};
export declare class ClassCompUseStyle extends React.Component<ClassCompWithUseStyleProps> {
    render(): null;
}
export declare const ClassCompWithUseStyle: React.FC<Omit<ClassCompWithUseStyleProps, "styles">>;
export declare const ClassCompWithUseStyleParamsMissing: React.FC<Omit<ClassCompWithUseStyleProps, "styles">>;
export declare const ClassCompWithUseStyleParams: React.FC<Omit<ClassCompWithUseStyleProps, "styles">>;
declare type ClassCompWithCreateStyleProps = {
    styles: ReturnType<typeof styleCreator>;
    val: string;
};
export declare class ClassCompCreateStyle extends React.Component<ClassCompWithCreateStyleProps> {
    render(): null;
}
export declare const ClassCompWithCreateStyle: React.FC<Omit<import("../wrappers").WithStylesProps, "styles">>;
export declare const ClassCompWithCreateStyleParamsMissing: React.FC<Omit<import("../wrappers").WithStylesProps, "styles">>;
export declare const ClassCompWithCreateStyleParams: React.FC<Omit<import("../wrappers").WithStylesProps, "styles">>;
export {};
