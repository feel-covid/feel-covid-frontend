import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CustomText from '../../CustomText/CustomText';
import { Icon } from '../../Icon/Icon';
import { IconsEnum } from '../../../../@types/enums';
import { Select } from '../../Form/Select';
import { StateUpdaterFunction } from '../../../../@types/interfaces';
import { useCountryData } from '../../../../hooks/useCountryData';

interface IProps {
	setStatsBackCount: StateUpdaterFunction<number>;
}

export const CustomCompareHeader: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { weekAgoIndexOnNormalizedChartData } = useCountryData();

	return (
		<S.Container>
			<CustomText text={t('customCompare.header.title') as string} />
			<S.SelectAndCloseContainer>
				<Select
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						props.setStatsBackCount(Number(e.target.value));
					}}
				>
					<option value={weekAgoIndexOnNormalizedChartData}>
						מהשבוע האחרון
					</option>
					<option value='0'>מהחודש האחרון</option>
				</Select>

				<S.CloseIconContainer id='custom-compare-close-icon'>
					<S.CloseIcon type={IconsEnum.Close} />
				</S.CloseIconContainer>
			</S.SelectAndCloseContainer>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
		height: 5.6rem;
		flex-shrink: 0;
		font-weight: bold;
		align-items: center;
		padding: 0 1rem 0 0;
		background: ${({ theme }) => theme.colors.darkBlue2};
		box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
		z-index: 1;
		justify-content: space-between;
	`,
	CloseIconContainer: styled.div`
		cursor: pointer;
		padding: 0 2rem 0 1rem;
		transform: translateY(0.22rem);
	`,
	CloseIcon: styled(Icon)`
		fill: ${({ theme }) => theme.colors.white};
		pointer-events: none;
	`,
	SelectAndCloseContainer: styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
	`
};
