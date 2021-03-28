export interface ICase {
	cases: number;
	intubated?: number;
}

export interface ITreatment {
	home: number;
	hotel: number;
	hospital: number;
	undecided: number;
	combinedHomeHotelUndecided: number;
}

export interface ICountry {
	name: string;
	id: string;
	countryId: string;
	light: ICase;
	mid: ICase;
	severe: ICase;
	deceased: number;
	treatment: ITreatment;
	recovered: number;
	date: string;
}

export interface ITestAmountItem {
	amount: number;
	date: string;
	positive: number;
}

export interface ITestAmountData {
	data: Array<ITestAmountItem>;
	total: number;
}

export interface INormalizedCountryData {
	total: number;
	active: number;
	deceased: number;
	recovered: number;
	treatment: ITreatment;
	mid: number;
	light: number;
	severe: ICase;
	date: string;
}

export interface IDailyVaccination {
	date: string;
	firstDoseAmount: number;
	firstDosePercentage: number;
	firstDoseCumulative: number;
	secondDoseAmount: number;
	secondDosePercentage: number;
	secondDoseCumulative: number;
}

export interface INormalized24HoursDiff {
	compareDate: string;
	total: number;
	deceased: number;
	recovered: number;
	date: string;
}
