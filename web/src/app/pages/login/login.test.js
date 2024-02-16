import { fireEvent, render, screen } from '@testing-library/react'
import LoginPage from '.';
import { 
  SERVER_ERROR_MESSAGE,
  ServerError,
  UNEXPECTED_ERROR_MESSAGE,
  UnAuthorizedError,
  UnexpectedError 
} from '../../../modules/auth/login.exception';
import { LoginUser } from '../../../api/auth';

// todo :: search alternatives to this
jest.mock('react-router-dom')
// todo :: check msw to replace this
jest.mock('../../../api/auth');

describe('Login Page', () => {

  it('should show login page', () => {
      const { container } = render(<LoginPage />);
      expect(container).toBeInTheDocument();
  });

  it.todo('should disable form and show errors when some input is invalid')

  it.todo('should save authoken in localStorage and redirect to buildings page when UsreLogin respond with success')

  it('should show error message when login user service respond with Server error', async () => {
      LoginUser.mockRejectedValue(ServerError.generate());

      render(<LoginPage />);

      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');

      fireEvent.change(emailInput, { target: { value: 'irrelevant' } });
      fireEvent.change(passwordInput, { target: { value: 'irrelevant' } });

      const submitButton = screen.getAllByRole('button')[1];

      fireEvent.click(submitButton);

      const errorMessageElement = await screen.findByText(SERVER_ERROR_MESSAGE)

      expect(errorMessageElement).toBeInTheDocument();
  });

  it('should show unxpected error message when login user service respond with Unexpected error', async () => {
    LoginUser.mockRejectedValue(UnexpectedError.generate());

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'irrelevant' } });
    fireEvent.change(passwordInput, { target: { value: 'irrelevant' } });

    const submitButton = screen.getAllByRole('button')[1];

    fireEvent.click(submitButton);

    const errorMessageElement = await screen.findByText(UNEXPECTED_ERROR_MESSAGE)

    expect(errorMessageElement).toBeInTheDocument();
  });

  it('should show error message of api response when login user service respond with Unauthorized error', async () => {
    const MOCK_MESSAGE = 'test'
    LoginUser.mockRejectedValue(UnAuthorizedError.generate(MOCK_MESSAGE));

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'irrelevant' } });
    fireEvent.change(passwordInput, { target: { value: 'irrelevant' } });

    const submitButton = screen.getAllByRole('button')[1];

    fireEvent.click(submitButton);

    const errorMessageElement = await screen.findByText(MOCK_MESSAGE)

    expect(errorMessageElement).toBeInTheDocument();
  });


  afterEach(() => {
    jest.resetAllMocks();
  })

})
