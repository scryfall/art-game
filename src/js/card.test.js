import { describe, expect, it, jest } from '@jest/globals';
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

    it('for multiface cards returns both names plus the A // B name', () => {
      const names = ['Rimrock Knight', 'Boulder Rush'];
      const fullname = names.join(' // ');
      const card = new Card({
        name: fullname,
        card_faces: [
          { name: names[0] },
          { name: names[1] },
        ]
      });

      const allNames = [fullname].concat(names);
      expect(card.getAllNames()).toEqual(allNames);
    });

    it('returns a flat array even when getNamesForFace returns many names', () => {
      const fullname = 'a, b, c // d';
      const names0 = ['a', 'b', 'c'];
      const names1 = ['d'];
      const card = new Card({
        name: fullname,
        card_faces: [
          { name: '', mock_names: names0 },
          { name: '', mock_names: names1 },
        ]
      });
      card.getNamesForFace = jest.fn(face => face.mock_names);

      const allNames = [fullname].concat(names0, names1);
      expect(card.getAllNames()).toEqual(allNames);
    });

    it('handles Garruk Relentless as expected', () => {
      const fullname = 'Garruk Relentless // Garruk, the Veil-Cursed';
      const name0 = 'Garruk Relentless';
      const name1 = 'Garruk, the Veil-Cursed';
      const card = new Card({
        name: fullname,
        card_faces: [
          { name: name0, type_line: 'Legendary Planeswalker — Garruk' },
          { name: name1, type_line: 'Legendary Planeswalker — Garruk' },
        ]
      });

      const expected = [fullname, name0, name1, 'Garruk', 'the Veil-Cursed'];
      expect(card.getAllNames()).toEqual(expected);
    });
  });

  describe('getNamesForFace', () => {
    let card = new Card();

    beforeEach(() => {
      card = new Card();
    });

    [
      'Monastery Swiftspear',
      'Tamanoa',
      'Acolyte of the Inferno', // 'the'
      'Duskmantle, House of Shadow', // comma
    ].forEach(name => {
      it(`returns one name for nonlegendary faces (${name})`, () => {
        const face = { name };
        expect(card.getNamesForFace(face)).toEqual([name]);
      });
    });

    [
      'Admiral Beckett Brass',
      'Academy Ruins',
      'Baron Von Count',
    ].forEach(name => {
      it(`returns one name for legendaries that have no shortname (${name})`, () => {
        const face = { name, type_line: 'Legendary' };
        expect(card.getNamesForFace(face)).toEqual([name]);
      });
    });

    [
      {
        name: 'Vraska, Golgari Queen', // comma
        variants: ['Vraska', 'Golgari Queen']
      },
      {
        name: 'Jace, Cunning Castaway',
        variants: ['Jace', 'Cunning Castaway']
      },
      {
        name: 'Saskia the Unyielding', // 'the'
        variants: ['Saskia', 'Unyielding']
      },
      {
        name: 'Adeliz, the Cinder Wind', // comma followed by 'the'
        variants: ['Adeliz', 'the Cinder Wind']
      },
      {
        name: 'Daxos, Blessed by the Sun', // comma with a 'the' distantly afterwards
        variants: ['Daxos', 'Blessed by the Sun']
      },
    ].forEach(scenario => {
      it(`returns full name, short name, and titles for legends with a shortname (${scenario.name})`, () => {
        const face = { name: scenario.name, type_line: 'Legendary' };

        const expected = [scenario.name].concat(scenario.variants);
        expect(card.getNamesForFace(face)).toEqual(expected);
      });
    });
  });

  describe('guess', () => {
    // guess full name of a split card, i.e. 'Alive // Well'
  });
});
