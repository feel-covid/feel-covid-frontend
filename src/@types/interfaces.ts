import React from 'react';
import { DefaultTheme } from 'styled-components';

export type PlainFunction<T = any, K = any> = (params: T) => K;

export type StateUpdaterFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type DynamicObject<T> = { [key: string]: T };

export type Ref<T> = React.MutableRefObject<T | null>;

export interface IStyle {
	className?: string;
}

export interface ITestId {
	'data-testid'?: string;
}

export interface ITheme {
	theme: DefaultTheme;
}

export interface IChildren {
	children?: React.ReactNode;
}
