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

  async register(username: string, password: string) {
    return fetch(`${baseUri}auth/register`, {
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
}

export default new AuthService();
