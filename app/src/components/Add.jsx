import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState, useContext } from 'react';
import ChangeContext from './ChangeContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'gray',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Add() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const departments = ['Meat', 'Produce', 'Dairy']
  const {change, setChange} = useContext(ChangeContext);


  const [formData, setFormData] = useState({})
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    formData.department_id = departments.indexOf(formData.department_id) + 1;
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:8080/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      alert(responseData);
      setOpen(false);
      setFormData({})
      setChange(!change);
    } catch (error) {
      console.error('Error:', error);
      alert('Error:' + error);
      setFormData({})
    }
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Add Item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box id="add-item-box" sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Add an Item</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Name:
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required/>
              </label>
            </div>
            <div>
              <label>
                Inventory:
                <input
                type="text"
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
                required/>
              </label>
            </div>
            <div>
              <label>
                Department:
                <select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                required
                >
                <option value="">Select The Department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              </label>
            </div>
            <input type="submit" value="Submit" />
          </form>
        </Box>
      </Modal>
    </div>
  );
}