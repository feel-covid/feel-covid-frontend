import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../../../@types/enums';
import { IOverviewCard, Overview } from '../../Overview/Overview';
import { TreatmentTypeChart } from '../../Charts/TreatmentTypeChart/TreatmentTypeChart';
import media from '../../../../../themes/media';
import { CasesChart } from '../../Charts/CasesChart/CasesChart';

interface IProps {}

export const Treatment: React.FC<IProps> = (props) => {
	const { t } = useTranslation();

	const categories = useMemo<IOverviewCard[]>(() => {
		return [
			{
				title: t('global.treatment.hospital'),
				path: 'treatment.hospital',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.treatment.homeHotelUndecided'),
				path: 'treatment.combinedHomeHotelUndecided',
				positiveFactor: PositiveFactorEnum.NONE
			}
		];
	}, []);

	return <S.Overview cards={categories} />;
};

const S = {
	Overview: styled(Overview)`
		width: 100%;
		grid-template-columns: repeat(1, 1fr);
		display: grid;

		${media.tablet`
			display: none;
		`}
	`
};
