import React from 'react';
import { IChildren } from '../../../@types/interfaces';
import { useRequest } from '../../../hooks';
import { CountryDataContext } from './context';
import {
	normalize24HoursDiff,
	normalizeChartData,
	normalizeCountryData
} from './utils';
import subDays from 'date-fns/subDays';
import { startOfDay, isWithinInterval } from 'date-fns';
import { INormalizedCountryData } from './interfaces';

interface IProps extends IChildren {}

export const CountryDataProvider: React.FC<IProps> = ({ children }) => {
	const now = Date.now();
	const res = useRequest(
		{
			route: '/country',
			params: {
				name: 'israel',
				startDate: JSON.stringify(subDays(now, 31)),
				endDate: JSON.stringify(now)
			},
			initialDataValue: []
		},
		[]
	);

	if (res.loading) return null;

	const normalizedData = res.data.map(normalizeCountryData);
	const normalizedChartData = normalizeChartData(normalizedData);
	const weekAgo = startOfDay(subDays(now, 7));

	const weekAgoIndexOnNormalizedData = normalizedData.reduceRight(
		(acc: number, currentStat: INormalizedCountryData, index: number) => {
			const isCurrentBetweenInterval = isWithinInterval(
				new Date(currentStat.date),
				{ start: weekAgo, end: now }
			);
			if (isCurrentBetweenInterval) {
				acc = index;
			}
			return acc;
		},
		0
	);
	const weekAgoIndexOnNormalizedChartData = Math.round(
		weekAgoIndexOnNormalizedData / 2
	);

	return (
		<CountryDataContext.Provider
			value={{
				...res,
				normalizedData,
				normalizedChartData: normalizedChartData,
				normalized24HourDiff: normalize24HoursDiff(normalizedData),
				weekAgoIndexOnNormalizedData,
				weekAgoIndexOnNormalizedChartData,
				weekAgoNegativeIndexOnNormalized24HoursDiff: -(
					normalizedChartData.length - weekAgoIndexOnNormalizedChartData
				)
			}}
		>
			{children}
		</CountryDataContext.Provider>
	);
};
