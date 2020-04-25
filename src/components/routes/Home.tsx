import React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';
import { PaddingContainer } from '../shared/PaddingContainer/PaddingContainer';
import { TotalCases } from '../shared/DataCategories/TotalCases/TotalCases';
import { Treatment } from '../shared/DataCategories/Treatment/Treatment';
import { ActiveRecoveredDeceasedChart } from '../shared/Charts/ActiveRecoveredDeceasedChart/ActiveRecoveredDeceasedChart';
import { CasesChart } from '../shared/Charts/CasesChart/CasesChart';
import { DailyDiffChart } from '../shared/Charts/DailyDiffChart/DailyDiffChart';
import media from '../../themes/media';
import { Footer } from '../shared/Footer/Footer';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	return (
		<PaddingContainer>
			<S.Container>
				<TotalCases />
				<S.ChartsContainer>
					<DailyDiffChart />
					<ActiveRecoveredDeceasedChart />
					<CasesChart />
				</S.ChartsContainer>
				<Treatment />
			</S.Container>
			<Footer />
		</PaddingContainer>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 0.8rem 1rem;
		margin-top: 5.6rem;
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
