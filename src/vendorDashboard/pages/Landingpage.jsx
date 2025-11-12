import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import VendorOrders from "../pages/VendorOrders";


const Landingpage = () => {
  const [showLogin,setshowLogin]=useState(false)
  const[showRegister,setshowRegister]=useState(false)
  const[showFirm,setShowFirm]=useState(false)
  const[showProduct,setShowProduct]=useState(false)
  const[showWelcome,setShowWelcome]=useState(false)
  const[allproducts,setAllProducts]=useState(false)
  const[logout,setLogout]=useState(false)
  const[showFirmtitle,setShowFirmTitle]=useState(true)
  const [showOrders, setShowOrders] = useState(false);

  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken')
    if(loginToken){
      setLogout(true)
    }
  },[])

  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false)
    }

  },[])

  const logoutHandler=()=>{
    confirm("logging out!")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId")
    localStorage.removeItem("firmName");
    setLogout(false)
    setShowFirmTitle(true)
  }


  const showLoginHandler=()=>
  {
    setshowLogin(true)
    setshowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setAllProducts(false)
  }

  const showRegisterHandler=()=>
  {
    setshowRegister(true)
    setshowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowWelcome(false)
  }

  const showFirmHandler=()=>
  {
    if(logout){
    setShowFirm(true)
    setshowLogin(false)
    setshowRegister(false)
    setShowProduct(false)
    setShowWelcome(false)
    setAllProducts(false)
    }
    else{
      alert("please login")
      setshowLogin(true)
    }
  }

  const ShowProductHandler=()=>{
    if(logout){
    setShowProduct(true)
    setshowLogin(false)
    setShowFirm(false)
    setshowRegister(false)
    setShowWelcome(false)
    setAllProducts(false)
    }
    else{
      alert("please login")
      setshowLogin(true)
    }
  }

  const showWelcomeHandler=()=>{
    setShowWelcome(true)
    setShowProduct(false)
    setshowLogin(false)
    setShowFirm(false)
    setshowRegister(false)
    setAllProducts(false)
  }

  const showAllProductHandler=()=>{
    if(logout){
    setShowWelcome(false)
    setShowProduct(false)
    setshowLogin(false)
    setShowFirm(false)
    setshowRegister(false)
    setAllProducts(true)
    
  }
  else{
      alert("please login")
      setshowLogin(true)
    }
}
const showOrdersHandler = () => {
  if (logout) {
    setShowOrders(true);
    setShowProduct(false);
    setshowLogin(false);
    setShowFirm(false);
    setshowRegister(false);
    setShowWelcome(false);
    setAllProducts(false);
  } else {
    alert("please login");
    setshowLogin(true);
  }
};




  return(
    <>
  <section className='LandingSection'>

    <NavBar showLoginHandler={showLoginHandler}
     showRegisterHandler={showRegisterHandler}
     logout={logout}
     logoutHandler={logoutHandler}/>

    <div className='collectionSection'>
    <SideBar showFirmHandler={showFirmHandler} 
    ShowProductHandler={ShowProductHandler}
    showAllProductHandler={showAllProductHandler}
     showFirmtitle={showFirmtitle}
      showOrdersHandler={showOrdersHandler} />

   {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
   {showRegister && <Register showLoginHandler={showLoginHandler}/>} 
   {showFirm && logout && <AddFirm/> }
  {showProduct && logout && <AddProduct/>}
  {showWelcome && <Welcome/>}
  {allproducts && logout && <AllProducts/>}
  {showOrders && logout && <VendorOrders />}
    </div>
    
  </section>
  </>
  )
}


export default Landingpage
