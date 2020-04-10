import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import {
	Area,
	AreaChart,
	Bar,
	ResponsiveContainer,
	Tooltip,
	XAxis
} from 'recharts';
import { formatChartDate } from '../../../../utils/formatChartDate';
import he from 'date-fns/locale/he';
import { chartTooltipStyle } from '../../BaseChart/styles';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import { xAxisDefaultProps } from '../../BaseChart/defaults';
import { ChartContainer } from '../../BaseChart/ChartContainer';

interface IProps {}

export const CasesChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedChartData } = useCountryData();
	const theme = useTheme();

	return (
		<ChartContainer title={t('charts.casesChart.title')}>
			<AreaChart data={normalizedChartData}>
				<Area
					name={t('global.cases.lightCondition') as any}
					type='monotone'
					dataKey='light'
					stroke={theme.colors.green1}
					fill={theme.colors.green1}
					strokeWidth={3}
					isAnimationActive={false}
				/>

				<Area
					name={t('global.cases.midCondition') as any}
					type='linear'
					dataKey='mid'
					stroke={theme.colors.orange2}
					fill={theme.colors.orange2}
					isAnimationActive={false}
				/>

				<Area
					name={t('global.cases.severeCondition') as any}
					type='monotone'
					dataKey='severe.cases'
					stroke={theme.colors.orange1}
					fill={theme.colors.orange1}
					isAnimationActive={false}
				/>

				<Area
					name={t('global.cases.intubated') as any}
					type='monotone'
					dataKey='severe.intubated'
					stroke={theme.colors.red1}
					fill={theme.colors.red1}
					isAnimationActive={false}
				/>

				<Tooltip
					labelFormatter={(date) =>
						formatChartDate(date as string, { locale: he })
					}
					contentStyle={chartTooltipStyle}
				/>

				<XAxis tick={<CustomizedXAxisTick />} {...xAxisDefaultProps} />
			</AreaChart>
		</ChartContainer>
	);
};
