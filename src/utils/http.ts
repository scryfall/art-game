import axios from "axios";

export class Http {
  public async fetch<T>(url: string | URL) {
    const response = await axios.get<T>(url.toString());
    return response.data;
  }
}
