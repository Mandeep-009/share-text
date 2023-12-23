import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
        <div>
            <Link to={'/send'}>
                <button>Send text</button>
            </Link>
        </div>
        <div>
            <Link to={'/receive'}>
                <button>Receive text</button>
            </Link>
        </div>
    </div>
  )
}

export default Home
