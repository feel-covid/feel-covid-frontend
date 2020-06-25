import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import {
	Bar,
	ComposedChart,
	LabelList,
	Legend,
	Line,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
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
import { useCountryData } from '../../../../../hooks/useCountryData';
import { ChartContainer } from '../../../../shared/BaseChart/ChartContainer';
import { CustomDailyDiffBarLabel } from './CustomDailyDiffBarLabel';

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

	const weekData = normalized24HourDiff.slice(
		weekAgoNegativeIndexOnNormalized24HoursDiff
	);

	const maxDailyInfected = useMemo(
		() => Math.max(...weekData.map(({ total }) => total)),
		[normalized24HourDiff, weekAgoNegativeIndexOnNormalized24HoursDiff]
	);

	const bars = [
		{
			dataKey: 'recovered',
			fill: `url(#${gradientsId}green1)`,
			name: t('charts.dailyDiffChart.recovered'),
			stroke: theme.colors.green1
		},

		{
			dataKey: 'total',
			fill: `url(#${gradientsId}blue2)`,
			name: t('charts.dailyDiffChart.total'),
			stroke: theme.colors.blue2,
			children: (
				<LabelList dataKey='total' content={<CustomDailyDiffBarLabel />} />
			)
		},
		{
			dataKey: 'deceased',
			fill: `url(#${gradientsId}red1)`,
			name: t('charts.dailyDiffChart.deceased'),
			stroke: theme.colors.red1
		}
	];

	return (
		<S.ChartContainer
			title={t('charts.dailyDiffChart.title')}
			tooltip={t('charts.dailyDiffChart.tooltip')}
		>
			<ComposedChart
				ref={chartRef}
				data={weekData.map((day) => ({
					...day,
					totalBuffer: maxDailyInfected * 1.1
				}))}
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

				<Line
					type='monotone'
					dataKey='totalBuffer'
					strokeWidth={0}
					cursor={false as any}
					dot={false}
				/>

				{bars.map((bar) => (
					<Bar key={bar.dataKey} {...bar} {...animationDefaultProps} />
				))}

				<Tooltip
					content={<CustomizedDailyDiffTooltip />}
					{...(tooltipDefaultProps as any)}
				/>

				<YAxis domain={['dataMin', 'dataMax']} hide />
				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</ComposedChart>
		</S.ChartContainer>
	);
};

const S = {
	ChartContainer: styled(ChartContainer)`
		.recharts-active-dot {
			display: none;
		}
	`
};
