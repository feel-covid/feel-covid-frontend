import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/macro';
import { useCountryData } from '../../../../../hooks/useCountryData';
import { Area, AreaChart, Legend, Tooltip, XAxis } from 'recharts';
import { formatChartDate } from '../../../../../utils/formatChartDate';
import he from 'date-fns/locale/he';
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

export const CasesChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const {
		normalizedChartData,
		weekAgoIndexOnNormalizedChartData
	} = useCountryData();
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
				data={normalizedChartData.slice(weekAgoIndexOnNormalizedChartData)}
				ref={chartRef}
				onMouseUp={disable}
			>
				<Legend {...(legendDefaultProps as any)} />

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
