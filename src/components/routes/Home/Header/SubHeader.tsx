import React, { useCallback, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { HeaderFilter } from './HeaderFilter/HeaderFilter';
import { StateUpdaterFunction } from '../../../../@types/interfaces';

interface IProps {
	isSubHeaderOpen: boolean;
	setSubHeader: StateUpdaterFunction<boolean>;
}

export const SubHeader: React.FC<IProps> = (props) => {
	const { isSubHeaderOpen, setSubHeader } = props;
	const containerRef = useRef(null);
	const selectRef = useRef(null);

	const closeSubHeader = useCallback((e) => {
		if ([containerRef.current, selectRef.current].includes(e.target)) return;
		setSubHeader(false);
	}, []);

	useEffect(() => {
		if (isSubHeaderOpen) {
			document.addEventListener('click', closeSubHeader);
		} else {
			document.removeEventListener('click', closeSubHeader);
		}

		return () => document.removeEventListener('click', closeSubHeader);
	}, [isSubHeaderOpen]);

	return (
		<S.Container isVisible={isSubHeaderOpen}>
			<S.Filter
				containerRef={containerRef}
				selectRef={selectRef}
				isSubHeaderOpen={isSubHeaderOpen}
				setSubHeader={setSubHeader}
			/>
		</S.Container>
	);
};

const S = {
	Container: styled.div<{ isVisible: boolean }>`
		display: flex;
		background: ${({ theme }) => theme.colors.darkBlue2};
		align-items: center;
		height: 5.6rem;
		justify-content: center;
		transform: translateY(-100%);
		box-shadow: none;
		transition: 0.3s;
		position: absolute;
		top: 5.6rem;
		width: 100%;
		left: 0;

		@media (max-width: 400px) {
			padding: 1rem 0;
			height: initial;
		}

		${({ isVisible }) =>
			isVisible &&
			css`
				transform: translateY(0);
				box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
			`};
	`,
	Filter: styled(HeaderFilter)`
		width: 100%;
		height: 100%;
		justify-content: center;
	`
};
