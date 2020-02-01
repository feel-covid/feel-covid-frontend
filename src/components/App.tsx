import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { afterTwoTicks } from '../utils';
import { TextInput } from './shared/Form';

interface IProps {}

const App: React.FC<IProps> = props => {
	useEffect(() => {
		afterTwoTicks(() => {});
	}, []);

	const { t } = useTranslation();
	return (
		<S.Container>
			<TextInput />
		</S.Container>
	);
};

const S: any = {};
S.Container = styled.div`
	display: flex;
`;

export default App;
