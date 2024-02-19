import { useMemo } from 'react'
import * as jwt from 'react-jwt'

import { createContext } from './utils'
import { useLocalStorage } from '../hooks'

const [AuthContextProvider, useAuth] = createContext({
	name: 'Auth',
	defaultValue: {},
})

// context should not be used as a state manager, although these values
// will not change often
function AuthProvider({ children }) {
	const [email, saveEmail] = useLocalStorage('email', null)
	const [token, saveToken, removeToken] = useLocalStorage('test-token', null)

	const login = ({ token, email }) => {
		saveToken(token)
		saveEmail(email)
	}

	const isAuthenticated = useMemo(() => {
		try {
			return token !== null && jwt.isExpired(token) === false
		} catch {
			return false
		}
	}, [token])

	const logout = () => {
		removeToken()
	}

	const auth = {
		isAuthenticated,
		email,
		token,
		login,
		logout,
	}

	return <AuthContextProvider value={auth}>{children}</AuthContextProvider>
}

export { AuthProvider, useAuth }
