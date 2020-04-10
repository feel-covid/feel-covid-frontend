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
					<ResponsiveContainer debounce={100}>
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

		${media.phone`
			margin: 2rem 0;
		`}
	`,
	OuterChartContainer: styled.div`
		width: 100%;
		direction: ltr;
		height: 40vh;
		min-height: 25rem;
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
		position: absolute;
		right: 2.5rem;
		direction: rtl;
	`
};
