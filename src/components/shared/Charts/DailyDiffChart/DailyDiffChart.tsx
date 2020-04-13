import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import { Bar, ComposedChart, Legend, Line, Tooltip, XAxis } from 'recharts';
import {
	animationDefaultProps,
	legendDefaultProps,
	xAxisDefaultProps
} from '../../BaseChart/defaults';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import { CustomizedDailyDiffTooltip } from './CustomizedDailyDiffTooltip';

interface IProps {}

export const DailyDiffChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalized24HourDiff } = useCountryData();
	const theme = useTheme();

	return (
		<ChartContainer title={t('charts.dailyDiffChart.title')}>
			<ComposedChart data={normalized24HourDiff}>
				<Legend {...{ ...(legendDefaultProps as any), iconType: undefined }} />

				<Bar
					dataKey='total'
					fill={theme.colors.blue2}
					name={t('charts.dailyDiffChart.total') as string}
					{...animationDefaultProps}
					legendType='square'
				/>

				<Bar
					dataKey='recovered'
					fill={theme.colors.green1}
					name={t('charts.dailyDiffChart.recovered') as string}
					{...animationDefaultProps}
					legendType='square'
				/>

				<Bar
					dataKey='deceased'
					fill={theme.colors.red1}
					name={t('charts.dailyDiffChart.deceased') as string}
					{...animationDefaultProps}
					legendType='square'
				/>

				<Tooltip content={<CustomizedDailyDiffTooltip />} />

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</ComposedChart>
		</ChartContainer>
	);
};
