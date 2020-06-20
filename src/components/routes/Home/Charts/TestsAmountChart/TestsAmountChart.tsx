import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/macro';
import {
	Bar,
	ComposedChart,
	LabelList,
	Legend,
	Line,
	Tooltip,
	XAxis
} from 'recharts';
import { useCountryData } from '../../../../../hooks/useCountryData';
import { CustomizedXAxisTick } from '../../../../shared/BaseChart/CustomizedXAxisTick';
import {
	animationDefaultProps,
	legendDefaultProps,
	tooltipDefaultProps,
	xAxisDefaultProps
} from '../../../../shared/BaseChart/defaults';
import { ChartContainer } from '../../../../shared/BaseChart/ChartContainer';
import { Gradients } from '../../../../shared/BaseChart/Gradients';
import { useDisableChartActiveState } from '../../../../../hooks/useDisableChartActiveState';
import { ITestAmountItem } from '../../../../providers/CountryDataProvider/interfaces';
import { CustomTestAmountLabel } from './CustomTestAmountLabel';
import { CustomizedTestAmountTooltip } from './CustomizedTestAmountTooltip';

interface IProps {}

export const TestsAmountChart: React.FC<IProps> = (props) => {
	const {
		testsData: { data, total }
	} = useCountryData();
	const { t } = useTranslation();
	const theme = useTheme();
	const gradientsId = 'TestsAmount';
	const { chartRef, disable } = useDisableChartActiveState();

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
			<ChartContainer
				title={t('charts.testsAmountChart.title')}
				// tooltip={t('charts.testsAmountChart.tooltip')}
			>
				<ComposedChart
					data={withTotal.slice(-8)}
					ref={chartRef}
					onMouseUp={disable}
					barCategoryGap={'30%'}
				>
					<Legend
						{...(legendDefaultProps as any)}
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
						strokeWidth={3.5}
						name={t('charts.testsAmountChart.sumTests') as string}
						{...animationDefaultProps}
					/>

					<Bar
						dataKey='amount'
						fill={`url(#${gradientsId}blue2)`}
						stroke={theme.colors.blue2}
						strokeWidth={1}
						{...animationDefaultProps}
						name={t('charts.testsAmountChart.today') as string}
					>
						<LabelList dataKey='original' content={<CustomTestAmountLabel />} />
					</Bar>

					<Line
						dataKey='positive'
						stroke={theme.colors.red1}
						strokeWidth={3.5}
						name={t('charts.testsAmountChart.positive') as string}
						{...animationDefaultProps}
					/>

					<Tooltip
						content={<CustomizedTestAmountTooltip />}
						{...(tooltipDefaultProps as any)}
					/>

					<XAxis {...xAxisDefaultProps} tick={<CustomizedXAxisTick />} />
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
