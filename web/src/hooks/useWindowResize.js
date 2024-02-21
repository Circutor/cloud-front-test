import { useEffect, useRef } from 'react'

export function useWindowResize(cb, callOnMount = false) {
	const cbRef = useRef(cb)

	useEffect(() => {
		// persists callback on ref change, avoids unnecessary re-renders
		cbRef.current = cb
	}, [cb])

	useEffect(() => {
		function handleResize(uiEvent) {
			if (typeof cbRef.current === 'function') {
				cbRef.current(uiEvent)
			}
		}

		if (callOnMount) {
			handleResize()
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [callOnMount])
}
