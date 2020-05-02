import { PlainFunction } from '../@types/interfaces';

const afterTwoTicks = (cb: PlainFunction<void>): void => {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			cb();
		});
	});
};

export default afterTwoTicks;
