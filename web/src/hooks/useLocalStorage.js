import { useEffect, useState } from 'react'

function readFromLocalStorage(key) {
	const item = window.localStorage.getItem(key)

	return item !== null ? JSON.parse(item) : null
}

function writeToLocalStorage(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value))
}

export function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(
		() => readFromLocalStorage(key) || initialValue
	)

	const setValue = (value) => {
		setStoredValue(value)
		writeToLocalStorage(key, value)
	}

	useEffect(() => {
		const handleStorageChange = (e) => {
			if (e.key === key) {
				setStoredValue(JSON.parse(e.newValue))
			}
		}

		window.addEventListener('storage', handleStorageChange)

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [key])

	return [storedValue, setValue]
}
