import './App.css';
import NavBar from './components/NavBar';
import Search from './components/Search';
import History from './components/History';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react'

function App() {

  const [historyArr, setHistoryArr] = useState([]);
  const home = <h3>Hacker News Search App</h3>

  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={home} />
        <Route path="/search" element={<Search historyArr={historyArr} setHistoryArr={setHistoryArr}/>} />
        <Route path="/history" element={<History historyArr={historyArr} setHistoryArr={setHistoryArr}/>} />
      </Routes>
    </div>
  );
}

export default App;
