import React, { useState } from 'react';
import './App.css';

function ItemForm() {

  type Item = {
    title: string;
    price: string;
    image: string;
  };
   

  const [results, setResults] = useState<Item>({title: '', price: '', image: ''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      url: {value: string}
    };
    const url = formElements.url.value; 

    fetch(`http://localhost:8080/item?url=${url}`)
      .then(async (response) => {
        const body = await response.json();
        setError('');
        setResults(body);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={fetchData}>
          <div>
            <h3>Add item</h3>
            <div>
              <label>Item Url</label>
              <input
                type="url"
                placeholder="Enter url"
                id='url'
              />
            </div>
            {loading ? 
              <span className="loader"></span>
                          : null}
            <div>
              <button type="submit" >
              Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {(results || error) && 
        <div>
          <h3>Results</h3>
          <div>{error ? error : null}</div>
          <div>{results.title}</div>
          <div>{results.price}</div>
          <img src={results.image} alt=""/>
          
        </div>
      }
    </div>
  );
}

export default ItemForm;
