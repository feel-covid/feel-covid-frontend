import { useContext } from 'react';
import { TogglesContext } from '../components/providers/TogglesProvider/context';

export const useTogglesContext = () => {
	const data = useContext(TogglesContext);
	return data;
};
