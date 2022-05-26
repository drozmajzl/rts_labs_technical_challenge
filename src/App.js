import './App.css';
import NavBar from './components/NavBar';
import Search from './components/Search';
import History from './components/History';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from 'react'

function App() {

  const [historyArr, setHistoryArr] = useState([]);
  const [search, setSearch] = useState("")
  const [currentSearch, setCurrentSearch]=useState("")
  const [fetchData, setFetchData] = useState(null) 
  const [pageNum, setPageNum] = useState(0)
  const [searchURL, setSearchURL] = useState("")
  const [filter, setFilter]=useState("none")
  let navigate = useNavigate()
  const home = 
    <div>
      <h3>Hacker News Search App</h3>
      <p>Navigate to search the Hacker News Algolia API!</p>
    </div>

  function query(e){
    e.preventDefault();
    setPageNum(0)
    if (search && filter === "none"){
        setSearchURL(`http://hn.algolia.com/api/v1/search?query=${search}&page=`)
        fetch(`http://hn.algolia.com/api/v1/search?query=${search}&page=0`)
        .then((res) => res.json())
        .then((data) => setFetchData(data))
        .then(cleanup(`http://hn.algolia.com/api/v1/search?query=${search}&page=`, search, filter))
    }
    else if (search && filter !== "none"){
        setSearchURL(`http://hn.algolia.com/api/v1/search?query=${search}${filter}&page=`)
        fetch(`http://hn.algolia.com/api/v1/search?query=${search}${filter}&page=0`)
        .then((res) => res.json())
        .then((data) => setFetchData(data))
        .then(cleanup(`http://hn.algolia.com/api/v1/search?query=${search}${filter}&page=`, search, filter))
    }
  }

  function accessHistory(keyword, url, searchFilter){
    navigate('/search')
    setSearchURL(`${url}`)
    setCurrentSearch(`${keyword}`)
    setFilter("none")
    setSearch(`${keyword}`)
    setPageNum(0)
        fetch(`${url}0`)
        .then((res) => res.json())
        .then((data) => setFetchData(data))
        cleanup(`${url}`, `${keyword}`, searchFilter)
  }

  function cleanup(historyURL, key, searchFilter){
      let yourDate = new Date()
      const historyObj = {keyword: key, url: historyURL, filter: searchFilter, date: (yourDate.toISOString().split('T')[0])}
      setHistoryArr([historyObj, ...historyArr])
      console.log(historyObj)
      setCurrentSearch(key)
      setSearch("")
      setFilter("none")
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={home} />
        <Route path="/search" element={<Search historyArr={historyArr} 
                                               setHistoryArr={setHistoryArr} 
                                               search={search} 
                                               setSearch={setSearch} 
                                               currentSearch={currentSearch} 
                                               setCurrentSearch={setCurrentSearch} 
                                               fetchData={fetchData} 
                                               setFetchData={setFetchData} 
                                               pageNum={pageNum} 
                                               setPageNum={setPageNum} 
                                               searchURL={searchURL} 
                                               setSearchURL={setSearchURL} 
                                               filter={filter} 
                                               setFilter={setFilter} 
                                               query={query}/>} />
        <Route path="/history" element={<History historyArr={historyArr} setHistoryArr={setHistoryArr} accessHistory={accessHistory}/>} />
      </Routes>
    </div>
  );
}

export default App;
