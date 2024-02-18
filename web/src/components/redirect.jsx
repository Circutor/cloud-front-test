import { Navigate, useLocation } from 'react-router-dom'

// declarative way of redirecting, removed in react-router@6
export function Redirect({ from, to }) {
    const { pathname } = useLocation()

    const regex = new RegExp(`${from}(/|$)`, 'i')

    if (regex.test(pathname)) {
        return <Navigate to={to} />
    }

    return null
}