import { render, screen } from "@testing-library/vue";
import GuessAutocompleteList from "../GuessAutocompleteList.vue";

describe("GuessAutoompleteList", () => {
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
});
