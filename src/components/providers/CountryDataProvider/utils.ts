import {
	ICountry,
	INormalized24HoursDiff,
	INormalizedCountryData
} from './interfaces';
import { endOfDay } from 'date-fns';
import { DynamicObject } from '../../../@types/interfaces';
import { findClosestInRangeOf24h } from '../../../utils/findClosestInRangeOf24H';

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

	let acc: INormalized24HoursDiff[] = [];

	for (let i = dateValues.length - 1; i > 0; i--) {
		const currentDay = dateValues[i];
		const prevDay = dateValues[i - 1];

		const [currentStatIndex, prevStatIndex] = findClosestInRangeOf24h({
			currentDay,
			prevDay
		});

		const currentDayData = currentDay[currentStatIndex];
		const prevDayData = prevDay[prevStatIndex];

		acc.push({
			recovered: currentDayData.recovered - prevDayData.recovered,
			total: currentDayData.total - prevDayData.total,
			date: currentDayData.date,
			severe: {
				intubated:
					currentDayData.severe.intubated! - prevDayData.severe.intubated!,
				cases: currentDayData.severe.cases - prevDayData.severe.cases
			},
			light: currentDayData.light - prevDayData.light,
			mid: currentDayData.mid - prevDayData.mid,
			active: currentDayData.active - prevDayData.active,
			compareDate: prevDayData.date,
			deceased: currentDayData.deceased - prevDayData.deceased,
			treatment: {
				home: currentDayData.treatment.home - prevDayData.treatment.home,
				hotel: currentDayData.treatment.hotel - prevDayData.treatment.hotel,
				hospital:
					currentDayData.treatment.hospital - prevDayData.treatment.hospital,
				undecided:
					currentDayData.treatment.undecided - prevDayData.treatment.undecided
			}
		});
	}

	return acc.reverse();
};
