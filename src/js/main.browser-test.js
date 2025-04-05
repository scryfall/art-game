browser.addCommand("guess", async (answer) => {
  await $(".guess").waitForEnabled();
  await $(".guess").click();
  await browser.keys([answer, "\uE007"]);
});

describe("Art Game", () => {
  it("allows user to choose format", async () => {
    browser.url("/");

    expect(await $("#standard-format-button").isDisplayed()).toBe(true);
    expect(await $("#pioneer-format-button").isDisplayed()).toBe(true);
    expect(await $("#modern-format-button").isDisplayed()).toBe(true);
    expect(await $("#vintage-format-button").isDisplayed()).toBe(true);
  });

  it("can guess correctly", async () => {
    browser.url("/");

    $("#modern-format-button").click();

    const answer = await $("[data-answer]").getAttribute("data-answer");

    await browser.guess(answer);

    await $(".outcome").waitForDisplayed();

    expect(await $(".outcome").getHTML()).toContain("Correct!");
  });

  it("can guess incorrectly", async () => {
    browser.url("/");

    await $("#modern-format-button").click();

    await browser.guess("definitely not the right card");

    await $(".outcome").waitForDisplayed();

    expect(await $(".outcome").getHTML()).toContain("Incorrect.");
  });
});
