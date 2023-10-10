import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [number, setNumber] = useState();
  const [result, setResult] = useState({
    ganjil: [],
    prima: [],
    segitiga: null,
  });

  const generateSegita = () => {
    let formBody = new FormData();
    formBody.append('number', number)
    axios.post('http://localhost:8000/segitiga', formBody).then(res => {
      setResult({...result, segitiga: JSON.stringify(res.data)});
    })
  }

  const generateGanjil = () => {
    let formBody = new FormData();
    formBody.append('number', number)
    axios.post('http://localhost:8000/ganjil', formBody).then(res => {
      setResult({...result, ganjil: res.data.result});
    })
  }

  const generateprima = () => {
    let formBody = new FormData();
    formBody.append('number', number)
    axios.post('http://localhost:8000/prima', formBody).then(res => {
      setResult({...result, prima: res.data.result});
    })
  }

  return (
    <div className="App">
      <form>
        <input value={number} type="number" onChange={(e) => setNumber(e.target.value)}></input>
      </form>
        <button onClick={() => generateSegita()}>Generate Segita</button>
        <button onClick={() => generateGanjil()}>Generate Ganjil</button>
        <button onClick={() => generateprima()}>Generate prima</button>

        <div dangerouslySetInnerHTML={{__html: result.segitiga}}></div>
        {
          result.prima.map((i) => (
            <span key={i}>{i}</span>
          ))
        }
        {
          result.ganjil.map((i) => (
            <span key={i}>{i}</span>
          ))
        }
    </div>
  );
}

export default App;
