import { renderHook, act } from '@testing-library/react'

import { useThrottle } from '../useThrottle'

describe('useThrottle', () => {
	beforeAll(() => {
		jest.useFakeTimers()
	})

	afterAll(() => {
		jest.useRealTimers()
	})

	it('should return a function', () => {
		const { result } = renderHook(() => useThrottle(() => {}, 1000))

		expect(typeof result.current).toBe('function')
	})

	it('should call the callback', () => {
		const callback = jest.fn()
		const { result } = renderHook(() => useThrottle(callback, 1000))

		act(() => {
			result.current()
		})

		jest.runAllTimers()

		expect(callback).toHaveBeenCalled()
	})
})
