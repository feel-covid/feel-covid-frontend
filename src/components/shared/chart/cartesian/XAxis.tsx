import React from 'react';
import { XAxis as RCXAxis } from 'recharts';
import { CustomizedXAxisTick } from '../customized/CustomizedXAxisTick';

class XAxis extends RCXAxis {
	static defaultProps = {
		...(RCXAxis as any).defaultProps,
		dataKey: 'date',
		height: 40,
		tick: <CustomizedXAxisTick />,
		interval: 0
	};
}

export default XAxis;
