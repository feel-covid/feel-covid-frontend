import React from 'react';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../@types/enums';
import DataCard from '../DataCard/DataCard';
import get from 'lodash/get';
import { useCountryData } from '../../../hooks/useCountryData';

interface ICard {
	title: string;
	path: string;
	positiveFactor: PositiveFactorEnum;
}

interface IProps {
	cards: Array<ICard>;
}

export const Overview: React.FC<IProps> = (props) => {
	const { cards } = props;
	const { loading, normalizedData, error } = useCountryData();
	const [prevUpdate, currentUpdate] = normalizedData.slice(-2);

	return (
		<S.Container>
			{cards.map((card, index) => {
				const { title, path, positiveFactor } = card;
				return (
					<DataCard
						key={index}
						title={title}
						current={get(currentUpdate, path)}
						before={get(prevUpdate, path)}
						positiveFactor={positiveFactor}
					/>
				);
			})}
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		flex: 1;
		flex-wrap: wrap;
	`
};
