import axios from 'axios';
import React, { useState } from 'react'
import {backendURL} from '../config'

const Connected = (props) => {
    const id = props.id;
    const text = props.text;
    const [content,setContent] = useState('');
    axios.defaults.withCredentials = true;
    
    const send = async ()=>{
        const response = await axios.patch(`${backendURL}/${id}`,{content});
        if(response.data){
            window.alert('sent successfully');
        }
        else{
            window.alert('Connection timed out ( 15minutes )');
            window.location.href = '/';
        }
    }
    const receive = async ()=>{
        const response = await axios.get(`${backendURL}/${id}`);
        if(response.data){
            const txtspace = document.body.querySelector('textarea');
            txtspace.value = response.data.content;
        }
        else{
            window.alert('Connection timed out ( 15minutes )');
            window.location.href = '/';
        }
    }

  return (
    <div>
        <div style={{height:'20vh',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
            <div>Your code:</div>
            <div style={{margin: '10px 30px',border: '1px solid violet',padding:'5px',width: '100px'}}><output>{id}</output></div>
        </div>
        <div>
            <textarea onChange={(e)=>setContent(e.target.value)} defaultValue={text} style={{height:'50vh',width:'70vw',backgroundColor:'#222221',color:'white',fontSize:'14px'}}></textarea>
            <div style={{margin:'10px'}}>
                <button onClick={send}>Send</button>
                <button onClick={receive}>Receive</button>
            </div>
        </div>
    </div>
  )
}

export default Connected
