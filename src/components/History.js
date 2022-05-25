
function History ({ historyArr, setHistoryArr }){

    const searchHistory = historyArr.map((s, index)=><div key={index}><p>{s}</p><hr></hr></div>)

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