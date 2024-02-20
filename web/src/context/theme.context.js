import { ConfigProvider } from 'antd'

export function ThemeProvider({ children }) {
	return (
		<ConfigProvider
			theme={{
				token: {
					// border radius used by all components https://ant.design/docs/react/customize-theme#customize-design-token
					borderRadius: '8px',
					// color seed to green. Antd generates all the color palette based on this
					colorPrimary: '#52C41A',
				},
			}}
		>
			{children}
		</ConfigProvider>
	)
}
