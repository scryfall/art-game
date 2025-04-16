export class Http {
  public async fetch<T>(url: string | URL) {
    const response = await fetch(url.toString());
    return response.json() as T;
  }
}
