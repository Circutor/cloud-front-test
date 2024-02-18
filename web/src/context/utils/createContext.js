import {
	createContext as reactCreateContext,
	useContext as reactUseContext,
} from 'react'

export function createContext({
	name: ctxName,
	defaultValue,
	throwError = true,
}) {
	const ctx = reactCreateContext(defaultValue)

	ctx.displayName = `Context.${ctxName}`

	function useContext() {
		const ctxValue = reactUseContext(ctx)

		if (throwError && ctxValue === undefined) {
			throw new Error(
				`use${ctxName} must be used within a <${ctxName}.Provider />`
			)
		}

		return ctxValue
	}

	return [ctx.Provider, useContext]
}
