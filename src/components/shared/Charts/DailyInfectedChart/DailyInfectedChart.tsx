import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { format, formatRelative } from 'date-fns';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import {
	AreaChart,
	Bar,
	BarChart,
	ComposedChart,
	Line,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import { formatChartDate } from '../../../../utils/formatChartDate';
import { he } from 'date-fns/locale';
import { chartTooltipStyle } from '../../BaseChart/styles';
import { xAxisDefaultProps } from '../../BaseChart/defaults';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import { reduceDatesToSignalDay } from '../../../providers/CountryDataProvider/utils';
import { findClosestInRangeOf24h } from '../../../../utils/findClosestInRangeOf24H';
import { inspect } from 'util';

interface IProps {}

export const DailyInfectedChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalized24HourDiff } = useCountryData();
	const theme = useTheme();

	return (
		<ChartContainer title={t('charts.dailyInfectedRecoveredChart.title')}>
			<ComposedChart data={normalized24HourDiff}>
				<Bar dataKey='total' fill={theme.colors.blue2} />
				<Line dataKey='total' strokeWidth={3} stroke={theme.colors.orange2} />
				<Bar dataKey='recovered' fill={theme.colors.green1} />
				<Line
					dataKey='recovered'
					strokeWidth={3}
					stroke={theme.colors.orange2}
				/>
				<Tooltip
					labelFormatter={(date) =>
						formatChartDate(date as string, { locale: he })
					}
					contentStyle={chartTooltipStyle}
				/>

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</ComposedChart>
		</ChartContainer>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
	`
};
