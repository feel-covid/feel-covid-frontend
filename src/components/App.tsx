import React from 'react';
import styled from 'styled-components/macro';
import Router from './Router';
import { Header } from './shared/Header/Header';

interface IProps {}

const App: React.FC<IProps> = () => {
	return (
		<S.Container>
			<Header />
			<Router />
		</S.Container>
	);
};

const S = {
	Container: styled.div``
};

export default App;
