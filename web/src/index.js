import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app/App'
import { ConfigProvider } from './context'

import './app/index.css'

import reportWebVitals from './reportWebVitals'

function Root() {
	return (
		<ConfigProvider value={process.env}>
			<Router basename="/">
				<App />
			</Router>
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
