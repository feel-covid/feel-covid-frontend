import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import formatRelative from 'date-fns/formatRelative';
import he from 'date-fns/locale/he';
import { useStatsFilterContext } from '../../../../hooks/useStatsFilterContext';
import { format } from 'date-fns';
import { DateFormatsEnum } from '../../../../@types/enums';
import { IStyle, StateUpdaterFunction } from '../../../../@types/interfaces';
import media from '../../../../themes/media';
import { Select } from '../../Form/Select';
import { useCountryData } from '../../../../hooks/useCountryData';

interface IProps extends IStyle {
	setSubHeader: StateUpdaterFunction<boolean>;
	isSubHeaderOpen: boolean;
}

export const HeaderFilter: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const {
		baseDate,
		prevDate,
		countriesByDate,
		setPrevDate
	} = useStatsFilterContext();
	const { weekAgoIndexOnNormalizedData } = useCountryData();
	const { setSubHeader, isSubHeaderOpen } = props;

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			setPrevDate!(e.target.value);

			if (isSubHeaderOpen) {
				setSubHeader(false);
			}
		},
		[isSubHeaderOpen]
	);

	return (
		<S.Container className={props.className}>
			{t('header.headerFilter.displayingComparison')}{' '}
			{formatRelative(new Date(baseDate), new Date(), { locale: he })}{' '}
			{t('header.headerFilter.andBetween')}{' '}
			<Select onChange={handleChange} defaultValue={prevDate}>
				{Object.keys(countriesByDate)
					.slice(weekAgoIndexOnNormalizedData)
					.filter((date) => date !== baseDate)
					.map((date) => (
						<option key={date} value={date}>
							{format(
								new Date(date),
								DateFormatsEnum.FULL_MONTH_NAME_WITH_DAY_AND_TIME,
								{ locale: he }
							)}
						</option>
					))}
			</Select>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		align-items: center;
		color: white;

		${media.phone`
			font-size: 1.5rem;
		`}

		@media (max-width: 400px) {
			flex-direction: column;
		}
	`
};
