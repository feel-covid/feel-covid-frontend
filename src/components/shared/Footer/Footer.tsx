import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';
import media from '../../../themes/media';
import { Tooltip } from '../Tooltip/Tooltip';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

interface IProps {}

export const Footer: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	return (
		<S.Container>
			<S.Tooltip
				containerStyle={{
					position: 'initial'
				}}
				content={() => <PrivacyPolicyContent />}
			>
				<S.Link
					target='_blank'
					href='#'
					rel='noopener noreferrer'
					onClick={(e) => e.preventDefault()}
				>
					{t('global.privacyPolicy')}
				</S.Link>
				<S.Divider>|</S.Divider>
			</S.Tooltip>
			<S.CreatedBy text={t('footer.createdBy') as string} />{' '}
			<S.Link
				target='_blank'
				href='https://www.linkedin.com/in/sasonbraha/'
				rel='noopener noreferrer'
			>
				Sason Braha
			</S.Link>
		</S.Container>
	);
};

const S = {
	Container: styled.footer`
		text-align: center;
		font-size: 1.2rem;
		color: ${({ theme }) => theme.colors.gray3};
		padding: 3rem 0 1.5rem 0;
		position: relative;

		${media.phone`
				padding: 1.5rem 0;
		`}
	`,
	CreatedBy: styled(CustomText)`
		color: currentColor;
		font-size: inherit;
	`,
	Link: styled.a`
		color: currentColor;
	`,
	Divider: styled.span`
		display: inline-block;
		margin: 0 0.5rem;
	`,
	Tooltip: styled(Tooltip)`
		bottom: 3.6rem;
	`
};
