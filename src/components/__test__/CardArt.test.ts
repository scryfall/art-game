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
});
