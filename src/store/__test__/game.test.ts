import { createPinia, setActivePinia } from "pinia";
import { useGameStore } from "../game-pinia";
import { LoadingStatus } from "../common";
import { ScryfallApiInstance } from "../../utils/scryfall-api";
import { CardBank } from "../../models/__test__/card-bank.util";
import { Outcome } from "../../models/outcome";
import type { ScryfallCard } from "../../models/scryfall-card";
import { nextTick } from "vue";

vi.mock("../../utils/scryfall-api");

describe("Game Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("state", () => {
    it("sets defaults", () => {
      const game = useGameStore();

      expect(game.status).toEqual(LoadingStatus.Idle);

      expect(game.nextCardStatus).toEqual(LoadingStatus.Idle);
      expect(game.query).toEqual({ search: "" });
      expect(game.score).toEqual(0);
      expect(game.guess).toBeUndefined();
      expect(game.card).toBeUndefined();
      expect(game.previousCard).toBeUndefined();
    });
  });

  describe("fetchNextCard", () => {
    let finishApiCall: (card: ScryfallCard) => void;
    let rejectApiCall: (error: Error) => void;

    beforeEach(() => {
      vi.mocked(ScryfallApiInstance.getRandomCard).mockResolvedValue(CardBank.Alesha);
      vi.mocked(ScryfallApiInstance.getRandomArt).mockResolvedValue(CardBank.Jolene);
    });

    it("does not fetch the card if no query value", async () => {
      const game = useGameStore();

      const res = await game.fetchNextCard();

      expect(res).toBeUndefined();
      expect(ScryfallApiInstance.getRandomCard).not.toBeCalled();
      expect(ScryfallApiInstance.getRandomArt).not.toBeCalled();
    });

    it("fetches random card and random art from that card", async () => {
      const game = useGameStore();
      game.query = {
        search: "Search Query",
      };

      const res = await game.fetchNextCard();

      expect(res).toEqual(CardBank.Jolene);
      expect(ScryfallApiInstance.getRandomCard).toBeCalledTimes(1);
      expect(ScryfallApiInstance.getRandomCard).toBeCalledWith("Search Query", {
        includeExtras: undefined,
      });
      expect(ScryfallApiInstance.getRandomArt).toBeCalledTimes(1);
      expect(ScryfallApiInstance.getRandomArt).toBeCalledWith(
        CardBank.Alesha.oracle_id,
        "Search Query"
      );
    });

    it("uses previous oracle id if passed", async () => {
      const game = useGameStore();
      game.query = {
        search: "Search Query",
      };

      await game.fetchNextCard("abc-123");

      expect(ScryfallApiInstance.getRandomCard).toBeCalledTimes(1);
      expect(ScryfallApiInstance.getRandomCard).toBeCalledWith("Search Query -oracle_id:abc-123", {
        includeExtras: undefined,
      });
      expect(ScryfallApiInstance.getRandomArt).toBeCalledTimes(1);
      expect(ScryfallApiInstance.getRandomArt).toBeCalledWith(
        CardBank.Alesha.oracle_id,
        "Search Query -oracle_id:abc-123"
      );
    });

    it("passes along includeExtras value to getRandomCard", async () => {
      const game = useGameStore();
      game.query = {
        search: "Search Query",
        includeExtras: true,
      };

      await game.fetchNextCard("abc-123");

      expect(ScryfallApiInstance.getRandomCard).toBeCalledTimes(1);
      expect(ScryfallApiInstance.getRandomCard).toBeCalledWith("Search Query -oracle_id:abc-123", {
        includeExtras: true,
      });
      expect(ScryfallApiInstance.getRandomArt).toBeCalledTimes(1);
      expect(ScryfallApiInstance.getRandomArt).toBeCalledWith(
        CardBank.Alesha.oracle_id,
        "Search Query -oracle_id:abc-123"
      );
    });

    it("manages card state for successful queries", async () => {
      const game = useGameStore();

      vi.mocked(ScryfallApiInstance.getRandomArt).mockImplementation(() => {
        return new Promise((resolve) => {
          finishApiCall = resolve;
        });
      });
      game.query = { search: "query" };
      game.card = CardBank.ArborElf;

      const fetchPromise = game.fetchNextCard();
      await nextTick();

      expect(game.nextCardStatus).toEqual(LoadingStatus.Pending);
      expect(game.previousCard).toEqual(CardBank.ArborElf);
      expect(game.card).toEqual(CardBank.ArborElf);

      finishApiCall(CardBank.Jolene);
      await fetchPromise;

      expect(game.nextCardStatus).toEqual(LoadingStatus.Success);
      expect(game.previousCard).toEqual(CardBank.ArborElf);
      expect(game.card).toEqual(CardBank.Jolene);
    });

    it("manages card state for unsuccessful queries", async () => {
      const game = useGameStore();

      vi.mocked(ScryfallApiInstance.getRandomArt).mockImplementation(() => {
        return new Promise((_, reject) => {
          rejectApiCall = reject;
        });
      });
      game.query = { search: "query" };
      game.card = CardBank.ArborElf;

      const fetchPromise = game.fetchNextCard();
      await nextTick();

      const err = new Error("something went wrong");
      rejectApiCall(err);
      await expect(fetchPromise).rejects.toBe(err);

      expect(game.nextCardStatus).toEqual(LoadingStatus.Failed);
      expect(game.card).toEqual(CardBank.ArborElf); // unchanged
    });
  });

  describe("startGame", () => {
    let resolveApiUsage: (card: ScryfallCard) => void;
    let rejectApiUsage: (err: Error) => void;

    beforeEach(() => {
      vi.mocked(ScryfallApiInstance.getRandomCard).mockResolvedValue(CardBank.Alesha);
      vi.mocked(ScryfallApiInstance.getRandomArt).mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolveApiUsage = resolve;
          rejectApiUsage = reject;
        });
      });
    });

    it("sets up game", async () => {
      const query = { search: "query" };
      const game = useGameStore();
      game.query = { search: "old query" };
      game.status = LoadingStatus.Idle;
      game.score = 2;
      game.guess = { name: "card", outcome: Outcome.Correct };
      game.previousCard = CardBank.ArborElf;
      game.card = CardBank.BelunaGrandsquall;

      const gamePromise = game.startGame(query);
      await nextTick();

      expect(game.query).toEqual(query);
      expect(game.status).toEqual(LoadingStatus.Pending);
      expect(game.score).toEqual(0);
      expect(game.guess).toBeUndefined();
      expect(game.previousCard).toBeUndefined();
      expect(game.card).toBeUndefined();

      resolveApiUsage(CardBank.Alesha);
      await gamePromise;

      expect(game.status).toEqual(LoadingStatus.Success);
    });

    it("marks game status as Failed when card cannot be fetched", async () => {
      const game = useGameStore();
      const gamePromise = game.startGame({ search: "query" });
      await nextTick();

      rejectApiUsage(new Error("something went wrong"));
      await gamePromise;

      expect(game.status).toEqual(LoadingStatus.Failed);
    });

    it("fetches a new card", async () => {
      const game = useGameStore();
      const gamePromise = game.startGame({ search: "query" });
      await nextTick();
      resolveApiUsage(CardBank.Alesha);

      await gamePromise;

      expect(ScryfallApiInstance.getRandomCard).toBeCalledTimes(1);
      expect(ScryfallApiInstance.getRandomArt).toBeCalledTimes(1);
    });
  });

  describe("setGuess", () => {
    it("updates guess", () => {
      const game = useGameStore();
      const newGuess = {
        name: "foo",
        outcome: Outcome.Incorrect,
      };

      game.setGuess(newGuess);

      expect(game.guess).toEqual(newGuess);
    });

    it("updates score when outcome is correct", () => {
      const game = useGameStore();
      const newGuess = {};

      game.setGuess({
        name: "foo",
        outcome: Outcome.Incorrect,
      });
      expect(game.score).toEqual(0);

      game.setGuess({
        name: "foo",
        outcome: Outcome.Correct,
      });
      expect(game.score).toEqual(1);
    });
  });
});
