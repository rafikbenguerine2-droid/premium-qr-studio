import { describe, it, expect } from 'vitest';
import { needsSpecialty } from '@/lib/academic';

describe('specialty rule', () => {
  it('is required for 3rd, 4th and 5th year', () => {
    expect(['3ème année', '4ème année', '5ème année'].every(needsSpecialty)).toBe(true);
  });
  it('is hidden for prep years', () => {
    expect(needsSpecialty('1ère année (Classe Préparatoire)')).toBe(false);
    expect(needsSpecialty('2ème année (Classe Préparatoire)')).toBe(false);
  });
});
