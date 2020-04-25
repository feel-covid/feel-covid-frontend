import {
	css,
	CSSObject,
	SimpleInterpolation,
	FlattenSimpleInterpolation
} from 'styled-components';

type Breakpoints = {
	smallDesktop: number;
	tablet: number;
	phone: number;
};

const sizes: Breakpoints = {
	smallDesktop: 1280,
	tablet: 880,
	phone: 450
};

const initAcc: Interpolation<Breakpoints> = {
	smallDesktop: () => '',
	tablet: () => '',
	phone: () => ''
};

type BreakpointEntry = [keyof Breakpoints, Breakpoints[keyof Breakpoints]];
type Interpolation<T> = {
	[key in keyof T]:
		| ((
				first: CSSObject | TemplateStringsArray,
				...interpolations: SimpleInterpolation[]
		  ) => FlattenSimpleInterpolation)
		| (() => string);
};

interface CustomObject extends ObjectConstructor {
	entries<K extends keyof Breakpoints, T>(
		o: { [s in K]: T } | ArrayLike<T>
	): [K, T][];
}

const object: CustomObject = Object;

const media = object
	.entries(sizes)
	.reduce<Interpolation<Breakpoints>>((acc, cur: BreakpointEntry) => {
		const [key, value] = cur;
		acc[key] = (first, ...interpolations) =>
			css`
				@media (max-width: ${value}px) {
					${css(first, ...interpolations)}
				}
			`;

		return acc;
	}, initAcc);

export default media;
