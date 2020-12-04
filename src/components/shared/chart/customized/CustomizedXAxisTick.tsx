import React from 'react';
import { DynamicObject } from '../../../../@types/interfaces';
import { formatChartDate } from '../utils/formatChartDate';
import { he } from 'date-fns/locale';

interface IProps extends DynamicObject<any> {}

export const CustomizedXAxisTick: React.FC<IProps> = (props) => {
	const { x, y, payload } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor='end'
				fill='#666'
				transform='rotate(-50) translate(0 -7)'
				fontSize='1.2rem'
			>
				{formatChartDate(payload.value, { locale: he })}
			</text>
		</g>
	);
};
