import { useContext } from 'react';
import {
	CountryDataContext,
	ICountryDataContext
} from '../components/providers/CountryDataProvider/context';

export const useCountryData = (): ICountryDataContext => {
	const data = useContext(CountryDataContext);

	return data;
};
