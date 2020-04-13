import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';
import media from '../../../themes/media';

interface IProps {}

export const Footer: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	return (
		<S.Container>
			<S.CreatedBy text={t('footer.createdBy') as string} />{' '}
			<S.WebsiteLink
				target='_blank'
				href='https://sasonbraha.com/'
				rel='noopener noreferrer'
			>
				Sason Braha
			</S.WebsiteLink>
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		text-align: center;
		font-size: 1.2rem;
		color: ${({ theme }) => theme.colors.gray3};
		padding: 3rem 0 1.5rem 0;

		${media.phone`
				padding: 1.5rem 0;
		`}
	`,
	CreatedBy: styled(CustomText)`
		color: currentColor;
		font-size: inherit;
	`,
	WebsiteLink: styled.a`
		color: currentColor;
	`
};
