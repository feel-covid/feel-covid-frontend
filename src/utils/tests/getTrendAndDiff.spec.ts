import { getTrendAndDiff } from '../getTrendAndDiff';
import { DynamicObject } from '../../@types/interfaces';

describe('getTrendAndDiff - Basic functionality', () => {
	const tests = [
		[
			'With before > current',
			{
				current: 100,
				before: 200,
				expectedTrend: -1,
				expectedActualDiff: -100,
				expectedPercent: 50
			}
		],
		[
			'With current > before',
			{
				current: 200,
				before: 100,
				expectedTrend: 1,
				expectedActualDiff: 100,
				expectedPercent: 100
			}
		],
		[
			'With current === before',
			{
				current: 100,
				before: 100,
				expectedTrend: 0,
				expectedActualDiff: 0,
				expectedPercent: 0
			}
		],
		[
			'Edge case - before === 0 && current > before',
			{
				current: 1,
				before: 0,
				expectedTrend: 1,
				expectedActualDiff: 1,
				expectedPercent: 100
			}
		],
		[
			'Edge case - before === 0 && current === 0',
			{
				current: 0,
				before: 0,
				expectedTrend: 0,
				expectedActualDiff: 0,
				expectedPercent: 0
			}
		],
		[
			'With current > before && percentDiff < 0.1',
			{
				current: 1000,
				before: 999.5,
				expectedTrend: 1,
				expectedActualDiff: 0.5,
				expectedPercent: 0.05
			}
		]
	];

	it.each(tests)('%s', (_, testDetails) => {
		const {
			current,
			before,
			expectedTrend,
			expectedActualDiff,
			expectedPercent
		} = testDetails as DynamicObject<any>;
		const { percentDiff, actualDiff, trend } = getTrendAndDiff(before, current);

		expect(percentDiff).toBe(expectedPercent);
		expect(actualDiff).toBe(expectedActualDiff);
		expect(trend).toBe(expectedTrend);
	});
});
