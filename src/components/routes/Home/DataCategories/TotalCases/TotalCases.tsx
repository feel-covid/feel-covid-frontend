import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../../../@types/enums';
import { IOverviewCard, Overview } from '../../Overview/Overview';
import media from '../../../../../themes/media';

interface IProps {}

export const TotalCases: React.FC<IProps> = (props) => {
	const { t } = useTranslation();

	const categories = useMemo<IOverviewCard[]>(() => {
		return [
			{
				title: t('global.cases.confirmedCases'),
				path: 'total',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.cases.currently'),
				path: 'active',
				positiveFactor: PositiveFactorEnum.DECREASE
			},

			{
				title: t('global.cases.lightCondition'),
				path: 'light',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.cases.midCondition'),
				path: 'mid',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.cases.severeCondition'),
				path: 'severe.cases',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.cases.intubated'),
				path: 'severe.intubated',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.cases.recovered'),
				path: 'recovered',
				positiveFactor: PositiveFactorEnum.INCREASE
			},
			{
				title: t('global.cases.deceased'),
				path: 'deceased',
				positiveFactor: PositiveFactorEnum.DECREASE
			}
		];
	}, []);

	return (
		<S.Container>
			<S.Overview cards={categories} />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
	`,
	Overview: styled(Overview)`
		grid-template-columns: repeat(8, 1fr);
		display: grid;
		width: 100%;

		${media.smallDesktop`
				grid-template-columns: repeat(4, 1fr);
				justify-content: stretch;
				grid-auto-flow: dense;
		`};

		${media.tablet`
				grid-template-columns: repeat(2, 1fr);
				grid-auto-rows: auto;
		`};
	`
};
