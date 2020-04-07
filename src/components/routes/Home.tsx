import React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';
import { PositiveFactorEnum } from '../../@types/enums';
import DataCard from '../shared/DataCard/DataCard';
import { useTranslation } from 'react-i18next';
import { useCountryData } from '../../hooks/useCountryData';
import { normalizeCountryData } from '../../utils/normalizeCountryData';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	const { t } = useTranslation();
	const { error, loading, data } = useCountryData();

	const [prevUpdate, currentUpdate] = data.slice(-2);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<S.Container>
			<DataCard
				title={t('global.confirmedCases')}
				current={normalizeCountryData(currentUpdate).total}
				before={normalizeCountryData(prevUpdate).total}
				positiveFactor={PositiveFactorEnum.DECREASE}
			/>

			<DataCard
				title='במצב קל'
				current={normalizeCountryData(currentUpdate).light}
				before={normalizeCountryData(prevUpdate).light}
				positiveFactor={PositiveFactorEnum.DECREASE}
			/>

			<DataCard
				title='במצב בינוני'
				current={normalizeCountryData(currentUpdate).mid}
				before={normalizeCountryData(prevUpdate).mid}
				positiveFactor={PositiveFactorEnum.DECREASE}
			/>

			<DataCard
				title='במצב קשה'
				current={normalizeCountryData(currentUpdate).severe.cases}
				before={normalizeCountryData(prevUpdate).severe.cases}
				positiveFactor={PositiveFactorEnum.DECREASE}
			/>

			<DataCard
				title='מונשמים'
				current={normalizeCountryData(currentUpdate).severe.intubated!}
				before={normalizeCountryData(prevUpdate).severe.intubated!}
				positiveFactor={PositiveFactorEnum.DECREASE}
			/>

			<DataCard
				title='מחלימים'
				current={normalizeCountryData(currentUpdate).recovered}
				before={normalizeCountryData(prevUpdate).recovered}
				positiveFactor={PositiveFactorEnum.INCREASE}
			/>
		</S.Container>
	);
};

const S: any = {};
S.Container = styled.div`
	display: flex;
`;

export default Home;
