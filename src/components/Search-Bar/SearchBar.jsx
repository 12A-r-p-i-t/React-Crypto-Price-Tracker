import React, { useState } from "react";
import "./SearchBar.css"

function SearchBar() {
    const [id, setID] = useState("")

    function handleChange(e) {
        setID(e.target.value)
        console.log(id)
    }
    function handleClick() {
        var fetchURL = "https://api.coingecko.com/api/v3/coins/" 
        fetchURL += id
        var fetchPromise = fetch(fetchURL) 
        fetchPromise
            .then((data) => {
                console.log(data)
                if(data.status !== 200) {
                    console.log("Error in fetching data")
                } 
                return data.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error(error)
            }) 
    }
    return (
        <div className="Search">   
            <div>
                <h1>Crypto Price Tracker</h1>
            </div>
            <div className="search-bar">
                <input onChange={handleChange} type="text" placeholder="Enter the name of the cryptocoin" value={id} /> 
                <button onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
}

export default SearchBar ;