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
import { startOfDay, isWithinInterval, subMonths } from 'date-fns';
import { INormalizedCountryData } from './interfaces';

interface IProps extends IChildren {}

export const CountryDataProvider: React.FC<IProps> = ({ children }) => {
	const now = new Date();

	const requestParams = {
		startDate: JSON.stringify(subMonths(subDays(now, 1), 1)),
		endDate: JSON.stringify(now),
		name: 'israel'
	};

	const {
		loading,
		error,
		data: [statsResponse, testsResponse]
	} = useRequest(
		[
			{
				route: '/country/stats',
				params: requestParams,
				initialDataValue: []
			},
			{
				route: '/country/tests',
				params: {
					...requestParams,
					startDate: JSON.stringify(subDays(now, 15))
				},
				initialDataValue: []
			}
		],
		[]
	);

	if (loading) return null;

	const normalizedData = statsResponse.map(normalizeCountryData);

	const weekAgoFromLastUpdate = startOfDay(
		subDays(new Date(normalizedData[normalizedData.length - 1].date), 7)
	);

	const weekAgoIndexOnNormalizedData = normalizedData.reduceRight(
		(acc: number, currentStat: INormalizedCountryData, index: number) => {
			const isCurrentBetweenInterval = isWithinInterval(
				new Date(currentStat.date),
				{ start: weekAgoFromLastUpdate, end: now }
			);
			if (isCurrentBetweenInterval) {
				acc = index;
			}
			return acc;
		},
		0
	);

	return (
		<CountryDataContext.Provider
			value={{
				error,
				loading,
				data: statsResponse,
				normalizedData,
				normalizedChartData: normalizeChartData(normalizedData),
				normalized24HourDiff: normalize24HoursDiff(normalizedData),
				weekAgoIndexOnNormalizedData,
				weekAgoIndexOnNormalizedChartData: -8,
				weekAgoNegativeIndexOnNormalized24HoursDiff: -8,
				testsData: testsResponse
			}}
		>
			{children}
		</CountryDataContext.Provider>
	);
};
