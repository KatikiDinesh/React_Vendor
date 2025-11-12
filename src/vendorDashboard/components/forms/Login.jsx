import React ,{useState} from 'react'
import { API_URL } from '../../helpers/ApiPath';

const Login = ({showWelcomeHandler}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const loginHandler = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${API_URL}/vendor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("login success ✅");
      localStorage.setItem("loginToken", data.token);
      showWelcomeHandler();
    }

    const vendorId = data.vendorId;
    console.log("Vendor ID:", vendorId);

    // ✅ Fetch vendor details
    const vendorResponse = await fetch(
      `${API_URL}/vendor/single-vendor/${vendorId}`
    );
    const vendorData = await vendorResponse.json();
    console.log("Vendor Data:", vendorData);

    if (vendorResponse.ok) {
      const vendorFirmId = vendorData.vendorFirmId;
      console.log("checking for firm id", vendorFirmId);

      if (vendorData?.vendor?.firm?.length > 0) {
        const vendorFirmname = vendorData.vendor.firm[0].firmName;

        localStorage.setItem("firmId", vendorFirmId);
        localStorage.setItem("firmName", vendorFirmname);
      } else {
        console.log("Vendor has no firm");
        localStorage.removeItem("firmId");
        localStorage.removeItem("firmName");
      }
    }

    setEmail("");
    setPassword("");
    window.location.reload();

  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className='LoginSection'>
      
      <form className='authForm' onSubmit={loginHandler}>
        <h3>VendorLogin</h3>
        <label>Email</label>
        <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br/>
        <label>password</label>
        <input type='text'name='password'value={password}   onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br/>
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
      
    </div>
  )
}

export default Login
