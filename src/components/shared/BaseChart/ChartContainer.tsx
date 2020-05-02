import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer } from 'recharts';
import CustomText from '../CustomText/CustomText';
import media from '../../../themes/media';
import { IStyle } from '../../../@types/interfaces';
import { envInfo } from '../../../utils/envInfo';

interface IProps extends IStyle {
	title: string;
}

export const ChartContainer: React.FC<IProps> = (props) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const { current: container } = containerRef;
		if (container && envInfo.isTouchDevice) {
			let touchStartData: { startX: number; startY: number } = {} as any;

			const handleTouchStart = (e: TouchEvent) => {
				const touches = e.touches[0];
				touchStartData = {
					startX: touches.pageX,
					startY: touches.pageY
				};
			};

			const handleTouchMove = (e: TouchEvent) => {
				const touches = e.touches[0];
				const delta = {
					x: Math.abs(touchStartData.startX - touches.pageX),
					y: Math.abs(touchStartData.startY - touches.pageY)
				};

				if (delta.x < delta.y || delta.x < 22) {
					e.stopPropagation();
				}
			};

			container.addEventListener('touchstart', handleTouchStart, {
				passive: true
			});

			container.addEventListener('touchmove', handleTouchMove, {
				passive: true
			});

			return () => {
				if (container) {
					container.removeEventListener('touchstart', handleTouchStart);
					container.removeEventListener('touchmove', handleTouchMove);
				}
			};
		}
	}, []);

	return (
		<S.Container ref={containerRef} className={props.className}>
			<S.ChartTitle text={props.title} />
			<S.OuterChartContainer>
				<S.InnerChartContainer>
					<ResponsiveContainer debounce={200}>
						{props.children as any}
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
		
		.recharts-cartesian-axis-ticks {
			user-select: none;
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
