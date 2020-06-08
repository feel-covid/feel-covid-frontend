import {
	statsResponseFixture,
	normalized24HoursDiffFixture,
	normalizedChartDataFixture,
	normalizedDataFixture,
	testAmountResponseFixture
} from '../../../../../../tests/fixtures';

export const reduceDatesToSingleDayResultFixture = {
	'30.03.2020': [
		{
			total: 4347,
			active: 4198,
			deceased: 15,
			recovered: 134,
			treatment: {
				home: 2107,
				hotel: 586,
				hospital: 543,
				undecided: 962,
				combinedHomeHotelUndecided: 3655
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
				undecided: 1269,
				combinedHomeHotelUndecided: 3962
			},
			mid: 90,
			light: 4349,
			severe: {
				cases: 79,
				intubated: 66
			},
			date: '2020-03-30T17:00:00.000Z'
		}
	],
	'31.03.2020': [
		{
			total: 4831,
			active: 4651,
			deceased: 17,
			recovered: 163,
			treatment: {
				home: 2580,
				hotel: 619,
				hospital: 573,
				undecided: 879,
				combinedHomeHotelUndecided: 4078
			},
			mid: 95,
			light: 4473,
			severe: {
				cases: 83,
				intubated: 69
			},
			date: '2020-03-31T05:00:00.000Z'
		}
	]
};

export const countryDataContextFixture = {
	data: statsResponseFixture,
	normalizedChartData: normalizedChartDataFixture,
	normalized24HourDiff: normalized24HoursDiffFixture,
	normalizedData: normalizedDataFixture,
	weekAgoIndexOnNormalizedData: 0,
	weekAgoIndexOnNormalizedChartData: -8,
	weekAgoNegativeIndexOnNormalized24HoursDiff: -8,
	error: null,
	loading: false,
	testsData: testAmountResponseFixture
};
