import React, { useEffect, useMemo, useRef } from 'react';
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
import { useTogglesContext } from '../../../hooks/useTogglesContext';
import { TogglesActions } from '../../providers/TogglesProvider/reducer';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	const { loading } = useCountryData();
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
				(entries, observer) => {
					entries.forEach((entry) => {
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
				<TotalCases ref={totalCasesRef} />
				<SChartsContainer style={{ margin: '0.8rem 0' }}>
					<DailyDiffChart />
					<ActiveRecoveredDeceasedChart />
					<TestsAmountChart />
					<Treatment />
					<TreatmentTypeChart />
					<CasesChart />
				</SChartsContainer>
			</>
		);
	}, [loading]);

	return (
		<PaddingContainer>
			<S.Container>{children}</S.Container>
		</PaddingContainer>
	);
};

const SChartsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 0.8rem;
	width: 100%;

	@media (max-width: 1150px) {
		grid-template-columns: repeat(2, 1fr);
	}

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
		transition: 0.3s;
	`
};

export default Home;
