import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';
import { PaddingContainer } from '../../shared/PaddingContainer/PaddingContainer';
import { TotalCases } from './DataCategories/TotalCases/TotalCases';
import { Treatment } from './DataCategories/Treatment/Treatment';
import { ActiveRecoveredDeceasedChart } from './Charts/ActiveRecoveredDeceasedChart/ActiveRecoveredDeceasedChart';
import { DailyDiffChart } from './Charts/DailyDiffChart/DailyDiffChart';
import media from '../../../themes/media';
import { useCountryData } from '../../../hooks/useCountryData';
import { hideLoadingSpinner } from '../../../utils/hideLoadingSpinner';
import { TestsAmountChart } from './Charts/TestsAmountChart/TestsAmountChart';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	const { loading } = useCountryData();

	useEffect(() => {
		if (!loading) {
			hideLoadingSpinner();
		}
	}, [loading]);

	return (
		<PaddingContainer>
			<S.Container>
				<TotalCases />
				<S.ChartsContainer>
					<DailyDiffChart />
					<ActiveRecoveredDeceasedChart />
					<TestsAmountChart />
				</S.ChartsContainer>
				<Treatment />
			</S.Container>
		</PaddingContainer>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 0.8rem 1rem;
	`,
	ChartsContainer: styled.div`
		display: grid;
		grid-template-columns: repeat(auto-fit, 33.33%);
		padding: 3rem 1rem 5rem 1rem;
		width: 100%;

		${media.tablet`
			grid-template-columns: 1fr;
			padding: 3rem 1rem;
		`}
	`
};

export default Home;
