export interface ITogglesContextState {
	showCustomCompare: boolean;
	showSubHeader: boolean;
}

export const togglesContextInitialState = {
	showCustomCompare: false,
	showSubHeader: true
};

export enum TogglesActions {
	SET_SHOW_CUSTOM_COMPARE,
	SET_SHOW_SUB_HEADER
}

export type TogglesActionEnum = {
	type: TogglesActions;
	payload?: boolean;
};

export const togglesContextReducer = (
	state: ITogglesContextState,
	action: TogglesActionEnum
) => {
	switch (action.type) {
		case TogglesActions.SET_SHOW_CUSTOM_COMPARE: {
			const { payload } = action;
			return {
				...state,
				showCustomCompare: action.hasOwnProperty('payload')
					? payload
					: !state.showCustomCompare
			};
		}

		case TogglesActions.SET_SHOW_SUB_HEADER:
			const { payload } = action;
			return {
				...state,
				showSubHeader: action.hasOwnProperty('payload')
					? payload
					: !state.showSubHeader
			};

		default:
			return state;
	}
};
