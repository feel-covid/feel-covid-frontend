import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';
import { renderWithProviders } from '../../../../../tests/renderWithProviders';
import 'jest-styled-components';

afterEach(cleanup);

describe('Checkbox.spec - Basic functionality', () => {
	it('Should call the onCheck callback onClick', async () => {
		const fn = jest.fn();
		const title = 'Checkbox';

		const { getByText } = renderWithProviders(
			<Checkbox title={title} checked={false} onCheck={fn} />
		);

		expect(fn).toHaveBeenCalledTimes(0);

		fireEvent.click(await getByText(title));

		expect(fn).toHaveBeenCalledTimes(1);
	});

	it('Should have a pointer cursor', () => {
		const { container } = renderWithProviders(
			<Checkbox title='Test' checked={false} onCheck={() => {}} />
		);

		expect(container.firstElementChild).toHaveStyleRule('cursor', 'pointer');
	});
});
