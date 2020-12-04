import { useRef } from 'react';

export const useDisableChartActiveState = () => {
	const chartRef = useRef(null);

	// @ts-ignore
	const disable = (mouse, e) => {
		// @ts-ignore
		chartRef.current!.handleMouseLeave(e);
	};

	return { chartRef, disable };
};
