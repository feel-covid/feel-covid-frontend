import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { Area, AreaChart, Legend, Tooltip, XAxis } from 'recharts';
import he from 'date-fns/locale/he';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import { formatChartDate } from '../../../../utils/formatChartDate';
import {
	animationDefaultProps,
	legendDefaultProps,
	tooltipDefaultProps,
	xAxisDefaultProps
} from '../../BaseChart/defaults';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import { Gradients } from '../../BaseChart/Gradients';

interface IProps {}

export const ActiveRecoveredDeceasedChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedChartData } = useCountryData();
	const theme = useTheme();
	const gradientsId = 'ActiveRecoveredDeceased';

	return (
		<ChartContainer title={t('charts.activeRecoveredDeceased.title')}>
			<AreaChart data={normalizedChartData} syncId='daily'>
				<Legend {...(legendDefaultProps as any)} />

				<defs>
					<Gradients
						colors={['blue2', 'green1', 'red1']}
						idPrefix={gradientsId}
					/>
				</defs>

				<Area
					name={t('global.cases.numOfCases') as any}
					type='monotone'
					dataKey='active'
					stroke={theme.colors.blue2}
					fill={`url(#${gradientsId}blue2)`}
					strokeWidth={3}
					fillOpacity={1}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.cases.recovered') as any}
					type='linear'
					dataKey='recovered'
					fill={`url(#${gradientsId}green1)`}
					stroke={theme.colors.green1}
					strokeWidth={3}
					fillOpacity={1}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.cases.deceased') as any}
					type='monotone'
					dataKey='deceased'
					fill={`url(#${gradientsId}red1)`}
					strokeWidth={3}
					fillOpacity={1}
					stroke={theme.colors.red1}
					{...animationDefaultProps}
				/>

				<Tooltip
					labelFormatter={(date) =>
						formatChartDate(date as string, { locale: he })
					}
					{...(tooltipDefaultProps as any)}
				/>

				<XAxis tick={<CustomizedXAxisTick />} {...xAxisDefaultProps} />
			</AreaChart>
		</ChartContainer>
	);
};
