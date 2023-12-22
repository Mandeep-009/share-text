import axios from 'axios';
import { useEffect } from 'react';
import { backendURL } from '../config';

const Send = () => {

  useEffect(()=>{
    async function createChannel () {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * 36);
        randomString += characters[randomIndex];
      }
      try {
        await axios.post(`${backendURL}`,{id:randomString,content:''});
        window.location.href = `/send/${randomString}`;
      } catch (error) {
        console.error('error creating channel: ',error);
      }

    }
    createChannel();
  },[])
    

    
  return (
    <div>
      Generating new token...
    </div>
  )
}

export default Send
