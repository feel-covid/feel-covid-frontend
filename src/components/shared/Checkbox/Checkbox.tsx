import React from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation();
	const { onCheck, title, ...rest } = props;
	return (
		<S.Container onClick={props.onCheck} className={props.className}>
			<S.Title text={title} />
			<S.Box {...rest} />
		</S.Container>
	);
};

Checkbox.defaultProps = {
	size: '1.8rem'
};

const S = {
	Container: styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
		background: ${({ theme }) => theme.colors.darkBlue2};
		padding: 1rem 2rem;
		border-radius: 0.5rem;
	`,
	Box: styled.div<Partial<IProps>>`
		display: flex;
		width: ${({ size }) => size};
		height: ${({ size }) => size};

		transition: 0.3s;
		border-radius: 0.4rem;
		border: 0.1rem solid #c7b8b8;

		${({ checked }) =>
			checked &&
			css`
				background: ${({ theme }) => theme.colors.blue2};
			`};
	`,
	Title: styled(CustomText)`
		white-space: nowrap;
		margin-right: 1rem;
	`
};
