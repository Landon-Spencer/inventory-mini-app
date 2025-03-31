import { useState, useEffect, useContext } from 'react'
import Display from './Display.jsx';
import ChangeContext from './ChangeContext'
import Add from './Add'

export default function All() {
  const [items, setItems] = useState([]);
  const {change, setChange} = useContext(ChangeContext);

  useEffect(() => {
    fetch(`http://localhost:8080/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, [change]);

  return(
    <>
      <div className='all-items-header'>
        <h1>All Items</h1>
        <Add/>
      </div>
      <div className='display-box'>
        {items.map((item) => <Display item={item} key={item.id}>{item.name}</Display>)}
      </div>
    </>
  )
};