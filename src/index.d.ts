import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export declare const screenWidth: number, screenHeight: number;
declare type MenuItem = {
    id: string;
    name: string;
};
declare type HorizontalScrollMenu = {
    items: Array<MenuItem>;
    onPress: (route: MenuItem) => void;
    upperCase?: boolean;
    textStyle?: StyleProp<TextStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    activeColor: string;
    activeBackgroundColor?: string;
    selectedItemId?: string;
    selectedOpacity?: number;
    containerStyle?: object;
    keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
};
export declare const HorizontalScrollMenu: React.FC<HorizontalScrollMenu>;
export {};
