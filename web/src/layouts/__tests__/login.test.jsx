import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider, ConfigProvider } from '../../context'
import LoginPage from '../login'

describe('Login Page', () => {
    it('renders the login page', () => {
        const { container } = render(
            <Router>
                <LoginPage />
            </Router>
        )

        const loginTitle = container.querySelector("h2")

        expect(loginTitle).toBeInTheDocument()
        expect(loginTitle).toHaveTextContent('Login')
    })

    it('renders an error message if login endpoint fails', async () => {
        fetch.mockResponse(
            JSON.stringify({ error: 'Invalid email or password' })
        )

        render(
            <Router>
                <AuthProvider>
                    <ConfigProvider value={{ REACT_APP_POST_LOGIN: 'login' }}>
                        <LoginPage />
                    </ConfigProvider>
                </AuthProvider>
            </Router>
        )

        const emailInput = screen.getByTestId('login-form-email')
        const passwordInput = screen.getByTestId('login-form-password')
        const btn = screen.getByTestId('login-form-submit')

        act(() => {
            userEvent.type(emailInput, 'test@email.com')
            userEvent.type(passwordInput, 'testtest')
            userEvent.click(btn)
        })

        const errorText = await waitFor(() => screen.getByTestId('login-form-error-text'), { timeout: 3000 })

        expect(errorText).toBeInTheDocument()
    })
})
