import {useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ItemForm from './ItemForm';
import { FaTrash } from 'react-icons/fa'

function LoginForm() {

  type Item = {
    title: string;
    price: string;
    image: string;
    url: string;
    id: string;
  };

  const [items, setItems] = useState<Item[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/items`)
        .then(async (response) => {
          const body = await response.json();
          setItems(body)
        })
        .catch(error => {});
    
  }, [showAddModal])

  const handleShow = () => setShowAddModal(true);
  const handleClose = () => setShowAddModal(false);

  const handleItemDelete = (id: string) => {
    fetch(`http://localhost:8080/item`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id})
    })
  }

  return (
    <div> 
      <h3>My Wishlist</h3>
      <Button
        variant="primary"
        type='submit'
        onClick={handleShow}
      >
        Add item
      </Button>
      {items.map((item) => {       
        return (
          <Card title={item.title} key={item.id} style={{ width: '18rem' }}>
            {item.image && <Card.Img src ={item.image}/>}
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <div>{item.price}</div>
              <a href={item.url}>url</a>
              <FaTrash onClick={() => handleItemDelete(item.id)}/>
            </Card.Body>
          </Card>
        ) 
      })}

      <ItemForm show={showAddModal} onHide={handleClose}/>
    </div>
  );
}

export default LoginForm;
