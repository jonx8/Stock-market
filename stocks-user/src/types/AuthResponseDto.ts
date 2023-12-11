import Broker from "@/types/Broker";

export default interface AuthResponseDto {
    access_token: string;
    broker: Broker
}
