import React from 'react';
import styled from 'styled-components/macro';
import { IStyle, ITestId } from '../../../@types/interfaces';
import { IconsEnum } from '../../../@types/enums';

interface IProps extends IStyle, ITestId {
	type: IconsEnum;
}

export const Icon: React.FC<IProps> = (props) => {
	const { type, ...rest } = props;
	return (
		<S.Icon {...rest}>
			<use xlinkHref={`/assets/icons/sprite.svg#${type}`}></use>
		</S.Icon>
	);
};

const S = {
	Icon: styled.svg`
		width: 2rem;
		height: 2rem;
	`
};
