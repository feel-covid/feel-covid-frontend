interface IParams {
	number: number;
	min: number;
}

export const clamp = ({ number, min }: IParams) => {
	if (number < min) return 0;
	return number;
};
