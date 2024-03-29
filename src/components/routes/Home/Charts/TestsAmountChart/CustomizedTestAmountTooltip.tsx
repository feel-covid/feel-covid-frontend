import React from 'react';
import { CustomizedTooltip } from '../../../../shared/chart/customized/CustomizedTooltip';

interface IProps {
	active?: boolean;
	label?: string;
	payload?: Array<{
		fill: string;
		stroke: string;
		strokeWidth: number;
		dataKey: string;
		name: string;
		color: string;
		value: number;
		payload: {
			amount: number;
			date: string;
			positive: number;
			overall: number;
			original: {
				amount: number;
				positive: number;
			};
		};
	}>;
}

export const CustomizedTestAmountTooltip: React.FC<IProps> = props => {
	if (!props.active) return null;

	const originValues = props.payload!.map(currentPayload => {
		const { name, dataKey, value, payload, stroke } = currentPayload;

		return {
			text: name,
			value:
				// @ts-ignore
				dataKey === 'overall' ? value : payload.original[dataKey as string],
			color: stroke
		};
	});

	return <CustomizedTooltip label={props.label!} payload={originValues} />;
};
