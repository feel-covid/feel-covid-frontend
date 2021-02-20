import { useContext } from 'react';
import { HourlyUpdatesCompareContext } from '../context';

export const useHourlyUpdatesCompareContext = () => {
	const data = useContext(HourlyUpdatesCompareContext);
	return data;
};
