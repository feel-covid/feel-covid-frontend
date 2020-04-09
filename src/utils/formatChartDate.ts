import { format } from 'date-fns';

interface IOptions {
	locale?: Locale;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	firstWeekContainsDate?: number;
	useAdditionalWeekYearTokens?: boolean;
	useAdditionalDayOfYearTokens?: boolean;
}

export const formatChartDate = (date: string, options?: IOptions): string => {
	return format(new Date(date), 'MMM dd', options);
};
