import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface IProps {}

export const DataSelection: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	return <S.Container>Welcome to DataSelection</S.Container>;
};

const S = {
	Container: styled.div`
		display: flex;
	`
};
