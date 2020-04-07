import React from 'react';
import styled from 'styled-components/macro';
import Router from './Router';

interface IProps {}

const App: React.FC<IProps> = () => {
	return (
		<S.Container>
			<Router />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
	`
};

export default App;
