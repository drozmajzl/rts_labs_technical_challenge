import { useState } from "react";

function Search ({ historyArr, setHistoryArr }){
    const [search, setSearch] = useState("")
    const [fetchData, setFetchData] = useState(null) 

    function query(e){
        e.preventDefault();
        // fetch(`http://hn.algolia.com/api/v1/search?query=${search}`)
        // .then((res) => res.json())
        // .then((data) => setFetchData(data))
        console.log(search)
        setHistoryArr([...historyArr, search])
        setSearch("")
    }

    return(
        <div>
            <h3>Search News</h3>
            <form onSubmit={(e)=>query(e)}>
                Search: <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type to Search..."></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default Search;