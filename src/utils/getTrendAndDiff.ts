export const getTrendAndDiff = (before: number, current: number) => {
	let percentDiff = Math.abs((before - current) / before) * 100;

	if (Number(percentDiff) === Number.POSITIVE_INFINITY) {
		percentDiff = 100;
	}

	if (Number.isNaN(Number(percentDiff))) {
		percentDiff = 0;
	}

	const actualDiff = current - before;
	const trend = actualDiff === 0 ? 0 : Math.sign(actualDiff);

	return {
		percentDiff: Number(percentDiff.toFixed(percentDiff >= 0.1 ? 1 : 2)),
		actualDiff,
		trend
	};
};
