import { wait } from "./timer";

const RATE_LIMIT_MS = 50;

export class Http {
  private rateLimitPromise = Promise.resolve();

  public async fetch<T>(url: string | URL) {
    /**
     * If a previous request has just happened, wait for it to finish and an additional 50ms
     * before starting the next request
     *
     * @see {@link https://scryfall.com/docs/api#rate-limits-and-good-citizenship Rate limits and good citizenship}
     */
    await this.rateLimitPromise;

    const response = fetch(url.toString()).then((res) => res.json() as T);
    this.rateLimitPromise = response.then(() => wait(RATE_LIMIT_MS));
    return response;
  }
}
