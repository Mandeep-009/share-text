import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Receive from './components/Receive';
import Send from './components/Send';
import Authentication from './components/Authentication';
import Connected from './components/Connected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/send' element={<Send />}/>
            <Route path='/receive' element={<Receive />}/>
            <Route path='/authentication' element={<Authentication />}/>
            <Route path='/send/:id' element={<Connected />}/>
            <Route path='/receive/:id' element={<Connected />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
