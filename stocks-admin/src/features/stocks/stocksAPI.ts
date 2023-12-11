export async function fetchStocksList() {
    const res = await fetch('http://localhost:3000/api/v1/stocks');
    if (res.ok) {
        return await res.json();
    } else {
        return [];
    }
}

export async function fetchHistoryData(symbol: string) {
    const res: Response = await fetch(`http://localhost:3000/api/v1/stocks/${symbol}`);
    if (res.ok) {
        return res.json();
    }
    return {dates: [], prices: []}
}
