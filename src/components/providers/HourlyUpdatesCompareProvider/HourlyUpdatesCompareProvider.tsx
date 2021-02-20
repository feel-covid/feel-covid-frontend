import React, { useState } from 'react';
import { useCountryDataContext } from '../CountryDataProvider/hooks/useCountryDataContext';
import { HourlyUpdatesCompareContext } from './context';

interface IProps {}

export const HourlyUpdatesCompareProvider: React.FC<IProps> = (props) => {
	const { normalizedData } = useCountryDataContext();
	const [initialPrevDate, initialBaseDate] = normalizedData.slice(-2);

	const [baseDate, setBaseDate] = useState(initialBaseDate.date);
	const [prevDate, setPrevDate] = useState(initialPrevDate.date);

	return (
		<HourlyUpdatesCompareContext.Provider
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
		</HourlyUpdatesCompareContext.Provider>
	);
};
