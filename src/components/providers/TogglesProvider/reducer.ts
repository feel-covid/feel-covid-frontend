export interface ITogglesContextState {
	showCustomCompare: boolean;
}

export const togglesContextInitialState = {
	showCustomCompare: false
};

export enum TogglesActions {
	SET_SHOW_CUSTOM_COMPARE
}

export type TogglesActionEnum = {
	type: TogglesActions.SET_SHOW_CUSTOM_COMPARE;
	payload?: boolean;
};

export const togglesContextReducer = (
	state: ITogglesContextState,
	action: TogglesActionEnum
) => {
	switch (action.type) {
		case TogglesActions.SET_SHOW_CUSTOM_COMPARE:
			const { payload } = action;
			return {
				...state,
				showCustomCompare: action.hasOwnProperty('payload')
					? payload
					: !state.showCustomCompare
			};

		default:
			return state;
	}
};
