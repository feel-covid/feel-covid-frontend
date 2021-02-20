import { PositiveTrendEnum } from '../../../../@types/enums';
import defaultTheme from '../../../../themes/defaultTheme';

export const getTrendColor = (
	positiveTrend: PositiveTrendEnum,
	actualTrend: number
): string => {
	return positiveTrend === actualTrend
		? defaultTheme.colors.green1
		: defaultTheme.colors.red1;
};
