import React from 'react';
import { DefaultTheme } from 'styled-components';

export type PlainFunction<T = any> = (params?: T) => any;

export type StateUpdaterFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export type DynamicObject<T> = { [key: string]: T };

export type DelegatedRef<T> = React.RefObject<T>;

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
