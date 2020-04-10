import React from 'react';
import styled from 'styled-components/macro';

interface IProps {
	title: string;
}

export const CustomizedLegend: React.FC<IProps> = (props) => {
	return <S.Container>{props.title}</S.Container>;
};

const S = {
	Container: styled.div`
		text-align: center;
	`
};
