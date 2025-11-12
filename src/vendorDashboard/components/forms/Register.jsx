import React ,{useState} from 'react'
import { API_URL } from '../../helpers/ApiPath';

const Register = ({showLoginHandler}) => {
  const[username,setUsername]=useState("");
  const[email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(true);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})

      }
        

      )
      const data =await response.json();
      if(response.ok){
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert("vendor register successful")
      showLoginHandler()

      }

      
    } catch (error) {
      console.error("registration failer",error);
      alert("registration failer")
      
    }
  }

  return (
    <div className="registerSection">
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
         <label>UserName</label>
        <input type='text' name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='enter your UserName'/><br/>
        <label>Email</label>
        <input type='text' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br/>
        <label>password</label>
        <input type='text' name ="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br/>
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Register
