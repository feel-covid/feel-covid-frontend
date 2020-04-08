import {
	ICase,
	ICountry,
	INormalizedCountryData,
	ITreatment
} from './interfaces';

export const normalizeCountryData = (
	country: ICountry
): INormalizedCountryData => {
	const { deceased, recovered, mid, light, severe, treatment } = country;

	return {
		total: deceased + recovered + mid.cases + severe.cases + light.cases,
		active: mid.cases + severe.cases + light.cases,
		deceased,
		recovered,
		treatment,
		mid: mid.cases,
		light: light.cases,
		severe
	};
};
