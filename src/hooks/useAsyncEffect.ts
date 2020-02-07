import { useEffect } from 'react';
import { PlainFunction } from '../types/interfaces';

/**
 * @description Modified useEffect that allows async functions.
 */
const useAsyncEffect = (effect: PlainFunction, inputs: Array<any>): void => {
	useEffect(() => {
		effect();
	}, inputs);
};

export default useAsyncEffect;
