import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../../@types/enums';
import { Overview } from '../../Overview/Overview';

import { TreatmentTypeChart } from '../../Charts/TreatmentTypeChart/TreatmentTypeChart';

interface IProps {}

export const Treatment: React.FC<IProps> = (props) => {
	const { t } = useTranslation();

	const categories = useMemo(() => {
		return [
			{
				title: t('global.treatment.hospital'),
				path: 'treatment.hospital',
				positiveFactor: PositiveFactorEnum.DECREASE
			},
			{
				title: t('global.treatment.hotel'),
				path: 'treatment.hotel',
				positiveFactor: PositiveFactorEnum.NONE
			},
			{
				title: t('global.treatment.home'),
				path: 'treatment.home',
				positiveFactor: PositiveFactorEnum.NONE
			},
			{
				title: t('global.treatment.undecided'),
				path: 'treatment.undecided',
				positiveFactor: PositiveFactorEnum.NONE
			}
		];
	}, []);

	return (
		<S.Container>
			<S.Overview cards={categories} />
			<S.ChartContainer>
				<TreatmentTypeChart />
			</S.ChartContainer>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
	`,
	Overview: styled(Overview)`
		width: 50%;
		grid-template-columns: repeat(2, 1fr);
		display: grid;
	`,
	ChartContainer: styled.div`
		width: 50%;
		direction: ltr;
	`
};
