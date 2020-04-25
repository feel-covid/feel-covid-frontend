import { DynamicObject } from '../@types/interfaces';

export const deleteOrAddKey = (key: string, obj: DynamicObject<any>) => {
	const { [key]: itemToDelete, ...rest } = obj;
	return itemToDelete ? rest : { [key]: true, ...rest };
};
