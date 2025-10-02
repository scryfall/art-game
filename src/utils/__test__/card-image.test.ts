import { CardBank } from "../../models/__test__/card-bank.util";
import { getCardImages } from "../card-image";

describe("getCardImages", () => {
  it("returns one image for a single-faced card", () => {
    const images = getCardImages(CardBank.Alesha);

    expect(images).toHaveLength(1);
  });

  it("returns two image for a multi-face card", () => {
    const images = getCardImages(CardBank.DraculaLordOfBlood);

    expect(images).toHaveLength(2);
  });
});
