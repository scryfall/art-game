import { fireEvent, render, screen } from "@testing-library/vue";
import ThemeButton from "../ThemeButton.vue";
import { toggleTheme, useAppDispatch, useAppSelector } from "../../store";
import { nextTick, ref, type Ref } from "vue";
import type { Mock } from "vitest";

vi.mock("../../store");

describe("ThemeButton", () => {
  let dispatch: Mock;
  let theme: Ref<"light" | "dark">;

  beforeEach(() => {
    theme = ref("light");
    dispatch = vi.fn();
    vi.mocked(useAppSelector).mockReturnValue(theme);
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
  });

  it("dispatches event to toggle theme", async () => {
    render(ThemeButton);

    await fireEvent.click(screen.getByRole("button"));

    expect(dispatch).toBeCalledTimes(1);
    expect(toggleTheme).toBeCalledTimes(1);
    expect(toggleTheme).toBeCalledWith("light");

    theme.value = "dark";
    await fireEvent.click(screen.getByRole("button"));
    expect(toggleTheme).toBeCalledWith("dark");
  });

  it("updates icon based on theme", async () => {
    render(ThemeButton);

    expect(screen.getByRole("button")).toHaveClass("light");
    expect(screen.getByRole("button")).not.toHaveClass("dark");

    theme.value = "dark";
    await nextTick();

    expect(screen.getByRole("button")).toHaveClass("dark");
    expect(screen.getByRole("button")).not.toHaveClass("light");
  });
});
