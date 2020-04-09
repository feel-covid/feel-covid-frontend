import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { ComposedChart, Tooltip } from 'recharts';
import { formatChartDate } from '../../../utils/formatChartDate';
import he from 'date-fns/locale/he';

interface IProps {}

export const CustomizedTooltip: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	return (
		<Tooltip
			labelFormatter={(date) => formatChartDate(date as string, { locale: he })}
			contentStyle={{
				borderRadius: '.5rem',
				border: 'none',
				boxShadow: '0 0 .5rem rgba(0, 0, 0, 0.3)',
				direction: 'rtl'
			}}
		/>
	);
};

const S = {
	Container: styled.div`
		display: flex;
	`
};
