import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styled, { css, useTheme } from 'styled-components/macro';
import { LineChart } from 'recharts';
import { Checkbox } from '../../../shared/Checkbox/Checkbox';
import { DynamicObject } from '../../../../@types/interfaces';
import { useCountryData } from '../../../../hooks/useCountryData';
import CustomText from '../../../shared/CustomText/CustomText';
import get from 'lodash/get';
import { deleteOrAddKey } from '../../../../utils/deleteOrAddKey';
import { CustomCompareHeader } from './CustomCompareHeader/CustomCompareHeader';
import media from '../../../../themes/media';
import { useTogglesContext } from '../../../../hooks/useTogglesContext';
import { TogglesActions } from '../../../providers/TogglesProvider/reducer';
import useStrictEffect from '../../../../hooks/useStrictEffect';
import { CustomizedLineLabel } from '../../../shared/chart/customized/CustomizedLineLabel';
import {
	ChartContainer,
	Tooltip,
	XAxis,
	Legend,
	Line
} from '../../../shared/chart';

interface IProps {}

interface ISelectionItem {
	title: string;
	path: string;
	color: string;
}

export const CustomCompare: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const { state, dispatch } = useTogglesContext();
	const [selectedItems, setSelectedItems] = useState<DynamicObject<boolean>>({
		total: true,
		recovered: true
	});

	const { normalizedChartData, chartSliceIndex } = useCountryData();
	const [statsBackCount, setStatsBackCount] = useState(chartSliceIndex);
	const contentContainer = useRef<HTMLDivElement>(null);

	const handleCheck = useCallback((key: string) => {
		setSelectedItems((prevState) => deleteOrAddKey(key, prevState));
	}, []);

	useStrictEffect(() => {
		const { showCustomCompare } = state;
		document.body.style.overflow = showCustomCompare ? 'hidden' : 'visible';
	}, [state.showCustomCompare]);

	const selectOptions: DynamicObject<ISelectionItem> = useMemo(
		() => ({
			total: {
				title: t('global.cases.confirmedCases'),
				path: 'total',
				color: theme.colors.blue2
			},
			active: {
				title: t('global.cases.currently'),
				path: 'active',
				color: '#5e35b1'
			},
			light: {
				title: t('global.cases.lightCondition'),
				path: 'light',
				color: theme.colors.green1
			},
			mid: {
				title: t('global.cases.midCondition'),
				path: 'mid',
				color: theme.colors.orange2
			},
			severe: {
				title: t('global.cases.severeCondition'),
				path: 'severe.cases',
				color: theme.colors.orange1
			},
			intubated: {
				title: t('global.cases.intubated'),
				path: 'severe.intubated',
				color: theme.colors.red1
			},
			recovered: {
				title: t('global.cases.recovered'),
				path: 'recovered',
				color: '#00796b'
			},
			deceased: {
				title: t('global.cases.deceased'),
				path: 'deceased',
				color: '#d50000'
			},
			hospital: {
				title: t('global.treatment.hospital'),
				path: 'treatment.hospital',
				color: '#795548'
			},
			homeHotelUndecided: {
				title: t('global.treatment.homeHotelUndecided'),
				path: 'treatment.combinedHomeHotelUndecided',
				color: '#9e9d24'
			}
		}),
		[]
	);

	const children = useMemo(
		() => (
			<S.Wrapper
				isOpen={state.showCustomCompare}
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (
						e.target === e.currentTarget ||
						(e.target as HTMLDivElement).id === 'custom-compare-close-icon'
					) {
						dispatch({
							type: TogglesActions.SET_SHOW_CUSTOM_COMPARE,
							payload: false
						});
					}
				}}
			>
				<S.InnerContainer isOpen={state.showCustomCompare}>
					<CustomCompareHeader setStatsBackCount={setStatsBackCount} />
					<S.ContentContainer ref={contentContainer}>
						<S.ChartContainer title=''>
							<LineChart data={normalizedChartData.slice(statsBackCount)}>
								{Object.keys(selectedItems).map((key) => {
									const { path, title, color } = get(selectOptions, key);
									return (
										<Line
											key={key}
											dataKey={path}
											fill='transparent'
											strokeWidth={3}
											name={title}
											type='monotone'
											stroke={color}
											dot={false}
											// @ts-ignore
											label={
												<CustomizedLineLabel
													stroke={color}
													itemsLength={
														normalizedChartData.slice(statsBackCount)
															.length as any
													}
												/>
											}
										/>
									);
								})}

								<Tooltip />

								<XAxis interval={Number(statsBackCount !== chartSliceIndex)} />

								<Legend
									wrapperStyle={{ transform: 'translateY(-1.5rem)' }}
									verticalAlign='top'
								/>
							</LineChart>
						</S.ChartContainer>

						<S.SelectionContainer>
							{Object.entries(selectOptions).map(([key, value]) => (
								<S.Checkbox
									key={key}
									title={value.title}
									checked={Boolean(selectedItems[key])}
									onCheck={() => handleCheck(key)}
								/>
							))}
						</S.SelectionContainer>
					</S.ContentContainer>
				</S.InnerContainer>
			</S.Wrapper>
		),
		[state.showCustomCompare, dispatch, selectedItems, statsBackCount]
	);

	return ReactDOM.createPortal(
		children,
		document.getElementById('customCompareMountPoint')!
	);
};

