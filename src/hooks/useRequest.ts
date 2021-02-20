import { useEffect, useState } from 'react';
import { DynamicObject } from '../@types/interfaces';
import * as Sentry from '@sentry/browser';

interface IRequestParams {
	method?: string;
	params?: DynamicObject<any>;
	route: string;
	initialDataValue?: any;
}

const useRequest = (requests: Array<IRequestParams>, deps: Array<any> = []) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState(requests.map(req => req.initialDataValue));

	useEffect(() => {
		const requestResources = async () => {
			try {
				const requestPromises = requests.map(req => {
					const { method = 'GET', params = {}, route } = req;

					const url = new URL(`${process.env.REACT_APP_BASE_URL}${route}`);
					url.search = new URLSearchParams(params).toString();

					return fetch(String(url), {
						method,
						credentials: 'same-origin'
					}).then(res => res.json());
				});

				const results = await Promise.all(requestPromises);

				setData(results);
			} catch (ex) {
				Sentry.captureException(ex);
				setError(ex);
			} finally {
				setLoading(false);
			}
		};

		requestResources();
	}, deps);

	return { loading, error, data };
};

export default useRequest;
