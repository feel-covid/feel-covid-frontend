import React from 'react';
import styled, { css } from 'styled-components/macro';
import { IColors, IFontSizes } from '../../../@types/declarations/styled';
import { IStyle, ITheme, PlainFunction } from '../../../@types/interfaces';

interface IProps extends IStyle {
	text: string | number;
	center?: boolean;
	size?: keyof IFontSizes;
	color?: keyof IColors | string;
	percent?: boolean;
	link?: boolean;
	href?: string;
	onClick?: PlainFunction<any>;
}

const CustomText: React.FC<IProps> = (props) => {
	const { link, href, text, className, percent, ...rest } = props;
	console.log(rest);

	return link ? (
		<S.Link rel='noopener noreferrer' href={href} target='_blank' {...rest}>
			{text}
		</S.Link>
	) : (
		<S.Text className={className} {...rest}>
			{text}
			{percent && '%'}
		</S.Text>
	);
};

CustomText.defaultProps = {
	size: 's16',
	color: 'white'
};

const sharedTextStyles = css`
	font-size: ${({ size, theme }: ITheme & Partial<IProps>) =>
		theme.fontSizes[size!]};
	text-align: ${({ center }: Partial<IProps>) =>
		center ? 'center' : 'initial'};
	color: ${({ color, theme }) =>
		theme.colors[color! as keyof IColors] ?? color};
`;

const S: any = {
	Text: styled.span`
		${sharedTextStyles};
	`,
	Link: styled.a`
		${sharedTextStyles};
	`
};

export default CustomText;
