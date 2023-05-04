import {useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ItemForm from './ItemForm';

function LoginForm() {

  type Item = {
    title: string;
    price: string;
    image: string;
    url: string;
  };

  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/items`)
        .then(async (response) => {
          const body = await response.json();
          setItems(body)
        })
        .catch(error => {});
    
  }, [])

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


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
          <Card title={item.title} key={item.url} style={{ width: '18rem' }}>
            {item.image && <Card.Img src ={item.image}/>}
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <div>{item.price}</div>
              <a href={item.url}>url</a>
            </Card.Body>
          </Card>
        ) 
      })}

      <ItemForm show={showModal} onHide={handleClose}/>
    </div>
  );
}

export default LoginForm;
