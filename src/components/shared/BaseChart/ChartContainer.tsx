import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer } from 'recharts';
import CustomText from '../CustomText/CustomText';
import { IStyle } from '../../../@types/interfaces';
import { envInfo } from '../../../utils/envInfo';
import { IconsEnum } from '../../../@types/enums';
import { Tooltip } from '../Tooltip/Tooltip';
import { Icon } from '../Icon/Icon';

interface IProps extends IStyle {
	title: string;
	tooltip?: string;
}

export const ChartContainer: React.FC<IProps> = (props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { tooltip, title } = props;

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

				if (delta.x < delta.y) {
					e.stopPropagation();
				}
			};

			container.addEventListener('touchstart', handleTouchStart, {
				passive: true,
				capture: true
			});

			container.addEventListener('touchmove', handleTouchMove, {
				passive: true,
				capture: true
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
			<S.TitleAndTooltipContainer>
				<S.ChartTitle text={title} />
				{tooltip && (
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					<S.TooltipContainer onClick={() => {}}>
						<S.Tooltip content={tooltip}>
							<S.InfoIcon type={IconsEnum.MoreInformation} />
						</S.Tooltip>
					</S.TooltipContainer>
				)}
			</S.TitleAndTooltipContainer>

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

const S = {
	Container: styled.div`
		position: relative;
		user-select: none;
		background: ${({ theme }) => theme.colors.darkBlue2};
		box-shadow: ${({ theme }) => `0 0 .6rem ${theme.colors.lightBlack1}`};
		border-radius: 0.4rem;
		padding: 2rem;
		height: 100%;

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
			pointer-events: none;
		}

		.recharts-cartesian-axis-ticks {
			user-select: none;
		}
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
	`,
	TooltipContainer: styled.div`
		position: relative;
		line-height: 0;
		transform: translateY(0.03rem);
		margin-right: 0.5rem;
	`,
	TitleAndTooltipContainer: styled.div`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		z-index: 1;
		position: relative;
	`,
	InfoIcon: styled(Icon)`
		fill: white;
		width: 1.8rem;
		height: 1.8rem;
	`,
	Tooltip: styled(Tooltip)`
		width: 29rem;
		text-align: center;
		bottom: -11.2rem;
		line-height: initial;
		padding: 1rem;
		height: auto;

		@media (max-width: 500px) {
			left: 0;
			top: 2.3rem;
			transform: none;
			bottom: initial;
		}
	`,
	ChartTitle: styled(CustomText)`
		display: inline-block;
		font-weight: bold;
		direction: rtl;

		@media (max-width: 345px) {
			font-size: 1.5rem;
		}
	`
};
