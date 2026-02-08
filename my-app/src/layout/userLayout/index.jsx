import React from 'react'
import NavBarComponent from '@/Component/NavBar/index.jsx'
function UserLayout({children}) {
  return (
    <div>
        <NavBarComponent />
      {children}
    </div>
  )
}

export default UserLayout
