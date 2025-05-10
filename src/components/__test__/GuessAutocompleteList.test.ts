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
    expect(screen.queryAllByRole("button")).toHaveLength(3);
  });

  it("marks as active when keyboardFocusIndex is 0 or greater", async () => {
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
});
