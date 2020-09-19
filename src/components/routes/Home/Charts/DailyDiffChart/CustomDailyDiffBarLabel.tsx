import React from 'react';
import { useTheme } from 'styled-components';

export const CustomDailyDiffBarLabel = (props: any) => {
	const theme = useTheme();
	const { x, y, width, value } = props;

	let xCenter = x + width / 2;

	if (value > 100) {
		xCenter -= 1;
	}

	return (
		<g>
			<text
				x={xCenter}
				y={y - 7}
				fill={theme.colors.white}
				textAnchor='middle'
				dominantBaseline='middle'
				fontSize='1.4rem'
				fontFamily='inherit'
			>
				{value.toLocaleString()}
			</text>
		</g>
	);
};
