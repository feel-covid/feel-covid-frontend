import { useEffect, useState } from 'react';
import { DynamicObject } from '../@types/interfaces';

interface IRequestParams {
	method?: string;
	params?: DynamicObject<any>;
	route: string;
	initialDataValue?: any;
}

const useRequest = (_params: IRequestParams, deps: Array<any> = []) => {
	const {
		method = 'GET',
		params = {},
		route,
		initialDataValue = null
	} = _params;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState(initialDataValue);

	const url = new URL(`${process.env.REACT_APP_BASE_URL}${route}`);
	url.search = new URLSearchParams(params).toString();

	useEffect(() => {
		fetch((url as unknown) as string, {
			method,
			credentials: 'same-origin'
		})
			.then((res: Response) => res.json())
			.then(setData)
			.catch(setError)
			.finally(() => setLoading(false));
	}, deps);

	return { loading, error, data };
};

export default useRequest;
