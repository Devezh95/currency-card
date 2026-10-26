import { useNavigate } from 'react-router'
import { useAuth } from '@/features/auth'
import { AppLayout } from '@/shared/layout/AppLayout'

export function AuthenticatedLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    void navigate('/login', { replace: true })
  }

  return <AppLayout onLogout={handleLogout} />
}
