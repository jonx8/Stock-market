import AuthResponseDto from "@/types/AuthResponseDto";

export default class AuthService {
    private static readonly baseUrl: string = "http://localhost:3000/api/v1/auth";

    static async loginRequest(username: string): Promise<AuthResponseDto> {
        const res: Response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {"Content-Type": 'application/json;charset=utf-8'},
            body: JSON.stringify({username: username})
        });
        if (res.ok) {
            return await res.json();
        }
        throw new Error(res.status.toString());
    }

}