const S = {
	Wrapper: styled.div<{ isOpen: boolean }>`
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		top: 0;
		left: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
		visibility: hidden;
		transition: 0.3s;
		overflow: auto;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-tap-highlight-color: transparent;

		${({ isOpen }) =>
			isOpen &&
			css`
				opacity: 1;
				visibility: visible;
			`}
	`,
	InnerContainer: styled.div<{ isOpen: boolean }>`
		flex-direction: column;
		display: flex;
		background: ${({ theme }) => theme.colors.darkBlue1};
		width: 100%;
		min-height: 50vh;
		max-width: 130rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
		margin: 0 1rem;
		overflow: hidden;
		transform: translateY(7rem) scale(0.95);
		opacity: 0;
		transition: 0.3s;

		${media.tablet`
			height: 100%;
			margin: 0;
			border-radius: 0;
		`}

		${({ isOpen }) =>
			isOpen &&
			css`
				transform: translateY(0rem) scale(1);
				opacity: 1;
			`}
	`,
	ContentContainer: styled.div`
		display: flex;
		align-items: center;
		flex-direction: row-reverse;
		height: calc(100% - 5.6rem);
		width: 100%;
		overflow: auto;

		${media.tablet`
			flex-direction: column;
		
			@supports (-webkit-touch-callout: none) {
				-webkit-overflow-scrolling: touch;
			}
		`};

		@media (max-height: 580px) {
			overflow: auto;
		}
	`,
	SelectionContainer: styled.div`
		flex: 1;
		height: 50vh;
		align-self: flex-start;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 0.8rem;
		padding: 1rem 1rem 1rem 0;

		@media (max-height: 700px) {
			height: unset;
		}

		${media.tablet`
				width: 100%;
				height: 100%;
				padding: 1rem;
				height: unset;
				-webkit-overflow-scrolling: touch;

		
				@supports (-webkit-touch-callout: none) {
						overflow: visible;
				}
		`};

		@media (max-height: 580px) {
			overflow: visible;
		}
	`,
	ChartContainer: styled(ChartContainer)`
		flex: 2;
		align-self: flex-end;
		margin-bottom: 1rem;
		padding: 0 3rem;
		background: transparent;

		@supports (-moz-appearance: none) {
			display: flex;
			align-items: flex-end;
		}

		${media.tablet`
				flex: 1;
				width: 100%;
				margin-bottom: 0;
				padding-top: 1.5rem;
		`}
	`,
	SelectionTitle: styled(CustomText)`
		font-weight: bold;
	`,
	Checkbox: styled(Checkbox)``
};
