export {};

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/interface-name-prefix
		interface ProcessEnv {}
	}
}
