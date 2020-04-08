import React from 'react';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';
import { getStatDescription } from '../../../utils/getStatDescription';
import { PositiveFactorEnum } from '../../../@types/enums';
import { CasesAmount } from '../CasesAmount/CasesAmount';

interface IProps {
	title: string;
	current: number;
	before: number;
	positiveFactor: PositiveFactorEnum;
}

const DataCard: React.FC<IProps> = (props) => {
	const { title, current, before, positiveFactor } = props;
	const { description } = getStatDescription({
		before,
		current
	});

	return (
		<S.Container>
			<CustomText text={title} />
			<CasesAmount
				positiveFactor={positiveFactor}
				current={current}
				before={before}
				fontSize='s32'
				iconSize='1.5rem'
			/>
			<CustomText size='s14' text={description} />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		background: ${({ theme }) => theme.colors.white};
		box-shadow: ${({ theme }) => `0 0 .6rem ${theme.colors.lightBlack1}`};
		justify-content: center;
		align-items: center;
		flex-direction: column;
		transition: 0.3s;
		padding: 2.3rem;
		border-radius: 0.4rem;
		margin: 0.45rem 1rem;
		flex: 1 0;

		@media (max-width: 1024px) {
			width: 100%;
		}
	`
};

export default DataCard;