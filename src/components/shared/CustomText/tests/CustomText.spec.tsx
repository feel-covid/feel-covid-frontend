import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { renderWithProviders } from '../../../../../tests/renderWithProviders';
import CustomText from '../CustomText';

afterEach(cleanup);

describe('CustomText - Basic functionality', () => {
	it('Should show the text', async () => {
		const text = 'Regular Test';
		const { getByText } = renderWithProviders(<CustomText text={text} />);
		expect(await getByText(text)).toBeInTheDocument();
	});

	it('Should show the text as link', async () => {
		const text = 'Link Test';
		const { getByText } = renderWithProviders(<CustomText text={text} link />);
		expect(await getByText(text)).toBeInTheDocument();
	});
});
