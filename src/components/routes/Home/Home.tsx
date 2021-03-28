import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';
import { PaddingContainer } from '../../shared/PaddingContainer/PaddingContainer';
import { TotalCases } from './DataCategories/TotalCases/TotalCases';
import { TreatmentCards } from './DataCategories/TreatmentCards/TreatmentCards';
import { DailyDiffChart } from './Charts/DailyDiffChart/DailyDiffChart';
import media from '../../../themes/media';
import { useCountryDataContext } from '../../providers/CountryDataProvider/hooks/useCountryDataContext';
import { hideLoadingSpinner } from '../../../utils/hideLoadingSpinner';
import { TestsAmountChart } from './Charts/TestsAmountChart/TestsAmountChart';
import { TreatmentTypeChart } from './Charts/TreatmentTypeChart/TreatmentTypeChart';
import { CasesChart } from './Charts/CasesChart/CasesChart';
import { useTogglesContext } from '../../providers/TogglesProvider/hooks/useTogglesContext';
import { TogglesActions } from '../../providers/TogglesProvider/reducer';
import CustomCompare from './CustomCompare/CustomCompare';
import { Header } from './Header/Header';
import { Footer } from '../../Layout/Footer/Footer';
import { VaccinationsChart } from './Charts/VaccinationsChart/VaccinationsChart';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	const { loading } = useCountryDataContext();
	const totalCasesRef = useRef<HTMLDivElement>(null);
	const { dispatch } = useTogglesContext();

	useEffect(() => {
		if (!loading) {
			hideLoadingSpinner();
		}
	}, [loading]);

	useEffect(() => {
		if ('IntersectionObserver' in window) {
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						const { isIntersecting } = entry;
						dispatch({
							type: TogglesActions.SET_SHOW_SUB_HEADER,
							payload: isIntersecting
						});
					});
				},
				{ threshold: 0.15 }
			);

			if (totalCasesRef.current) {
				observer.observe(totalCasesRef.current);
			}
		}
	}, []);

	const children = useMemo(() => {
		return (
			<>
				<Header />
				<main>
					<PaddingContainer>
						<S.Container>
							<TotalCases ref={totalCasesRef} />
							<S.ChartsContainer>
								<VaccinationsChart />
								<CasesChart />
								<TreatmentTypeChart />
								<TreatmentCards />
								<TestsAmountChart />
								<DailyDiffChart />
							</S.ChartsContainer>
						</S.Container>
					</PaddingContainer>
				</main>
				<Footer />

				<CustomCompare />
			</>
		);
	}, [loading]);

	return children;
};

const S = {
	Container: styled.div`
		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 0.8rem 1rem;
		transition: 0.3s;
	`,
	ChartsContainer: styled.div`
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 0.8rem;
		width: 100%;
		margin: 0.8rem 0;

		@media (max-width: 1150px) {
			grid-template-columns: repeat(2, 1fr);
		}

		${media.tablet`
			grid-template-columns: 1fr;
		`}
	`
};

export default Home;
