import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../../hooks/useCountryData';
import { Area, AreaChart, Legend, Tooltip, XAxis } from 'recharts';
import he from 'date-fns/locale/he';
import { CustomizedXAxisTick } from '../../../../shared/BaseChart/CustomizedXAxisTick';
import { formatChartDate } from '../../../../../utils/formatChartDate';
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

export const ActiveRecoveredDeceasedChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const {
		normalizedChartData,
		weekAgoIndexOnNormalizedChartData
	} = useCountryData();
	const theme = useTheme();
	const gradientsId = 'ActiveRecoveredDeceased';
	const { chartRef, disable } = useDisableChartActiveState();

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
			<AreaChart
				data={normalizedChartData.slice(weekAgoIndexOnNormalizedChartData)}
				ref={chartRef}
				onMouseUp={disable}
			>
				<Legend {...(legendDefaultProps as any)} />

				<defs>
					<Gradients
						colors={['blue2', 'green1', 'red1']}
						idPrefix={gradientsId}
					/>
				</defs>

				{areas.map((area) => (
					<Area
						key={area.dataKey}
						{...area}
						{...animationDefaultProps}
						strokeWidth={3.5}
					/>
				))}

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
