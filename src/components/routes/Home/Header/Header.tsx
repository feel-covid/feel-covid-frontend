import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/macro';
import CustomText from '../../../shared/CustomText/CustomText';
import { IconsEnum } from '../../../../@types/enums';
import { HeaderFilter } from './HeaderFilter/HeaderFilter';
import { Icon } from '../../../shared/Icon/Icon';
import media from '../../../../themes/media';
import { useTogglesContext } from '../../../../hooks/useTogglesContext';
import { TogglesActions } from '../../../providers/TogglesProvider/reducer';
import { SubHeader } from './SubHeader';

interface IProps {}

export const Header: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const { dispatch } = useTogglesContext();
	const [isSubHeaderOpen, setSubHeader] = useState(false);

	const handleSettingsClick = useCallback(() => {
		setSubHeader((prevState) => !prevState);
	}, [dispatch]);

	const handleCustomCompareClick = useCallback(() => {
		dispatch({ type: TogglesActions.SET_SHOW_CUSTOM_COMPARE });
	}, [dispatch]);

	return (
		<S.Container>
			<S.MainHeader>
				<S.TitleContainer>
					<S.Title text={t('header.title')!} />
					<S.SettingsContainer onClick={handleSettingsClick}>
						<S.CogIcon type={IconsEnum.Cog} />
					</S.SettingsContainer>
				</S.TitleContainer>

				<S.Filter
					isSubHeaderOpen={isSubHeaderOpen}
					setSubHeader={setSubHeader}
				/>

				<S.CreateComparisonContainer onClick={handleCustomCompareClick}>
					<S.CreateComparisonBtn>
						<CustomText text={t('header.createComparison') as string} />
					</S.CreateComparisonBtn>
				</S.CreateComparisonContainer>
			</S.MainHeader>

			<SubHeader
				isSubHeaderOpen={isSubHeaderOpen}
				setSubHeader={setSubHeader}
			/>
		</S.Container>
	);
};

export const sharedHeaderStyles = css`
	display: flex;
	background: ${({ theme }) => theme.colors.darkBlue2};
	padding: 0 1.1rem 0 1rem;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
	height: 5.6rem;
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
	SettingsContainer: styled.div`
		display: none;
		transform: translateY(0.2rem);
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;

		${media.tablet`
			display: initial;
		`}
	`,
	CogIcon: styled(Icon)`
		margin-right: 0.7rem;
		pointer-events: none;
		fill: ${({ theme }) => theme.colors.white};
		width: 1.6rem;
		height: 1.6rem;
		user-select: none;
		outline: none;
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
