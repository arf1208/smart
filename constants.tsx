
import React from 'react';
import { Subject, SubjectCategory } from './types';

export const SUBJECTS: Subject[] = [
  // UMUM
  { id: 'bind', name: 'Bahasa Indonesia', category: SubjectCategory.UMUM },
  { id: 'mtk', name: 'Matematika', category: SubjectCategory.UMUM },
  { id: 'bing', name: 'Bahasa Inggris', category: SubjectCategory.UMUM },
  { id: 'pai', name: 'Pendidikan Agama Islam', category: SubjectCategory.UMUM },
  { id: 'ppkn', name: 'PPKn', category: SubjectCategory.UMUM },
  { id: 'ipa', name: 'IPA (Ilmu Pengetahuan Alam)', category: SubjectCategory.UMUM },
  { id: 'ips', name: 'IPS (Ilmu Pengetahuan Sosial)', category: SubjectCategory.UMUM },
  { id: 'pjok', name: 'PJOK', category: SubjectCategory.UMUM },
  { id: 'seni', name: 'Seni Budaya', category: SubjectCategory.UMUM },
  { id: 'info', name: 'Informatika', category: SubjectCategory.UMUM },
  { id: 'sej', name: 'Sejarah', category: SubjectCategory.UMUM },
  { id: 'fis', name: 'Fisika', category: SubjectCategory.UMUM },
  { id: 'kim', name: 'Kimia', category: SubjectCategory.UMUM },
  { id: 'bio', name: 'Biologi', category: SubjectCategory.UMUM },
  { id: 'geo', name: 'Geografi', category: SubjectCategory.UMUM },
  { id: 'eko', name: 'Ekonomi', category: SubjectCategory.UMUM },
  { id: 'sos', name: 'Sosiologi', category: SubjectCategory.UMUM },

  // KEJURUAN - TI
  { id: 'rpl', name: 'Rekayasa Perangkat Lunak (RPL)', category: SubjectCategory.KEJURUAN, subCategory: 'Teknologi Informasi' },
  { id: 'tkj', name: 'Teknik Komputer dan Jaringan (TKJ)', category: SubjectCategory.KEJURUAN, subCategory: 'Teknologi Informasi' },
  { id: 'dkv', name: 'Desain Komunikasi Visual (DKV)', category: SubjectCategory.KEJURUAN, subCategory: 'Teknologi Informasi' },
  { id: 'si', name: 'Sistem Informasi', category: SubjectCategory.KEJURUAN, subCategory: 'Teknologi Informasi' },

  // KEJURUAN - BISNIS
  { id: 'akt', name: 'Akuntansi', category: SubjectCategory.KEJURUAN, subCategory: 'Bisnis & Manajemen' },
  { id: 'pms', name: 'Pemasaran', category: SubjectCategory.KEJURUAN, subCategory: 'Bisnis & Manajemen' },
  { id: 'mplb', name: 'Manajemen Perkantoran (MPLB)', category: SubjectCategory.KEJURUAN, subCategory: 'Bisnis & Manajemen' },

  // KEJURUAN - TEKNIK
  { id: 'tm', name: 'Teknik Mesin', category: SubjectCategory.KEJURUAN, subCategory: 'Teknik' },
  { id: 'to', name: 'Teknik Otomotif', category: SubjectCategory.KEJURUAN, subCategory: 'Teknik' },
  { id: 'tl', name: 'Teknik Listrik', category: SubjectCategory.KEJURUAN, subCategory: 'Teknik' },
  { id: 'tp', name: 'Teknik Pengelasan', category: SubjectCategory.KEJURUAN, subCategory: 'Teknik' },
  { id: 'tkb', name: 'Teknik Konstruksi Bangunan', category: SubjectCategory.KEJURUAN, subCategory: 'Teknik' },

  // KEJURUAN - PARIWISATA
  { id: 'ph', name: 'Perhotelan', category: SubjectCategory.KEJURUAN, subCategory: 'Pariwisata' },
  { id: 'tb', name: 'Tata Boga', category: SubjectCategory.KEJURUAN, subCategory: 'Pariwisata' },
  { id: 'ts', name: 'Tata Busana', category: SubjectCategory.KEJURUAN, subCategory: 'Pariwisata' },
  { id: 'kc', name: 'Kecantikan', category: SubjectCategory.KEJURUAN, subCategory: 'Pariwisata' },

  // KEJURUAN - KESEHATAN
  { id: 'kep', name: 'Keperawatan', category: SubjectCategory.KEJURUAN, subCategory: 'Kesehatan' },
  { id: 'far', name: 'Farmasi', category: SubjectCategory.KEJURUAN, subCategory: 'Kesehatan' },

  // KEJURUAN - AGRIBISNIS
  { id: 'atp', name: 'Agribisnis Tanaman Pangan', category: SubjectCategory.KEJURUAN, subCategory: 'Pertanian' },
  { id: 'ap', name: 'Agribisnis Peternakan', category: SubjectCategory.KEJURUAN, subCategory: 'Peternakan' },

  // MUATAN LOKAL
  { id: 'mulo-jawa', name: 'Bahasa Jawa', category: SubjectCategory.MUATAN_LOKAL },
  { id: 'mulo-sunda', name: 'Bahasa Sunda', category: SubjectCategory.MUATAN_LOKAL },
];

export const APP_LOGO_URL = "https://image2url.com/r2/default/images/1771660712554-f01150ae-9d91-402b-883f-9f4b4150aa7b.jpeg";

export const Icons = {
  Dashboard: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Modul: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Soal: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  LKPD: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Library: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
  Download: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
};
