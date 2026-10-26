import { Navigate, Outlet, useLocation } from 'react-router'
import { getRedirectFrom } from './redirectState'
import { useAuth } from './useAuth'

export function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth()
  const state: unknown = useLocation().state

  if (isAuthenticated) {
    return <Navigate to={getRedirectFrom(state) ?? '/rates'} replace />
  }

  return <Outlet />
}
