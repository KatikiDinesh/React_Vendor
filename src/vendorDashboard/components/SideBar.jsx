import React from 'react'

const SideBar = ({
  showFirmHandler,
  ShowProductHandler,
  showAllProductHandler,
  showFirmtitle,
  showOrdersHandler   // ✅ ADDED HERE
}) => {
  return (
    <div className='sideBarSection'>
      <ul>

        {showFirmtitle ? (
          <li onClick={showFirmHandler}>Add Firm</li>
        ) : (
          ""
        )}

        <li onClick={ShowProductHandler}>Add Product</li>

        <li onClick={showAllProductHandler}>All Products</li>

        {/* ✅ New Orders button */}
        <li onClick={showOrdersHandler}>Orders</li>

        <li>User Detail</li>
      </ul>
    </div>
  )
}

export default SideBar
