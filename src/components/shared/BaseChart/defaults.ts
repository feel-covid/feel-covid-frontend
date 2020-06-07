export const xAxisDefaultProps = {
	dataKey: 'date',
	interval: 0,
	height: 40
};

export const legendDefaultProps = {
	verticalAlign: 'bottom',
	iconType: 'square',
	wrapperStyle: {
		transform: 'translateY(1rem)'
	}
};

export const animationDefaultProps = {
	isAnimationActive: false,
	animationBegin: 300
};

export const tooltipItemSorter = (item: any): number => -item.value;

export const tooltipDefaultProps = {
	contentStyle: {
		borderRadius: '.5rem',
		border: 'none',
		boxShadow: '0 0 .5rem rgba(0, 0, 0, 0.3)',
		direction: 'rtl'
	},
	position: { x: 'auto', y: 0 },
	itemSorter: tooltipItemSorter,
	formatter: (value: string) => value.toLocaleString(),
	wrapperStyle: {
		top: '23%'
	}
};
