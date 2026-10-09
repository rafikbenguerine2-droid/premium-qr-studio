import { describe, expect, it } from 'vitest';
import { findGuide, mapsUrl, mapsEmbedUrl } from '@/lib/guide-data';
describe('Independent QR destinations', () => {
  for (const slug of ['campus','salles','services','manger','sport','vie-etudiante','alger','aide']) {
    it(`resolves the requested ${slug} QR category`, () => {
      expect(findGuide(slug)?.slug).toBe(slug);
    });
  }
  it('uses a Google Maps search without asserting an unverified venue', () => {
    expect(mapsUrl('ENSTP Kouba')).toBe('https://www.google.com/maps/search/?api=1&query=ENSTP%20Kouba');
  });
  it('builds an embeddable map for in-page display', () => {
    expect(mapsEmbedUrl('Casbah Alger')).toBe('https://maps.google.com/maps?q=Casbah%20Alger&output=embed');
  });
});