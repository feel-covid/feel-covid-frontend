import React from 'react';
import styled, { css } from 'styled-components/macro';
import { IStyle, PlainFunction } from '../../../@types/interfaces';
import CustomText from '../CustomText/CustomText';

interface IProps extends IStyle {
	checked: boolean;
	size?: string;
	onCheck: PlainFunction<any>;
	title: string;
}

export const Checkbox: React.FC<IProps> = (props) => {
	const { onCheck, title, checked } = props;
	return (
		<S.Container
			checked={checked}
			onClick={onCheck}
			className={props.className}
		>
			<S.Title text={title} />
		</S.Container>
	);
};

Checkbox.defaultProps = {
	size: '1.8rem'
};

const S = {
	Container: styled.div<Partial<IProps>>`
		cursor: pointer;
		background: ${({ theme }) => theme.colors.darkBlue2};
		padding: 1rem 2rem;
		border-radius: 0.5rem;
		border: 0.2rem solid transparent;
		transition: 0.2s;
		display: flex;
		justify-content: center;
		align-items: center;

		@media not all and (pointer: coarse) {
			&:hover {
				background: #2a344e;
			}
		}

		${({ checked }) =>
			checked &&
			css`
				border-color: ${({ theme }) => theme.colors.blue2};
			`};
	`,
	Title: styled(CustomText)`
		white-space: nowrap;
		margin-right: 1rem;
	`
};
