import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import { format, formatRelative } from 'date-fns';
import { ChartContainer } from '../../BaseChart/ChartContainer';
import { AreaChart, Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { formatChartDate } from '../../../../utils/formatChartDate';
import { he } from 'date-fns/locale';
import { chartTooltipStyle } from '../../BaseChart/styles';
import { xAxisDefaultProps } from '../../BaseChart/defaults';
import { CustomizedXAxisTick } from '../../BaseChart/CustomizedXAxisTick';
import { reduceDatesToSignalDay } from '../../../providers/CountryDataProvider/utils';

interface IProps {}

export const DailyInfectedChart: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedData } = useCountryData();
	const reducedToSingleDay = reduceDatesToSignalDay(normalizedData);

	const values = Object.values(reducedToSingleDay);

	console.log({ reducedToSingleDay });
	console.log({ values });

	for (let i = values.length - 1; i > 0; i--) {
		const today = values[i];
		const yesterday = values[i - 1];

		console.log({ today, yesterday });
	}

	return (
		<ChartContainer>
			<BarChart data={[]}>
				<Bar dataKey='diff' />
				<Tooltip
					labelFormatter={(date) =>
						formatChartDate(date as string, { locale: he })
					}
					contentStyle={chartTooltipStyle}
				/>

				<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
				<YAxis />
			</BarChart>
		</ChartContainer>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
	`
};
