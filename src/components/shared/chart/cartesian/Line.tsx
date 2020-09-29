import React from 'react';
import { Line as RCLine } from 'recharts';
import { animationDefaultProps } from './defaults';

class Line extends RCLine {
	static defaultProps = {
		...(RCLine as any).defaultProps,
		...animationDefaultProps,
		strokeWidth: 3.5
	};
}

export default Line;
