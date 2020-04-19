import React from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer } from 'recharts';
import CustomText from '../CustomText/CustomText';
import media from '../../../themes/media';

interface IProps {
	title: string;
}

export const ChartContainer: React.FC<IProps> = (props) => {
	return (
		<S.Container>
			<S.ChartTitle text={props.title} />
			<S.OuterChartContainer>
				<S.InnerChartContainer>
					<ResponsiveContainer debounce={200}>
						{props.children}
					</ResponsiveContainer>
				</S.InnerChartContainer>
			</S.OuterChartContainer>
		</S.Container>
	);
};
// prettier-ignore
const S = {
	Container: styled.div`
		position: relative;
		user-select: none;

		.recharts-surface {
			overflow: visible;
		}

		.recharts-default-legend {
			direction: rtl;
		}

		.recharts-legend-item-text {
			margin-right: 0.5rem;
			transform: translateY(0.12rem);
			display: inline-block;
			color: white;
		}

		.recharts-tooltip-wrapper {
			font-weight: bold;
		}

		${media.tablet`
			margin: 2rem 0 3rem 0;
		`};
	`,
	OuterChartContainer: styled.div`
		width: 100%;
		direction: ltr;
		height: 40vh;
		min-height: 25rem;
		max-height: 38rem;
		position: relative;
	`,
	InnerChartContainer: styled.div`
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0 2.5rem;
	`,
	ChartTitle: styled(CustomText)`
		text-align: center;
		width: 100%;
		display: inline-block;
		font-weight: bold;
		direction: rtl;
	`
};
