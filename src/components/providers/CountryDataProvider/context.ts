import React from 'react';
import {
	IDailyVaccination,
	INormalizedCountryData,
	ITestAmountData
} from './interfaces';

export interface ICountryDataContext {
	loading: boolean;
	error: typeof Error | null;
	dailyIRD: Array<{
		infected: number;
		recovered: number;
		deceased: number;
	}>;
	testsData: ITestAmountData;
	normalizedData: Array<INormalizedCountryData>;
	normalizedChartData: Array<INormalizedCountryData>;
	dailyVaccinations: Array<IDailyVaccination>;
	weekAgoIndexOnNormalizedData: number;
	chartSliceIndex: number;
}

export const CountryDataContext = React.createContext<ICountryDataContext>({
	loading: true,
	error: null,
	testsData: {
		data: [] as any,
		total: 0
	},
	dailyIRD: [],
	normalizedData: [],
	normalizedChartData: [],
	dailyVaccinations: [],
	weekAgoIndexOnNormalizedData: 0,
	chartSliceIndex: 0
});
