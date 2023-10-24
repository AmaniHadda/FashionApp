import axios from "axios";
export class ContactService {
  addContact(data) {
    return axios.post("/contact/add", data).then((res) => res.data);
  }
}
