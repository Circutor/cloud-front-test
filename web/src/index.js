import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app/App'
import { ConfigProvider, AuthProvider } from './context'

import './index.css'

import reportWebVitals from './reportWebVitals'

function Root() {
	return (
		<ConfigProvider value={process.env}>
			<AuthProvider>
				<Router basename="/">
					<App />
				</Router>
			</AuthProvider>
		</ConfigProvider>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
)

reportWebVitals()
