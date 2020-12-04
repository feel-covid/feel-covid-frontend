import { useContext } from 'react';
import { CountryDataContext, ICountryDataContext } from '../context';

export const useCountryDataContext = (): ICountryDataContext => {
	const data = useContext(CountryDataContext);

	return data;
};
