import { useContext } from 'react';
import { CountryDataContext } from '../components/providers/CountryDataProvider';

export const useCountryData = () => {
	const data = useContext(CountryDataContext);

	return data;
};
