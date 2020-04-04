import React from 'react';
import styled from 'styled-components/macro';
import { IFontSizes } from '../../../@types/declarations/styled';
import { IStyle, ITheme } from '../../../@types/interfaces';

interface IProps extends IStyle {
	text: string | number;
	center?: boolean;
	size?: keyof IFontSizes;
}

const CustomText: React.FC<IProps> = (props) => {
	const { text, className, ...rest } = props;

	return (
		<S.Text className={className} {...rest}>
			{text}
		</S.Text>
	);
};

CustomText.defaultProps = {
	size: 's16'
};

const S: any = {};
S.Text = styled.span(
	({ theme, size, center }: IProps & ITheme) => `
	font-size: ${theme.fontSizes[size!]};
	${center && `text-align: center`};
`
);

export default CustomText;
