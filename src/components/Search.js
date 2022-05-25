import { useState } from "react";

function Search ({ historyArr, setHistoryArr, search, setSearch, currentSearch, setCurrentSearch, fetchData, setFetchData }){
    

    function query(e){
        e.preventDefault();
        if (search){
            fetch(`http://hn.algolia.com/api/v1/search?query=${search}`)
            .then((res) => res.json())
            .then((data) => setFetchData(data))
            setHistoryArr([...historyArr, search])
            setCurrentSearch(search)
            setSearch("")
        }
    }

    console.log(fetchData&&fetchData.hits)

    const hits = fetchData&&fetchData.hits.map((h)=>{
        var text = ""
        if (h._highlightResult.story_text){
            text = h._highlightResult.story_text.value.replace(/&quot;/g, '"')
        }
        
        return(
            <div key={h.title}>
            <a href={h.url}>{h.title}</a>
            <p>Author: {h.author}</p>
            {text&&text.replace(/<[^>]*>/g, '')}
            <hr></hr>
            </div>
        )
    })

    return(
        <div>
            <h3>Search News</h3>
            <form onSubmit={(e)=>query(e)}>
                Search: <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type to Search..."></input>
                <input type="submit" value="Submit"></input>
            </form>
            <br></br>
            {hits ? <h3>Search Results: "{currentSearch}"</h3> : null}
            <hr></hr>
            {hits}
        </div>
    )
}

export default Search;