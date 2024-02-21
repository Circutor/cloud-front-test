import { useCallback, useEffect, useRef } from 'react'

import throttle from 'lodash.throttle'

export function useThrottle(cb, delay) {
	const cbRef = useRef(cb)

	useEffect(() => {
		cbRef.current = cb
	}, [cb])

	return useCallback((...args) => throttle(cbRef.current, delay)(...args), [delay])
}
