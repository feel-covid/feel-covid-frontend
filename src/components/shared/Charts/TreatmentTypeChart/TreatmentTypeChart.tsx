import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { Area, AreaChart, Bar, Legend, Tooltip, XAxis } from 'recharts';
import { useCountryData } from '../../../../hooks/useCountryData';
import { formatChartDate } from '../../../../utils/formatChartDate';
import { he } from 'date-fns/locale';
import { chartTooltipStyle } from '../../BaseChart/styles';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import {
	animationDefaultProps,
	legendDefaultProps,
	tooltipItemSorter,
	xAxisDefaultProps
} from '../../BaseChart/defaults';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import { Gradients } from '../../BaseChart/Gradients';

interface IProps {}

export const TreatmentTypeChart: React.FC<IProps> = (props) => {
	const { normalizedChartData } = useCountryData();
	const { t } = useTranslation();
	const theme = useTheme();
	const gradientsId = 'TreatmentType';

	return (
		<ChartContainer title={t('charts.treatmentType.title')}>
			<AreaChart data={normalizedChartData}>
				<Legend {...(legendDefaultProps as any)} />

				<defs>
					<Gradients
						colors={['green1', 'blue2', 'orange1']}
						idPrefix={gradientsId}
					/>
				</defs>

				<Area
					name={t('global.treatment.home') as any}
					type='monotone'
					dataKey='treatment.home'
					fill={`url(#${gradientsId}green1)`}
					stroke={theme.colors.green1}
					strokeWidth={3}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.treatment.hotel') as any}
					type='linear'
					dataKey='treatment.hotel'
					fill={`url(#${gradientsId}blue2)`}
					stroke={theme.colors.blue2}
					strokeWidth={3}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.treatment.hospital') as any}
					type='monotone'
					dataKey='treatment.hospital'
					fill={`url(#${gradientsId}orange1)`}
					stroke={theme.colors.orange1}
					strokeWidth={3}
					{...animationDefaultProps}
				/>

				<Tooltip
					labelFormatter={(date) =>
						formatChartDate(date as string, { locale: he })
					}
					contentStyle={chartTooltipStyle}
					itemSorter={tooltipItemSorter}
				/>

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</AreaChart>
		</ChartContainer>
	);
};
