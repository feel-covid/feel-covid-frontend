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
import { CustomizedLineLabel } from '../../../../shared/BaseChart/CustomizedLineLabel';

interface IProps {}

export const TreatmentTypeChart: React.FC<IProps> = (props) => {
	const { normalizedChartData, chartSliceIndex } = useCountryData();
	const { t } = useTranslation();
	const theme = useTheme();
	const gradientsId = 'TreatmentType';
	const { chartRef, disable } = useDisableChartActiveState();

	const areas = [
		{
			name: t('global.treatment.hotel'),
			dataKey: 'treatment.hotel',
			fill: `url(#${gradientsId}blue2)`,
			stroke: theme.colors.blue2
		},
		{
			name: t('global.treatment.hospital'),
			dataKey: 'treatment.hospital',
			fill: `url(#${gradientsId}red1)`,
			stroke: theme.colors.red1
		}
	];

	const data = normalizedChartData.slice(chartSliceIndex);
	return (
		<ChartContainer title={t('charts.treatmentType.title')}>
			<AreaChart data={data} ref={chartRef} onMouseUp={disable}>
				<Legend {...(legendDefaultProps as any)} />

				<defs>
					<Gradients
						colors={['blue2', 'red1']}
						idPrefix={gradientsId}
					/>
				</defs>

				{areas.map((area) => (
					<Area
						key={area.name}
						{...area}
						type='monotone'
						strokeWidth={3.5}
						label={
							<CustomizedLineLabel
								stroke={area.stroke}
								itemsLength={normalizedChartData.slice(chartSliceIndex).length}
							/>
						}
						{...animationDefaultProps}
					/>
				))}

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
