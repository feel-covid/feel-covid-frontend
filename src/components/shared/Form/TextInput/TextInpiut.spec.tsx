import React from 'react';
import { render } from '@testing-library/react';
import TextInput from './TextInput';

test('renders text input', () => {
	const { getByTestId } = render(<TextInput />);
	const linkElement = getByTestId('TextInput');
	expect(linkElement).toBeInTheDocument();
});
