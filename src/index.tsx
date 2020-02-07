import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import i18n from './i18n';
import './tailwind.output.css';

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<App />
	</I18nextProvider>,
	document.getElementById('appMountPoint')
);

serviceWorker.unregister();
