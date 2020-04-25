import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/macro';
import CustomText from '../CustomText/CustomText';
import { IconsEnum } from '../../../@types/enums';
import { HeaderFilter } from './HeaderFilter/HeaderFilter';
import { Icon } from '../Icon/Icon';
import media from '../../../themes/media';
import { useTogglesContext } from '../../../hooks/useTogglesContext';
import { TogglesActions } from '../../providers/TogglesProvider/reducer';

interface IProps {}

export const Header: React.FC<IProps> = (props) => {
	const { t } = useTranslation();
	const [isSubHeaderOpen, setSubHeader] = useState(false);
	const { dispatch } = useTogglesContext();

	return (
		<S.Container>
			<S.MainHeader>
				<S.TitleContainer>
					<S.Title text={t('header.title')!} />

					<S.SettingsContainer
						onClick={() => {
							setSubHeader((prevState) => !prevState);
						}}
					>
						<S.CogIcon type={IconsEnum.Cog} />
					</S.SettingsContainer>
				</S.TitleContainer>
				<S.Filter
					isSubHeaderOpen={isSubHeaderOpen}
					setSubHeader={setSubHeader}
				/>
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

			<S.SubHeader isVisible={isSubHeaderOpen}>
				<HeaderFilter
					isSubHeaderOpen={isSubHeaderOpen}
					setSubHeader={setSubHeader}
				/>
			</S.SubHeader>
		</S.Container>
	);
};

const sharedHeaderStyles = css`
	display: flex;
	background: ${({ theme }) => theme.colors.darkBlue2};
	padding: 0 2rem;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
	height: 5.6rem;
`;

const S = {
	Container: styled.header`
		position: fixed;
		top: 0;
		left: 0;
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
		margin-right: 0.5rem;
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
		padding: 0.6rem 1.5rem;
		border-radius: 0.3rem;
		cursor: pointer;
		transition: 0.3s;
		background: ${({ theme }) => theme.colors.darkBlue1};
		border: ${({ theme }) => `0.2rem solid ${theme.colors.blue2}`};
		letter-spacing: 0.1rem;

		&:hover {
			background: ${({ theme }) => theme.colors.blue2};
		}
	`,
	SubHeader: styled.div`
		${sharedHeaderStyles};
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

		${({ isVisible }: { isVisible: boolean }) =>
			isVisible &&
			css`
				transform: translateY(0);
				box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.2);
			`};
	`
};
