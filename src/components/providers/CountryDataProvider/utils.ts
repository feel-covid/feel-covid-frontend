import { ICountry, INormalizedCountryData } from './interfaces';
import { endOfDay } from 'date-fns';
import { DynamicObject } from '../../../@types/interfaces';

export const normalizeCountryData = (
	country: ICountry
): INormalizedCountryData => {
	const { deceased, recovered, mid, light, severe, treatment, date } = country;

	return {
		total: deceased + recovered + mid.cases + severe.cases + light.cases,
		active: mid.cases + severe.cases + light.cases,
		deceased,
		recovered,
		treatment,
		mid: mid.cases,
		light: light.cases,
		severe,
		date
	};
};

export const reduceDatesToSignalDay = (
	normalizedData: Array<INormalizedCountryData>
): DynamicObject<Array<INormalizedCountryData>> => {
	return normalizedData.reduce((acc, currentCountry) => {
		const key = endOfDay(new Date(currentCountry.date)).toISOString();
		acc[key] = [...(acc[key] || []), currentCountry];
		return acc;
	}, {} as DynamicObject<Array<INormalizedCountryData>>);
};

/**
 * @description Convert the normalized data to contain only the latest update from each day.
 * */
export const normalizeChartData = (
	normalizedData: Array<INormalizedCountryData>
): Array<INormalizedCountryData> => {
	const countryDataObjectByDate = reduceDatesToSignalDay(normalizedData);

	const dateValues = Object.values(countryDataObjectByDate);

	return dateValues.map((datesArr) => datesArr[datesArr.length - 1]);
};
