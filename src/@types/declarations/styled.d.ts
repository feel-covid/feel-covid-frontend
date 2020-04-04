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

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/interface-name-prefix
	export interface DefaultTheme {
		fontSizes: IFontSizes;
	}
}
