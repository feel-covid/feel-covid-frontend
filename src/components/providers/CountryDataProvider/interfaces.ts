interface ICase {
	cases: number;
	intubated?: number;
}

interface ITreatment {
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
