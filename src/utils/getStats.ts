export const getStats = (before: number, current: number) => {
	const percentDiff = (Math.abs((before - current) / before) * 100).toFixed(1);
	const actualDiff = current - before;
	const trend = actualDiff === 0 ? 0 : Math.sign(actualDiff);

	return {
		percentDiff: Number(percentDiff),
		actualDiff,
		trend
	};
};
