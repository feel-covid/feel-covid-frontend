import React from 'react';
import styled from 'styled-components/macro';
import { RouteComponentProps } from '@reach/router';

interface IProps extends RouteComponentProps {}

const UserProfile: React.FC<IProps> = () => {
	return <S.Container>Welcome to UserProfile</S.Container>;
};

const S: any = {};
S.Container = styled.div`
	display: flex;
`;

export default UserProfile;
