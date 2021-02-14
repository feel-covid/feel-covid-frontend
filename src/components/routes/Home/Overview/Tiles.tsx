import React from 'react';
import styled from 'styled-components/macro';
import { PositiveFactorEnum } from '../../../../@types/enums';
import DataPointTile from '../DataPointTile/DataPointTile';
import get from 'lodash/get';
import { IStyle } from '../../../../@types/interfaces';
import { useStatsFilterContext } from '../../../providers/StatsFilterProvider/hooks/useStatsFilterContext';

export interface IOverviewCard {
	title: string;
	path: string;
	positiveFactor: PositiveFactorEnum;
	tooltip?: string;
}

interface IProps extends IStyle {
	cards: Array<IOverviewCard>;
}

export const Tiles: React.FC<IProps> = (props) => {
	const { cards, className } = props;
	const { baseDate, prevDate, countriesByDate } = useStatsFilterContext();

	return (
		<S.Container className={className}>
			{cards.map((card, index) => {
				const { title, path, positiveFactor, ...rest } = card;
				const current = get(countriesByDate[baseDate], path);
				const before = get(countriesByDate[prevDate], path);

				return (
					<DataPointTile
						key={index}
						title={title}
						current={current}
						before={before}
						positiveFactor={positiveFactor}
						{...rest}
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
		grid-gap: 0.8rem;
	`
};
