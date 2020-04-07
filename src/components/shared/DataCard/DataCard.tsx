import React from 'react';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';
import { getStatDescription } from '../../../utils/getStatDescription';
import { getStats } from '../../../utils/getStats';
import { Icon } from '../Icon/Icon';
import { IconsEnum, PositiveFactorEnum } from '../../../@types/enums';
import { getTrendColor } from '../../../utils/getTrendColor';

interface IProps {
	title: string;
	current: number;
	before: number;
	positiveFactor: PositiveFactorEnum;
}

const DataCard: React.FC<IProps> = (props) => {
	const { title, current, before, positiveFactor } = props;
	const { trend } = getStats(before, current);
	const { description } = getStatDescription({
		before,
		current,
		context: 'נדבקים'
	});

	return (
		<S.Container>
			<CustomText text={title} />
			<S.CurrentContainer trend={trend} positiveFactor={positiveFactor}>
				<S.CurrentText size='s32' text={current} />
				{trend !== 0 && <S.ArrowIcon type={IconsEnum.Arrow} trend={trend} />}
			</S.CurrentContainer>
			<CustomText size='s14' text={description} />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		background: white;
		box-shadow: ${({ theme }) => `0 0 .6rem ${theme.colors.lightBlack1}`};
		justify-content: center;
		align-items: center;
		flex-direction: column;
		transition: 0.3s;
		padding: 2.3rem;
		border-radius: 0.4rem;
		margin: 1rem;

		&:hover {
			transform: translateY(-0.3rem);
		}
	`,
	CurrentContainer: styled.div<{
		trend: number;
		positiveFactor: PositiveFactorEnum;
	}>`
		display: flex;
		align-items: center;
		color: ${({ trend, theme, positiveFactor }) =>
			trend === 0 ? theme.colors.blue2 : getTrendColor(positiveFactor, trend)};
	`,
	CurrentText: styled(CustomText)`
		margin: 0.4rem 0 0.6rem 0;
		color: currentColor;
	`,
	ArrowIcon: styled(Icon)<{ trend: number }>`
		margin-right: 0.5rem;
		width: 1.5rem;
		height: 1.5rem;
		transform: ${({ trend }) => `rotate(${trend === 1 ? 0 : 180}deg)`};
		fill: currentColor;
	`
};

export default DataCard;
