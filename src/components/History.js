
function History ({ historyArr, setHistoryArr }){

    const searchHistory = historyArr.map((s)=><div><p>{s}</p></div>)

    return(
        <div>
            <h3>History</h3>
            {searchHistory.length === 0 ? <p>No searches yet!</p> : null}
            {searchHistory}
        </div>
    )
}

export default History;