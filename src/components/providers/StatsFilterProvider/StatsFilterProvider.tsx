import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useCountryData } from '../../../hooks/useCountryData';
import { StatsFilterContext } from './context';

interface IProps {}

export const StatsFilterProvider: React.FC<IProps> = (props) => {
	const { normalizedData } = useCountryData();
	const [initialPrevDate, initialBaseDate] = normalizedData.slice(-2);

	const [baseDate, setBaseDate] = useState(initialBaseDate.date);
	const [prevDate, setPrevDate] = useState(initialPrevDate.date);

	return (
		<StatsFilterContext.Provider
			value={{
				setBaseDate,
				setPrevDate,
				baseDate,
				prevDate,
				countriesByDate: normalizedData.reduce(
					(acc, currentStat) =>
						Object.assign(acc, { [currentStat.date]: currentStat }),
					{}
				)
			}}
		>
			{props.children}
		</StatsFilterContext.Provider>
	);
};
