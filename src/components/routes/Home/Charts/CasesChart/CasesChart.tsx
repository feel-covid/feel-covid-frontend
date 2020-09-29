import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../../hooks/useCountryData';
import { AreaChart } from 'recharts';
import { useDisableChartActiveState } from '../../../../../hooks/useDisableChartActiveState';
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

export const CasesChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedChartData, chartSliceIndex } = useCountryData();
	const theme = useTheme();
	const gradientsId = 'Cases';
	const { chartRef, disable } = useDisableChartActiveState();

	const areas = [
		{
			name: t('global.cases.midCondition'),
			dataKey: 'mid',
			stroke: theme.colors.orange2,
			fill: `url(#${gradientsId}orange2)`
		},
		{
			name: t('global.cases.severeCondition'),
			dataKey: 'severe.cases',
			stroke: theme.colors.orange1,
			fill: `url(#${gradientsId}orange1)`
		},
		{
			name: t('global.cases.intubated'),
			dataKey: 'severe.intubated',
			stroke: theme.colors.red1,
			fill: `url(#${gradientsId}red1)`
		}
	];

	return (
		<ChartContainer title={t('charts.casesChart.title')}>
			<AreaChart
				data={normalizedChartData.slice(chartSliceIndex)}
				ref={chartRef}
				onMouseUp={disable}
			>
				<Legend />

				<defs>
					<Gradients
						colors={['orange2', 'orange1', 'red1', 'green1']}
						idPrefix={gradientsId}
						startOpacity={0.12}
						endOpacity={0}
					/>
				</defs>

				{areas.map((area) => (
					<Area
						key={area.dataKey}
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
