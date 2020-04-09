import React from 'react';
import { IChildren } from '../../../@types/interfaces';
import { useRequest } from '../../../hooks';
import { CountryDataContext } from './context';
import { normalizeChartData, normalizeCountryData } from './utils';

interface IProps extends IChildren {}

export const CountryDataProvider: React.FC<IProps> = ({ children }) => {
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

	const res = useRequest(
		{
			route: '/country',
			params: {
				name: 'israel',
				startDate: JSON.stringify(oneWeekAgo),
				endDate: JSON.stringify(new Date())
			},
			initialDataValue: []
		},
		[]
	);

	if (res.loading) return null;

	const normalizedData = res.data.map(normalizeCountryData);

	return (
		<CountryDataContext.Provider
			value={{
				...res,
				normalizedData,
				normalizedChartData: normalizeChartData(normalizedData)
			}}
		>
			{children}
		</CountryDataContext.Provider>
	);
};
