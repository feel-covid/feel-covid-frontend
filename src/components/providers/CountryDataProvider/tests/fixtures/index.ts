import {
	apiResponseFixture,
	normalized24HoursDiffFixture,
	normalizedChartDataFixture,
	normalizedDataFixture
} from '../../../../../../tests/fixtures';

export const reduceDatesToSingleDayResultFixture = {
	'30.03.2020': [
		{
			active: 4198,
			date: '2020-03-30T05:00:00.000Z',
			deceased: 15,
			light: 4037,
			mid: 81,
			recovered: 134,
			severe: {
				cases: 80,
				intubated: 63
			},
			total: 4347,
			treatment: {
				home: 2107,
				hospital: 543,
				hotel: 586,
				undecided: 962
			}
		},
		{
			active: 4518,
			date: '2020-03-30T17:00:00.000Z',
			deceased: 16,
			light: 4349,
			mid: 90,
			recovered: 161,
			severe: {
				cases: 79,
				intubated: 66
			},
			total: 4695,
			treatment: {
				home: 2107,
				hospital: 527,
				hotel: 586,
				undecided: 1269
			}
		}
	],
	'31.03.2020': [
		{
			active: 4651,
			date: '2020-03-31T05:00:00.000Z',
			deceased: 17,
			light: 4473,
			mid: 95,
			recovered: 163,
			severe: {
				cases: 83,
				intubated: 69
			},
			total: 4831,
			treatment: {
				home: 2580,
				hospital: 573,
				hotel: 619,
				undecided: 879
			}
		}
	]
};

export const countryDataContextFixture = {
	data: apiResponseFixture,
	normalizedChartData: normalizedChartDataFixture,
	normalized24HourDiff: normalized24HoursDiffFixture,
	normalizedData: normalizedDataFixture,
	weekAgoIndexOnNormalizedData: 0,
	weekAgoIndexOnNormalizedChartData: 0,
	weekAgoNegativeIndexOnNormalized24HoursDiff: -2,
	error: null,
	loading: false
};
