import { fireEvent, render, screen } from "@testing-library/vue";
import ThemeButton from "../ThemeButton.vue";
import { createTestingPinia } from "@pinia/testing";
import { useConfigStore } from "../../store/config";
import { Theme } from "../../models/theme";
import { nextTick } from "vue";

describe("ThemeButton", () => {
  const renderOptions = {
    global: {
      plugins: [createTestingPinia()],
    },
  };

  it("toggles theme when clicked", async () => {
    render(ThemeButton, renderOptions);
    const config = useConfigStore();

    await fireEvent.click(screen.getByRole("button"));

    expect(config.toggleTheme).toBeCalledTimes(1);
  });

  it("updates icon based on theme", async () => {
    render(ThemeButton, renderOptions);
    const config = useConfigStore();

    config.theme = Theme.Light;
    await nextTick();
    expect(screen.getByRole("button")).toHaveClass("light");
    expect(screen.getByRole("button")).not.toHaveClass("dark");

    config.theme = Theme.Dark;
    await nextTick();
    expect(screen.getByRole("button")).toHaveClass("dark");
    expect(screen.getByRole("button")).not.toHaveClass("light");
  });
});
