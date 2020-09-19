import React, { ChangeEvent, Ref, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import formatRelative from 'date-fns/formatRelative';
import he from 'date-fns/locale/he';
import { useStatsFilterContext } from '../../../../../hooks/useStatsFilterContext';
import { format, isToday, isYesterday } from 'date-fns';
import { DateFormatsEnum } from '../../../../../@types/enums';
import { IStyle } from '../../../../../@types/interfaces';
import media from '../../../../../themes/media';
import { Select } from '../../../../shared/Form/Select';
import { useCountryData } from '../../../../../hooks/useCountryData';
import CustomText from '../../../../shared/CustomText/CustomText';

interface IProps extends IStyle {
	containerRef?: Ref<HTMLDivElement>;
	selectRef?: Ref<HTMLSelectElement>;
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
	const { containerRef, selectRef } = props;

	const formatDate = useCallback((date) => {
		return isToday(date) || isYesterday(date)
			? formatRelative(date, new Date(), { locale: he })
			: format(date, DateFormatsEnum.PART_MONTH_NAME_WITH_DAY_AND_TIME, {
					locale: he
			  });
	}, []);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			setPrevDate!(e.target.value);
		},
		[setPrevDate]
	);

	return (
		<S.Container className={props.className} ref={containerRef}>
			<S.TextContainer>
				<S.DisplayingComparisonText
					text={t('header.headerFilter.displayingComparison') as string}
				/>{' '}
				<S.DisplayingComparisonTextSmallDevices
					text={
						t('header.headerFilter.displayingComparisonSmallDevices') as string
					}
				/>{' '}
				<CustomText text={formatDate(new Date(baseDate))} />{' '}
				<CustomText text={t('header.headerFilter.andBetween') as string} />{' '}
			</S.TextContainer>

			<S.Select
				onChange={handleChange}
				value={prevDate}
				ref={selectRef}
				autoResize
				formattedValue={formatDate(new Date(prevDate))}
				containerStyle={{ transform: 'translateY(.1rem)' }}
			>
				{Object.keys(countriesByDate)
					.slice(weekAgoIndexOnNormalizedData)
					.filter((date) => date !== baseDate)
					.map((date) => (
						<option key={date} value={date}>
							{formatDate(new Date(date))}
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

		span {
			font-size: inherit;
		}

		${media.phone`
			font-size: 1.5rem;
		`}
	`,
	TextContainer: styled.span`
		pointer-events: none;
	`,
	DisplayingComparisonText: styled(CustomText)`
		@media (max-width: 375px) {
			display: none;
		}
	`,
	DisplayingComparisonTextSmallDevices: styled(CustomText)`
		display: none;

		@media (max-width: 375px) {
			display: initial;
		}
	`,
	SelectContainer: styled.div``,
	Select: styled(Select)``
};
