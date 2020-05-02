import React, { SelectHTMLAttributes } from 'react';
import styled from 'styled-components/macro';
import { IStyle, Ref } from '../../../@types/interfaces';
import { IconsEnum } from '../../../@types/enums';
import { Icon } from '../Icon/Icon';

interface IProps extends IStyle, SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, IProps>(
	(props, ref) => {
		return (
			<S.Container>
				<S.Select ref={ref} {...props}>
					{props.children}
				</S.Select>
				<S.ArrowIcon type={IconsEnum.ArrowDropdown} />
			</S.Container>
		);
	}
);

Select.displayName = 'Select';

/*
 * Important!
 * Fontsize must be 16px on mobile to prevent ios from zooming.
 * */
const S = {
	Container: styled.div`
		position: relative;
	`,
	Select: styled.select`
		padding: 0.7rem 0.5rem 0.7rem 1.6rem;
		font-size: 1.6rem;
		border-radius: 0.3rem;
		outline: none;
		cursor: pointer;
		margin-right: 0.5rem;
		color: white;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		background: ${({ theme }) => theme.colors.darkBlue1};
		-webkit-appearance: none;
		border: 0.2rem solid transparent;
		transition: 0.1s;

		@supports (-webkit-touch-callout: none) {
			font-size: 16px;
		}

		&:focus {
			border-color: ${({ theme }) => theme.colors.blue2};
		}
	`,
	ArrowIcon: styled(Icon)`
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		fill: white;
		pointer-events: none;
	`
};
