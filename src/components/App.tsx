import React from 'react';
import styled from 'styled-components/macro';
import Router from './Router';
import DataCard from './shared/DataCard/DataCard';
import { useTranslation } from 'react-i18next';
import { useCountryData } from '../hooks/useCountryData';
import { PositiveFactorEnum } from '../@types/enums';

interface IProps {}

const App: React.FC<IProps> = () => {
	const { t } = useTranslation();
	const data = useCountryData();

	return (
		<S.Container>
			<DataCard
				title={t('global.confirmedCases')}
				current={100}
				before={8018}
				positiveFactor={PositiveFactorEnum.DECREASE}
			/>
			<Router />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
	`
};

export default App;
