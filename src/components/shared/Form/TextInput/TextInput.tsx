import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface IProps {}

const TextInput: React.FC<IProps> = props => {
	return <S.Input data-testid='TextInput' />;
};

export default TextInput;

const S = {
	Input: styled.input``
};
