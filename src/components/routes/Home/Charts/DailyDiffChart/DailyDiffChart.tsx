import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import { Bar, ComposedChart, Legend, Line, Tooltip, XAxis } from 'recharts';
import {
	animationDefaultProps,
	legendDefaultProps,
	tooltipDefaultProps,
	xAxisDefaultProps
} from '../../../../shared/BaseChart/defaults';
import { CustomizedXAxisTick } from '../../../../shared/BaseChart/CustomizedXAxisTick';
import { CustomizedDailyDiffTooltip } from './CustomizedDailyDiffTooltip';
import { Gradients } from '../../../../shared/BaseChart/Gradients';
import { useDisableChartActiveState } from '../../../../../hooks/useDisableChartActiveState';

interface IProps {}

export const DailyDiffChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const {
		normalized24HourDiff,
		weekAgoNegativeIndexOnNormalized24HoursDiff
	} = useCountryData();

	const theme = useTheme();
	const gradientsId = 'DailyDiff-';
	const { chartRef, disable } = useDisableChartActiveState();
	return (
		<ChartContainer title={t('charts.dailyDiffChart.title')}>
			<ComposedChart
				ref={chartRef}
				data={normalized24HourDiff.slice(
					weekAgoNegativeIndexOnNormalized24HoursDiff
				)}
				onMouseUp={disable}
			>
				<Legend
					{...(legendDefaultProps as any)}
					payload={[
						{
							id: 'total',
							value: t('charts.dailyDiffChart.total'),
							color: theme.colors.blue2,
							type: 'square'
						},
						{
							id: 'recovered',
							value: t('charts.dailyDiffChart.recovered'),
							color: theme.colors.green1,
							type: 'square'
						},
						{
							id: 'deceased',
							value: t('charts.dailyDiffChart.deceased'),
							color: theme.colors.red1,
							type: 'square'
						}
					]}
				/>
				<defs>
					<Gradients
						colors={['blue2', 'green1', 'red1']}
						startOpacity={1}
						endOpacity={0.4}
						idPrefix={gradientsId}
					/>
				</defs>

				<Bar
					dataKey='recovered'
					fill={`url(#${gradientsId}green1)`}
					name={t('charts.dailyDiffChart.recovered') as string}
					stroke={theme.colors.green1}
					{...animationDefaultProps}
				/>

				<Bar
					dataKey='total'
					fill={`url(#${gradientsId}blue2)`}
					name={t('charts.dailyDiffChart.total') as string}
					stroke={theme.colors.blue2}
					{...animationDefaultProps}
				/>

				<Bar
					dataKey='deceased'
					fill={`url(#${gradientsId}red1)`}
					name={t('charts.dailyDiffChart.deceased') as string}
					stroke={theme.colors.red1}
					{...animationDefaultProps}
				/>

				<Line
					dataKey='total'
					stroke={theme.colors.white}
					strokeWidth={2}
					{...animationDefaultProps}
					style={{ top: '-10px' }}
				/>

				<Tooltip
					content={<CustomizedDailyDiffTooltip />}
					{...(tooltipDefaultProps as any)}
				/>

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</ComposedChart>
		</ChartContainer>
	);
};
