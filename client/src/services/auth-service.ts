import { baseUri } from "../const/config";

class AuthService {
  async login(username: string, password: string) {
    return fetch(`${baseUri}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  }

  async register(username: string, password: string, employeeId: number) {
    return fetch(`${baseUri}auth/registration`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        employeeId,
      }),
    });
  }
}

export default new AuthService();
