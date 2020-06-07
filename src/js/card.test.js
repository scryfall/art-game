import { describe, expect, it } from '@jest/globals';
import { Card } from './card';

describe('Card', () => {
  it('has a name', () => {
    const name = 'Vraska, Golgari Queen';
    const card = new Card({ name });

    expect(card.name).toBe(name);
  });
});
