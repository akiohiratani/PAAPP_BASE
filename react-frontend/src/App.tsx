import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HorseSearchPage from './pages/HorseSearchPage';

function App() {
  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => console.log(response.data.message))
      .catch(error => console.error('API Error:', error));
  }, []);

  return (
    <HorseSearchPage></HorseSearchPage>
  );
}

export default App;
