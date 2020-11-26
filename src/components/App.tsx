import React from 'react';
import Routes from './Routes';
import { Header } from './routes/Home/Header/Header';
import { CustomCompare } from './routes/Home/CustomCompare/CustomCompare';
import { Footer } from './Layout/Footer/Footer';

interface IProps {}

const App: React.FC<IProps> = () => {
	return (
		<>
			<Header />
			<Routes />
			<Footer />
			<CustomCompare />
		</>
	);
};

export default App;
