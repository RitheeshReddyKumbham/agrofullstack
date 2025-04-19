import React, { use } from 'react'
import { useNavigate } from 'react-router-dom'
function Entry() {
    const navigate=useNavigate()
  return (
    <div>
        <h1 >Welcome to Order Platform</h1>
        <div>
            <button onClick={()=>navigate("/signup")}>Sign Up</button>
            <button onClick={()=>navigate("/login")}>Sign In/Log In</button>
        </div>
    </div>
  )
}

export default Entry