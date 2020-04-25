import React, { SelectHTMLAttributes } from 'react';
import styled from 'styled-components/macro';
import { IStyle } from '../../../@types/interfaces';
import { IconsEnum } from '../../../@types/enums';
import { Icon } from '../Icon/Icon';

interface IProps extends IStyle, SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<IProps> = (props) => {
	return (
		<S.Container>
			<S.Select {...props}>{props.children}</S.Select>
			<S.ArrowIcon type={IconsEnum.ArrowDropdown} />
		</S.Container>
	);
};

/*
 * Important!
 * Fontsize must be 16px on mobile to prevent ios from zooming.
 * */
const S = {
	Container: styled.div`
		position: relative;
	`,
	Select: styled.select`
		padding: 0.7rem 0.3rem 0.7rem 2.3rem;
		font-size: 1.6rem;
		border-radius: 0.3rem;
		outline: none;
		cursor: pointer;
		margin-right: 0.5rem;
		border: none;
		color: white;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		background: ${({ theme }) => theme.colors.darkBlue1};
		-webkit-appearance: none;
		@supports (-webkit-touch-callout: none) {
			font-size: 16px;
		}
	`,
	ArrowIcon: styled(Icon)`
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		fill: white;
	`
};
