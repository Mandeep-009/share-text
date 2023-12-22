import React, { useState } from 'react';
import axios from 'axios';
import {backendURL} from '../config';

const Authentication = () => {
  const [code,setCode] = useState('');
  async function checkCode () {
    const result = await axios.get(`${backendURL}/${code}`);
    if(result.data){
      window.location.href = `/receive/${code}`;
    }
    else{
      window.alert('no such channel found');
    }
  }
  return (
    <div>
      <div style={{fontSize:'18px',margin:'50px 0 0 0',justifyContent:'center'}}>Enter connection code:</div>
      <div>
        <input type="text" onChange={(e)=>setCode(e.target.value)} style={{height:'30px',width:'200px',fontSize:'18px',margin:'10px 0 30px 0',backgroundColor:'#222221',color:'white'}}/>
      </div>
      <button onClick={checkCode}>Connect</button>
    </div>
  )
}

export default Authentication
