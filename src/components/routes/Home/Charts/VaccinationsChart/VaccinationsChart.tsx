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
	const { thirdDoseCumulative } = dailyVaccinations.slice(-1)[0];

	const chartData = useMemo(() => {
		const data = dailyVaccinations.slice(chartSliceIndex);

		const distinctThirdDoseAmount = data.map(
			({ thirdDoseAmount }) => thirdDoseAmount
		);
		const thirdDoseAmountRatio =
			Math.max(...distinctThirdDoseAmount) / thirdDoseCumulative;

		const distinctThirdDosePercentage = data.map(
			({ thirdDosePercentage }) => thirdDosePercentage
		);
		const thirdDostPercentageRatio =
			Math.max(...distinctThirdDosePercentage) / thirdDoseCumulative;

		return data.map(vaccinationData => {
			return {
				original: vaccinationData,
				...vaccinationData,
				thirdDoseAmount:
					(vaccinationData.thirdDoseAmount / thirdDoseAmountRatio) * 0.83,
				thirdDosePercentage:
					vaccinationData.thirdDosePercentage / thirdDostPercentageRatio
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
								id: 'thirdDoseCumulative',
								value: t('charts.vaccinationsChart.cumulative'),
								color: theme.colors.turquoise1,
								type: 'square'
							},
							{
								id: 'thirdDoseAmount',
								value: t('charts.vaccinationsChart.vaccinatedToday'),
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
						dataKey='thirdDoseCumulative'
						stroke={theme.colors.turquoise1}
						name={t('charts.vaccinationsChart.cumulative') as string}
					/>

					<Bar
						dataKey='thirdDoseAmount'
						fill={`url(#${gradientsId}blue2)`}
						stroke={theme.colors.blue2}
						strokeWidth={1}
						name={t('charts.vaccinationsChart.vaccinatedToday') as string}
					>
						<LabelList
							dataKey='original.thirdDoseAmount'
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
						domain={[0, `dataMax + ${thirdDoseCumulative * 0.1}`]}
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
