import { Legend } from 'recharts';
import React from 'react';

export const xAxisDefaultProps = {
	dataKey: 'date',
	interval: 0,
	height: 40
};

export const legendDefaultProps = {
	verticalAlign: 'bottom',
	iconType: 'square',
	wrapperStyle: {
		transform: 'translateY(1rem)'
	}
};
