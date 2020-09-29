import { Legend as RCLegend } from 'recharts';

class Legend extends RCLegend {
	static defaultProps = {
		...(RCLegend as any).defaultProps,
		verticalAlign: 'bottom',
		iconType: 'square',
		wrapperStyle: {
			transform: 'translateY(1rem)'
		}
	};
}

export default Legend;
