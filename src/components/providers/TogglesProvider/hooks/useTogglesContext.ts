import { useContext } from 'react';
import { TogglesContext } from '../context';

export const useTogglesContext = () => {
	const data = useContext(TogglesContext);
	return data;
};
