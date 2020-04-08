import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PositiveFactorEnum } from '../../../@types/enums';
import { Overview } from '../Overview/Overview';

interface IProps {}

export const CasesOverview: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const casesCards = useMemo(() => {
		return [
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

	return <Overview cards={casesCards} />;
};
