import {
	ICountry,
	INormalized24HoursDiff,
	INormalizedCountryData
} from './interfaces';
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

export const normalize24HoursDiff = (
	normalizedData: Array<INormalizedCountryData>
): Array<INormalized24HoursDiff> => {
	const countryDataObjectByDate = reduceDatesToSignalDay(normalizedData);

	const dateValues = Object.values(countryDataObjectByDate);

	let acc: Array<INormalized24HoursDiff> = [];

	for (let i = dateValues.length - 1; i > 0; i--) {
		const currentDay = dateValues[i][0];
		const prevDay = dateValues[i - 1][0];

		acc.push({
			recovered: currentDay.recovered - prevDay.recovered,
			total: currentDay.total - prevDay.total,
			date: currentDay.date,
			severe: {
				intubated: currentDay.severe.intubated! - prevDay.severe.intubated!,
				cases: currentDay.severe.cases - prevDay.severe.cases
			},
			light: currentDay.light - prevDay.light,
			mid: currentDay.mid - prevDay.mid,
			active: currentDay.active - prevDay.active,
			compareDate: prevDay.date,
			deceased: currentDay.deceased - prevDay.deceased,
			treatment: {
				home: currentDay.treatment.home - prevDay.treatment.home,
				hotel: currentDay.treatment.hotel - prevDay.treatment.hotel,
				hospital: currentDay.treatment.hospital - prevDay.treatment.hospital,
				undecided: currentDay.treatment.undecided - prevDay.treatment.undecided
			}
		});
	}

	return acc.reverse();
};
