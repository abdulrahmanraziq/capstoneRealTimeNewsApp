import React from 'react'

function AdminRoutes({children}) {
  let role = sessionStorage.getItem('role');
  return role === 'Admin' ? children : <Navigate to='login'/>
}

export default AdminRoutes
