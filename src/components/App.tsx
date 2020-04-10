import React from 'react';
import styled from 'styled-components/macro';
import Router from './Router';
import { Header } from './shared/Header/Header';
import { useHideSpinner } from '../hooks/setup/useHideSpinner';

interface IProps {}

const App: React.FC<IProps> = () => {
	useHideSpinner();

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
