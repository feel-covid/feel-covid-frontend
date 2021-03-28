import React from 'react';
import styled from 'styled-components/macro';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import { chartTooltipStyle } from '../styles';
import CustomText from '../../CustomText/CustomText';
import { DateFormatsEnum } from '../../../../@types/enums';

interface ITooltipItem {
	text: string;
	value: string;
	color: string;
}

interface IProps {
	label: string;
	payload: ITooltipItem[];
}

export const CustomizedTooltip: React.FC<IProps> = props => {
	const { label, payload } = props;

	return (
		<S.Container style={chartTooltipStyle}>
			<CustomText
				text={format(new Date(label), DateFormatsEnum.MONTH_AND_DAY, {
					locale: he
				})}
				color='darkBlue1'
			/>
			{Object.values(payload).map(({ text, value, color }: any) => (
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
