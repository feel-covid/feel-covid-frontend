import { useEffect } from 'react';
import afterTwoTicks from '../../utils/afterTwoTicks';
import { useCountryData } from '../useCountryData';

export const useHideSpinner = () => {
	const { loading } = useCountryData();
	useEffect(() => {
		const spinnerContainer = document.querySelector(
			'.loader-container'
		) as HTMLDivElement;
		const spinner = document.querySelector('.spinner') as HTMLDivElement;

		spinner.addEventListener(
			'transitionend',
			() => {
				afterTwoTicks(() => {
					document.body.style.overflow = 'visible';
					document.body.style.paddingRight = '0';
					spinnerContainer.classList.add('loaded');
				});
			},
			{ once: true }
		);

		spinner.classList.add('loaded');
	}, [loading]);
};
