import ActiveInterface from './active.interface';

export default interface BrokerInterface {
    id: number;
    username: string;
    balance: number;
    actives: ActiveInterface[];
}
