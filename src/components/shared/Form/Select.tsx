import React, { SelectHTMLAttributes } from 'react';
import styled, { css } from 'styled-components/macro';
import { IStyle } from '../../../@types/interfaces';
import { IconsEnum } from '../../../@types/enums';
import { Icon } from '../Icon/Icon';
import CustomText from '../CustomText/CustomText';

interface IProps extends IStyle, SelectHTMLAttributes<HTMLSelectElement> {
	autoResize?: boolean;
	formattedValue?: string;
	containerStyle?: React.CSSProperties;
}

export const Select = React.forwardRef<HTMLSelectElement, IProps>(
	(props, ref) => {
		const {
			onChange,
			autoResize,
			containerStyle,
			formattedValue,
			...rest
		} = props;

		return (
			<S.Container style={containerStyle}>
				{autoResize && (
					<S.ValueContainer>
						<S.Value text={formattedValue!} />
					</S.ValueContainer>
				)}

				<S.Select
					ref={ref}
					{...rest}
					autoResize={autoResize!}
					onChange={(e) => {
						if (onChange) {
							onChange(e);
						}
						(e.currentTarget as HTMLSelectElement).blur();
					}}
				>
					{props.children}
				</S.Select>
				<S.ArrowIcon type={IconsEnum.ArrowDropdown} />
			</S.Container>
		);
	}
);

Select.displayName = 'Select';

const sharedSelectStyles = css`
	padding: 0 0.21rem 0 1.6rem;
	font-size: 1.6rem;
	border-radius: 0.3rem;
	outline: none;
	cursor: pointer;
	color: white;
	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
	background: ${({ theme }) => theme.colors.darkBlue1};
	border: 0.2rem solid transparent;

	&:focus {
		border-color: ${({ theme }) => theme.colors.blue2};
	}
`;

const S = {
	Container: styled.div`
		position: relative;
		margin-right: 0.5rem;
		height: 3.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	`,
	/*
	 * Important!
	 * Fontsize must be 16px on mobile to prevent ios from zooming.
	 * */
	Select: styled.select<{ autoResize: boolean }>`
		${sharedSelectStyles};
		-webkit-appearance: none;
		height: 100%;

		${({ autoResize }) =>
			autoResize &&
			css`
				position: absolute;
				bottom: 0;
				margin: 0;
				box-shadow: none;
				right: 0;
				width: calc(100% + 0.15rem);
				padding: 0.4rem;
			`};

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
		pointer-events: none;
		z-index: 1;
	`,
	ValueContainer: styled.div`
		${sharedSelectStyles};
		pointer-events: none;
		z-index: 1;
		position: relative;
		box-shadow: none;
		height: calc(100% - 0.4rem);
		display: flex;
		align-items: center;
		margin-right: 0.2rem;
		font-size: inherit;
	`,
	Value: styled(CustomText)`
		transform: translateY(-0.058rem);
	`
};
