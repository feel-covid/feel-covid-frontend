import React from 'react';
import { ICountry } from './interfaces';

export interface ICountryDataContext {
	loading: boolean;
	error: typeof Error | null;
	data: Array<ICountry>;
}

export const CountryDataContext = React.createContext<ICountryDataContext>({
	loading: true,
	data: [],
	error: null
});
