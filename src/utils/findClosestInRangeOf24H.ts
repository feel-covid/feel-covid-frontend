import { INormalizedCountryData } from '../components/providers/CountryDataProvider/interfaces';
import { differenceInHours } from 'date-fns';

interface IPrams {
	currentDay: Array<INormalizedCountryData>;
	prevDay: Array<INormalizedCountryData>;
	currentIndex?: number;
	prevIndex?: number;
}

const BUFFER = 2;

// prettier-ignore
export const findClosestInRangeOf24h = ({
	currentDay,
	prevDay
}: IPrams): number[] => {
	const [dayWithMoreUpdates, dayWithLessUpdates] = [currentDay, prevDay].sort(
		(a, b) => b.length - a.length
	);

	let results = null;
	dayWithMoreUpdatesLoop:
	for (let i = dayWithMoreUpdates.length - 1; i >= 0; i--) {
		const firstDate = dayWithMoreUpdates[i].date;

		for (let j = dayWithLessUpdates.length - 1; j >= 0; j--) {
			const secondDate = dayWithLessUpdates[j].date;

			const diffInHours = differenceInHours(
				new Date(firstDate),
				new Date(secondDate)
			);

			const isInRange = Math.abs(24 - Math.abs(diffInHours)) <= BUFFER;

			/*
			 * Return the indices if date in range
			 * */
			if (isInRange) {
				if (dayWithMoreUpdates === currentDay) {
					results = [i, j];
				} else {
					results = [j, i];
				}
				break dayWithMoreUpdatesLoop;
			}
		}
	}


	if (!results) {
		return [-1, -1];
	}

	return results;
};
