import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../../../@types/enums';
import { IOverviewCard, Overview } from '../../Overview/Overview';
import { TreatmentTypeChart } from '../../Charts/TreatmentTypeChart/TreatmentTypeChart';
import media from '../../../../../themes/media';

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

	return (
		<S.Container>
			<S.Overview cards={categories} />
			<TreatmentTypeChart />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: grid;
		grid-template-columns: 40% 60%;
		width: 100%;

		${media.tablet`
			grid-template-columns: 1fr;
		`}
	`,
	Overview: styled(Overview)`
		width: 100%;
		grid-template-columns: repeat(1, 1fr);
		display: grid;

		${media.tablet`
			grid-template-columns: repeat(2, 1fr);
		`}
	`,
	ChartContainer: styled.div`
		direction: ltr;
	`
};
