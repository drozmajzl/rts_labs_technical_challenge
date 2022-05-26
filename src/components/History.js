

function History ({ historyArr, setHistoryArr, accessHistory }){

    
    const searchHistory = historyArr.map((s, index)=><div key={index}><p style={{color: "blue", textDecoration: "underline"}} onClick={()=>accessHistory(s.keyword, s.url, s.filter)}>{s.filter !== "none" ? `${s.keyword} (Filtered Search)` : s.keyword}</p><p>{s.date}</p><hr></hr></div>)

    return(
        <div>
            <h3>History</h3>
            {searchHistory.length === 0 ? <p>No searches yet!</p> : null}
            <hr></hr>
            {searchHistory}
        </div>
    )
}

export default History;