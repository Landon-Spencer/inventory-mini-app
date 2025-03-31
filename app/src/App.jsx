import { useState } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import All from './components/All';
import './App.css';
import ChangeContext from './components/ChangeContext.jsx';
import Department from './components/Department'

function App() {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const value = { change, setChange };

  return (
    <>
    <ChangeContext.Provider value={value}>
      <h1>Store Front</h1>
      <nav>
        <Button variant="contained" onClick={() => {navigate('/')}}>All Items</Button>
        <Button variant="contained" onClick={() => {navigate('/Meat'); setChange(!change);}}>Meat</Button>
        <Button variant="contained" onClick={() => {navigate('/Produce'); setChange(!change);}}>Produce</Button>
        <Button variant="contained" onClick={() => {navigate('/Dairy'); setChange(!change);}}>Dairy</Button>
      </nav>
      <Routes>
        <Route path='/' element={<All/>}/>
        <Route path='/Meat' element={<Department department_id={1}/>}/>
        <Route path='/Produce' element={<Department department_id={2}/>}/>
        <Route path='/Dairy' element={<Department department_id={3}/>}/>
      </Routes>
    </ChangeContext.Provider>
    </>
  )
}

export default App
