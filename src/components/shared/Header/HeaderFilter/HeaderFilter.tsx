import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { useCountryData } from '../../../../hooks/useCountryData';
import formatRelative from 'date-fns/formatRelative';
import he from 'date-fns/locale/he';

interface IProps {}

export const HeaderFilter: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { data, loading, error } = useCountryData();
	const dates = data.map(({ date, id }) => ({
		id,
		formattedDate: formatRelative(new Date(date), new Date(), { locale: he })
	}));

	const [p, c] = dates.slice(-2);

	return (
		<S.Container>
			{t('header.headerFilter.displayingComparison')} {c.formattedDate}{' '}
			{t('header.headerFilter.andBetween')} {p.formattedDate}
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		display: flex;
	`
};
