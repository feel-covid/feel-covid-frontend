export interface ICase {
	cases: number;
	intubated?: number;
}

export interface ITreatment {
	home: number;
	hotel: number;
	hospital: number;
	undecided: number;
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
