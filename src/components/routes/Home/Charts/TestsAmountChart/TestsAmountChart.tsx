import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import { ComposedChart, LabelList } from 'recharts';
import { useCountryData } from '../../../../../hooks/useCountryData';
import { ITestAmountItem } from '../../../../providers/CountryDataProvider/interfaces';
import { CustomTestAmountLabel } from './CustomTestAmountLabel';
import { CustomizedTestAmountTooltip } from './CustomizedTestAmountTooltip';
import {
	ChartContainer,
	Gradients,
	Legend,
	Line,
	Bar,
	Tooltip,
	XAxis
} from '../../../../shared/chart';

interface IProps {}

export const TestsAmountChart: React.FC<IProps> = (props) => {
	const {
		testsData: { data, total }
	} = useCountryData();
	const { t } = useTranslation();
	const theme = useTheme();
	const gradientsId = 'TestsAmount';
	const { chartSliceIndex } = useCountryData();

	const withTotal = useMemo(() => {
		const distinctAmount = data.map(({ amount }) => amount);
		const amountRatio = Math.max(...distinctAmount) / total;

		const distinctPositive = data.map(({ positive }) => positive);
		const positiveRatio = Math.max(...distinctPositive) / total;

		let tmpAmount = 0;

		return data
			.reduceRight((acc, currentAmount, index, arr) => {
				tmpAmount =
					index === arr.length - 1 ? total : tmpAmount - arr[index + 1].amount;

				acc.push({
					...currentAmount,
					overall: tmpAmount,
					amount: (currentAmount.amount / amountRatio) * 0.85,
					positive: (currentAmount.positive / positiveRatio) * 0.1,
					original: currentAmount
				});

				return acc;
			}, [] as Array<ITestAmountItem & { overall: number; original: any }>)
			.reverse();
	}, [data, total]);

	return (
		<S.Container>
			<ChartContainer title={t('charts.testsAmountChart.title')}>
				<ComposedChart
					data={withTotal.slice(chartSliceIndex)}
					barCategoryGap={'30%'}
				>
					<Legend
						payload={[
							{
								id: 'sumTests',
								value: t('charts.testsAmountChart.sumTests'),
								color: theme.colors.turquoise1,
								type: 'square'
							},
							{
								id: 'amount',
								value: t('charts.testsAmountChart.today'),
								color: theme.colors.blue2,
								type: 'square'
							},
							{
								id: 'positive',
								value: t('charts.testsAmountChart.positive'),
								color: theme.colors.red1,
								type: 'square'
							}
						]}
					/>

					<defs>
						<Gradients
							colors={['blue2']}
							idPrefix={gradientsId}
							startOpacity={0.8}
							endOpacity={0.4}
						/>
					</defs>

					<Line
						dataKey='overall'
						stroke={theme.colors.turquoise1}
						name={t('charts.testsAmountChart.sumTests') as string}
					/>

					<Bar
						dataKey='amount'
						fill={`url(#${gradientsId}blue2)`}
						stroke={theme.colors.blue2}
						strokeWidth={1}
						name={t('charts.testsAmountChart.today') as string}
					>
						<LabelList dataKey='original' content={<CustomTestAmountLabel />} />
					</Bar>

					<Line
						dataKey='positive'
						stroke={theme.colors.red1}
						name={t('charts.testsAmountChart.positive') as string}
					/>

					<Tooltip content={<CustomizedTestAmountTooltip />} />

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
