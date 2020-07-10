import * as utils from '../utils';
import { reduceDatesToSingleDayResultFixture } from './fixtures';
import {
	normalizedChartDataFixture,
	normalizedDataFixture,
	serverResponseFixture
} from '../../../../../tests/fixtures';

describe('Utils - basic functionality', () => {
	it('normalizeCountryData', () => {
		// @ts-ignore
		const result = serverResponseFixture.data.hourlyUpdates.map(
			//@ts-ignore
			utils.normalizeCountryData
		);
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
});
