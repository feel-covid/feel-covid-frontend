import React from 'react';
import { ICountry, INormalizedCountryData } from './interfaces';

export interface ICountryDataContext {
	loading: boolean;
	error: typeof Error | null;
	data: Array<ICountry>;
	normalizedData: Array<INormalizedCountryData>;
}

export const CountryDataContext = React.createContext<ICountryDataContext>({
	loading: true,
	data: [],
	error: null,
	normalizedData: []
});
