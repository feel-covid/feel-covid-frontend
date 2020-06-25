import React from 'react';

export const useCombinedRefs = <T>(
	...refs: Array<any>
): React.MutableRefObject<T | undefined> => {
	const targetRef = React.useRef<T>();

	React.useEffect(() => {
		refs.forEach((ref) => {
			if (!ref) return;

			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else {
				ref.current = targetRef.current;
			}
		});
	}, [refs]);

	return targetRef;
};
