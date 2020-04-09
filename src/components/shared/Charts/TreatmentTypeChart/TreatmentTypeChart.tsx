import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import { Area, AreaChart, Tooltip, XAxis } from 'recharts';
import { useCountryData } from '../../../../hooks/useCountryData';
import { formatChartDate } from '../../../../utils/formatChartDate';
import { he } from 'date-fns/locale';
import { chartTooltipStyle } from '../../BaseChart/styles';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import { xAxisDefaultProps } from '../../BaseChart/defaults';
import { ChartContainer } from '../../BaseChart/ChartContainer';

interface IProps {}

export const TreatmentTypeChart: React.FC<IProps> = (props) => {
	const { normalizedChartData } = useCountryData();
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<ChartContainer>
			<AreaChart data={normalizedChartData}>
				<Area
					name={t('global.treatment.home') as any}
					type='monotone'
					dataKey='treatment.home'
					fill={theme.colors.green1}
					stroke={theme.colors.green1}
					strokeWidth={3}
				/>

				<Area
					name={t('global.treatment.hotel') as any}
					type='linear'
					dataKey='treatment.hotel'
					fill={theme.colors.blue2}
					stroke={theme.colors.blue2}
					strokeWidth={3}
				/>

				<Area
					name={t('global.treatment.hospital') as any}
					type='monotone'
					dataKey='treatment.hospital'
					fill={theme.colors.orange2}
					stroke={theme.colors.orange2}
					strokeWidth={3}
				/>

				<Tooltip
					labelFormatter={(date) =>
						formatChartDate(date as string, { locale: he })
					}
					contentStyle={chartTooltipStyle}
				/>

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</AreaChart>
		</ChartContainer>
	);
};
