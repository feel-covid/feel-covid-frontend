import React from 'react';
import styled from 'styled-components/macro';
import { IconsEnum, PositiveFactorEnum } from '../../../@types/enums';
import { getTrendColor } from './utils/getTrendColor';
import CustomText from '../CustomText/CustomText';
import { Icon } from '../Icon/Icon';
import { getTrendAndDiff } from '../../../utils/getTrendAndDiff';
import { IFontSizes } from '../../../@types/declarations/styled';
import { IStyle } from '../../../@types/interfaces';

interface IProps extends IStyle {
	positiveFactor: PositiveFactorEnum;
	current: number;
	before: number;
	fontSize?: keyof IFontSizes;
	iconSize?: string;
}

export const CasesAmount: React.FC<IProps> = (props) => {
	const {
		before,
		current,
		positiveFactor,
		fontSize,
		iconSize,
		className
	} = props;
	const { trend } = getTrendAndDiff(before, current);

	return (
		<S.CurrentContainer
			trend={trend}
			positiveFactor={positiveFactor}
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
		positiveFactor: PositiveFactorEnum;
	}>`
		display: flex;
		align-items: center;
		color: ${({ trend, theme, positiveFactor }) =>
			trend === 0 || positiveFactor === PositiveFactorEnum.NONE
				? theme.colors.blue2
				: getTrendColor(positiveFactor, trend)};
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
