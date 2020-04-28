import {
	ICountry,
	INormalized24HoursDiff,
	INormalizedCountryData
} from './interfaces';
import { endOfDay, format } from 'date-fns';
import { DynamicObject } from '../../../@types/interfaces';
import { differenceInHours } from 'date-fns';

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

	const dateValues = Object.values(countryDataObjectByDate);

	const diffIn24 = dateValues
		.reduceRight((acc, currentDate, index) => {
			if (index === 0) return acc;
			const [currentDayFirstUpdate] = currentDate;
			const [prevDayFirstUpdate] = dateValues[index - 1];

			const isDateDiffInHoursSmallerThan20 =
				differenceInHours(
					new Date(currentDayFirstUpdate.date),
					new Date(prevDayFirstUpdate.date)
				) < 20;

			if (isDateDiffInHoursSmallerThan20) return acc;

			acc.push({
				recovered:
					currentDayFirstUpdate.recovered - prevDayFirstUpdate.recovered,
				total: currentDayFirstUpdate.total - prevDayFirstUpdate.total,
				date: currentDayFirstUpdate.date,
				compareDate: prevDayFirstUpdate.date,
				deceased: currentDayFirstUpdate.deceased - prevDayFirstUpdate.deceased
			});

			return acc;
		}, [] as INormalized24HoursDiff[])
		.reverse();

	return diffIn24;
};
