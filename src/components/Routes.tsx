import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutesEnum } from '../@types/enums';

const Home = lazy(() => import('./routes/Home/Home'));

interface IProps {}

const Routes: React.FC<IProps> = () => {
	return (
		<main>
			<Suspense fallback={null}>
				<Switch>
					<Route exact path={RoutesEnum.HOME} component={Home} />
				</Switch>
			</Suspense>
		</main>
	);
};

export default Routes;
