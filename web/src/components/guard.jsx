import { Navigate } from "react-router-dom"

import { useAuth } from "../context"

export function RouteGuard({ redirectTo, children }) {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />
    }

    return children
}