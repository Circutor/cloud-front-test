import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app/App'
import reportWebVitals from './app/reportWebVitals'

import './app/index.css'

function Root() {
	return (
		<Router basename="/">
			<App />
		</Router>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
)

reportWebVitals()
