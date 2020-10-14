// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import CustomText from '../../CustomText/CustomText';

interface IProps {
	x?: number;
	y?: number;
	stroke?: string;
	value?: number;
	itemsLength: number;
	index?: number;
}

export const CustomizedLineLabel: React.FC<IProps> = (props) => {
	const { x, y, stroke, value, itemsLength, index } = props;

	if (![0, itemsLength - 1].includes(index!)) return null;

	const xBuffer = index === 0 ? 25 : 35;

	return (
		<g>
			<foreignObject x={x - xBuffer} y={y - 12} width={60} height={30}>
				<S.TextContainer>
					<S.Text
						size='s13'
						backgroundColor={stroke}
						text={value.toLocaleString()}
					/>
				</S.TextContainer>
			</foreignObject>
		</g>
	);
};

const S = {
	TextContainer: styled.div`
		text-align: center;
	`,
	Text: styled(CustomText)<{ backgroundColor: string }>`
		border: 0.1rem solid white;
		background: ${({ backgroundColor }) => backgroundColor};
		padding: 0 0.3rem;
		border-radius: 0.5rem;
		font-weight: bold;
	`
};
