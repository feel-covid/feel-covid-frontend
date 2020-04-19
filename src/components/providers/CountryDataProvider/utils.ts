import {
	ICountry,
	INormalized24HoursDiff,
	INormalizedCountryData
} from './interfaces';
import { endOfDay } from 'date-fns';
import { DynamicObject } from '../../../@types/interfaces';
import { differenceInHours } from 'date-fns';

export const normalizeCountryData = (
	country: ICountry
): INormalizedCountryData => {
	const { deceased, recovered, mid, light, severe, treatment, date } = country;

	return {
		// total: deceased + recovered + mid.cases + severe.cases + light.cases,
		total:
			treatment.hotel +
			treatment.hospital +
			treatment.undecided +
			treatment.home +
			deceased +
			recovered,
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

	const acc: Array<INormalized24HoursDiff> = [];

	for (let i = dateValues.length - 1; i > 0; i--) {
		const currentDay = dateValues[i][0];
		const prevDay = dateValues[i - 1][0];

		const isDateDiffInHoursSmallerThan20 =
			differenceInHours(new Date(currentDay.date), new Date(prevDay.date)) < 20;

		if (isDateDiffInHoursSmallerThan20) continue;

		acc.push({
			recovered: currentDay.recovered - prevDay.recovered,
			total: currentDay.total - prevDay.total,
			date: currentDay.date,
			compareDate: prevDay.date,
			deceased: currentDay.deceased - prevDay.deceased
		});
	}

	return acc.reverse();
};
