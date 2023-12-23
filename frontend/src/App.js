import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Receive from './components/Receive';
import Send from './components/Send';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/send' element={<Send />}/>
            <Route path='/receive' element={<Receive />}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
