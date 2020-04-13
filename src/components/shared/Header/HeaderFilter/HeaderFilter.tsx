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
			<S.Select onChange={handleChange} defaultValue={prevDate}>
				{Object.keys(countriesByDate)
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
			</S.Select>
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
	`,
	Select: styled.select`
		padding: 0.7rem 0.3rem;
		font-size: 1.6rem;
		border-radius: 0.3rem;
		outline: none;
		cursor: pointer;
		margin-right: 0.5rem;
		border: none;
		color: white;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
		background: ${({ theme }) => theme.colors.darkBlue1};
	`
};
