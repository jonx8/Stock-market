import Active from "@/types/Active";

export default interface Broker {
    id: number;
    balance: number;
    username: string;
    actives: Array<Active>;
}
