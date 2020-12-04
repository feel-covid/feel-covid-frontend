import { useContext } from 'react';
import { StatsFilterContext } from '../context';

export const useStatsFilterContext = () => {
	const data = useContext(StatsFilterContext);
	return data;
};
