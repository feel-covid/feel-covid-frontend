import React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';
import { PaddingContainer } from '../shared/PaddingContainer/PaddingContainer';
import { TotalCases } from '../shared/DataCategories/TotalCases/TotalCases';
import { Treatment } from '../shared/DataCategories/Treatment/Treatment';
import { ActiveRecoveredDeceasedChart } from '../shared/Charts/ActiveRecoveredDeceasedChart/ActiveRecoveredDeceasedChart';
import { CasesChart } from '../shared/Charts/CasesChart/CasesChart';
import { DailyInfectedChart } from '../shared/Charts/DailyInfectedChart/DailyInfectedChart';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	return (
		<PaddingContainer>
			<S.Container>
				<TotalCases />
				<S.ChartsContainer>
					<DailyInfectedChart />
					<ActiveRecoveredDeceasedChart />
					<CasesChart />
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
		padding-bottom: 20rem;
	`,
	ChartsContainer: styled.div`
		height: 30rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, 33%);
		direction: ltr;
		padding: 0 1rem;
		width: 100%;
	`
};

export default Home;
