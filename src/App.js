import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SpecialCrab from './components/specialCrabs/SpecialCrab';

import './App.css';

function App() {

  const [sellingCrabadas, setSellingCrabadas] = useState([])

  useEffect(() => {
    getSellingCrabadas()
  }, [])

  const getSellingCrabadas = async() => {
    const { data } = await axios.get('https://api.crabada.com/public/crabada/selling?from_pure=6&to_breed_count=0&page=1&limit=1000&from_breed_count=0&to_pure=6&class_ids[]=3&class_ids[]=6');
    setSellingCrabadas(data.result.data)
  }

  return (
    <div>
      <SpecialCrab crabadas={sellingCrabadas}/>
    </div>
  );
}

export default App;
