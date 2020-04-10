import React from 'react';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../@types/enums';
import DataCard from '../DataCard/DataCard';
import get from 'lodash/get';
import { IStyle } from '../../../@types/interfaces';
import { useStatsFilterContext } from '../../../hooks/useStatsFilterContext';

interface ICard {
	title: string;
	path: string;
	positiveFactor: PositiveFactorEnum;
}

interface IProps extends IStyle {
	cards: Array<ICard>;
}

export const Overview: React.FC<IProps> = (props) => {
	const { cards, className } = props;
	const { baseDate, prevDate, countriesByDate } = useStatsFilterContext();

	return (
		<S.Container className={className}>
			{cards.map((card, index) => {
				const { title, path, positiveFactor } = card;
				return (
					<DataCard
						key={index}
						title={title}
						current={get(countriesByDate[baseDate], path)}
						before={get(countriesByDate[prevDate], path)}
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
