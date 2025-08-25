import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-5 py-2 rounded-full bg-red-500 text-white font-medium 
                 hover:bg-red-600 active:bg-red-700 shadow-sm transition-colors duration-200"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
