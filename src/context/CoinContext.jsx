import { createContext, useState, useEffect } from "react";


export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoin = async () => {
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            );

            const data = await res.json();

            if (Array.isArray(data)) {
                setAllCoin(data);
            } else {
                console.error("API Error:", data);
                setAllCoin([]);
            }
        } catch (error) {
            console.error(error);
            setAllCoin([]);
        }
    };


    useEffect(() => {
        fetchAllCoin();
    }, [currency])

    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue} >
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;