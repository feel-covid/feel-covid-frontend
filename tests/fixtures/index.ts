export const apiResponseFixture = [
	{
		id: 'bffb3b4d-ac57-4d0d-813e-171ed0833269',
		name: 'Israel',
		countryId: '0bcaf8ed-0287-4b2f-87a9-9723ebca9224',
		light: {
			cases: 4037
		},
		mid: {
			cases: 81
		},
		severe: {
			cases: 80,
			intubated: 63
		},
		deceased: 15,
		treatment: {
			home: 2107,
			hotel: 586,
			hospital: 543,
			undecided: 962
		},
		recovered: 134,
		date: '2020-03-30T05:00:00.000Z'
	},
	{
		id: '013d8e45-522d-4c43-9ffd-3c2d1c49c112',
		name: 'Israel',
		countryId: '0bcaf8ed-0287-4b2f-87a9-9723ebca9224',
		light: {
			cases: 4349
		},
		mid: {
			cases: 90
		},
		severe: {
			cases: 79,
			intubated: 66
		},
		deceased: 16,
		treatment: {
			home: 2107,
			hotel: 586,
			hospital: 527,
			undecided: 1269
		},
		recovered: 161,
		date: '2020-03-30T17:00:00.000Z'
	},
	{
		id: '86d899f4-eec1-45cd-ba3d-da969080402a',
		name: 'Israel',
		countryId: '0bcaf8ed-0287-4b2f-87a9-9723ebca9224',
		light: {
			cases: 4473
		},
		mid: {
			cases: 95
		},
		severe: {
			cases: 83,
			intubated: 69
		},
		deceased: 17,
		treatment: {
			home: 2580,
			hotel: 619,
			hospital: 573,
			undecided: 879
		},
		recovered: 163,
		date: '2020-03-31T05:00:00.000Z'
	}
];

export const normalizedDataFixture = [
	{
		total: 4347,
		active: 4198,
		deceased: 15,
		recovered: 134,
		treatment: {
			home: 2107,
			hotel: 586,
			hospital: 543,
			undecided: 962
		},
		mid: 81,
		light: 4037,
		severe: {
			cases: 80,
			intubated: 63
		},
		date: '2020-03-30T05:00:00.000Z'
	},
	{
		total: 4695,
		active: 4518,
		deceased: 16,
		recovered: 161,
		treatment: {
			home: 2107,
			hotel: 586,
			hospital: 527,
			undecided: 1269
		},
		mid: 90,
		light: 4349,
		severe: {
			cases: 79,
			intubated: 66
		},
		date: '2020-03-30T17:00:00.000Z'
	},
	{
		total: 4831,
		active: 4651,
		deceased: 17,
		recovered: 163,
		treatment: {
			home: 2580,
			hotel: 619,
			hospital: 573,
			undecided: 879
		},
		mid: 95,
		light: 4473,
		severe: {
			cases: 83,
			intubated: 69
		},
		date: '2020-03-31T05:00:00.000Z'
	}
];

export const normalizedChartDataFixture = [
	{
		total: 4695,
		active: 4518,
		deceased: 16,
		recovered: 161,
		treatment: {
			home: 2107,
			hotel: 586,
			hospital: 527,
			undecided: 1269
		},
		mid: 90,
		light: 4349,
		severe: {
			cases: 79,
			intubated: 66
		},
		date: '2020-03-30T17:00:00.000Z'
	},
	{
		total: 4831,
		active: 4651,
		deceased: 17,
		recovered: 163,
		treatment: {
			home: 2580,
			hotel: 619,
			hospital: 573,
			undecided: 879
		},
		mid: 95,
		light: 4473,
		severe: {
			cases: 83,
			intubated: 69
		},
		date: '2020-03-31T05:00:00.000Z'
	}
];

export const normalized24HoursDiffFixture = [
	{
		recovered: 29,
		total: 484,
		date: '2020-03-31T05:00:00.000Z',
		compareDate: '2020-03-30T05:00:00.000Z',
		deceased: 2
	}
];