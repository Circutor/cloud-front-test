import { useCallback } from 'react'

import throttle from 'lodash.throttle'

export function useThrottle(callback, delay) {
	return useCallback(() => throttle(callback, delay), [callback, delay])
}
