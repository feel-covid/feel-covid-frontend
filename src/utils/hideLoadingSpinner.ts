import afterTwoTicks from './afterTwoTicks';

export const hideLoadingSpinner = () => {
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
};
