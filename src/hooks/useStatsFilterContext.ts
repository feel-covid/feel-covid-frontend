import { useContext } from 'react';
import { StatsFilterContext } from '../components/providers/StatsFilterProvider/context';

export const useStatsFilterContext = () => {
	const data = useContext(StatsFilterContext);
	return data;
};
