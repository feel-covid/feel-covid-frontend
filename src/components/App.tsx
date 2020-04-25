import React, { useEffect } from 'react';
import Router from './Routes';
import { Header } from './shared/Header/Header';
import { useCountryData } from '../hooks/useCountryData';
import { hideLoadingSpinner } from '../utils/hideLoadingSpinner';
import { CustomCompare } from './shared/CustomCompare/CustomCompare';

interface IProps {}

const App: React.FC<IProps> = () => {
	const { loading } = useCountryData();

	useEffect(() => {
		hideLoadingSpinner();
	}, [loading]);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			document.title = 'Dev - Feel';
		}
	}, []);

	return (
		<>
			<Header />
			<Router />
			<CustomCompare />
		</>
	);
};

export default App;
