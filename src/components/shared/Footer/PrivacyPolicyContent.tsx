import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';

interface IProps {}

export const PrivacyPolicyContent: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	return (
		<S.Container>
			<CustomText text={`${t('footer.privacyPolicy.weAreUsing')} `} />
			<CustomText
				text={t('footer.privacyPolicy.googleAnalytics') as string}
				href='https://support.google.com/analytics/answer/6004245?ref_topic=2919631'
				link
			/>{' '}
			<CustomText text={`${t('footer.privacyPolicy.forBasicInfo')} `} />{' '}
			<CustomText
				text={t('footer.privacyPolicy.sentry') as string}
				href='https://sentry.io/privacy/'
				link
			/>{' '}
			<CustomText text={`${t('footer.privacyPolicy.forErrorLogging')} `} />
		</S.Container>
	);
};

const S = {
	Container: styled.div`
		width: 30rem;
	`
};
