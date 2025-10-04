import { fireEvent, render, screen } from "@testing-library/vue";
import CardArt from "../CardArt.vue";
import { LoadingStatus } from "../../store";
import { CardBank } from "../../models/__test__/card-bank.util";

describe("CardArt", () => {
  it("shows an error overlay if loading prop is Failed", async () => {
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loading: LoadingStatus.Success,
      },
    });
    expect(
      screen.queryByText("There was an error loading the next card. You should skip this one.")
    ).not.toBeInTheDocument();

    await rerender({
      loading: LoadingStatus.Failed,
    });
    expect(
      screen.queryByText("There was an error loading the next card. You should skip this one.")
    ).toBeInTheDocument();
  });

  it("shows an error overlay if the card image fails to load", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loading: LoadingStatus.Success,
      },
    });
    expect(
      screen.queryByText("There was an error loading the next card. You should skip this one.")
    ).not.toBeInTheDocument();

    await fireEvent.error(screen.getByTestId("card-art-preload"));

    expect(
      screen.queryByText("There was an error loading the next card. You should skip this one.")
    ).toBeInTheDocument();
  });

  it("starts out with a loading overlay until image loads", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loading: LoadingStatus.Success,
      },
    });

    expect(screen.queryByText("Loading next card")).toBeInTheDocument();

    await fireEvent.load(screen.getByTestId("card-art-preload"));
    expect(screen.queryByText("Loading next card")).not.toBeInTheDocument();
  });

  it("shows a loading overlay if loading prop is Pending", async () => {
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loading: LoadingStatus.Success,
      },
    });
    await fireEvent.load(screen.getByTestId("card-art-preload"));

    expect(screen.queryByText("Loading next card")).not.toBeInTheDocument();

    await rerender({
      loading: LoadingStatus.Pending,
    });
    expect(screen.queryByText("Loading next card")).toBeInTheDocument();
  });

  it("shows a loading overlay when the card image uri changes", async () => {
    const { rerender } = render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loading: LoadingStatus.Success,
      },
    });
    await fireEvent.load(screen.getByTestId("card-art-preload"));

    expect(screen.queryByText("Loading next card")).not.toBeInTheDocument();

    await rerender({
      card: CardBank.Alesha,
    });
    expect(screen.getByText("Loading next card")).toBeInTheDocument();
  });

  it("prefers error overlay over loading overlay if both would apply", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loading: LoadingStatus.Pending,
      },
    });
    await fireEvent.error(screen.getByTestId("card-art-preload"));

    expect(screen.queryByText("Loading next card")).not.toBeInTheDocument();
    expect(
      screen.queryByText("There was an error loading the next card. You should skip this one.")
    ).toBeInTheDocument();
  });

  it("uses art crop for a card with a top level image uris object", async () => {
    render(CardArt, {
      props: {
        card: CardBank.ArborElf,
        loading: LoadingStatus.Success,
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
        loading: LoadingStatus.Success,
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
        loading: LoadingStatus.Success,
      },
    });

    expect(screen.queryByText("Hint: this print has a flavor name.")).not.toBeInTheDocument();

    await rerender({
      card: CardBank.Patrick,
    });
    expect(screen.queryByText("Hint: this print has a flavor name.")).toBeInTheDocument();
  });
});
