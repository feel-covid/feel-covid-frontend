import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/macro';
import CustomText from '../../../shared/CustomText/CustomText';
import { HeaderFilter } from './HeaderFilter/HeaderFilter';
import media from '../../../../themes/media';
import { useTogglesContext } from '../../../providers/TogglesProvider/hooks/useTogglesContext';
import { TogglesActions } from '../../../providers/TogglesProvider/reducer';
import { SubHeader } from './SubHeader';

interface IProps {}

export const Header: React.FC<IProps> = props => {
	const { t } = useTranslation();
	const { dispatch } = useTogglesContext();

	return (
		<>
			<S.Container>
				<S.MainHeader>
					<S.TitleContainer>
						<S.Title text={t('header.title')! as string} />
					</S.TitleContainer>

					<S.Filter />

					<S.CreateComparisonContainer
						onClick={() =>
							dispatch({ type: TogglesActions.SET_SHOW_CUSTOM_COMPARE })
						}
					>
						<S.CreateComparisonBtn>
							<CustomText text={t('header.createComparison') as string} />
						</S.CreateComparisonBtn>
					</S.CreateComparisonContainer>
				</S.MainHeader>
			</S.Container>

			<SubHeader />
		</>
	);
};

export const sharedHeaderStyles = css`
	display: flex;
	background: ${({ theme }) => theme.colors.darkBlue2};
	padding: 0 1.1rem 0 1rem;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.4);
	height: var(--header-height);
`;

const S = {
	Container: styled.header`
		position: sticky;
		top: 0;
		z-index: 100;
		width: 100%;
	`,
	MainHeader: styled.div`
		${sharedHeaderStyles};
		z-index: 1;
		position: relative;
	`,
	TitleContainer: styled.div`
		display: flex;
		align-items: center;
	`,
	Title: styled(CustomText)`
		font-weight: bold;
	`,
	Filter: styled(HeaderFilter)`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		${media.tablet`
			display: none;
		`}
	`,
	CreateComparisonContainer: styled.div`
		display: flex;
		align-items: center;
		font-weight: bold;
	`,
	CreateComparisonBtn: styled.button`
		outline: none;
		background: ${({ theme }) => theme.colors.blue2};
		color: ${({ theme }) => theme.colors.white};
		padding: 0.5rem 1.4rem;
		border-radius: 0.3rem;
		cursor: pointer;
		transition: 0.3s;
		background: ${({ theme }) => theme.colors.blue2};
		border: ${({ theme }) => `0.2rem solid ${theme.colors.blue2}`};
		letter-spacing: 0.1rem;

		&:hover,
		&:focus {
			background: ${({ theme }) => theme.colors.darkBlue1};
		}
	`
};
