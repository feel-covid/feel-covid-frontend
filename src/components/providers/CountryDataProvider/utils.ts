import {
	ICountry,
	INormalized24HoursDiff,
	INormalizedCountryData
} from './interfaces';
import { differenceInHours, format } from 'date-fns';
import { DynamicObject } from '../../../@types/interfaces';
import { clamp } from '../../../utils/clamp';
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
		treatment: {
			...treatment,
			combinedHomeHotelUndecided:
				treatment.hotel + treatment.home + treatment.undecided
		},
		mid: mid.cases,
		light: light.cases,
		severe,
		date
	};
};

export const reduceDatesToSignalDay = (
	normalizedData: INormalizedCountryData[]
): DynamicObject<INormalizedCountryData[]> => {
	return normalizedData.reduce((acc, currentCountry) => {
		const key = format(new Date(currentCountry.date), 'dd.MM.yyyy');
		acc[key] = [...(acc[key] || []), currentCountry];
		return acc;
	}, {} as DynamicObject<INormalizedCountryData[]>);
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
	const clamp0 = (number: number) => clamp({ number, min: 0 });

	const dateValues = Object.values(countryDataObjectByDate);

	const diffIn24 = dateValues
		.reduceRight((acc, currentDate, index) => {
			if (index === 0) return acc;

			const [currentIndex, prevIndex] = findClosestInRangeOf24h({
				currentDay: currentDate,
				prevDay: dateValues[index - 1]
			});

			if ([currentIndex, prevIndex].includes(-1)) return acc;
			const currentDayFirstUpdate = currentDate[currentIndex];
			const prevDayFirstUpdate = dateValues[index - 1][prevIndex];

			acc.push({
				recovered: clamp0(
					currentDayFirstUpdate.recovered - prevDayFirstUpdate.recovered
				),
				total: clamp0(currentDayFirstUpdate.total - prevDayFirstUpdate.total),
				date: currentDayFirstUpdate.date,
				compareDate: prevDayFirstUpdate.date,
				deceased: clamp0(
					currentDayFirstUpdate.deceased - prevDayFirstUpdate.deceased
				)
			});

			return acc;
		}, [] as INormalized24HoursDiff[])
		.reverse();

	return diffIn24;
};
