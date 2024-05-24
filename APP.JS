// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [properties, setProperties] = useState([]);
  const [interestedProperties, setInterestedProperties] = useState([]);
  const [sellerDetails, setSellerDetails] = useState({});

  useEffect(() => {
    axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleInterested = (propertyId) => {
    axios.post(/api/interested/${propertyId})
      .then(response => {
        setInterestedProperties([...interestedProperties, propertyId]);
        setSellerDetails(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Rentify</h1>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            <h2>{property.name}</h2>
            <p>{property.description}</p>
            <button onClick={() => handleInterested(property.id)}>I'm Interested</button>
          </li>
        ))}
      </ul>
      {interestedProperties.length > 0 && (
        <div>
          <h2>Interested Properties</h2>
          <ul>
            {interestedProperties.map(propertyId => (
              <li key={propertyId}>
                <h2>{properties.find(property => property.id === propertyId).name}</h2>
                <p>{sellerDetails.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
