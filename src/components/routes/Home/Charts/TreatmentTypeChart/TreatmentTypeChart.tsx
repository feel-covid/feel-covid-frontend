import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { AreaChart } from 'recharts';
import { useCountryData } from '../../../../../hooks/useCountryData';
import { CustomizedLineLabel } from '../../../../shared/chart/customized/CustomizedLineLabel';
import {
	ChartContainer,
	Gradients,
	Area,
	Legend,
	Tooltip,
	XAxis
} from '../../../../shared/chart';

interface IProps {}

export const TreatmentTypeChart: React.FC<IProps> = (props) => {
	const { normalizedChartData, chartSliceIndex } = useCountryData();
	const { t } = useTranslation();
	const theme = useTheme();
	const gradientsId = 'TreatmentType';

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
			fill: `url(#${gradientsId}orange1)`,
			stroke: theme.colors.orange1
		}
	];

	return (
		<ChartContainer title={t('charts.treatmentType.title')}>
			<AreaChart data={normalizedChartData.slice(chartSliceIndex)}>
				<Legend />

				<defs>
					<Gradients
						colors={['blue2', 'orange1']}
						idPrefix={gradientsId}
						startOpacity={0.6}
					/>
				</defs>

				{areas.map((area) => (
					<Area
						key={area.name}
						{...area}
						label={
							<CustomizedLineLabel
								stroke={area.stroke}
								itemsLength={normalizedChartData.slice(chartSliceIndex).length}
							/>
						}
					/>
				))}

				<Tooltip />

				<XAxis />
			</AreaChart>
		</ChartContainer>
	);
};
