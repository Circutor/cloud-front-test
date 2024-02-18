import * as jwt from 'react-jwt'

import { useLocalStorage } from './useLocalStorage'
import { useMemo } from 'react'

export function useAuth() {
	const [token, saveToken] = useLocalStorage('auth', null)

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
	}

	return { login, isAuthenticated, logout }
}
