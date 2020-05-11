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
import { TreatmentTypeChart } from './Charts/TreatmentTypeChart/TreatmentTypeChart';
import { CasesChart } from './Charts/CasesChart/CasesChart';

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
				<SChartsContainer style={{ margin: '0.8rem 0' }}>
					<DailyDiffChart />
					<ActiveRecoveredDeceasedChart />
					<TestsAmountChart />
				</SChartsContainer>
				<SChartsContainer>
					<Treatment />
					<TreatmentTypeChart />
					<CasesChart />
				</SChartsContainer>
			</S.Container>
		</PaddingContainer>
	);
};

const SChartsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 0.8rem;
	width: 100%;

	${media.tablet`
			grid-template-columns: 1fr;
		`}
`;

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 0.8rem 1rem;
	`
};

export default Home;
