import React from 'react';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../../@types/enums';
import DataCard from '../DataCard/DataCard';
import get from 'lodash/get';
import { IStyle } from '../../../../@types/interfaces';
import { useStatsFilterContext } from '../../../../hooks/useStatsFilterContext';

export interface IOverviewCard {
	title: string;
	path: string;
	positiveFactor: PositiveFactorEnum;
}

interface IProps extends IStyle {
	cards: Array<IOverviewCard>;
}

export const Overview: React.FC<IProps> = (props) => {
	const { cards, className } = props;
	const { baseDate, prevDate, countriesByDate } = useStatsFilterContext();

	return (
		<S.Container className={className}>
			{cards.map((card, index) => {
				const { title, path, positiveFactor } = card;
				const current = get(countriesByDate[baseDate], path);
				const before = get(countriesByDate[prevDate], path);

				return (
					<DataCard
						key={index}
						title={title}
						current={current}
						before={before}
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
		grid-gap: 1rem;
	`
};
