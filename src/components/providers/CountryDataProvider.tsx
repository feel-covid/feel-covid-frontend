import React from 'react';
import { IChildren } from '../../@types/interfaces';
import { useRequest } from '../../hooks';

export const CountryDataContext = React.createContext({});

interface IProps extends IChildren {}

export const CountryDataProvider: React.FC<IProps> = ({ children }) => {
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	const data = useRequest(
		{
			route: '/country',
			params: {
				name: 'israel',
				startDate: JSON.stringify(oneWeekAgo),
				endDate: JSON.stringify(new Date())
			}
		},
		[]
	);

	return (
		<CountryDataContext.Provider value={data}>
			{children}
		</CountryDataContext.Provider>
	);
};
