import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import { ComposedChart, LabelList, YAxis } from 'recharts';
import { useCountryDataContext } from '../../../../providers/CountryDataProvider/hooks/useCountryDataContext';
import {
	Bar,
	ChartContainer,
	Gradients,
	Legend,
	Line,
	Tooltip,
	XAxis
} from '../../../../shared/chart';
import { CustomizedVaccinationTooltip } from './CustomizedVaccinationTooltip';
import { PointLabel } from '../../../../shared/chart/customized/PointLabel';

interface IProps {}

export const VaccinationsChart: React.FC<IProps> = props => {
	const { dailyVaccinations } = useCountryDataContext();

	const { t } = useTranslation();
	const theme = useTheme();
	const gradientsId = 'Vaccinations';
	const { chartSliceIndex } = useCountryDataContext();
	const { secondDoseCumulative } = dailyVaccinations.slice(-1)[0];

	const chartData = useMemo(() => {
		const data = dailyVaccinations.slice(chartSliceIndex);

		const distinctSecondDoseAmount = data.map(
			({ secondDoseAmount }) => secondDoseAmount
		);
		const secondDoseAmountRatio =
			Math.max(...distinctSecondDoseAmount) / secondDoseCumulative;

		const distinctSecondDosePercentage = data.map(
			({ secondDosePercentage }) => secondDosePercentage
		);
		const secondDostPercentageRatio =
			Math.max(...distinctSecondDosePercentage) / secondDoseCumulative;

		return data.map(vaccinationData => {
			return {
				original: vaccinationData,
				...vaccinationData,
				secondDoseAmount:
					(vaccinationData.secondDoseAmount / secondDoseAmountRatio) * 0.83,
				secondDosePercentage:
					vaccinationData.secondDosePercentage / secondDostPercentageRatio
			};
		});
	}, [dailyVaccinations]);

	return (
		<S.Container>
			<ChartContainer title={t('charts.vaccinationsChart.title')}>
				<ComposedChart data={chartData} barCategoryGap={'30%'}>
					<Legend
						payload={[
							{
								id: 'secondDoseCumulative',
								value: t('charts.vaccinationsChart.secondDoseCumulative'),
								color: theme.colors.turquoise1,
								type: 'square'
							},
							{
								id: 'secondDoseAmount',
								value: t('charts.vaccinationsChart.secondDoseAmount'),
								color: theme.colors.blue2,
								type: 'square'
							}
						]}
					/>

					<defs>
						<Gradients
							colors={['blue2', 'turquoise1']}
							idPrefix={gradientsId}
							startOpacity={0.8}
							endOpacity={0.4}
						/>
					</defs>

					<Line
						dataKey='secondDoseCumulative'
						stroke={theme.colors.turquoise1}
						name={t('charts.vaccinationsChart.secondDoseCumulative') as string}
					/>

					<Bar
						dataKey='secondDoseAmount'
						fill={`url(#${gradientsId}blue2)`}
						stroke={theme.colors.blue2}
						strokeWidth={1}
						name={t('charts.vaccinationsChart.secondDoseAmount') as string}
					>
						<LabelList
							dataKey='original.secondDoseAmount'
							content={
								<PointLabel
									shouldDisplay={index => [2, 5, 0, 7].includes(index)}
								/>
							}
						/>
					</Bar>

					<Tooltip content={<CustomizedVaccinationTooltip />} />

					<YAxis
						type='number'
						domain={[0, `dataMax + ${secondDoseCumulative * 0.1}`]}
						hide
					/>
					<XAxis />
				</ComposedChart>
			</ChartContainer>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		.positive-amount {
			transform: scaleY(-1);
			transform-box: fill-box;
		}
	`
};
