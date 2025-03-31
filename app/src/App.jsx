import { useState } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
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
        <Button variant="contained" onClick={() => navigate('/')}>All Items</Button>
        <Button variant="contained" onClick={() => navigate('/')}>Meat</Button>
        <Button variant="contained" onClick={() => navigate('/')}>Produce</Button>
        <Button variant="contained" onClick={() => navigate('/')}>Dairy</Button>
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
