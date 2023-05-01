import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

  type Item = {
    title: string;
    price: string;
    image: string;
  };
  

  const [items, setItems] = useState<Item[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/items`)
        .then(async (response) => {
          const body = await response.json();
          setItems(body)
        })
        .catch(error => {});
    
  }, [])

  return (
    <div> 
      My Items
      {items.map((item) => {       
           return (
            <div>
              <div>{item.title}</div>
              <div>{item.price}</div>
              {item.image && <img src ={item.image} alt="img"/>}
            </div>
        ) 
        })}
    </div>
  );
}

export default LoginForm;
