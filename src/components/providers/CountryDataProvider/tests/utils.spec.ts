import * as utils from '../utils';
import { reduceDatesToSingleDayResultFixture } from './fixtures';
import {
	statsResponseFixture,
	normalized24HoursDiffFixture,
	normalizedChartDataFixture,
	normalizedDataFixture
} from '../../../../../tests/fixtures';

describe('Utils - basic functionality', () => {
	it('normalizeCountryData', () => {
		// @ts-ignore
		const result = statsResponseFixture.map(utils.normalizeCountryData);
		expect(result).toEqual(normalizedDataFixture);
	});

	it('reduceDatesToSignalDay', () => {
		const result = utils.reduceDatesToSignalDay(normalizedDataFixture);

		expect(result).toEqual(reduceDatesToSingleDayResultFixture);
	});

	it('normalizeChartData', () => {
		const result = utils.normalizeChartData(normalizedDataFixture);
		expect(result).toEqual(normalizedChartDataFixture);
	});

	it('normalize24HoursDiff', () => {
		const result = utils.normalize24HoursDiff(normalizedDataFixture);
		expect(result).toEqual(normalized24HoursDiffFixture);
	});

	it('normalize24HoursDiff -  Should return an empty array when given empty array', () => {
		const result = utils.normalize24HoursDiff([]);
		expect(result).toEqual([]);
	});
});
