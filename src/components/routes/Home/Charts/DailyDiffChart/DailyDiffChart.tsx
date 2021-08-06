import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import { useCountryDataContext } from '../../../../providers/CountryDataProvider/hooks/useCountryDataContext';
import {
	Bar,
	ChartContainer,
	Gradients,
	Legend,
	Tooltip,
	Line,
	XAxis
} from '../../../../shared/chart';
import { ComposedChart, LabelList, YAxis } from 'recharts';
import { CustomizedDailyDiffTooltip } from './CustomizedDailyDiffTooltip';
import { PointLabel } from '../../../../shared/chart/customized/PointLabel';

interface IProps {}

export const DailyDiffChart: React.FC<IProps> = props => {
	const { t } = useTranslation();
	const { dailyIRD, chartSliceIndex } = useCountryDataContext();
	const theme = useTheme();
	const gradientsId = 'DailyDiff-';
	const weekData = dailyIRD.slice(chartSliceIndex);
	const maxDailyInfected = useMemo(
		() => Math.max(...weekData.map(({ infected }) => infected)),
		[dailyIRD]
	);

	const bars = [
		{
			dataKey: 'recovered',
			fill: `url(#${gradientsId}green1)`,
			name: t('charts.dailyDiffChart.recovered'),
			stroke: theme.colors.green1
		},

		{
			dataKey: 'infected',
			fill: `url(#${gradientsId}blue2)`,
			name: t('charts.dailyDiffChart.infected'),
			stroke: theme.colors.blue2,
			children: (
				<LabelList
					dataKey='infected'
					content={
						<PointLabel shouldDisplay={() => true} horizontalOffset={-1} />
					}
				/>
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
		<S.ChartContainer title={t('charts.dailyDiffChart.title')}>
			<ComposedChart data={weekData}>
				<Legend
					payload={[
						{
							id: 'total',
							value: t('charts.dailyDiffChart.infected'),
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

				{bars.map(bar => (
					<Bar key={bar.dataKey} {...bar} />
				))}

				<YAxis
					type='number'
					domain={[0, `dataMax + ${maxDailyInfected * 0.1}`]}
					hide
				/>

				<Tooltip content={<CustomizedDailyDiffTooltip />} />

				<XAxis />
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
