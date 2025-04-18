export class Http {
  public async fetch<T>(url: string | URL) {
    const response = await fetch(url.toString());
    if (response.ok) {
      return response.json() as T;
    } else {
      throw response.json();
    }
  }
}
