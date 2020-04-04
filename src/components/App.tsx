import React from 'react';
import styled from 'styled-components/macro';
import Router from './Router';
import { useRequest } from '../hooks';
import DataCard from './shared/DataCard/DataCard';

interface IProps {}

const App: React.FC<IProps> = () => {
	const { loading, error, data } = useRequest(
		{
			route: '/country',
			params: {
				name: 'israel',
				startDate: '2020-04-02',
				endDate: JSON.stringify(new Date())
			}
		},
		[]
	);

	if (loading) return <div>Loading...</div>;

	return (
		<S.Container>
			<DataCard title={'Dead'} current={100} before={200} />
			{loading}
			<pre>{JSON.stringify(data || {}, null, 2)}</pre>
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
