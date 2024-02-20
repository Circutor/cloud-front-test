import { useReducer } from 'react'

export async function makeFetch({ url, method, token, body }) {
	const headers = {
		'Content-Type': 'application/json',
	}

	if (token) {
		headers['Authorization'] = `Bearer ${token}`
	}

	const response = await fetch(url, {
		method: method,
		headers,
		body: JSON.stringify(body),
	})

	if (!response.ok) {
		throw new Error(response.statusText)
	}

	return await response.json()
}

export function useMutate({ url, method, token, onSuccess }) {
	const [state, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case 'loading':
					return { ...state, loading: true }
				case 'success':
					return {
						...state,
						loading: false,
						data: action.payload,
						error: null,
					}
				case 'error':
					return {
						...state,
						loading: false,
						data: null,
						error: action.payload,
					}
			}
		},
		{ loading: false, data: null, error: null }
	)

	const mutate = async (body) => {
		dispatch({ type: 'loading' })

		try {
			const data = await makeFetch({ url, method, token, body })

			dispatch({ type: 'success', payload: data })

			await onSuccess?.(data)
		} catch (error) {
			dispatch({ type: 'error', payload: error.message })
		}
	}

	return [state, mutate]
}
