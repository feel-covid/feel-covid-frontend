import React, { JSXElementConstructor, CSSProperties } from 'react';
import styled from 'styled-components/macro';
import { IStyle } from '../../../@types/interfaces';

interface IProps extends IStyle {
	content: JSXElementConstructor<any> | string;
	containerStyle?: CSSProperties;
}

export const Tooltip: React.FC<IProps> = (props) => {
	const { children, content: Content, className, containerStyle } = props;
	return (
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		<S.Container style={containerStyle} onClick={() => {}}>
			{children}
			<STooltip className={className}>
				{typeof Content === 'string' ? Content : <Content />}
			</STooltip>
		</S.Container>
	);
};

const STooltip = styled.div`
	position: absolute;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s, visibility 0.3s;
	background: ${({ theme }) => theme.colors.darkBlue2};
	box-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.4);
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
`;

const S = {
	Container: styled.div`
		display: inline-block;
		position: relative;

		&:hover ${STooltip} {
			opacity: 1;
			visibility: visible;
		}
	`
};
