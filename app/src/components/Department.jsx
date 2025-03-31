import { useEffect, useContext, useState } from 'react';
import ChangeContext from './ChangeContext'
import Add from './Add'
import Display from './Display.jsx';


export default function Department(department_id) {
  const departmentId = department_id.department_id;
  const {change, setChange} = useContext(ChangeContext);
  console.log(departmentId);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/department/${departmentId}`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err));
  }, [change]);

  return (
    <>
      <div className='all-items-header'>
        <h1>{items[0]?.department}</h1>
        <Add/>
      </div>
      <div className='display-box'>
        {items?.map((item) => <Display item={item} key={item.id}>{item.name}</Display>)}
      </div>
    </>
  )
}