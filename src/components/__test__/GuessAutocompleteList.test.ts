import { render, screen } from "@testing-library/vue";
import GuessAutocompleteList from "../GuessAutocompleteList.vue";

describe("GuessAutoompleteList", () => {
  beforeEach(() => {
    // not available in JSDom
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("only displays if there are options", async () => {
    const { rerender } = render(GuessAutocompleteList, {
      props: {
        options: [],
        keyboardFocusIndex: -1,
      },
    });

    expect(screen.queryAllByRole("button")).toHaveLength(0);

    await rerender({
      options: ["one", "two", "three"],
    });
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent("one");
    expect(buttons[1]).toHaveTextContent("two");
    expect(buttons[2]).toHaveTextContent("three");
  });

  it("marks container as active when keyboardFocusIndex is 0 or greater", async () => {
    const { rerender } = render(GuessAutocompleteList, {
      props: {
        options: ["option"],
        keyboardFocusIndex: -1,
      },
    });

    expect(screen.getByTestId("options-wrapper")).not.toHaveClass("active");

    await rerender({
      keyboardFocusIndex: 0,
    });
    expect(screen.getByTestId("options-wrapper")).toHaveClass("active");

    await rerender({
      keyboardFocusIndex: 1,
    });
    expect(screen.getByTestId("options-wrapper")).toHaveClass("active");
  });

  it("marks particular option as active when the keyboardFocusIndex matches", async () => {
    const { rerender } = render(GuessAutocompleteList, {
      props: {
        options: ["one", "two", "three"],
        keyboardFocusIndex: -1,
      },
    });

    const options = screen.getAllByRole("button");
    expect(options[0]).not.toHaveClass("active");
    expect(options[1]).not.toHaveClass("active");
    expect(options[2]).not.toHaveClass("active");

    await rerender({
      keyboardFocusIndex: 0,
    });
    expect(options[0]).toHaveClass("active");
    expect(options[1]).not.toHaveClass("active");
    expect(options[2]).not.toHaveClass("active");

    await rerender({
      keyboardFocusIndex: 1,
    });
    expect(options[0]).not.toHaveClass("active");
    expect(options[1]).toHaveClass("active");
    expect(options[2]).not.toHaveClass("active");

    await rerender({
      keyboardFocusIndex: 2,
    });
    expect(options[0]).not.toHaveClass("active");
    expect(options[1]).not.toHaveClass("active");
    expect(options[2]).toHaveClass("active");
  });
});
