import React, { useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { HeaderFilter } from './HeaderFilter/HeaderFilter';
import { useTogglesContext } from '../../../../hooks/useTogglesContext';
import media from '../../../../themes/media';

interface IProps {}

export const SubHeader: React.FC<IProps> = (props) => {
	const containerRef = useRef(null);
	const selectRef = useRef(null);
	const { state } = useTogglesContext();

	return (
		<S.Container isVisible={state.showSubHeader}>
			<S.Filter containerRef={containerRef} selectRef={selectRef} />
		</S.Container>
	);
};

const S = {
	Container: styled.div<{ isVisible: boolean }>`
		background: ${({ theme }) => theme.colors.darkBlue2};
		align-items: center;
		height: var(--header-height);
		justify-content: center;
		position: sticky;
		top: var(--header-height);
		z-index: 99;
		box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
		display: none;
		transition: 0.3s;

		${({ isVisible }) =>
			!isVisible &&
			css`
				transform: translateY(-100%);
			`};

		${media.tablet`
			display: flex;
		`}
	`,
	Filter: styled(HeaderFilter)`
		width: 100%;
		height: 100%;
		justify-content: center;
	`
};
