import React from 'react';
import styled from 'styled-components/macro';
import { IColors, IFontSizes } from '../../../@types/declarations/styled';
import { IStyle, ITheme } from '../../../@types/interfaces';

interface IProps extends IStyle {
	text: string | number;
	center?: boolean;
	size?: keyof IFontSizes;
	color?: keyof IColors | string;
	percent?: boolean;
}

const CustomText: React.FC<IProps> = (props) => {
	const { text, className, percent, ...rest } = props;

	return (
		<S.Text className={className} {...rest}>
			{text}
			{percent && '%'}
		</S.Text>
	);
};

CustomText.defaultProps = {
	size: 's16',
	color: 'blue1'
};

const S: any = {
	Text: styled.span`
		font-size: ${({ size, theme }: ITheme & Partial<IProps>) =>
			theme.fontSizes[size!]};
		text-align: ${({ center }: Partial<IProps>) =>
			center ? 'center' : 'initial'};
		color: ${({ color, theme }) =>
			theme.colors[color! as keyof IColors] ?? color};
	`
};

export default CustomText;
