import React, { useState } from "react";
import "./SearchBar.css"

function SearchBar() {
    const [id, setID] = useState("")
    const [isClick, setIsClick] = useState(false) 
    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("") 
    const [hashing_algorithm, setHashingAlgorithm] = useState("") 
    const [imgURL, setImgURL] = useState("") 
    const [price, setPrice] = useState("") 
    const [market_cap, setMarketCap] = useState("") 
    const [total_volume, setTotalVolume] = useState("") 
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
                    return 
                } 
                return data.json()
            })
            .then((data) => {
                console.log(data)
                setName(data.name)
                setSymbol(data.symbol) 
                setHashingAlgorithm(data.hashing_algorithm) 
                setImgURL(data.image.small)
                setPrice(data.market_data.current_price.inr)
                setMarketCap(data.market_data.market_cap.inr)
                setTotalVolume(data.market_data.total_volume.inr) 
                setIsClick(true)
        
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
            <div style={{display: isClick ? "flex" : "none"}} className="Card">
                <div className="Card-intro">
                    <div className="Card-intro-pic">   
                        <div>
                            <img src={imgURL} />
                        </div>
                        <div className="info">
                            <label>{name}</label>
                            <br />
                            <label>{symbol}</label>
                        </div>
                    </div>
                    <div>
                        <label>{hashing_algorithm}</label>
                    </div>
                </div>
                <div className="Card-price">
                    <div>
                        <label>Price</label>
                        <br />
                        <label>{price}</label>
                    </div>
                    <div>
                        <label>Market Cap</label>
                        <br /> 
                        <label>{market_cap}</label>
                    </div>
                    <div>
                        <label>Total Volume</label>
                        <br /> 
                        <label>{total_volume}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar ;