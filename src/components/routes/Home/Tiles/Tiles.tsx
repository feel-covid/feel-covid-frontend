import React from 'react';
import styled from 'styled-components/macro';
import { PositiveTrendEnum } from '../../../../@types/enums';
import DataPointTile from '../DataPointTile/DataPointTile';
import get from 'lodash/get';
import { IStyle } from '../../../../@types/interfaces';
import { useHourlyUpdatesCompareContext } from '../../../providers/HourlyUpdatesCompareProvider/hooks/useHourlyUpdatesCompareContext';

export interface ITile {
	title: string;
	path: string;
	positiveTrend: PositiveTrendEnum;
	tooltip?: string;
}

interface IProps extends IStyle {
	cards: Array<ITile>;
}

export const Tiles: React.FC<IProps> = props => {
	const { cards, className } = props;
	const {
		baseDate,
		prevDate,
		countriesByDate
	} = useHourlyUpdatesCompareContext();

	return (
		<S.Container className={className}>
			{cards.map(card => {
				const { title, path, positiveTrend, ...rest } = card;
				const current = get(countriesByDate[baseDate], path);
				const before = get(countriesByDate[prevDate], path);

				return (
					<DataPointTile
						key={path}
						title={title}
						current={current}
						before={before}
						positiveTrend={positiveTrend}
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
