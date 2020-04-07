import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		lng: 'he',
		backend: {
			loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
		},
		fallbackLng: 'he',
		debug: process.env.NODE_ENV === 'development',
		ns: ['translations'],
		defaultNS: 'translations',
		keySeparator: '.',
		interpolation: {
			escapeValue: false
		},
		react: {
			wait: true,
			useSuspense: false
		}
	});

export default i18n;
