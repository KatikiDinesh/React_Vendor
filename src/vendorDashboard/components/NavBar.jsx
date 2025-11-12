import React from 'react'

const NavBar = ({showLoginHandler,showRegisterHandler,logout,logoutHandler}) => {
  const fname=localStorage.getItem('firmName')
  return (
    <div className='navSection'>
      
      <div className='company'>
        vendor DashBoard
      </div>
      <div>
        <div className="firmnName">
          <h4>Firmname:{fname}</h4>
        </div>
      </div>
      <div className='userAuth'>
        {!logout? <>
      <span onClick={showLoginHandler}>login/
        </span>

        <span onClick={showRegisterHandler}>
          Register
      </span>
      </>:<span onClick={logoutHandler}>logout</span>}
       
      
    </div>
    </div>
  )
}

export default NavBar
