import React, { JSXElementConstructor } from 'react';
import styled from 'styled-components/macro';
import { IStyle } from '../../../@types/interfaces';

interface IProps extends IStyle {
	content: JSXElementConstructor<any> | string;
}

export const Tooltip: React.FC<IProps> = (props) => {
	const { children, content: Content, className } = props;
	return (
		<S.Container>
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
		position: relative;
		display: inline-block;

		&:hover ${STooltip} {
			opacity: 1;
			visibility: visible;
		}
	`
};
