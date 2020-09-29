import {
	normalizedChartDataFixture,
	normalizedDataFixture,
	serverResponseFixture
} from '../../../../../../tests/fixtures';

export const reduceDatesToSingleDayResultFixture = {
	'04.07.2020': [
		{
			total: 29032,
			active: 10929,
			deceased: 330,
			recovered: 17773,
			treatment: {
				home: 10633,
				hotel: 0,
				hospital: 296,
				undecided: 0,
				combinedHomeHotelUndecided: 10633
			},
			mid: 74,
			light: 10771,
			severe: {
				cases: 84,
				intubated: 32
			},
			date: '2020-07-04T17:44:00.000Z'
		},
		{
			total: 29170,
			active: 11024,
			deceased: 330,
			recovered: 17816,
			treatment: {
				home: 10728,
				hotel: 0,
				hospital: 296,
				undecided: 0,
				combinedHomeHotelUndecided: 10728
			},
			mid: 74,
			light: 10866,
			severe: {
				cases: 84,
				intubated: 32
			},
			date: '2020-07-04T20:14:00.000Z'
		}
	],
	'05.07.2020': [
		{
			total: 29366,
			active: 11189,
			deceased: 330,
			recovered: 17847,
			treatment: {
				home: 10854,
				hotel: 0,
				hospital: 335,
				undecided: 0,
				combinedHomeHotelUndecided: 10854
			},
			mid: 78,
			light: 11025,
			severe: {
				cases: 86,
				intubated: 29
			},
			date: '2020-07-05T07:08:00.000Z'
		},
		{
			total: 29787,
			active: 11540,
			deceased: 331,
			recovered: 17916,
			treatment: {
				home: 11207,
				hotel: 0,
				hospital: 333,
				undecided: 0,
				combinedHomeHotelUndecided: 11207
			},
			mid: 68,
			light: 11386,
			severe: {
				cases: 86,
				intubated: 27
			},
			date: '2020-07-05T16:01:00.000Z'
		},
		{
			total: 29958,
			active: 11677,
			deceased: 331,
			recovered: 17950,
			treatment: {
				home: 11344,
				hotel: 0,
				hospital: 333,
				undecided: 0,
				combinedHomeHotelUndecided: 11344
			},
			mid: 68,
			light: 11523,
			severe: {
				cases: 86,
				intubated: 27
			},
			date: '2020-07-05T19:34:00.000Z'
		}
	],
	'06.07.2020': [
		{
			total: 30162,
			active: 11856,
			deceased: 332,
			recovered: 17974,
			treatment: {
				home: 11502,
				hotel: 0,
				hospital: 354,
				undecided: 0,
				combinedHomeHotelUndecided: 11502
			},
			mid: 82,
			light: 11684,
			severe: {
				cases: 90,
				intubated: 32
			},
			date: '2020-07-06T06:40:00.000Z'
		},
		{
			total: 30749,
			active: 12359,
			deceased: 334,
			recovered: 18056,
			treatment: {
				home: 12010,
				hotel: 0,
				hospital: 349,
				undecided: 0,
				combinedHomeHotelUndecided: 12010
			},
			mid: 88,
			light: 12183,
			severe: {
				cases: 88,
				intubated: 35
			},
			date: '2020-07-06T15:56:00.000Z'
		}
	],
	'07.07.2020': [
		{
			total: 31186,
			active: 12717,
			deceased: 338,
			recovered: 18131,
			treatment: {
				home: 12359,
				hotel: 0,
				hospital: 358,
				undecided: 0,
				combinedHomeHotelUndecided: 12359
			},
			mid: 85,
			light: 12547,
			severe: {
				cases: 85,
				intubated: 35
			},
			date: '2020-07-07T05:00:00.000Z'
		},
		{
			total: 31271,
			active: 12799,
			deceased: 338,
			recovered: 18134,
			treatment: {
				home: 12440,
				hotel: 0,
				hospital: 359,
				undecided: 0,
				combinedHomeHotelUndecided: 12440
			},
			mid: 84,
			light: 12626,
			severe: {
				cases: 89,
				intubated: 35
			},
			date: '2020-07-07T07:17:00.000Z'
		},
		{
			total: 31886,
			active: 13352,
			deceased: 342,
			recovered: 18192,
			treatment: {
				home: 12994,
				hotel: 0,
				hospital: 358,
				undecided: 0,
				combinedHomeHotelUndecided: 12994
			},
			mid: 87,
			light: 13179,
			severe: {
				cases: 86,
				intubated: 34
			},
			date: '2020-07-07T15:43:00.000Z'
		},
		{
			total: 32222,
			active: 13653,
			deceased: 342,
			recovered: 18227,
			treatment: {
				home: 13296,
				hotel: 0,
				hospital: 357,
				undecided: 0,
				combinedHomeHotelUndecided: 13296
			},
			mid: 86,
			light: 13481,
			severe: {
				cases: 86,
				intubated: 34
			},
			date: '2020-07-07T19:25:00.000Z'
		}
	],
	'08.07.2020': [
		{
			total: 32714,
			active: 14104,
			deceased: 343,
			recovered: 18267,
			treatment: {
				home: 13707,
				hotel: 0,
				hospital: 397,
				undecided: 0,
				combinedHomeHotelUndecided: 13707
			},
			mid: 82,
			light: 13915,
			severe: {
				cases: 107,
				intubated: 36
			},
			date: '2020-07-08T07:31:00.000Z'
		},
		{
			total: 33175,
			active: 14516,
			deceased: 344,
			recovered: 18315,
			treatment: {
				home: 14111,
				hotel: 0,
				hospital: 405,
				undecided: 0,
				combinedHomeHotelUndecided: 14111
			},
			mid: 82,
			light: 14321,
			severe: {
				cases: 113,
				intubated: 39
			},
			date: '2020-07-08T15:51:00.000Z'
		},
		{
			total: 33557,
			active: 14875,
			deceased: 344,
			recovered: 18338,
			treatment: {
				home: 14470,
				hotel: 0,
				hospital: 405,
				undecided: 0,
				combinedHomeHotelUndecided: 14470
			},
			mid: 82,
			light: 14680,
			severe: {
				cases: 113,
				intubated: 39
			},
			date: '2020-07-08T19:34:00.000Z'
		}
	],
	'09.07.2020': [
		{
			total: 33860,
			active: 15138,
			deceased: 346,
			recovered: 18376,
			treatment: {
				home: 14726,
				hotel: 0,
				hospital: 412,
				undecided: 0,
				combinedHomeHotelUndecided: 14726
			},
			mid: 92,
			light: 14931,
			severe: {
				cases: 115,
				intubated: 41
			},
			date: '2020-07-09T04:00:00.000Z'
		},
		{
			total: 33947,
			active: 15209,
			deceased: 346,
			recovered: 18392,
			treatment: {
				home: 14783,
				hotel: 0,
				hospital: 426,
				undecided: 0,
				combinedHomeHotelUndecided: 14783
			},
			mid: 88,
			light: 15003,
			severe: {
				cases: 118,
				intubated: 41
			},
			date: '2020-07-09T07:16:00.000Z'
		},
		{
			total: 34825,
			active: 16025,
			deceased: 348,
			recovered: 18452,
			treatment: {
				home: 15591,
				hotel: 0,
				hospital: 434,
				undecided: 0,
				combinedHomeHotelUndecided: 15591
			},
			mid: 87,
			light: 15816,
			severe: {
				cases: 122,
				intubated: 39
			},
			date: '2020-07-09T15:38:00.000Z'
		}
	],
	'10.07.2020': [
		{
			total: 35533,
			active: 16651,
			deceased: 350,
			recovered: 18532,
			treatment: {
				home: 16213,
				hotel: 0,
				hospital: 438,
				undecided: 0,
				combinedHomeHotelUndecided: 16213
			},
			mid: 87,
			light: 16440,
			severe: {
				cases: 124,
				intubated: 39
			},
			date: '2020-07-10T04:16:00.000Z'
		},
		{
			total: 35631,
			active: 16739,
			deceased: 350,
			recovered: 18542,
			treatment: {
				home: 16272,
				hotel: 0,
				hospital: 467,
				undecided: 0,
				combinedHomeHotelUndecided: 16272
			},
			mid: 91,
			light: 16518,
			severe: {
				cases: 130,
				intubated: 42
			},
			date: '2020-07-10T07:28:00.000Z'
		}
	]
};

export const countryDataContextFixture = {
	error: null,
	loading: false,
	normalizedData: normalizedDataFixture,
	normalizedChartData: normalizedChartDataFixture,
	dailyIRD: serverResponseFixture.data.dailyIRD,
	weekAgoIndexOnNormalizedData: 0,
	testsData: serverResponseFixture.data.dailyTestAmount,
	chartSliceIndex: -9
};
