import React from 'react';
import styled from 'styled-components/macro';
import CustomText from '../../../shared/CustomText/CustomText';
import { getDiffDescription } from './utils/getDiffDescription';
import { IconsEnum, PositiveTrendEnum } from '../../../../@types/enums';
import { CasesAmount } from '../../../shared/CasesAmount/CasesAmount';
import { Tooltip } from '../../../shared/Tooltip/Tooltip';
import { Icon } from '../../../shared/Icon/Icon';

interface IProps {
	title: string;
	current: number;
	before: number;
	positiveTrend: PositiveTrendEnum;
	tooltip?: string;
}

const DataPointTile: React.FC<IProps> = props => {
	const { title, current, before, positiveTrend, tooltip } = props;
	const { description } = getDiffDescription({
		before,
		current
	});

	return (
		<S.Container>
			<S.TitleAndTooltipContainer>
				<CustomText text={title} />
				{tooltip && (
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					<S.TooltipContainer onClick={() => {}}>
						<S.Tooltip content={tooltip}>
							<S.InfoIcon type={IconsEnum.MoreInformation} />
						</S.Tooltip>
					</S.TooltipContainer>
				)}
			</S.TitleAndTooltipContainer>

			<CasesAmount
				positiveTrend={positiveTrend}
				current={current}
				before={before}
				fontSize='s32'
				iconSize='1.5rem'
			/>
			<CustomText size='s14' text={description} color='gray2' />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		background: ${({ theme }) => theme.colors.darkBlue2};
		box-shadow: ${({ theme }) => `0 0 .6rem ${theme.colors.lightBlack1}`};
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 2.3rem 0;
		border-radius: 0.4rem;
		flex: 1;
		position: relative;

		span {
			text-align: center;
		}
	`,
	TitleAndTooltipContainer: styled.div`
		position: relative;
		display: flex;
	`,
	InfoIcon: styled(Icon)`
		width: 1.8rem;
		height: 1.8rem;
	`,
	TooltipContainer: styled.div`
		fill: ${({ theme }) => theme.colors.white};
		line-height: 0;
		margin-right: 0.5rem;
		transform: translateY(0.255rem);
		z-index: 10;
	`,
	Tooltip: styled(Tooltip)`
		width: 22rem;
		z-index: 100;
		bottom: -0.4rem;
		transform: translate(-50%, 100%);
		line-height: initial;
		color: ${({ theme }) => theme.colors.white};
		padding: 0.8rem 1rem;
		text-align: center;
	`
};

export default DataPointTile;
