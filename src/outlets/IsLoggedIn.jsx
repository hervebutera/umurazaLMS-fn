import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const IsLoggedIn = () => {

  const userInfo = useSelector((state) => state.userInfo.userInfo)  
  const tokenAvailable = localStorage.getItem('rcv_token') !== null
  const storeUserInfoAvailable = (userInfo !== undefined) && (Object.keys(userInfo).length > 0)
  return tokenAvailable && storeUserInfoAvailable ? <Outlet /> : <Navigate to="/login" />
}

export default IsLoggedIn
