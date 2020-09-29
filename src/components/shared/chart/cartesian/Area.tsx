import React from 'react';
import { Area as RCArea } from 'recharts';
import { animationDefaultProps } from './defaults';

class Area extends RCArea {
	static defaultProps = {
		...(RCArea as any).defaultProps,
		...animationDefaultProps,
		strokeWidth: 3.5
	};
}

export default Area;
