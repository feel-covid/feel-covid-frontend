import React from 'react';
import { Tooltip as RCTooltip } from 'recharts';
import { formatChartDate } from '../../../../utils/formatChartDate';
import { he } from 'date-fns/locale';

class Tooltip extends RCTooltip {
	static defaultProps = {
		...(RCTooltip as any).defaultProps,
		contentStyle: {
			borderRadius: '.5rem',
			border: 'none',
			boxShadow: '0 0 .5rem rgba(0, 0, 0, 0.3)',
			direction: 'rtl'
		},
		position: { x: 'auto', y: 0 },
		itemSorter: (item: any): number => -item.value,
		formatter: (value: string) => value.toLocaleString(),
		wrapperStyle: {
			top: '23%'
		},
		labelFormatter: (date: string) => formatChartDate(date, { locale: he })
	};
}

export default Tooltip;
