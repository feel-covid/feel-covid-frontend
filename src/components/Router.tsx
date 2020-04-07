import React from 'react';
import Home from './routes/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

interface IProps {}

const _Router: React.FC<IProps> = () => {
	return (
		<Router>
			<Route exact path='/' component={Home} />
		</Router>
	);
};

export default _Router;
