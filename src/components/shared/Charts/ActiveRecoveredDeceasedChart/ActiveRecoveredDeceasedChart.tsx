import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { Area, AreaChart, Tooltip, XAxis } from 'recharts';
import he from 'date-fns/locale/he';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import { formatChartDate } from '../../../../utils/formatChartDate';
import { chartTooltipStyle } from '../../BaseChart/styles';
import { xAxisDefaultProps } from '../../BaseChart/defaults';
import { ChartContainer } from '../../BaseChart/ChartContainer';

interface IProps {}

export const ActiveRecoveredDeceasedChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedChartData } = useCountryData();
	const theme = useTheme();

	return (
		<ChartContainer title={t('charts.activeRecoveredDeceased.title')}>
			<AreaChart data={normalizedChartData}>
				<Area
					name={t('global.cases.numOfCases') as any}
					type='monotone'
					dataKey='active'
					stroke={theme.colors.blue2}
					fill={theme.colors.blue2}
					strokeWidth={3}
					isAnimationActive={false}
				/>

				<Area
					name={t('global.cases.recovered') as any}
					type='linear'
					dataKey='recovered'
					fill={theme.colors.green1}
					stroke={theme.colors.green1}
					isAnimationActive={false}
				/>

				<Area
					name={t('global.cases.deceased') as any}
					type='monotone'
					dataKey='deceased'
					fill={theme.colors.red1}
					stroke={theme.colors.red1}
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
