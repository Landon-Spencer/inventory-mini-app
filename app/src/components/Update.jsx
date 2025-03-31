import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
  p: 4,
};

export default function Update(item) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updateItem = item.item;
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
    try {
      const response = await fetch(`http://localhost:8080/items/${updateItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      alert(`${responseData.name} inventory was updated to ${responseData.inventory}`);
      setOpen(false);
      setChange(!change);
    } catch (error) {
      console.error('Error:', error);
      alert('Error:' + error);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {updateItem.name}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <form onSubmit={handleSubmit}>
            <label>
              Inventory
              <input
              type="integer"
              name="inventory"
              placeholder={`${updateItem.inventory}`}
              value={formData.inventory}
              onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
