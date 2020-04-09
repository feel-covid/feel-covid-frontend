import React from 'react';
import styled from 'styled-components/macro';
import { ResponsiveContainer } from 'recharts';

interface IProps {}

export const ChartContainer: React.FC<IProps> = (props) => {
	return (
		<S.Container>
			<ResponsiveContainer>{props.children}</ResponsiveContainer>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		width: 100%;
		height: 100%;
		padding: 0 3rem;
	`
};
