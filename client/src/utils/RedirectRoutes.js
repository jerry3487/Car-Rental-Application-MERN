import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RedirectRoutes = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return userInfo && userInfo.isAdmin ? <Navigate to="admin" /> : <Outlet />
}

export default RedirectRoutes
