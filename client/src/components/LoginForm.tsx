import React, { useState } from 'react';

function ItemForm() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      username: {value: string},
      password: {value: string}
    };
    const body = {
      username: formElements.username.value,
      password: formElements.password.value
    }

    fetch(`http://localhost:8080/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(async (response) => {
        if(response.status === 200) {
          setLoggedIn(true);
        } else{
          throw new Error("Invalid credentials")
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div> 
      {!loggedIn ? (
        <form onSubmit={fetchData}>
            <div>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                id='username'
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                id='password'
              />
            </div>
            <div>
              <button type="submit" >
              Submit
              </button>
            </div>
            {error ? <div>{error}</div> : null}
        </form>
      ) : "You are logged in"}
    </div>
  );
}

export default ItemForm;
