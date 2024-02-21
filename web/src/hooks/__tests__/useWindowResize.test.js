import { renderHook } from '@testing-library/react'

import { useWindowResize } from '../useWindowResize'

describe('useWindowResize', () => {
	it('should call the callback on window resize', () => {
		const cb = jest.fn()
		const { unmount } = renderHook(() => useWindowResize(cb))

		global.dispatchEvent(new Event('resize'))

		expect(cb).toHaveBeenCalledTimes(1)

		unmount()
	})

	it("should call the callback on mount if 'callOnMount' is true", () => {
		const cb = jest.fn()
		const { unmount } = renderHook(() => useWindowResize(cb, true))

		expect(cb).toHaveBeenCalledTimes(1)

		unmount()
	})

	it('should remove listener on unmount', () => {
		const cb = jest.fn()
		const { unmount } = renderHook(() => useWindowResize(cb))

		unmount()

		global.dispatchEvent(new Event('resize'))

		expect(cb).not.toHaveBeenCalled()
	})
})
