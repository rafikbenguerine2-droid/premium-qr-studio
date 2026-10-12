export const ACADEMIC_YEARS = [
  '1ère année (Classe Préparatoire)',
  '2ème année (Classe Préparatoire)',
  '3ème année',
  '4ème année',
  '5ème année',
] as const;
export const SPECIALTIES = ['DIB', 'DMS'] as const;
export const needsSpecialty = (year: string) => ['3ème année', '4ème année', '5ème année'].includes(year);
