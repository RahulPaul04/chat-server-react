import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


function Landing() {

    const [name,setname] = useState("")
    const [invalid,setinvalid] = useState(false)
    const navigate = useNavigate()

    const setinput = (input)=>{
        setname(input.value)
        setinvalid(false)
    }

    const validate = ()=>{
      console.log(name);  
      if(name.trim()){
        navigate('/chat',{state:{name:name}})
      }
      else{
        setinvalid(true)
      }
    }

  return (
    <div className='d-flex  justify-content-center align-items-center' style={{height:'100vh'}}>
        <div>
            <input placeholder="Enter your Name" style={{border:'solid 1px'}} value={name} onChange={(e)=>setinput(e.target)} type="text" className="form-control" />
            <p style={{opacity:`${invalid?'1':'0'}`}} className='text-danger mt-1 mb-0'>Enter A Name to Continue</p>
            <div onClick={validate} className="btn btn-primary mt-1">Enter</div>
        </div>
    </div>
  )
}

export default Landing