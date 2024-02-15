import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LayoutLogin from './login';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

global.matchMedia =
  global.matchMedia ||
  (() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

describe('LayoutLogin', () => {
  it('renders login form', async () => {
    render(<LayoutLogin />);
    expect(screen.getByRole('heading', 'My Buildings')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('redirects to register page when register button is clicked', () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    render(<LayoutLogin />);
    const registerButton = screen.getByText('Register');
    fireEvent.click(registerButton);

    expect(navigateMock).toHaveBeenCalledWith('/register');
  });
});
