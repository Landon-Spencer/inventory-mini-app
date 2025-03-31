import { useState } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import All from './components/All';
import './App.css';
import ChangeContext from './components/ChangeContext.jsx';

function App() {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const value = { change, setChange };

  return (
    <>
    <ChangeContext.Provider value={value}>
      <h1>Store Front</h1>
      <nav>
        <button onClick={() => navigate('/')}>All Items</button>
        <button onClick={() => navigate('/')}>Meat</button>
        <button onClick={() => navigate('/')}>Produce</button>
        <button onClick={() => navigate('/')}>Dairy</button>
      </nav>
      <Routes>
        <Route path='/' element={<All/>}/>
        {/* <Route path='/dog' element={<Dog/>}/> */}
        {/* <Route path='/color-list' element={<ColorList/>}/> */}
        {/* <Route path='/pokemon-demo/*' element={<PokemonDemo/>}/> */}
      </Routes>
    </ChangeContext.Provider>
    </>
  )
}

export default App
