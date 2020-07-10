import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { CountryDataProvider } from '../CountryDataProvider';
import { useRequest } from '../../../../hooks';
import { serverResponseFixture } from '../../../../../tests/fixtures';
import { CountryDataContext } from '../context';
import { countryDataContextFixture } from './fixtures';

jest.mock('../../../../hooks');

afterEach(cleanup);

describe('CountryDataProvider - Basic functionality', () => {
	beforeEach(() => {
		(useRequest as jest.Mock).mockImplementation(() => ({
			data: [serverResponseFixture],
			error: null,
			loading: false
		}));
	});

	it('Should render children', async () => {
		const textContent = 'Hello world';
		const { getByText } = render(
			<CountryDataProvider>
				<div>{textContent}</div>
			</CountryDataProvider>
		);

		expect(await getByText(textContent)).toBeInTheDocument();
	});

	it('Should pass correct context data', () => {
		const fn = jest.fn();

		render(
			<CountryDataProvider>
				<CountryDataContext.Consumer>{fn}</CountryDataContext.Consumer>
			</CountryDataProvider>
		);

		expect(fn).toHaveBeenCalledWith(countryDataContextFixture);
	});
});
