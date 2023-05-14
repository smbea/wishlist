import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ItemForm from './ItemForm';
import { FaTrash } from 'react-icons/fa';
import { without } from 'min-dash';
import styles from '../styles/MyItems.module.css';

const LoginForm: React.FunctionComponent = () => {
  interface Item {
    title: string
    price: string
    image: string
    url: string
    id: string
  }

  const [ items, setItems ] = useState<Item[]>([]);
  const [ showAddModal, setShowAddModal ] = useState(false);

  const fetchItems = (): void => {
    fetch('http://localhost:8080/items')
      .then(async response => {
        if (response.ok) {
          const body = await response.json();
          setItems(body);
        } else {
          console.log('error');
        }
      })
      .catch(async error => {
        return await Promise.reject(error);
      });
  };

  const handleShow = (): void => { setShowAddModal(true); };
  const handleClose = (): void => { setShowAddModal(false); };

  const handleItemDelete = (id: string): void => {
    console.log('handleItemDelete', id);
    fetch('http://localhost:8080/item', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then(response => {
      if (response.ok) {
        const deletedItem = items.find(item => item.id === id);
        setItems(without(items, deletedItem));
      }
    }).catch(error => {
      console.log('error', error);
    });
  };

  useEffect(() => {
    fetchItems();
  }, [ showAddModal ]);

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
      <Container fluid>
        <Row>
          {items.map(item => {
            return (
              <Col key={item.id} className={styles.card}>
                <Card title={item.title}>
                  {item.image && <Card.Img src={item.image} />}
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <div>{item.price}</div>
                    <a href={item.url}>url</a>
                    <FaTrash onClick={() => { handleItemDelete(item.id); }} />
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <ItemForm show={showAddModal} onHide={handleClose} />
    </div>
  );
};

export default LoginForm;
