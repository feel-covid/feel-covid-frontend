import React from 'react';
import { IChildren } from '../../../@types/interfaces';
import { useRequest } from '../../../hooks';
import { CountryDataContext } from './context';
import {
	normalize24HoursDiff,
	normalizeChartData,
	normalizeCountryData
} from './utils';

interface IProps extends IChildren {}

export const CountryDataProvider: React.FC<IProps> = ({ children }) => {
	const oneWeekAgo = new Date();
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 9);

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

	const normalizedData = res.data.map(normalizeCountryData).slice(1);

	return (
		<CountryDataContext.Provider
			value={{
				...res,
				normalizedData,
				normalizedChartData: normalizeChartData(normalizedData),
				normalized24HourDiff: normalize24HoursDiff(normalizedData)
			}}
		>
			{children}
		</CountryDataContext.Provider>
	);
};
