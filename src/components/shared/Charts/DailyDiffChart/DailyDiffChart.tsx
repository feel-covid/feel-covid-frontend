import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import { Bar, ComposedChart, Legend, Tooltip, XAxis } from 'recharts';
import {
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
				<Legend {...(legendDefaultProps as any)} />

				<Bar
					dataKey='total'
					fill={theme.colors.blue2}
					isAnimationActive={false}
					name={t('charts.dailyDiffChart.total') as string}
				/>

				<Bar
					dataKey='recovered'
					fill={theme.colors.green1}
					isAnimationActive={false}
					name={t('charts.dailyDiffChart.recovered') as string}
				/>

				<Bar
					dataKey='deceased'
					fill={theme.colors.red1}
					isAnimationActive={false}
					name={t('charts.dailyDiffChart.deceased') as string}
				/>

				<Tooltip content={<CustomizedDailyDiffTooltip />} />

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</ComposedChart>
		</ChartContainer>
	);
};
