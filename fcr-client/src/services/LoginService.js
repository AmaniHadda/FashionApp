
import axios from "axios";

export class LoginService {
  async register(data) {
    const res = await axios.post("/user/register", data);
    return res.data;
  }

  async login(data) {
    const res = await axios.post("/user/login", data);
    return res.data;
  }

  async loginGoogle(data) {
    const res = await axios.post("/user/google_login", data);
    return res.data.tokenId;
  }
  async loginFacebook(data) {
    const res = await axios.post("/user/facebook_login", data);
    return res.data;
  }
}
