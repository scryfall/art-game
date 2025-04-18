export class HttpError extends Error {
  constructor(public readonly response: Response, public readonly body: unknown) {
    super("HTTP Request failed");
  }

  public get status() {
    return this.response.status;
  }
}

export class Http {
  public async fetch<T>(url: string | URL): Promise<T> {
    const response = await fetch(url.toString());
    const body = await response.json();
    if (response.ok) {
      return body;
    } else {
      throw new HttpError(response, body);
    }
  }
}
