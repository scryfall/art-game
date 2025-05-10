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
});
