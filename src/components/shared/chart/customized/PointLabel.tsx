import React from 'react';
import { useTheme } from 'styled-components';

interface IProps {
	x?: number;
	y?: number;
	width?: number;
	index?: number;
	value?: Record<string, number>;
	shouldDisplay: (index: number) => boolean;
	horizontalOffset?: number;
	verticalOffset?: number;
	suffix?: string;
}

export const PointLabel = (props: IProps) => {
	const theme = useTheme();
	const {
		x,
		y = 0,
		width = 0,
		value,
		shouldDisplay,
		verticalOffset = -11,
		horizontalOffset = 0,
		suffix = ''
	} = props;

	return (
		<g>
			{shouldDisplay(props.index!) && (
				<text
					x={x! + width! / 2 + horizontalOffset}
					y={y! + verticalOffset}
					fill={theme.colors.white}
					textAnchor='middle'
					dominantBaseline='middle'
					fontSize='1.4rem'
					fontFamily='inherit'
				>
					{value!.toLocaleString()}
					{suffix}
				</text>
			)}
		</g>
	);
};
