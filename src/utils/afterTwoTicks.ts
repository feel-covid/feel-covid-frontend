import { PlainFunction } from '../types/interfaces';

const afterTwoTicks = (cb: PlainFunction) => {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			cb();
		});
	});
};

export default afterTwoTicks;
