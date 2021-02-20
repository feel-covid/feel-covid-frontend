import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { PositiveTrendEnum } from '../../../../../@types/enums';
import { ITile, Tiles } from '../../Tiles/Tiles';
import media from '../../../../../themes/media';

interface IProps {}

export const TreatmentCards: React.FC<IProps> = props => {
	const { t } = useTranslation();

	const categories: ITile[] = [
		{
			title: t('global.treatment.hospital'),
			path: 'treatment.hospital',
			positiveTrend: PositiveTrendEnum.DECREASE
		},
		{
			title: t('global.treatment.hotel'),
			path: 'treatment.hotel',
			positiveTrend: PositiveTrendEnum.NONE
		}
	];

	return <S.Overview cards={categories} />;
};

const S = {
	Overview: styled(Tiles)`
		width: 100%;
		grid-template-columns: repeat(1, 1fr);
		display: grid;

		@media (max-width: 1150px) {
			grid-row: 3;
			grid-column: 2;
		}

		${media.tablet`
			display: none;
		`}
	`
};
