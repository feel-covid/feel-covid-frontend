import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';
import { useCountryData } from '../../../hooks/useCountryData';
import { CasesAmount } from '../CasesAmount/CasesAmount';
import { PositiveFactorEnum } from '../../../@types/enums';
import { HeaderFilter } from './HeaderFilter/HeaderFilter';

interface IProps {}

export const Header: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { normalizedData } = useCountryData();
	const [prevUpdate, currentUpdate] = normalizedData.slice(-2);
	return (
		<S.Header>
			<S.Title text={t('header.title')!} />
			<HeaderFilter />
			<S.ConfirmedCasesContainer>
				<S.ConfirmedCasesText text={`${t('global.cases.confirmedCases')}:`} />
				<S.CasesAmount
					positiveFactor={PositiveFactorEnum.DECREASE}
					current={currentUpdate.total}
					before={prevUpdate.total}
				/>
			</S.ConfirmedCasesContainer>
		</S.Header>
	);
};

const S = {
	Header: styled.header`
		display: flex;
		background: ${({ theme }) => theme.colors.white};
		padding: 1.2rem 2rem;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
		position: sticky;
		top: 0;
		z-index: 100;
	`,
	Title: styled(CustomText)`
		font-weight: bold;
	`,
	ConfirmedCasesContainer: styled.div`
		display: flex;
		align-items: center;
	`,
	CasesAmount: styled(CasesAmount)`
		transform: translateY(0.1rem);
	`,
	ConfirmedCasesText: styled(CustomText)`
		margin-left: 0.8rem;
	`
};
