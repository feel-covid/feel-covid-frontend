import { useEffect } from 'react';
import { useCountryData } from '../useCountryData';
import { hideLoadingSpinner } from '../../utils/hideLoadingSpinner';

export const useHideSpinner = () => {
	const { loading } = useCountryData();
	useEffect(() => {
		hideLoadingSpinner();
	}, [loading]);
};
