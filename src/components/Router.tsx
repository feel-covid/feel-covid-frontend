import React from 'react';
import Home from './routes/Home';
import UserProfile from './routes/UserProfile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

interface IProps {}

const _Router: React.FC<IProps> = () => {
	return (
		<Router>
			<Route exact path='/' component={Home} />
			<Route exact path='/user' component={UserProfile} />
		</Router>
	);
};

export default _Router;
