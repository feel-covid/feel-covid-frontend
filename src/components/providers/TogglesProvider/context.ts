import React from 'react';
import {
	ITogglesContextState,
	TogglesActionEnum,
	togglesContextInitialState
} from './reducer';

export interface ITogglesContext {
	state: ITogglesContextState;
	dispatch: React.Dispatch<TogglesActionEnum>;
}

export const TogglesContext = React.createContext<ITogglesContext>({
	state: togglesContextInitialState,
	dispatch: () => {}
});
