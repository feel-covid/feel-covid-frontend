import 'styled-components';

export interface IFontSizes {
	s10: string;
	s12: string;
	s13: string;
	s14: string;
	s15: string;
	s16: string;
	s18: string;
	s20: string;
	s22: string;
	s24: string;
	s26: string;
	s27: string;
	s28: string;
	s32: string;
	s44: string;
	s52: string;
}

export interface IColors {
	white: string;
	gray1: string;
	gray2: string;
	gray3: string;
	blue1: string;
	blue2: string;
	darkBlue1: string;
	darkBlue2: string;
	red1: string;
	red2: string;
	green1: string;
	lightBlack1: string;
	orange1: string;
	orange2: string;
	turquoise1: string;
}

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/interface-name-prefix
	export interface DefaultTheme {
		fontSizes: IFontSizes;
		colors: IColors;
	}
}
