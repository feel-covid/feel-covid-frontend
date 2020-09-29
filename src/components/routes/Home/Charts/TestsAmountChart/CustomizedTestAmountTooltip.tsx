import React from 'react';
import styled from 'styled-components/macro';
import { chartTooltipStyle } from '../../../../shared/chart/styles';
import CustomText from '../../../../shared/CustomText/CustomText';
import { format } from 'date-fns';
import { DateFormatsEnum } from '../../../../../@types/enums';
import { he } from 'date-fns/locale';

interface IProps {
	active?: boolean;
	label?: string;
	payload?: Array<{
		fill: string;
		stroke: string;
		strokeWidth: number;
		dataKey: string;
		name: string;
		color: string;
		value: number;
		payload: {
			amount: number;
			date: string;
			positive: number;
			overall: number;
			original: {
				amount: number;
				positive: number;
			};
		};
	}>;
}

export const CustomizedTestAmountTooltip: React.FC<IProps> = (props) => {
	if (!props.active) return null;

	const originValues = props.payload!.map((currentPayload) => {
		const { name, dataKey, value, payload, stroke } = currentPayload;

		return {
			text: name,
			// @ts-ignore
			value: dataKey === 'overall' ? value : payload.original[dataKey],
			color: stroke
		};
	});

	return (
		<S.Container style={chartTooltipStyle as any}>
			<CustomText
				text={format(new Date(props.label!), DateFormatsEnum.MONTH_AND_DAY, {
					locale: he
				})}
				color='darkBlue1'
			/>
			{Object.values(originValues).map(({ text, value, color }: any) => (
				<S.TextContainer color={color} key={text}>
					<CustomText key={text} text={`${text}: ${value.toLocaleString()}`} />
				</S.TextContainer>
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
	TextContainer: styled.div<{ color: string }>`
		color: ${({ color }) => color};
		margin: 0.3rem 0;

		span {
			color: currentColor;
		}
	`
};
