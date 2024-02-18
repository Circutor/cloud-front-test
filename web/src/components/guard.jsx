import { Navigate } from "react-router-dom"

export function RouteGuard({ isAllowed, redirectTo, children }) {
    if (!isAllowed) {
        return <Navigate to={redirectTo} />
    }

    return children
}