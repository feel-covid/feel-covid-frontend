// @ts-nocheck
import { css } from 'styled-components';
import { DynamicObject, PlainFunction } from '../@types/interfaces';

interface ISizes {
	smallDesktop: number;
	tablet: number;
	phone: number;
}

const sizes = {
	smallDesktop: 1280,
	tablet: 880,
	phone: 450
};

export default Object.keys(sizes).reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label]}px) {
			${css(...args)};
		}
	`;
	return acc;
}, {} as DynamicObject<PlainFunction>);
