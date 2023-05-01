import React, { useState } from 'react';

function ItemForm() {

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
    }
  }

  return (
    <div>
      <div>
        <form  onSubmit={saveItem}>
          <div>
            <h3>Add item</h3>
            <div>
              <label>Item Url</label>
              <input
                type="url"
                placeholder="Enter url"
                id='url'
                onInput={fetchData}
              />
            </div>
            {loading ? 
              <span className="loader"></span>
                          : null}
            {(results || error) && 
              <div>
                <h3>Results</h3>
                <div>{error ? error : null}</div>
                <div>{results.title}</div>
                <div>{results.price}</div>
                <img src={results.image} alt=""/>
                
              </div>
            }
            <div>
              <button type="submit">
              Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;
