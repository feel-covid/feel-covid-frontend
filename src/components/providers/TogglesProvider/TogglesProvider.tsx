import React, { useReducer } from 'react';
import { TogglesContext } from './context';
import { togglesContextInitialState, togglesContextReducer } from './reducer';

interface IProps {}

export const TogglesProvider: React.FC<IProps> = (props) => {
	// @ts-ignore
	const [state, dispatch] = useReducer(
		togglesContextReducer,
		togglesContextInitialState
	);
	return (
		<TogglesContext.Provider value={{ state, dispatch }}>
			{props.children}
		</TogglesContext.Provider>
	);
};
