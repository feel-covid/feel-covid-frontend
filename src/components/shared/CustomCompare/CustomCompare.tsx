import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import styled, { css, useTheme } from 'styled-components/macro';
import { ChartContainer } from '../BaseChart/ChartContainer';
import { Legend, Line, LineChart, Tooltip, XAxis } from 'recharts';
import { Checkbox } from '../Checkbox/Checkbox';
import { DynamicObject } from '../../../@types/interfaces';
import { useCountryData } from '../../../hooks/useCountryData';
import {
	legendDefaultProps,
	tooltipDefaultProps,
	xAxisDefaultProps
} from '../BaseChart/defaults';
import { CustomizedXAxisTick } from '../BaseChart/CustomizedXAxisTick';
import { formatChartDate } from '../../../utils/formatChartDate';
import { he } from 'date-fns/locale';
import CustomText from '../CustomText/CustomText';
import get from 'lodash/get';
import { deleteOrAddKey } from '../../../utils/deleteOrAddKey';
import { CustomCompareHeader } from './CustomCompareHeader/CustomCompareHeader';
import media from '../../../themes/media';
import { useTogglesContext } from '../../../hooks/useTogglesContext';
import { TogglesActions } from '../../providers/TogglesProvider/reducer';
import { useDisableChartActiveState } from '../../../hooks/useDisableChartActiveState';

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
		'1.total': true,
		'2.recovered': true
	});
	const {
		normalizedChartData,
		weekAgoIndexOnNormalizedChartData
	} = useCountryData();
	const [statsBackCount, setStatsBackCount] = useState(
		weekAgoIndexOnNormalizedChartData
	);
	const { chartRef, disable } = useDisableChartActiveState();
	const handleCheck = useCallback((key: string) => {
		setSelectedItems((prevState) => deleteOrAddKey(key, prevState));
	}, []);

	const selectOptions: DynamicObject<DynamicObject<ISelectionItem>> = useMemo(
		() => ({
			1: {
				total: {
					title: t('global.cases.confirmedCases'),
					path: 'total',
					color: theme.colors.blue2
				},
				active: {
					title: t('global.cases.currently'),
					path: 'active',
					color: '#5e35b1'
				}
			},
			2: {
				recovered: {
					title: t('global.cases.recovered'),
					path: 'recovered',
					color: '#00796b'
				},
				deceased: {
					title: t('global.cases.deceased'),
					path: 'deceased',
					color: '#d50000'
				}
			},
			3: {
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
				}
			},
			4: {
				hospital: {
					title: t('global.treatment.hospital'),
					path: 'treatment.hospital',
					color: '#795548'
				},
				home: {
					title: t('global.treatment.home'),
					path: 'treatment.home',
					color: '#33691e'
				},
				hotel: {
					title: t('global.treatment.hotel'),
					path: 'treatment.hotel',
					color: '#9e9d24'
				}
			}
		}),
		[]
	);

	return ReactDOM.createPortal(
		<S.Wrapper
			isOpen={state.showCustomCompare}
			onClick={(e: React.MouseEvent<HTMLElement>) => {
				if (
					e.target === e.currentTarget ||
					(e.target as HTMLDivElement).id === 'custom-compare-close-icon'
				) {
					dispatch({ type: TogglesActions.SET_SHOW_CUSTOM_COMPARE });
				}
			}}
		>
			<S.InnerContainer isOpen={state.showCustomCompare}>
				<CustomCompareHeader setStatsBackCount={setStatsBackCount} />
				<S.ContentContainer>
					<S.SelectionContainer>
						{Object.entries(selectOptions).map(([category, items]) => {
							return (
								<React.Fragment key={category}>
									<S.SelectionItemsContainer>
										<S.CheckboxesContainer>
											{Object.entries(items).map(([key, value]) => (
												<S.Checkbox
													key={key}
													title={value.title}
													checked={Boolean(selectedItems[`${category}.${key}`])}
													onCheck={() => handleCheck(`${category}.${key}`)}
												/>
											))}
										</S.CheckboxesContainer>
									</S.SelectionItemsContainer>
									<hr />
								</React.Fragment>
							);
						})}
					</S.SelectionContainer>

					<S.ChartContainer>
						<ChartContainer title=''>
							<LineChart
								data={normalizedChartData.slice(statsBackCount)}
								ref={chartRef}
								onMouseUp={disable}
							>
								{Object.keys(selectedItems).map((key) => {
									const { path, title, color } = get(selectOptions, key);
									return (
										// @ts-ignore
										<Line
											key={key}
											dataKey={path}
											fill='transparent'
											strokeWidth={3}
											name={title}
											dot={false}
											type={'linear'}
											stroke={color}
										/>
									);
								})}

								<Tooltip
									labelFormatter={(date) =>
										formatChartDate(date as string, { locale: he })
									}
									{...{ ...(tooltipDefaultProps as any), position: { y: 0 } }}
								/>

								<XAxis
									{...xAxisDefaultProps}
									tick={<CustomizedXAxisTick />}
									interval={Number(
										statsBackCount !== weekAgoIndexOnNormalizedChartData
									)}
								/>

								<Legend
									{...{
										...(legendDefaultProps as any),
										wrapperStyle: { transform: 'translateY(-1.5rem)' }
									}}
									verticalAlign='top'
								/>
							</LineChart>
						</ChartContainer>
					</S.ChartContainer>
				</S.ContentContainer>
			</S.InnerContainer>
		</S.Wrapper>,
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
		height: 60vh;
		max-width: 130rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
		margin: 0 1rem;
		overflow: hidden;
		transform: translateY(7rem) scale(0.9);
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

		height: calc(100% - 5.6rem);
		width: 100%;

		${media.tablet`
			flex-direction: column-reverse;
		`};

		@media (max-height: 500px) {
			overflow: auto;
		}
	`,
	SelectionContainer: styled.div`
		flex: 1;
		overflow: auto;
		padding: 1rem 2rem 1rem 0;
		direction: ltr;
		height: 100%;

		&::-webkit-scrollbar {
			width: 8px;
		}

		${media.tablet`
			width: 100%;
				padding: 2rem 2rem 1rem 1rem;
				height: unset;
		`};

		@media (max-height: 500px) {
			overflow: visible;
		}

		hr {
			border: 0.1rem dashed #383838;
			display: block;
			width: 98%;
			margin: 0.7rem 0;

			&:last-child {
				display: none;
			}
		}
	`,
	ChartContainer: styled.div`
		flex: 2;
		align-self: flex-end;
		margin-bottom: 3rem;
		padding: 0 0 0 1.5rem;

		${media.tablet`
				flex: 1;
				width: 100%;
				margin-bottom: 0;
				padding: 0;
		`}
	`,
	SelectionItemsContainer: styled.div`
		direction: rtl;
		width: 100%;
	`,
	SelectionTitle: styled(CustomText)`
		font-weight: bold;
	`,
	Checkbox: styled(Checkbox)`
		margin: 1rem 0;
	`,
	CheckboxesContainer: styled.div`
		width: 100%;
	`
};
