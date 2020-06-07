import { describe, expect, it } from '@jest/globals';
import { Card } from './card';

describe('Card', () => {
  it('has a name', () => {
    const name = 'Vraska, Golgari Queen';
    const card = new Card({ name });

    expect(card.name).toBe(name);
  });

  it('has an artCropUri', () => {
    const uri = 'https://img.scryfall.com/cards/art_crop/front/7/f/7f9a24dc-8bc3-4528-8780-57fb108fdfbf.jpg?1557576823';
    const card = new Card({ image_uris: { art_crop: uri } });

    expect(card.artCropUri).toBe(uri);
  });

  it('has a scryfallUri', () => {
    const uri = 'https://scryfall.com/card/war/146/tibalt-rakish-instigator';
    const card = new Card({ scryfall_uri: uri });

    expect(card.scryfallUri).toBe(uri);
  });

  describe('isMultiface', () => {
    it('is truthy when card_faces is defined', () => {
      const card = new Card({ card_faces: [1, 2] });

      expect(card.isMultiface).toBeTruthy();
    });

    it('is falsy when card_faces is not defined', () => {
      const card = new Card({ });

      expect(card.isMultiface).toBeFalsy();
    });
  });

  describe('getAllnames', () => {
    it('returns one name for ordinary cards', () => {
      const name = "Wight of Precinct Six";
      const card = new Card({ name });

      expect(card.getAllNames()).toEqual([name]);
    });

    it('returns two names for multiface cards', () => {
      const names = ['Rimrock Knight', 'Boulder Rush'];
      const card = new Card({
        card_faces: [
          { name: names[0] },
          { name: names[1] },
        ]
      });

      expect(card.getAllNames()).toEqual(names);
    });
  });
});
