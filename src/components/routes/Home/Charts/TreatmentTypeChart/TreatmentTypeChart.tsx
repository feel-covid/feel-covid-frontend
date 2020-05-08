import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { Area, AreaChart, Legend, Tooltip, XAxis } from 'recharts';
import { useCountryData } from '../../../../../hooks/useCountryData';
import { formatChartDate } from '../../../../../utils/formatChartDate';
import { he } from 'date-fns/locale';
import { CustomizedXAxisTick } from '../../../../shared/BaseChart/CustomizedXAxisTick';
import {
	animationDefaultProps,
	legendDefaultProps,
	tooltipDefaultProps,
	xAxisDefaultProps
} from '../../../../shared/BaseChart/defaults';
import { ChartContainer } from '../../../../shared/BaseChart/ChartContainer';
import { Gradients } from '../../../../shared/BaseChart/Gradients';
import { useDisableChartActiveState } from '../../../../../hooks/useDisableChartActiveState';

interface IProps {}

export const TreatmentTypeChart: React.FC<IProps> = (props) => {
	const {
		normalizedChartData,
		weekAgoIndexOnNormalizedChartData
	} = useCountryData();
	const { t } = useTranslation();
	const theme = useTheme();
	const gradientsId = 'TreatmentType';
	const { chartRef, disable } = useDisableChartActiveState();

	return (
		<ChartContainer title={t('charts.treatmentType.title')}>
			<AreaChart
				data={normalizedChartData.slice(weekAgoIndexOnNormalizedChartData)}
				ref={chartRef}
				onMouseUp={disable}
			>
				<Legend {...(legendDefaultProps as any)} />

				<defs>
					<Gradients colors={['blue2', 'orange1']} idPrefix={gradientsId} />
				</defs>

				<Area
					name={t('global.treatment.homeHotelUndecided') as any}
					type='monotone'
					dataKey='treatment.combinedHomeHotelUndecided'
					fill={`url(#${gradientsId}blue2)`}
					stroke={theme.colors.blue2}
					strokeWidth={3.5}
					{...animationDefaultProps}
				/>

				<Area
					name={t('global.treatment.hospital') as any}
					type='monotone'
					dataKey='treatment.hospital'
					fill={`url(#${gradientsId}orange1)`}
					stroke={theme.colors.orange1}
					strokeWidth={3.5}
					{...animationDefaultProps}
				/>

				<Tooltip
					labelFormatter={(date) =>
						formatChartDate(date as string, { locale: he })
					}
					{...(tooltipDefaultProps as any)}
				/>

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
			</AreaChart>
		</ChartContainer>
	);
};
