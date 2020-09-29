import React from 'react';
import { Bar as RCBar } from 'recharts';
import { animationDefaultProps } from './defaults';

class Bar extends RCBar {
	static defaultProps = {
		...(RCBar as any).defaultProps,
		...animationDefaultProps
	};
}

export default Bar;
