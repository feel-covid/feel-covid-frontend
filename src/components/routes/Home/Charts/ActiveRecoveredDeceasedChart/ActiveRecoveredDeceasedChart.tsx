import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryDataContext } from '../../../../providers/CountryDataProvider/hooks/useCountryDataContext';
import { AreaChart } from 'recharts';
import {
	ChartContainer,
	Gradients,
	Area,
	Legend,
	Tooltip,
	XAxis
} from '../../../../shared/chart';

interface IProps {}

export const ActiveRecoveredDeceasedChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedChartData, chartSliceIndex } = useCountryDataContext();
	const theme = useTheme();
	const gradientsId = 'ActiveRecoveredDeceased';

	const areas = [
		{
			name: t('global.cases.recovered'),
			dataKey: 'recovered',
			fill: `url(#${gradientsId}green1)`,
			stroke: theme.colors.green1
		},
		{
			name: t('global.cases.numOfCases'),
			dataKey: 'active',
			fill: `url(#${gradientsId}blue2)`,
			stroke: theme.colors.blue2
		},
		{
			name: t('global.cases.deceased'),
			dataKey: 'deceased',
			fill: `url(#${gradientsId}red1)`,
			stroke: theme.colors.red1
		}
	];

	return (
		<ChartContainer title={t('charts.activeRecoveredDeceased.title')}>
			<AreaChart data={normalizedChartData.slice(chartSliceIndex)}>
				<Legend />

				<defs>
					<Gradients
						colors={['blue2', 'green1', 'red1']}
						idPrefix={gradientsId}
					/>
				</defs>

				{areas.map((area) => (
					<Area key={area.dataKey} {...area} />
				))}

				<Tooltip />

				<XAxis />
			</AreaChart>
		</ChartContainer>
	);
};
