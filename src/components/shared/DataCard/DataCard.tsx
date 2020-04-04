import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';

interface IProps {
	title: string;
	current: number;
	before: number;
}

const DataCard: React.FC<IProps> = (props) => {
	const { title, current, before } = props;
	const { t } = useTranslation();

	return (
		<>
			<CustomText text={title} />
			<CustomText text={current} />
			<CustomText text={before} />
		</>
	);
};

const S = {
	Container: styled.div`
		display: flex;
		background: white;
	`
};

export default DataCard;
