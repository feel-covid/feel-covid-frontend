import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Router from './Routes';
import { Header } from './shared/Header/Header';
import { useHideSpinner } from '../hooks/setup/useHideSpinner';

interface IProps {}

const App: React.FC<IProps> = () => {
	useHideSpinner();

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			document.title = 'Dev - Feel';
		}
	}, []);

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
