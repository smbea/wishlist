import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

function ItemForm(props: {
  show: boolean,
  onHide: () => void
}) {

  type Item = {
    title: string;
    price: string;
    image: string;
  };
   

  const [results, setResults] = useState<Item>({title: '', price: '', image: ''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function isValidUrl(str: string) {
    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  const fetchData = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setResults({title: '', price: '', image: ''});
    const url = e.currentTarget.value;

    if(isValidUrl(url) && !loading) {

      setLoading(true);

      fetch(`http://localhost:8080/item?url=${url}`)
        .then(async (response) => {
          const body = await response.json();
          setError('');
          setResults({...body, url});
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const saveItem = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!loading) {
      fetch(`http://localhost:8080/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...results })
      })
      .then(() => {
        onClose()
      })
    }
  }

  const onClose = () => {
    props.onHide();
    setResults({title: '', price: '', image: ''});
  }

  return (
    <Modal show={props.show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveItem}>
          <Form.Group>
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter url"
              id='url'
              onInput={fetchData}
            />
          </Form.Group>
            {loading ? 
              <span className="loader"></span>
                          : null}
            {(results || error) && 
              <div>
                <hr/>
                <div>{error ? error : null}</div>
                <div>{results.title}</div>
                <div>{results.price}</div>
                <img src={results.image} alt=""/>
                
              </div>
            }
            <div>
              <Button
                variant="primary"
                disabled={loading}
                type='submit'
              >
                Save
              </Button>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ItemForm;
