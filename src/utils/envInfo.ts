export const envInfo = {
	isTouchDevice:
		'ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch)
};
