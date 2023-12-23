import React, { useState } from 'react'
import Authentication from './Authentication';
import Connected from './Connected';

const Receive = () => {
  const [connectionCode,setConnectionCode] = useState('');
  const [content,setContent] = useState('');
  const authenticationDone = (code,text) => {
    setConnectionCode(code);
    setContent(text);
  }
  return (
    <div>
      {
        !connectionCode ? (
          <Authentication authenticated={authenticationDone}/>
        ) : (
          <Connected id={connectionCode} text={content}/>
        )
      }
    </div>
  )
}

export default Receive
