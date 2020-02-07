import { useEffect, useRef } from 'react';
import { PlainFunction } from '../types/interfaces';

/**
 * @description Modified useEffect that only runs when the dependencies change and not on initial render.
 */
const useStrictEffect = (effect: PlainFunction, deps: Array<any>): void => {
	const isMounted = useRef(false);
	useEffect(() => {
		if (isMounted.current) {
			effect();
		}
		isMounted.current = true;
	}, deps);
};

export default useStrictEffect;
