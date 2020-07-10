import React from 'react';
import styled from 'styled-components/macro';
import { DynamicObject } from '../../../../../@types/interfaces';
import { he } from 'date-fns/locale';
import { chartTooltipStyle } from '../../../../shared/BaseChart/styles';
import CustomText from '../../../../shared/CustomText/CustomText';
import i18n from '../../../../../i18n/i18n';
import { formatChartDate } from '../../../../../utils/formatChartDate';

interface IProps {
	active?: boolean;
	payload?: Array<{
		color: string;
		dataKey: string;
		value: number;
		payload: {
			date: string;
			compareDate: string;
		};
	}>;
}

export const CustomizedDailyDiffTooltip: React.FC<IProps> = (props) => {
	if (!props.active) return null;

	const uniqueValues = props
		.payload!.sort((a, b) => b.value - a.value)
		.reduce((acc, currentPayload) => {
			const { dataKey, value } = currentPayload;
			let { color } = currentPayload;
			const dashIndex = color.indexOf('-');

			color = color.slice(dashIndex + 1, color.length - 1);

			if (dataKey !== 'infectedBuffer') {
				acc[dataKey] = {
					color: dataKey === 'infected' ? 'blue2' : color,
					value
				};
			}

			return acc;
		}, {} as DynamicObject<{ color: string; value: number }>);

	const {
		payload: { date }
	} = props.payload![0];

	return (
		<S.Container style={chartTooltipStyle as any}>
			<S.DateCompare text={formatChartDate(date, { locale: he })} />

			{Object.entries(uniqueValues).map(([key, { value, color }]) => (
				<S.Description
					key={key}
					color={color as any}
					text={`${i18n.t(
						`charts.dailyDiffChart.${key}`
					)}: ${value.toLocaleString()}`}
				/>
			))}
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		flex-direction: column;
		background: white;
		padding: 1rem;
	`,
	DateCompare: styled(CustomText)`
		color: black;
	`,
	Description: styled(CustomText)`
		margin-top: 0.4rem;
	`
};
