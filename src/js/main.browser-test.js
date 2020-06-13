browser.addCommand("guess", (answer) => {
  $(".guess").waitForEnabled();
  $(".guess").keys(answer);
  browser.keys("\uE007");
});

describe("Art Game", () => {
  it("allows user to choose format", () => {
    browser.url("/");

    expect($("#standard-format-button").isDisplayed()).toBe(true);
    expect($("#pioneer-format-button").isDisplayed()).toBe(true);
    expect($("#modern-format-button").isDisplayed()).toBe(true);
    expect($("#vintage-format-button").isDisplayed()).toBe(true);
  });

  it("can guess correctly", () => {
    browser.url("/");

    $("#modern-format-button").click();

    const answer = $("[data-answer]").getAttribute("data-answer");

    browser.guess(answer);

    $(".outcome").waitForDisplayed();

    expect($(".outcome").getHTML()).toContain("Correct!");
  });

  it("can guess incorrectly", () => {
    browser.url("/");

    $("#modern-format-button").click();

    browser.guess("definitely not the right card");

    $(".outcome").waitForDisplayed();

    expect($(".outcome").getHTML()).toContain("Incorrect.");
  });
});
