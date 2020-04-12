export {};

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/interface-name-prefix
		interface ProcessEnv {
			REACT_APP_SENTRY_DSN: string;
			REACT_APP_BASE_URL: string;
		}
	}
}
