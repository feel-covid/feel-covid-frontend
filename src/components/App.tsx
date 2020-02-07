import React from 'react';
import styled from 'styled-components/macro';
import Router from './Router';

interface Props {}

const App: React.FC<Props> = () => {
	return (
		<S.Container>
			<button
				onClick={() => {
					console.log('click');
				}}
			/>
			<Router />
		</S.Container>
	);
};

const S: any = {};
S.Container = styled.div`
	display: flex;
`;

export default App;
