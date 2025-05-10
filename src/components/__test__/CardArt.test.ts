import { fireEvent, render, screen } from "@testing-library/vue";
import CardArt from "../CardArt.vue";
import { LoadingStatus } from "../../store";
import { CardBank } from "../../models/__test__/card-bank.util";

describe("CardArt", () => {
  it("shows an error overlay if loadingNext prop is Failed", async () => {
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Success,
      },
    });
    expect(screen.queryByText("There was an error loading the card art.")).not.toBeInTheDocument();

    await rerender({
      loadingNext: LoadingStatus.Failed,
    });
    expect(screen.queryByText("There was an error loading the card art.")).toBeInTheDocument();
  });

  it("shows an error overlay if the card image fails to load", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Success,
      },
    });
    expect(screen.queryByText("There was an error loading the card art.")).not.toBeInTheDocument();

    await fireEvent.error(screen.getByTestId("card-art-preload"));

    expect(screen.queryByText("There was an error loading the card art.")).toBeInTheDocument();
  });

  it("starts out with a loading overlay until image loads", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Success,
      },
    });

    expect(screen.queryByText("Loading next card art...")).toBeInTheDocument();

    await fireEvent.load(screen.getByTestId("card-art-preload"));
    expect(screen.queryByText("Loading next card art...")).not.toBeInTheDocument();
  });

  it("shows a loading overlay if loadingNext prop is Pending", async () => {
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Success,
      },
    });
    await fireEvent.load(screen.getByTestId("card-art-preload"));

    expect(screen.queryByText("Loading next card art...")).not.toBeInTheDocument();

    await rerender({
      loadingNext: LoadingStatus.Pending,
    });
    expect(screen.queryByText("Loading next card art...")).toBeInTheDocument();
  });

  it("shows a loading overlay when the card image uri changes", async () => {
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Success,
      },
    });
    await fireEvent.load(screen.getByTestId("card-art-preload"));

    expect(screen.queryByText("Loading next card art...")).not.toBeInTheDocument();

    await rerender({
      card: CardBank.Alesha,
    });
    expect(screen.getByText("Loading next card art...")).toBeInTheDocument();
  });

  it("prefers error overlay over loading overlay if both would apply", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Pending,
      },
    });
    await fireEvent.error(screen.getByTestId("card-art-preload"));

    expect(screen.queryByText("Loading next card art...")).not.toBeInTheDocument();
    expect(screen.queryByText("There was an error loading the card art.")).toBeInTheDocument();
  });

  it("uses art crop for a card with a top level image uris object", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Success,
      },
    });

    // just a double check that this card does have an art crop
    expect(CardBank.ArborElf.image_uris?.art_crop).toBeTruthy();
    expect(screen.getByTestId("card-art-preload")).toHaveAttribute(
      "src",
      CardBank.ArborElf.image_uris?.art_crop
    );
  });

  it("uses a random face from a double sided card", async () => {
    const mathSpy = vi.spyOn(Math, "random").mockReturnValue(0.3);
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.HeartOfTheExplorer,
        loadingNext: LoadingStatus.Success,
      },
    });

    // just a double check that this card does have an art crop
    const expectedFirstFaceArtCrop = CardBank.HeartOfTheExplorer.card_faces[0].image_uris?.art_crop;
    expect(expectedFirstFaceArtCrop).toBeTruthy();
    expect(screen.getByTestId("card-art-preload")).toHaveAttribute("src", expectedFirstFaceArtCrop);

    mathSpy.mockReturnValue(0.7);
    await rerender({
      card: CardBank.DraculaLordOfBlood,
    });

    // just a double check that this card does have an art crop
    const expectedSecondFaceArtCrop =
      CardBank.HeartOfTheExplorer.card_faces[1].image_uris?.art_crop;
    expect(expectedSecondFaceArtCrop).toBeTruthy();
    expect(screen.getByTestId("card-art-preload")).toHaveAttribute(
      "src",
      expectedSecondFaceArtCrop
    );
  });

  it("provides a flavor mask for cards that have a flavor name", async () => {
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loadingNext: LoadingStatus.Success,
      },
    });

    expect(screen.queryByText("Hint: this print has a flavor name.")).not.toBeInTheDocument();

    await rerender({
      card: CardBank.Eleven,
    });
    expect(screen.queryByText("Hint: this print has a flavor name.")).toBeInTheDocument();
  });
});
