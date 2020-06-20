import { INormalizedCountryData } from '../components/providers/CountryDataProvider/interfaces';
import { differenceInHours } from 'date-fns';

interface IPrams {
	currentDay: Array<INormalizedCountryData>;
	prevDay: Array<INormalizedCountryData>;
	currentIndex?: number;
	prevIndex?: number;
}

const BUFFER = 3;

// export const findClosestInRangeOf24h = ({
// 	currentDay,
// 	prevDay,
// 	currentIndex = currentDay.length - 1,
// 	prevIndex = prevDay.length - 1
// }: IPrams): [number, number] => {
// 	const { date: prevDate } = currentDay[currentIndex];
// 	const { date: currentDate } = prevDay[prevIndex];
//
// 	const diffInHours = differenceInHours(
// 		new Date(prevDate),
// 		new Date(currentDate)
// 	);
// }


export const findClosestInRangeOf24h = ({
	currentDay,
	prevDay,
	currentIndex = currentDay.length - 1,
	prevIndex = prevDay.length - 1
}: IPrams): [number, number] => {
	const { date: prevDate } = currentDay[currentIndex];
	const { date: currentDate } = prevDay[prevIndex];

	const diffInHours = differenceInHours(
		new Date(prevDate),
		new Date(currentDate)
	);

	const isInRange = Math.abs(24 - diffInHours) < BUFFER;

	/*
	 * Return the indices if date in range
	 * */
	if (isInRange) {
		return [currentIndex, prevIndex];
	}

	const nextCurrentIndex = currentIndex - 1;
	const nextPrevIndex = prevIndex - 1;

	/*
	 * Safeguard
	 * */
	if (nextCurrentIndex < 0 && nextPrevIndex < 0) {
		return [-1, -1]
	}

	return findClosestInRangeOf24h({
		currentDay,
		prevDay,
		currentIndex: nextCurrentIndex < 0 ? 0 : nextCurrentIndex,
		prevIndex: nextPrevIndex < 0 ? 0 : nextPrevIndex
	});
};
