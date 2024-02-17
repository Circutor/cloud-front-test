import { renderHook, act } from '@testing-library/react-hooks';
import { useLogin } from './useLogin';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../api/auth', () => ({
  LoginUser: jest.fn(),
}));

describe('useLogin', () => {
  it('should set loading to true while submitting and navigate on successful login', async () => {
    const navigateMock = jest.fn();
    const loginUserMock = jest.fn().mockResolvedValueOnce({
      Token: 'eyfue892jfio2891',
      Email: 'test@example.com',
    });

    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);
    require('../api/auth').LoginUser = loginUserMock;

    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    await act(async () => {
      result.current.handleSubmit({
        email: 'test@example.com',
        password: 'password',
      });
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
    expect(navigateMock).toHaveBeenCalledWith('/buildings');
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      1,
      'test-token',
      'eyfue892jfio2891'
    );
    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      2,
      'email',
      'test@example.com'
    );
  });

  it('should set error message on failed login', async () => {
    const errorMessage = 'invalid email or password';
    const loginUserMock = jest
      .fn()
      .mockResolvedValueOnce({ message: errorMessage });

    require('../api/auth').LoginUser = loginUserMock;

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    await act(async () => {
      result.current.handleSubmit({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
