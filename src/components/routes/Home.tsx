import React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';
import { CasesOverview } from '../shared/CasesOverview/CasesOverview';
import { TreatmentOverview } from '../shared/TreatmentOverview/TreatmentOverview';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	return (
		<S.Container>
			<CasesOverview />
			<TreatmentOverview />
		</S.Container>
	);
};

const S: any = {};
S.Container = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	justify-content: center;
`;

export default Home;
