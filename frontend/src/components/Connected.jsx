import axios from 'axios';
import React, { useState } from 'react'
import {backendURL} from '../config'

const Connected = (props) => {
    const id = props.id;
    const text = props.text;
    const [content,setContent] = useState(text);
    const [alert,setAlert] = useState(false);
    axios.defaults.withCredentials = true;
    
    const send = async ()=>{
        try {
            const response = await axios.patch(`${backendURL}/${id}`,{content});
            if(response.data){
                if(!alert){setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 1500);}
            } else{
                window.alert('Connection timed out ( 15minutes )');
                window.location.href = '/';
            }
          } catch (error) {
            if (error.response && error.response.data) {
                window.alert(error.response.data); 
                window.location.href = '/';
            } else {
                console.error('An error occurred:', error);
            }
          }
    }
    const receive = async ()=>{
        try {
            const response = await axios.get(`${backendURL}/${id}`);
            if(response.data){
                const txtspace = document.body.querySelector('textarea');
                txtspace.value = response.data.content;
            }
            else{
                window.alert('Connection timed out ( 15minutes )');
                window.location.href = '/';
            }
          } catch (error) {
            if (error.response && error.response.data) {
                window.alert('Connection timed out ( 15minutes )'); 
                window.location.href = '/';
            } else {
                console.error('An error occurred:', error);
            }
          }
    }

    const copyFn = (e) => {
        console.log(content);
        navigator.clipboard.writeText(content)
            .then(function() {
                e.target.innerHTML = 'copied!!! '
            })
            .catch((err) => {
                console.error('Could not copy text: ', err);
            });
        
        setTimeout(()=>{
            e.target.innerHTML = 'copy to clipboard'
        },1000)
    }

  return (
    <div style={{position:'relative'}}>
        {alert?(<div style={{position:'absolute',color:'black',backgroundColor:'#e9e9ed',border:'none',borderRadius:'5px',padding:'5px',margin:'10px'}}>Sent successfully !!!</div>):(null)}
        <div style={{height:'20vh',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
            <div>Your code:</div>
            <div style={{margin: '10px 30px',border: '1px solid violet',padding:'5px',width: '100px'}}><output>{id}</output></div>
        </div>
        <div>
            <div style={{position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{height:'50vh',width:'70vw'}}><textarea onChange={(e)=>setContent(e.target.value)} defaultValue={text} style={{height:'50vh',width:'70vw', backgroundColor:'#222221',color:'white',fontSize:'14px'}}></textarea></div>
                <div style={{position:'absolute', bottom:'0px', right:'15vw'}}><button style={{width:'100px'}} onClick={(e)=>copyFn(e)}>copy to clipboard</button></div>
            </div>
            <div style={{margin:'10px'}}>
                <button onClick={send}>Send</button>
                <button onClick={receive}>Receive</button>
            </div>
        </div>
    </div>
  )
}

export default Connected
