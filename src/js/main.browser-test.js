browser.addCommand("guess", async (answer) => {
  await $(".guess").waitForEnabled();
  await $(".guess").click();
  await browser.keys([answer, "\uE007"]);
});

describe("Art Game", () => {
  it("allows user to choose format", async () => {
    await browser.url("/");

    expect(await $("#standard-format-button").isDisplayed()).toBe(true);
    expect(await $("#pioneer-format-button").isDisplayed()).toBe(true);
    expect(await $("#modern-format-button").isDisplayed()).toBe(true);
    expect(await $("#vintage-format-button").isDisplayed()).toBe(true);
  });

  it("allows user to choose a custom query", async () => {
    await browser.url("/");

    await $("#custom-query").isDisplayed();
    await $("#custom-query").click();
    await browser.keys(["Jolene, the Plunder Queen", "\uE007"]);

    await browser.waitUntil(
      async function () {
        return (
          (await $("[data-answer]").getAttribute("data-answer")) ===
          "Jolene, the Plunder Queen"
        );
      },
      {
        timeout: 5000,
        timeoutMsg: "expected text to be different after 5s",
      }
    );
  });

  it("can guess correctly", async () => {
    await browser.url("/");

    $("#modern-format-button").click();

    const answer = await $("[data-answer]").getAttribute("data-answer");

    await browser.guess(answer);

    await $(".outcome").waitForDisplayed();

    expect(await $(".outcome").getHTML()).toContain("Correct!");
  });

  it("can guess incorrectly", async () => {
    await browser.url("/");

    await $("#modern-format-button").click();

    await browser.guess("definitely not the right card");

    await $(".outcome").waitForDisplayed();

    expect(await $(".outcome").getHTML()).toContain("Incorrect.");
  });
});
