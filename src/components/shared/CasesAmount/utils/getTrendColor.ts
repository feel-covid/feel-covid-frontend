import { PositiveFactorEnum } from '../../../../@types/enums';
import defaultTheme from '../../../../themes/defaultTheme';

export const getTrendColor = (
	positiveFactor: PositiveFactorEnum,
	trend: number
): string => {
	return positiveFactor === trend
		? defaultTheme.colors.green1
		: defaultTheme.colors.red1;
};
