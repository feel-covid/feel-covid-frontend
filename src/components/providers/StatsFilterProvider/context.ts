import React from 'react';
import {
	DynamicObject,
	StateUpdaterFunction
} from '../../../@types/interfaces';
import { INormalizedCountryData } from '../CountryDataProvider/interfaces';

export interface IStatsFilterContext {
	setBaseDate: StateUpdaterFunction<string> | null;
	setPrevDate: StateUpdaterFunction<string> | null;
	baseDate: string;
	prevDate: string;
	countriesByDate: DynamicObject<INormalizedCountryData>;
}

export const StatsFilterContext = React.createContext<IStatsFilterContext>({
	setBaseDate: null,
	setPrevDate: null,
	baseDate: '',
	prevDate: '',
	countriesByDate: {}
});
