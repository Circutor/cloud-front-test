import { createContext } from './utils'
import { useLocalStorage } from '../hooks'
import { useMemo } from 'react'
import * as jwt from 'react-jwt'

const [AuthContextProvider, useAuth] = createContext({
	name: 'Auth',
	defaultValue: {},
})

// context should not be used as a state manager, although these values
// will not change often
function AuthProvider({ children }) {
	const [token, saveToken, removeToken] = useLocalStorage('auth', null)

	const login = (token) => {
		saveToken(token)
	}

	const isAuthenticated = useMemo(() => {
		try {
			return token !== null && jwt.isExpired(token) === false
		} catch {
			return false
		}
	}, [token])

	const logout = () => {
		saveToken(null)
		removeToken()
	}

	const auth = {
		login,
		isAuthenticated,
		token,
		logout,
	}

	return <AuthContextProvider value={auth}>{children}</AuthContextProvider>
}

export { AuthProvider, useAuth }
