import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../src/themes';

export const renderWithProviders = (children: JSX.Element) => {
	return render(<ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>);
};
