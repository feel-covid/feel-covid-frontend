import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { hideLoadingSpinner } from '../../../utils/hideLoadingSpinner';

interface IProps {}

const Admin: React.FC<IProps> = (props) => {
	useEffect(() => {
		hideLoadingSpinner();
	}, []);

	return <S.Container>Welcome to Admin</S.Container>;
};

const S = {
	Container: styled.div`
		display: flex;
	`
};

export default Admin;
