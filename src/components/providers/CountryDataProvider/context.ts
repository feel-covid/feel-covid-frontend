import React from 'react';
import {
	ICountry,
	INormalized24HoursDiff,
	INormalizedCountryData
} from './interfaces';

export interface ICountryDataContext {
	loading: boolean;
	error: typeof Error | null;
	data: Array<ICountry>;
	normalizedData: Array<INormalizedCountryData>;
	normalizedChartData: Array<INormalizedCountryData>;
	normalized24HourDiff: Array<INormalized24HoursDiff>;
	weekAgoIndexOnNormalizedData: number;
	weekAgoIndexOnNormalizedChartData: number;
	weekAgoNegativeIndexOnNormalized24HoursDiff: number;
}

export const CountryDataContext = React.createContext<ICountryDataContext>({
	loading: true,
	data: [],
	error: null,
	normalizedData: [],
	normalizedChartData: [],
	normalized24HourDiff: [],
	weekAgoIndexOnNormalizedData: 0,
	weekAgoIndexOnNormalizedChartData: 0,
	weekAgoNegativeIndexOnNormalized24HoursDiff: 0
});
