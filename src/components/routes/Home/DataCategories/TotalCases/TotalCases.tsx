import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { PositiveTrendEnum } from '../../../../../@types/enums';
import { ITile, Tiles } from '../../Tiles/Tiles';
import media from '../../../../../themes/media';

interface IProps {}

export const TotalCases = React.forwardRef<HTMLDivElement, IProps>(
	(props, ref) => {
		const { t } = useTranslation();

		const categories: ITile[] = [
			{
				title: t('global.cases.confirmedCases'),
				path: 'total',
				positiveTrend: PositiveTrendEnum.DECREASE
			},
			{
				title: t('global.cases.currently'),
				path: 'active',
				positiveTrend: PositiveTrendEnum.DECREASE
			},
			{
				title: t('global.cases.lightCondition'),
				path: 'light',
				positiveTrend: PositiveTrendEnum.DECREASE,
				tooltip: t('dataCards.lightCondition.tooltip')
			},
			{
				title: t('global.cases.midCondition'),
				path: 'mid',
				positiveTrend: PositiveTrendEnum.DECREASE
			},
			{
				title: t('global.cases.severeCondition'),
				path: 'severe.cases',
				positiveTrend: PositiveTrendEnum.DECREASE
			},
			{
				title: t('global.cases.intubated'),
				path: 'severe.intubated',
				positiveTrend: PositiveTrendEnum.DECREASE
			},
			{
				title: t('global.cases.deceased'),
				path: 'deceased',
				positiveTrend: PositiveTrendEnum.DECREASE
			},
			{
				title: t('global.cases.recovered'),
				path: 'recovered',
				positiveTrend: PositiveTrendEnum.INCREASE
			},
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

		return (
			<S.Container ref={ref}>
				<S.Tiles cards={categories} />
			</S.Container>
		);
	}
);

TotalCases.displayName = 'TotalCases';

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
	`,
	Tiles: styled(Tiles)`
		grid-template-columns: repeat(8, 1fr);
		display: grid;
		width: 100%;

		& > div:nth-child(9),
		& > div:nth-child(10) {
			display: none;
		}

		${media.smallDesktop`
				grid-template-columns: repeat(4, 1fr);
				justify-content: stretch;
				grid-auto-flow: dense;
		`};

		${media.tablet`
				grid-template-columns: repeat(2, 1fr);
				grid-auto-rows: auto;
				
				
				& > div:nth-child(9),
				& > div:nth-child(10) {
					display: flex;
				}
		`};
	`
};
