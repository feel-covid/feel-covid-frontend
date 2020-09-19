import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from './components/App';
import i18n from './i18n';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './themes';
import { CountryDataProvider } from './components/providers/CountryDataProvider/CountryDataProvider';
import { StatsFilterProvider } from './components/providers/StatsFilterProvider/StatsFilterProvider';
import { ErrorBoundary } from './components/shared/ErrorBoundry/ErrorBoundary';
import * as Sentry from '@sentry/browser';
import { TogglesProvider } from './components/providers/TogglesProvider/TogglesProvider';

if (process.env.NODE_ENV === 'development') {
	require('preact/debug');
} else {
	Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<ThemeProvider theme={defaultTheme}>
			<ErrorBoundary>
				<CountryDataProvider>
					<StatsFilterProvider>
						<TogglesProvider>
							<App />
						</TogglesProvider>
					</StatsFilterProvider>
				</CountryDataProvider>
			</ErrorBoundary>
		</ThemeProvider>
	</I18nextProvider>,
	document.getElementById('appMountPoint')
);
