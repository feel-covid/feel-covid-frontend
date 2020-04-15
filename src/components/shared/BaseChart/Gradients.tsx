import React, { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components/macro';
import { IColors } from '../../../@types/declarations/styled';

interface IProps {
	colors: Array<keyof IColors>;
	startOpacity?: number;
	endOpacity?: number;
	idPrefix: string;
}

export const Gradients: React.FC<IProps> = (props) => {
	const theme = useTheme();
	const { colors, startOpacity = 0.8, endOpacity = 0, idPrefix } = props;

	return (
		<>
			{colors.map((color) => (
				<linearGradient
					key={color}
					id={`${idPrefix}${color}`}
					x1='0'
					y1='0'
					x2='0'
					y2='1'
				>
					<stop
						offset='5%'
						stopColor={theme.colors[color]}
						stopOpacity={startOpacity}
					/>
					<stop
						offset='100%'
						stopColor={theme.colors[color]}
						stopOpacity={endOpacity}
					/>
				</linearGradient>
			))}
		</>
	);
};
