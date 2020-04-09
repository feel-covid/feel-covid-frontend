import React from 'react';
import styled from 'styled-components/macro';

interface IProps {}

export const PaddingContainer: React.FC<IProps> = (props) => {
	return <S.Container>{props.children}</S.Container>;
};

const S = {
	Container: styled.div`
		margin: auto;
		width: 100%;
	`
};
