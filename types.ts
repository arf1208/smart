
export enum EducationLevel {
  SD = 'SD/MI',
  SMP = 'SMP/MTs',
  SMA = 'SMA/SMK/MA'
}

export enum Fase {
  A = 'Fase A (Kelas 1-2)',
  B = 'Fase B (Kelas 3-4)',
  C = 'Fase C (Kelas 5-6)',
  D = 'Fase D (Kelas 7-9)',
  E = 'Fase E (Kelas 10)',
  F = 'Fase F (Kelas 11-12)'
}

export interface TeacherProfile {
  name: string;
  school: string;
  role: 'Guru' | 'Admin';
}

export interface GeneratedContent {
  id: string;
  type: 'modul' | 'soal' | 'lkpd' | 'rpp';
  title: string;
  content: string;
  timestamp: number;
}
