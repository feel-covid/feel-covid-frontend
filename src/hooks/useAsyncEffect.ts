import { useEffect } from 'react';
import { PlainFunction } from '../types/interfaces';

const useAsyncEffect = (effect: PlainFunction, inputs: Array<any>) => {
	useEffect(() => {
		effect();
	}, inputs);
};

export default useAsyncEffect;
