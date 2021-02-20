import React from 'react';
import styled from 'styled-components/macro';
import { IconsEnum, PositiveTrendEnum } from '../../../@types/enums';
import { getTrendColor } from './utils/getTrendColor';
import CustomText from '../CustomText/CustomText';
import { Icon } from '../Icon/Icon';
import { getTrendAndDiff } from '../../../utils/getTrendAndDiff';
import { IFontSizes } from '../../../@types/declarations/styled';
import { IStyle } from '../../../@types/interfaces';

interface IProps extends IStyle {
	positiveTrend: PositiveTrendEnum;
	current: number;
	before: number;
	fontSize?: keyof IFontSizes;
	iconSize?: string;
}

export const CasesAmount: React.FC<IProps> = props => {
	const {
		before,
		current,
		positiveTrend,
		fontSize,
		iconSize,
		className
	} = props;
	const { trend } = getTrendAndDiff(before, current);

	return (
		<S.CurrentContainer
			trend={trend}
			positiveTrend={positiveTrend}
			className={className}
		>
			<S.CurrentText size={fontSize} text={current.toLocaleString()} />
			{trend !== 0 && (
				<S.ArrowIcon
					data-testid='CasesAmount.ArrowIcon'
					type={IconsEnum.Arrow}
					trend={trend}
					iconSize={iconSize!}
				/>
			)}
		</S.CurrentContainer>
	);
};

CasesAmount.defaultProps = {
	fontSize: 's16',
	iconSize: '1rem'
};

const S = {
	CurrentContainer: styled.div<{
		trend: number;
		positiveTrend: PositiveTrendEnum;
	}>`
		display: flex;
		align-items: center;
		color: ${({ trend, theme, positiveTrend }) =>
			trend === 0 || positiveTrend === PositiveTrendEnum.NONE
				? theme.colors.blue2
				: getTrendColor(positiveTrend, trend)};
	`,
	CurrentText: styled(CustomText)`
		margin: 0.4rem 0 0.6rem 0;
		color: currentColor;
	`,
	ArrowIconContainer: styled.div``,
	ArrowIcon: styled(Icon)<{ trend: number; iconSize: string }>`
		margin-right: 0.5rem;
		width: ${({ iconSize }) => iconSize};
		height: ${({ iconSize }) => iconSize};
		transform: ${({ trend }) => `rotate(${trend === 1 ? 0 : 180}deg)`};
		fill: currentColor;
		transition: transform 0.3s;
	`
};
