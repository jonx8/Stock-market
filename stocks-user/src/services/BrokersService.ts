import Broker from "@/types/Broker";


export default class BrokersService {
    private static readonly baseUrl: string = "http://localhost:3000/api/v1/brokers";

    static async fetchBrokerData(id: number | string): Promise<Broker> {
        const res: Response = await fetch(`${this.baseUrl}/${id}`, {
            headers: {"Authorization": `Bearer ${localStorage.getItem('access_token')}`}
        });
        if (res.ok) {
            return await res.json();
        }
        throw Error(res.status.toString());
    }


    static async fetchBrokers(): Promise<Broker[]> {
        const res: Response = await fetch(`${this.baseUrl}`);
        if (res.ok) {
            return await res.json();
        }
        throw Error(res.status.toString());
    }

}
