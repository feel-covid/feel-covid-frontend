import React from 'react';
import { CustomizedTooltip } from '../../../../shared/chart/customized/CustomizedTooltip';
import { IDailyVaccination } from '../../../../providers/CountryDataProvider/interfaces';

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
			original: IDailyVaccination;
		};
	}>;
}

export const CustomizedVaccinationTooltip: React.FC<IProps> = props => {
	if (!props.active) return null;

	const originValues = props.payload!.map(currentPayload => {
		const { name, dataKey, payload, stroke } = currentPayload;

		let value = (payload.original[
			dataKey as keyof IDailyVaccination
		] as string).toLocaleString();

		if (dataKey === 'secondDoseCumulative') {
			value += ` (${payload.original.secondDosePercentage}%)`;
		}

		return {
			text: name,
			value,
			color: stroke
		};
	});

	return <CustomizedTooltip label={props.label!} payload={originValues} />;
};
