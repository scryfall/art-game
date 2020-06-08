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

  describe('guessName', () => {
    it('can guess card names', () => {
      const name = 'Lightning Bolt';
      const card = new Card({ name });

      expect(card.guessName(name)).toBe(true);
    });

    it('is case insensitive', () => {
      const name = 'Lightning Bolt';
      const card = new Card({ name });

      expect(card.guessName(name.toLowerCase())).toBe(true);
      expect(card.guessName(name.toUpperCase())).toBe(true);
      expect(card.guessName('LiGhTnInG bOlT')).toBe(true);
    });

    it('can omit spaces', () => {
      const name = 'Lightning Bolt';
      const card = new Card({ name });

      expect(card.guessName('lightningbolt')).toBe(true);
    });

    it('can add spaces', () => {
      const name = 'Lightning Bolt';
      const card = new Card({ name });

      expect(card.guessName(' l i g h t n i n g b o l t ')).toBe(true);
    });

    it('can guess either or both halves of a split card', () => {
      const names = ['Alive', 'Well'];
      const fullname = names.join(' // ');
      const card = new Card({
        name: fullname,
        card_faces: [
          { name: names[0] },
          { name: names[1] },
        ]
      });

      expect(card.guessName(fullname)).toBe(true);
      expect(card.guessName(names[0])).toBe(true);
      expect(card.guessName(names[1])).toBe(true);
    });

    it('has levenshtein tolerance of 3', () => {
      const card = new Card({ name: 'Arcbond' });

      // levenshtein 1
      expect(card.guessName('Acbond')).toBe(true);
      expect(card.guessName('Artbond')).toBe(true);
      expect(card.guessName('rcbond')).toBe(true);
      expect(card.guessName('Arcbon')).toBe(true);
      expect(card.guessName('Arcbond1')).toBe(true);

      // levenshtein 2
      expect(card.guessName('Abond')).toBe(true);
      expect(card.guessName('Actbond')).toBe(true);
      expect(card.guessName('Arcbomb')).toBe(true);
      expect(card.guessName('cbond')).toBe(true);
      expect(card.guessName('Arcbo')).toBe(true);
      expect(card.guessName('Arcbond12')).toBe(true);

      // levenshtein 3
      expect(card.guessName('Aond')).toBe(true);
      expect(card.guessName('Actfond')).toBe(true);
      expect(card.guessName('Arctomb')).toBe(true);
      expect(card.guessName('bond')).toBe(true);
      expect(card.guessName('Arcb')).toBe(true);
      expect(card.guessName('Arcbond123')).toBe(true);

      // levenshtein ≥4
      expect(card.guessName('And')).toBe(false);
      expect(card.guessName('Octfond')).toBe(false);
      expect(card.guessName('Arftomb')).toBe(false);
      expect(card.guessName('ond')).toBe(false);
      expect(card.guessName('Arc')).toBe(false);
      expect(card.guessName('')).toBe(false);
      expect(card.guessName('Arcbond1234')).toBe(false);
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
});
