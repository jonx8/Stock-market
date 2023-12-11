import {BrokerInfo} from "./brokersSlice";

const baseURL: string = 'http://localhost:3000/api/v1/brokers';

export async function fetchBrokersList() {
    const res = await fetch(baseURL);
    if (res.ok) {
        return await res.json();
    }
    return [];
}


export async function createBrokerRequest(data: any): Promise<BrokerInfo> {
    const res = await fetch(baseURL, {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(data)
    });
    if (res.ok) {
        return await res.json();
    }
    throw new Error('Error while creating broker');

}


export async function updateBrokerRequest(id: number, data: any): Promise<BrokerInfo> {
    const res = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": 'application/json;charset=utf-8'},
        body: JSON.stringify(data)
    })
    if (res.ok) {
        return await res.json();
    }
    throw new Error('Error while updating broker');

}

export async function deleteBrokerRequest(id: number): Promise<Response> {
    return await fetch(`${baseURL}/${id}`, {method: 'DELETE'});
}




