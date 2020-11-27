import React from 'react';
import styled from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';
import i18n from '../../../i18n/i18n';
import { hideLoadingSpinner } from '../../../utils/hideLoadingSpinner';
import afterTwoTicks from '../../../utils/afterTwoTicks';
import * as Sentry from '@sentry/browser';

interface IProps {}
interface IState {
	hasError: boolean;
	eventId: string | number | null;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
	state = {
		hasError: false,
		eventId: ''
	};

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: Record<string, any>) {
		if (process.env.NODE_ENV !== 'development') {
			Sentry.withScope((scope) => {
				scope.setExtras(errorInfo);
				const eventId = Sentry.captureException(error);
				this.setState({ eventId });
			});
		}

		afterTwoTicks(() => {
			hideLoadingSpinner();
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<S.Container>
					<CustomText
						size='s20'
						text={i18n.t('errorBoundary.description') as string}
					/>
					<S.EventId
						text={`${i18n.t('errorBoundary.eventId')}: ${this.state.eventId}`}
					/>
				</S.Container>
			);
		}

		return this.props.children;
	}
}

const S = {
	Container: styled.div`
		position: fixed;
		width: 100%;
		height: 100%;
		background: ${({ theme }) => theme.colors.darkBlue1};
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
	`,
	EventId: styled(CustomText)`
		margin-top: 0.7rem;
	`
};
