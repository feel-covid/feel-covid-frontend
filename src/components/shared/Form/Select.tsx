import React, { SelectHTMLAttributes } from 'react';
import styled from 'styled-components/macro';
import { IStyle } from '../../../@types/interfaces';

interface IProps extends IStyle, SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<IProps> = (props) => {
	return <S.Select {...props}>{props.children}</S.Select>;
};

/*
 * Important!
 * Fontsize must be 16px on mobile to prevent ios from zooming.
 * */
const S = {
	Select: styled.select`
		padding: 0.7rem 0.3rem;
		font-size: 1.6rem;
		border-radius: 0.3rem;
		outline: none;
		cursor: pointer;
		margin-right: 0.5rem;
		border: none;
		color: white;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		background: ${({ theme }) => theme.colors.darkBlue1};

		@supports (-webkit-touch-callout: none) {
			font-size: 16px;
		}
	`
};
