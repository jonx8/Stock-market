export default class StocksService {
    private static readonly baseUrl: string = "http://localhost:3000/api/v1/stocks";


    static async fetchStocksList() {
        const res: Response = await fetch(this.baseUrl);
        if (res.ok) {
            return await res.json();
        }
        return [];
    }

    static async fetchHistoryData(symbol: string) {
        const res: Response = await fetch(`${this.baseUrl}/${symbol}`);
        if (res.ok) {
            return await res.json();
        }
        return {dates: [], prices: []}
    }

}
