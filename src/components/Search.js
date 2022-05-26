import { cleanup } from "@testing-library/react";
import { useState } from "react";

function Search ({ historyArr, setHistoryArr, search, setSearch, currentSearch, setCurrentSearch, fetchData, setFetchData, pageNum, setPageNum, searchURL, setSearchURL, filter, setFilter, query }){
    
    function nextPage (){
        fetch(`${searchURL}${pageNum + 1}`)
            .then((res) => res.json())
            .then((data) => setFetchData(data))
            setPageNum(pageNum + 1)
    }

    function prevPage (){
        fetch(`${searchURL}${pageNum - 1}`)
            .then((res) => res.json())
            .then((data) => setFetchData(data))
            setPageNum(pageNum - 1)
    }

    function firstPage (){
        fetch(`${searchURL}0`)
            .then((res) => res.json())
            .then((data) => setFetchData(data))
            setPageNum(0)
    }

    const hits = fetchData&&fetchData.hits.map((h, index)=>{
        var text = ""
        if (h._highlightResult.story_text){
            text = h._highlightResult.story_text.value.replace(/&quot;/g, '"')
        }
        
        return(
            <div key={index}>
            <a href={h.url}>{h.title}</a>
            <p>Author: {h.author}</p>
            {text&&text.replace(/<[^>]*>/g, '')}
            <hr></hr>
            </div>
        )
    })

    const dropdown = 
    <div>
        <label>Filter by:</label>
        <select onChange={(e)=>setFilter(e.target.value)}>
            <option value="none">None</option>
            <option value="&tags=story">Stories</option>
            <option value="&tags=comment">Comments</option>
            <option value="&restrictSearchableAttributes=url">URL</option>
        </select>
    </div>

    return(
        <div>
            <h3>Search News</h3>
            <form onSubmit={(e)=>query(e)}>
                Search: <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type to Search..."></input>
                <input type="submit" value="Submit"></input>
            </form>
            {dropdown}
            <br></br>
            {hits ? <h3>Search Results: "{currentSearch}"</h3> : null}
            {hits && searchURL.includes('&tags') ? <h4 style={{color: "red"}}>Filtered Results</h4> : null}
            {hits && searchURL.includes("&restrictSearchableAttributes=url") ? <h4 style={{color: "red"}}>Filtered Results</h4> : null}
            {hits ? <h4>Page: {pageNum + 1} </h4> : null }
            {pageNum > 0 ? <button onClick={()=>firstPage()}>First</button> : null}
            {pageNum > 0 ? <button onClick={()=>prevPage()}>Previous Page</button> : null}
            {currentSearch ? <button onClick={()=>nextPage()}>Next Page</button> : null}
            <hr></hr>
            {hits}
            {hits ? <h4>Page: {pageNum + 1} </h4> : null }
            {pageNum > 0 ? <button onClick={()=>firstPage()}>First</button> : null}
            {pageNum > 0 ? <button onClick={()=>prevPage()}>Previous Page</button> : null}
            {currentSearch ? <button onClick={()=>nextPage()}>Next Page</button> : null}
        </div>
    )
}

export default Search;