import React from 'react';
import { CasesAmount } from '../CasesAmount';
import { PositiveFactorEnum } from '../../../../@types/enums';
import { renderWithProviders } from '../../../../../tests/renderWithProviders';
import { defaultTheme } from '../../../../themes';
import { cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { DynamicObject } from '../../../../@types/interfaces';

afterEach(cleanup);

describe('<CasesAmount /> - Basic functionality', () => {
	it('Should display the "current" prop', async () => {
		const current = 100;
		const { getByText } = renderWithProviders(
			<CasesAmount
				current={current}
				before={0}
				positiveFactor={PositiveFactorEnum.INCREASE}
			/>
		);

		expect(await getByText(current.toString())).toBeInTheDocument();
	});

	it('Text and ArrowIcon should inherit color with currentColor', async () => {
		const { getByText, getByTestId } = renderWithProviders(
			<CasesAmount
				current={100}
				before={50}
				positiveFactor={PositiveFactorEnum.INCREASE}
			/>
		);

		expect(await getByTestId('CasesAmount.ArrowIcon')).toHaveStyle(
			'fill: currentColor'
		);
		expect(await getByText('100')).toHaveStyle('color: currentColor');
	});

	const positiveFactorAndArrowDirectionTestCases = [
		[
			'With PositiveFactorEnum.INCREASE && current > before',
			{
				current: 100,
				before: 50,
				expectedIconRotate: 'rotate(0deg)',
				expectedColor: defaultTheme.colors.green1,
				positiveFactor: PositiveFactorEnum.INCREASE
			}
		],
		[
			'With PositiveFactorEnum.INCREASE && current < before',
			{
				current: 50,
				before: 100,
				expectedIconRotate: 'rotate(180deg)',
				expectedColor: defaultTheme.colors.red1,
				positiveFactor: PositiveFactorEnum.INCREASE
			}
		],
		[
			'With PositiveFactorEnum.DECREASE && current > before',
			{
				current: 100,
				before: 50,
				expectedIconRotate: 'rotate(0deg)',
				expectedColor: defaultTheme.colors.red1,
				positiveFactor: PositiveFactorEnum.DECREASE
			}
		],
		[
			'With PositiveFactorEnum.DECREASE && current < before',
			{
				current: 50,
				before: 100,
				expectedIconRotate: 'rotate(180deg)',
				expectedColor: defaultTheme.colors.green1,
				positiveFactor: PositiveFactorEnum.DECREASE
			}
		],
		[
			'With PositiveFactorEnum.NONE && current < before',
			{
				current: 50,
				before: 100,
				expectedIconRotate: 'rotate(180deg)',
				expectedColor: defaultTheme.colors.blue2,
				positiveFactor: PositiveFactorEnum.NONE
			}
		],
		[
			'With PositiveFactorEnum.NONE && current > before',
			{
				current: 100,
				before: 50,
				expectedIconRotate: 'rotate(0deg)',
				expectedColor: defaultTheme.colors.blue2,
				positiveFactor: PositiveFactorEnum.NONE
			}
		]
	];
	it.each(positiveFactorAndArrowDirectionTestCases)(
		'%s',
		async (_, testDetails) => {
			const {
				current,
				before,
				positiveFactor,
				expectedIconRotate,
				expectedColor
			} = testDetails as DynamicObject<any>;
			const { container, getByTestId } = renderWithProviders(
				<CasesAmount
					current={current}
					before={before}
					positiveFactor={positiveFactor}
				/>
			);

			expect(container.firstElementChild).toHaveStyleRule(
				'color',
				expectedColor
			);
			expect(await getByTestId('CasesAmount.ArrowIcon')).toHaveStyleRule(
				'transform',
				expectedIconRotate
			);
		}
	);

	it('Should not display an arrow when current === before', async () => {
		const { queryByTestId } = renderWithProviders(
			<CasesAmount
				current={100}
				before={100}
				positiveFactor={PositiveFactorEnum.NONE}
			/>
		);
		expect(await queryByTestId('CasesAmount.ArrowIcon')).toBeNull();
	});
});
