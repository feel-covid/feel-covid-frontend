import React from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer } from 'recharts';
import CustomText from '../CustomText/CustomText';

interface IProps {
	title: string;
}

export const ChartContainer: React.FC<IProps> = (props) => {
	return (
		<S.Container>
			<S.ChartTitle text={props.title} />
			<S.ChartContainer>
				<ResponsiveContainer>{props.children}</ResponsiveContainer>
			</S.ChartContainer>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		position: relative;
	`,
	ChartContainer: styled.div`
		width: 100%;
		height: 100%;
		padding: 0 3rem;
		direction: ltr;
	`,
	ChartTitle: styled(CustomText)`
		position: absolute;
		right: 0;
		direction: rtl;
	`
};
