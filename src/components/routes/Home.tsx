import React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';

interface IProps extends RouteComponentProps {}

const Home: React.FC<IProps> = () => {
	return <S.Container></S.Container>;
};

const S: any = {};
S.Container = styled.div`
	display: flex;
`;

export default Home;
