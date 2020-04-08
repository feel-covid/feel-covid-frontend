import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PositiveFactorEnum } from '../../../@types/enums';
import { Overview } from '../Overview/Overview';

interface IProps {}

export const TreatmentOverview: React.FC<IProps> = (props) => {
	const { t } = useTranslation();

	const treatmentCards = useMemo(() => {
		return [
			{
				title: t('global.treatment.hospital'),
				path: 'treatment.hospital',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.treatment.hotel'),
				path: 'treatment.hotel',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.treatment.home'),
				path: 'treatment.home',
				positiveFactor: PositiveFactorEnum.INCREASE
			},
			{
				title: t('global.treatment.undecided'),
				path: 'treatment.undecided',
				positiveFactor: PositiveFactorEnum.DECREASE
			}
		];
	}, []);

	return <Overview cards={treatmentCards} />;
};
