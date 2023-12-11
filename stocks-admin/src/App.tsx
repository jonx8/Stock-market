import React from 'react';
import Navbar from "./features/navbar";
import BrokersList from "./features/brokers/brokers-list";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import StocksList from "./features/stocks/stocks-list";
import Bidding from "./features/bidding/bidding";
import HistoryData from "./features/stocks/history-data";


function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path={'/bidding'} element={<Bidding/>} />
                <Route path={'/brokers'} element={<BrokersList/>}/>
                <Route path={'/stocks/:symbol'} element={<HistoryData/>}/>
                <Route path={'/stocks'} element={<StocksList/>}/>
                <Route path={'/'} element={<BrokersList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
