import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CustomText from '../../../../shared/CustomText/CustomText';
import { Icon } from '../../../../shared/Icon/Icon';
import { IconsEnum } from '../../../../../@types/enums';
import { Select } from '../../../../shared/Form/Select';
import { StateUpdaterFunction } from '../../../../../@types/interfaces';
import { useCountryData } from '../../../../../hooks/useCountryData';

interface IProps {
	setStatsBackCount: StateUpdaterFunction<number>;
}

export const CustomCompareHeader: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { chartSliceIndex } = useCountryData();

	return (
		<S.Container>
			<CustomText text={t('customCompare.header.title') as string} />
			<S.SelectAndCloseContainer>
				<S.Select
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						props.setStatsBackCount(Number(e.target.value));
					}}
				>
					<option value={chartSliceIndex}>מהשבוע האחרון</option>
					<option value='0'>מהחודש האחרון</option>
				</S.Select>

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
		padding-right: 1rem;
		background: ${({ theme }) => theme.colors.darkBlue2};
		box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
		z-index: 1;
		justify-content: space-between;
	`,
	CloseIconContainer: styled.div`
		cursor: pointer;
		padding: 0 1rem;
		height: 100%;
		display: flex;
		align-items: center;
		margin-right: 0.7rem;
	`,
	CloseIcon: styled(Icon)`
		fill: ${({ theme }) => theme.colors.white};
		pointer-events: none;
	`,
	SelectAndCloseContainer: styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	`,
	Select: styled(Select)`
		padding-left: 2rem;
	`
};
