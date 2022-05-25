import './App.css';
import NavBar from './components/NavBar';
import Search from './components/Search';
import History from './components/History';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react'

function App() {

  const [historyArr, setHistoryArr] = useState([]);
  const [search, setSearch] = useState("")
  const [currentSearch, setCurrentSearch]=useState("")
  const [fetchData, setFetchData] = useState(null) 
  const home = <h3>Hacker News Search App</h3>

  return (
    <div className="App">
      <NavBar />
      <Routes>
      <Route path="/" element={home} />
        <Route path="/search" element={<Search historyArr={historyArr} setHistoryArr={setHistoryArr} search={search} setSearch={setSearch} currentSearch={currentSearch} setCurrentSearch={setCurrentSearch} fetchData={fetchData} setFetchData={setFetchData}/>} />
        <Route path="/history" element={<History historyArr={historyArr} setHistoryArr={setHistoryArr}/>} />
      </Routes>
    </div>
  );
}

export default App;
