import { createContext } from './utils'

export const [ConfigProvider, useConfig] = createContext({
	name: 'Config',
	defaultValue: {},
})
