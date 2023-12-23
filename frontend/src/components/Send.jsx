import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendURL } from '../config';
import Connected from './Connected';

const Send = () => {
  axios.defaults.withCredentials = true;
  const [loading,setLoading] = useState(true);
  const [id,setId] = useState('');
  useEffect(()=>{
    async function createChannel () {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * 36);
        randomString += characters[randomIndex];
      }
      setId(randomString);
      try {
        await axios.post(`${backendURL}`,{id:randomString,content:''});
        setLoading(false);
      } catch (error) {
        console.error('error creating channel: ',error);
      }

    }
    createChannel();
  },[])
    

    
  return (
    <div>
      {
        loading? (
          <div>Generating new token...</div>
        ) : (
          <Connected id={id} text={''}/>
        )
      }
    </div>
  )
}

export default Send
