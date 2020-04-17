import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { Area, AreaChart, Legend, Tooltip, XAxis } from 'recharts';
import { formatChartDate } from '../../../../utils/formatChartDate';
import he from 'date-fns/locale/he';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import {
	animationDefaultProps,
	legendDefaultProps,
	tooltipDefaultProps,
	xAxisDefaultProps
} from '../../BaseChart/defaults';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import { Gradients } from '../../BaseChart/Gradients';

interface IProps {}

export const CasesChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedChartData } = useCountryData();
	const theme = useTheme();
	const gradientsId = 'Cases';

	return (
		<ChartContainer title={t('charts.casesChart.title')}>
			<AreaChart data={normalizedChartData} syncId='daily'>
				<Legend {...(legendDefaultProps as any)} />

				<defs>
					<Gradients
						colors={['orange2', 'orange1', 'red1', 'green1']}
						idPrefix={gradientsId}
					/>
				</defs>

				<Area
					name={t('global.cases.lightCondition') as any}
					type='monotone'
					dataKey='light'
					stroke={theme.colors.green1}
					fill={`url(#${gradientsId}green1)`}
					strokeWidth={3}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.cases.midCondition') as any}
					type='linear'
					dataKey='mid'
					stroke={theme.colors.orange2}
					fill={`url(#${gradientsId}orange2)`}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.cases.severeCondition') as any}
					type='monotone'
					dataKey='severe.cases'
					stroke={theme.colors.orange1}
					fill={`url(#${gradientsId}orange1)`}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.cases.intubated') as any}
					type='monotone'
					dataKey='severe.intubated'
					stroke={theme.colors.red1}
					fill={`url(#${gradientsId}red1)`}
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
