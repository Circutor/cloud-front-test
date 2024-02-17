import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Styled Components', () => {
  test('Input component should have border-radius style applied', () => {
    render(<Input data-testid='input' />);

    const inputElement = screen.getByTestId('input');

    expect(inputElement).toHaveStyle('border-radius: 50px');
  });
});
