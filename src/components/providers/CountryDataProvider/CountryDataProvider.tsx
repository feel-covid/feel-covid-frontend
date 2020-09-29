import React from 'react';
import { IChildren } from '../../../@types/interfaces';
import { useRequest } from '../../../hooks';
import { CountryDataContext } from './context';
import { normalizeChartData, normalizeCountryData } from './utils';
import subDays from 'date-fns/subDays';
import { startOfDay, isWithinInterval, subMonths } from 'date-fns';
import { INormalizedCountryData } from './interfaces';

interface IProps extends IChildren {}

export const CountryDataProvider: React.FC<IProps> = ({ children }) => {
	const now = new Date();

	const {
		loading,
		error,
		data: [{ data }]
	} = useRequest(
		[
			{
				route: '/country/data',
				params: {
					startDate: JSON.stringify(subMonths(subDays(now, 1), 1)),
					endDate: JSON.stringify(now),
					name: 'israel'
				},
				initialDataValue: []
			}
		],
		[]
	);

	if (loading) return null;

	const { dailyIRD, dailyTestAmount, hourlyUpdates } = data;

	const normalizedData = hourlyUpdates.map(normalizeCountryData);

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
				normalizedData,
				normalizedChartData: normalizeChartData(normalizedData),
				dailyIRD,
				weekAgoIndexOnNormalizedData,
				testsData: dailyTestAmount,
				chartSliceIndex: -8
			}}
		>
			{children}
		</CountryDataContext.Provider>
	);
};
