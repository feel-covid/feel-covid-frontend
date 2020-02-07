import React from 'react';
import { Router } from '@reach/router';
import Home from './routes/Home';
import UserProfile from './routes/UserProfile';

interface IProps {}

const _Router: React.FC<IProps> = (props) => {
	return (
		<Router>
			<Home path='/' />
			<UserProfile path='/user' />
		</Router>
	);
};

export default _Router;
