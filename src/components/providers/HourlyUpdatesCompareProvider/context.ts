import React from 'react';
import {
	DynamicObject,
	StateUpdaterFunction
} from '../../../@types/interfaces';
import { INormalizedCountryData } from '../CountryDataProvider/interfaces';

export interface IHourlyUpdatesCompareContext {
	setBaseDate: StateUpdaterFunction<string> | null;
	setPrevDate: StateUpdaterFunction<string> | null;
	baseDate: string;
	prevDate: string;
	countriesByDate: DynamicObject<INormalizedCountryData>;
}

export const HourlyUpdatesCompareContext = React.createContext<
	IHourlyUpdatesCompareContext
>({
	setBaseDate: null,
	setPrevDate: null,
	baseDate: '',
	prevDate: '',
	countriesByDate: {}
});
