import React from 'react';
import { useTheme } from 'styled-components';

export const CustomTestAmountLabel = (props: any) => {
	const theme = useTheme();
	const {
		x,
		y,
		width,
		value: { amount }
	} = props;

	return (
		<g>
			{[2, 5, 0, 7].includes(props.index) && (
				<text
					x={x + width / 2}
					y={y - 11}
					fill={theme.colors.white}
					textAnchor='middle'
					dominantBaseline='middle'
					fontSize='1.4rem'
					fontFamily='inherit'
				>
					{amount.toLocaleString()}
				</text>
			)}
		</g>
	);
};
