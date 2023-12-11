const baseURL: string = 'http://localhost:3000/api/v1/bidding';

export interface BiddingSettings {
    startDate: Date,
    delay: number
}


export async function startBiddingRequest(settings: BiddingSettings): Promise<boolean> {
    const res: Response = await fetch(`${baseURL}/start`, {
        method: 'POST',
        body: JSON.stringify(settings),
        headers: {'Content-Type': 'application/json;charset=utf-8'}

    });
    return res.ok;
}

export async function stopBiddingRequest(): Promise<boolean> {
    const res: Response = await fetch(`${baseURL}/stop`);
    return res.ok;
}
