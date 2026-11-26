import React, { useState } from 'react';
import {
  CHAPTER_DATA,
  COURSE_INTEGRATION,
  INITIAL_GROUP_MEMBERS,
  REFERENCES_LIST,
  GroupMember,
} from './data/capstoneData';
import { ChapterView, PharmacologyGroupedList, SubTabKey } from './components/ChapterView';
import { WhoVerificationFlow } from './components/InteractiveDiagrams';
import { QuizView } from './components/QuizView';

type ViewKey =
  | 'main-menu'
  | 'user-guide'
  | 'module-info'
  | 'references'
  | 'basics'
  | 'chapter-4'
  | 'chapter-5'
  | 'pharmacology'
  | 'quiz';

const VIEW_TITLES: Record<ViewKey, string> = {
  'main-menu': 'Main menu',
  'user-guide': 'User Guide — Petunjuk Penggunaan',
  'module-info': 'Module — Ruang Lingkup & Integrasi',
  references: 'INFO — Referensi & Versi Klasifikasi',
  basics: 'BASICS — Kaidah Dasar Kodifikasi',
  'chapter-4': 'Chapter IV — Endocrine, Nutritional & Metabolic (E00–E90)',
  'chapter-5': 'Chapter V — Mental & Behavioural Disorders (F00–F99)',
  pharmacology: 'PHARMA — Farmakologi Edukatif (Bab IV & Bab V)',
  quiz: 'Latihan Kasus — Isian Kode ICD-10 & ICD-9-CM',
};

const SUBTAB_BREADCRUMBS: Record<SubTabKey, string> = {
  pengantar: '> Overview of the chapter',
  coding: '> Coding Review',
  science: '> Medical Science',
  pharma: '> Pharmacology',
  exercises: '> Exercises',
  menu: '> Menu Modul',
};

const VIEW_BREADCRUMBS: Record<ViewKey, string> = {
  'main-menu': '> Main Menu & Identitas Kelompok',
  'user-guide': '> Petunjuk Penggunaan',
  'module-info': '> Ruang Lingkup Capstone',
  references: '> Referensi & Versi Klasifikasi',
  basics: '> Alur Verifikasi WHO',
  'chapter-4': '> Overview of the chapter',
  'chapter-5': '> Overview of the chapter',
  pharmacology: '> Pharmacology (Non-Resep)',
  quiz: '> Exercises',
};

const BASICS_EXAMPLES = [
  {
    id: 'dm',
    label: 'Diagnosis Bab IV (Dagger/Asterisk)',
    statement: 'Diabetes Melitus Tipe 1 dengan Retinopati Diabetik',
    steps: [
      {
        step: '1. Identifikasi Lead Term',
        detail: 'Kata kunci utama: "Diabetes" dengan modifier "type 1" dan "with retinopathy".',
      },
      {
        step: '2. Indeks Alfabetis (Vol. 3)',
        detail: 'Telusuri Diabetes → type 1 → with → retinopathy → kandidat kode: E10.3† H36.0*.',
      },
      {
        step: '3. Daftar Tabular (Vol. 1)',
        detail: 'Verifikasi E10.3 (Insulin-dependent DM with ophthalmic complications) dan catatan H36.0* di Bab VII.',
      },
      {
        step: '4. Kode Akurat & Valid',
        detail: 'E10.3† H36.0* (kode etiologi † di depan, kode manifestasi * sebagai tambahan wajib).',
      },
    ],
  },
  {
    id: 'postpartum',
    label: 'Diagnosis Bab V (Nifas)',
    statement: 'Depresi Pasca Melahirkan (Postpartum Depression) tanpa psikosis berat',
    steps: [
      {
        step: '1. Identifikasi Lead Term',
        detail: 'Kata kunci utama: "Depression" dengan modifier "postpartum / puerperal".',
      },
      {
        step: '2. Indeks Alfabetis (Vol. 3)',
        detail: 'Telusuri Depression → postpartum / puerperal → kandidat kode: F53.0.',
      },
      {
        step: '3. Daftar Tabular (Vol. 1)',
        detail: 'Verifikasi F53.0 (Mild mental & behavioural disorders associated with the puerperium, NEC) serta batas 6 minggu nifas.',
      },
      {
        step: '4. Kode Akurat & Valid',
        detail: 'F53.0 (pastikan bukan psikosis nifas berat F53.1 atau gejala tunggal R-code).',
      },
    ],
  },
  {
    id: 'icd9',
    label: 'Prosedur ICD-9-CM Vol. 3',
    statement: 'Pemasangan Selang Nasogastrik (NGT) pada pasien Marasmus-Kwashiorkor',
    steps: [
      {
        step: '1. Identifikasi Lead Term',
        detail: 'Kata kunci tindakan utama: "Insertion" dengan modifier "tube → nasogastric".',
      },
      {
        step: '2. Indeks Alfabetis Prosedur',
        detail: 'Telusuri Insertion → tube → nasogastric (feeding/decompression) → kandidat: 96.07.',
      },
      {
        step: '3. Daftar Tabular ICD-9-CM Vol. 3',
        detail: 'Verifikasi kategori 96.0 → 96.07: Insertion of other (naso-)gastric tube (hanya angka numerik).',
      },
      {
        step: '4. Kode Akurat & Valid',
        detail: '96.07 (kode tindakan ini melengkapi diagnosis E42, bukan menggantikannya).',
      },
    ],
  },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeView, setActiveView] = useState<ViewKey>('main-menu');
  const [chapterInitialTab, setChapterInitialTab] = useState<SubTabKey>('pengantar');
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>('pengantar');
  const [exerciseBreadcrumb, setExerciseBreadcrumb] = useState<string>('> Exercises');
  const [pharmaFilter, setPharmaFilter] = useState<'all' | 'ch4' | 'ch5'>('all');
  const [quizFilter, setQuizFilter] = useState<'all' | 'bab4' | 'bab5'>('all');
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>(() => {
    try {
      const saved = window.localStorage.getItem('ueu_rmik_team_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage error
    }
    return INITIAL_GROUP_MEMBERS;
  });
  const [editingGroup, setEditingGroup] = useState(false);
  const [kakChecklist, setKakChecklist] = useState<boolean[]>(Array(8).fill(true));

  // Interactive simulator state in BASICS
  const [basicsExIdx, setBasicsExIdx] = useState(0);
  const [basicsStepIdx, setBasicsStepIdx] = useState(0);

  const currentExample = BASICS_EXAMPLES[basicsExIdx];

  const navigate = (view: ViewKey, initialSubTab: SubTabKey = 'pengantar') => {
    setChapterInitialTab(initialSubTab);
    setActiveSubTab(initialSubTab);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuizForChapter = (chapterFilter: 'bab4' | 'bab5') => {
    setQuizFilter(chapterFilter);
    navigate('quiz');
  };

  const handleMemberChange = (index: number, field: keyof GroupMember, value: string) => {
    setGroupMembers((prev) => {
      const next = prev.map((m, i) => (i === index ? { ...m, [field]: value } : m));
      try {
        window.localStorage.setItem('ueu_rmik_team_v1', JSON.stringify(next));
      } catch {
        // ignore storage error
      }
      return next;
    });
  };

  // =========================================================================
  // 1. LAYAR PEMBUKA (SPLASH SCREEN)
  // =========================================================================
  if (showSplash) {
    return (
      <section
        className="relative min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#062843] via-[#026AA7] to-[#00A8C6] overflow-hidden"
        aria-label="Layar Pembuka"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />

        <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white/96 p-7 sm:p-10 text-center shadow-2xl border border-white/80 space-y-6">
          <p className="text-xs font-bold tracking-wider uppercase text-[#026AA7]">
            Capstone Experience Semester 3 · Prodi D3 RMIK · Universitas Esa Unggul
          </p>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#06253B] text-balance leading-tight">
              Aplikasi Media Pembelajaran Kodifikasi{' '}
              <span className="text-[#026AA7]">ICD-10 &amp; ICD-9-CM</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Modul interaktif kodifikasi klinis berbasis alur standar WHO untuk{' '}
              <strong>Bab IV (E00–E90: Endokrin, Nutrisi &amp; Metabolik)</strong> dan{' '}
              <strong>Bab V (F00–F99: Gangguan Mental &amp; Perilaku)</strong>, dilengkapi penelusuran
              tindakan ICD-9-CM, ilmu biomedis, farmakologi edukatif, dan evaluasi kasus.
            </p>
          </div>

          {/* Showcase Kode Relevan Bab IV & V (Mudah diganti sesuai studi kasus kelompok) */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[#0A3656]"
            aria-label="Contoh Kode Modul Bab IV dan V"
          >
            {[
              'ICD-10 E10.3† H36.0*',
              'ICD-10 E42',
              'ICD-10 F20.0',
              'ICD-10 F40.2',
              'ICD-10 F53.0',
              'ICD-9-CM 96.07',
              'ICD-9-CM 94.39',
              'ICD-9-CM 95.16',
            ].map((item, idx) => (
              <span
                key={item}
                className={`rounded-md border px-2.5 py-1 font-semibold ${
                  idx >= 5
                    ? 'bg-teal-50 border-teal-200 text-teal-900'
                    : 'bg-sky-50 border-sky-200 text-[#0A3656]'
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setShowSplash(false);
                setActiveView('main-menu');
              }}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0077B6] to-[#00A8CC] px-11 py-3.5 text-base font-extrabold tracking-widest text-white shadow-lg hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span aria-hidden="true">▶</span>
              <span>PLAY</span>
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Media pembelajaran akademik non-klinis · Acuan: WHO ICD-10 (2010) &amp; ICD-9-CM Vol. 3
          </p>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 2. HALAMAN MAIN MENU & KERANGKA UTAMA APLIKASI
  // =========================================================================

  const currentBreadcrumb =
    activeView === 'quiz'
      ? exerciseBreadcrumb
      : activeView === 'chapter-4' || activeView === 'chapter-5'
      ? activeSubTab === 'exercises'
        ? exerciseBreadcrumb
        : SUBTAB_BREADCRUMBS[activeSubTab]
      : VIEW_BREADCRUMBS[activeView];

  // =========================================================================
  // 2. HALAMAN MAIN MENU (TAMPILAN KHUSUS GAYA MODUL WHO SETELAH PLAY)
  // =========================================================================
  if (activeView === 'main-menu') {
    const whoTopRows: {
      badge?: string;
      leftLabel: string;
      title: string;
      variant: 'blue' | 'teal';
      onClick: () => void;
    }[] = [
      {
        leftLabel: 'WHO–FIC',
        title: 'Pengenalan Klasifikasi ICD-10 (2010), ICD-9-CM Vol. 3 & Daftar Pustaka',
        variant: 'blue',
        onClick: () => navigate('references'),
      },
      {
        leftLabel: 'Basics',
        title: 'Struktur Klasifikasi, Kaidah Dagger (†) / Asterisk (*) & Cara Kodifikasi',
        variant: 'blue',
        onClick: () => navigate('basics'),
      },
      {
        badge: '4',
        leftLabel: 'Chapter IV',
        title: 'Endocrine, nutritional and metabolic diseases (E00–E90)',
        variant: 'teal',
        onClick: () => navigate('chapter-4', 'pengantar'),
      },
      {
        badge: '5',
        leftLabel: 'Chapter V',
        title: 'Mental and behavioural disorders (F00–F99)',
        variant: 'teal',
        onClick: () => navigate('chapter-5', 'pengantar'),
      },
      {
        badge: 'P',
        leftLabel: 'Pharmacology',
        title: 'Farmakologi Edukatif Terpadu — Bab IV & Bab V (Non-Resep)',
        variant: 'teal',
        onClick: () => navigate('pharmacology'),
      },
      {
        badge: 'Q',
        leftLabel: 'Exercises',
        title: 'Latihan Soal Kasus Isian (10 ICD-10 & 10 ICD-9-CM per Bab · Kolom + ✓)',
        variant: 'teal',
        onClick: () => navigate('quiz'),
      },
    ];

    const whoBottomGrid: { label: string; onClick: () => void }[] = [
      {
        label: 'Coding Review Bab IV (10 Kasus + ICD-9-CM)',
        onClick: () => navigate('chapter-4', 'coding'),
      },
      {
        label: 'Coding Review Bab V (10 Kasus + ICD-9-CM)',
        onClick: () => navigate('chapter-5', 'coding'),
      },
      {
        label: 'Medical Science & Anatomi Bab IV',
        onClick: () => navigate('chapter-4', 'science'),
      },
      {
        label: 'Medical Science & Anatomi Otak Bab V',
        onClick: () => navigate('chapter-5', 'science'),
      },
      {
        label: 'Latihan Kasus Bab IV (E00–E90 · 20 Soal)',
        onClick: () => openQuizForChapter('bab4'),
      },
      {
        label: 'Latihan Kasus Bab V (F00–F99 · 20 Soal)',
        onClick: () => openQuizForChapter('bab5'),
      },
    ];

    return (
      <div
        className="min-h-screen flex flex-col bg-[#E8F2FA] relative overflow-x-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at 84% 48%, rgba(14, 124, 123, 0.14) 0%, rgba(11, 93, 178, 0.08) 38%, rgba(232, 242, 250, 0.96) 75%), linear-gradient(rgba(11, 93, 178, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 93, 178, 0.04) 1px, transparent 1px)',
          backgroundSize: 'auto, 36px 36px, 36px 36px',
        }}
      >
        {/* Top Royal Blue Bar (Gaya Header Main Menu WHO) */}
        <header className="w-full bg-gradient-to-r from-[#0F5BB0] via-[#1569C2] to-[#1D7AD8] text-white border-b-2 border-white">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch">
            <button
              type="button"
              onClick={() => navigate('user-guide')}
              className="sm:w-56 md:w-64 shrink-0 bg-[#070B4E] hover:bg-[#0D1470] border-b-2 sm:border-b-0 sm:border-r-2 border-white px-5 py-3.5 flex items-center justify-center text-sm font-bold underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
            >
              User Guide
            </button>

            <div className="flex-1 px-5 sm:px-7 py-2.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Main menu
                </h1>
                <span className="hidden md:inline text-xs font-medium text-sky-100">
                  Capstone Semester 3 · D3 RMIK Universitas Esa Unggul
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right leading-tight">
                  <span className="block text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    ICD-10 &amp; ICD-9-CM
                  </span>
                  <span className="block text-[11px] font-semibold text-sky-100">
                    WHO Versi 2010 · Vol. 3 · SATUSEHAT
                  </span>
                </div>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 40 40"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.9" />
                  <ellipse cx="20" cy="20" rx="10" ry="18" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                  <line x1="2" y1="20" x2="38" y2="20" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.75" />
                  <line x1="20" y1="2" x2="20" y2="38" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.85" />
                  <path d="M17 12 C23 14, 15 20, 22 24 C25 26, 19 30, 17 31" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Konten Utama Matrix Menu WHO */}
        <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-between px-0 sm:px-4 md:px-6 pb-4">
          <div className="w-full max-w-5xl bg-[#C9DFEF]/55 backdrop-blur-[2px] border-x border-b border-white/80 shadow-sm">
            {/* Sub-strip Module & Tombol Close (×) ke Layar Pembuka */}
            <div className="flex items-stretch border-b-2 border-white">
              <button
                type="button"
                onClick={() => navigate('module-info')}
                className="w-36 sm:w-56 md:w-64 shrink-0 bg-[#070B4E] hover:bg-[#0D1470] text-white font-bold text-sm sm:text-base px-4 py-2.5 flex items-center justify-center border-r-2 border-white transition-colors cursor-pointer whitespace-nowrap"
              >
                Module
              </button>
              <div className="flex-1 bg-[#9EC5E3]/75 px-4 py-2 flex items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-semibold text-[#06253B]">
                  Modul Pembelajaran Bab IV (E00–E90) &amp; Bab V (F00–F99) — Pilih bagian untuk dipelajari
                </span>
                <button
                  type="button"
                  onClick={() => setShowSplash(true)}
                  title="Kembali ke Layar Pembuka"
                  aria-label="Kembali ke Layar Pembuka"
                  className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-b from-[#74BCEC] to-[#1565B8] border border-white/85 text-white font-bold text-sm flex items-center justify-center shadow hover:brightness-110 transition-all cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Daftar Baris Modul Utama (WHO-FIC, Basics, Chapter IV, Chapter V, Pharmacology, Exercises) */}
            <nav aria-label="Navigasi Modul Utama">
              {whoTopRows.map((row) => (
                <button
                  key={row.leftLabel}
                  type="button"
                  onClick={row.onClick}
                  className="group w-full flex items-stretch border-b-2 border-white text-left cursor-pointer transition-colors"
                >
                  <span className="w-36 sm:w-56 md:w-64 shrink-0 bg-[#070B4E] group-hover:bg-[#0E1673] text-white px-3 sm:px-5 py-3 flex items-center gap-3 border-r-2 border-white transition-colors">
                    {row.badge ? (
                      <>
                        <span className="w-7 h-7 shrink-0 border border-white/85 flex items-center justify-center text-xs font-extrabold tabular-nums bg-[#0A1366]">
                          {row.badge}
                        </span>
                        <span className="text-sm sm:text-[15px] font-bold whitespace-nowrap">
                          {row.leftLabel}
                        </span>
                      </>
                    ) : (
                      <span className="w-full text-center text-sm sm:text-[15px] font-bold whitespace-nowrap">
                        {row.leftLabel}
                      </span>
                    )}
                  </span>

                  <span
                    className={`flex-1 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 text-white font-bold text-sm sm:text-[15px] transition-colors ${
                      row.variant === 'teal'
                        ? 'bg-[#006B6B] group-hover:bg-[#008080]'
                        : 'bg-[#0A5EB0] group-hover:bg-[#106EC9]'
                    }`}
                  >
                    <span>{row.title}</span>
                    <span className="text-white/75 group-hover:translate-x-1 transition-transform text-sm shrink-0" aria-hidden="true">
                      ▸
                    </span>
                  </span>
                </button>
              ))}
            </nav>

            {/* Grid 2-Kolom Akses Cepat Sub-bagian Bab IV & Bab V (Gaya Bar Bawah WHO) */}
            <div className="flex items-stretch border-b-2 border-white">
              <div className="hidden sm:flex sm:w-56 md:w-64 shrink-0 bg-[#B6D3EA]/55 border-r-2 border-white p-4 flex-col justify-between text-xs text-[#06253B]">
                <div>
                  <span className="font-bold block text-[#070B4E]">Akses Langsung Materi</span>
                  <p className="mt-1 text-slate-700 leading-relaxed">
                    Buka langsung Coding Review, Medical Science &amp; Anatomi, atau Latihan Kasus Bab IV &amp; Bab V.
                  </p>
                </div>
                <span className="font-semibold text-[#0A5EB0]">
                  Total: 20 Kasus · 40 Soal Isian
                </span>
              </div>

              <div className="flex-1 p-2.5 sm:p-3 bg-[#B6D3EA]/45 grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {whoBottomGrid.map((cell) => (
                  <button
                    key={cell.label}
                    type="button"
                    onClick={cell.onClick}
                    className="bg-[#0A5EB0] hover:bg-[#116EC9] text-white text-left font-bold text-xs sm:text-sm px-4 py-2.5 border border-white/80 transition-colors flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span>{cell.label}</span>
                    <span className="text-white/70 text-xs shrink-0" aria-hidden="true">▸</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Bar Matrix (Identitas Kelompok & KAK) */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#DCEAF5] px-4 py-2">
              <span className="text-xs font-medium text-slate-700">
                Media Pembelajaran Akademik Non-Klinis · Bebas Data Pasien Nyata
              </span>
              <button
                type="button"
                onClick={() => navigate('module-info')}
                className="inline-flex items-center gap-2.5 bg-[#050A30] hover:bg-[#0D166B] text-white px-4 py-1.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                <span>Detail KAK &amp; 6 Mata Kuliah</span>
                <span
                  className="w-5 h-5 rounded-full bg-gradient-to-b from-[#74BCEC] to-[#1565B8] border border-white/80 flex items-center justify-center text-[11px]"
                  aria-hidden="true"
                >
                  ▶
                </span>
              </button>
            </div>
          </div>

          {/* Ringkasan Proyek Capstone, Integrasi 6 Mata Kuliah & Tabel Tim Editable di Home/Main Menu */}
          <section
            aria-label="Ringkasan Proyek Capstone, Integrasi 6 Mata Kuliah, dan Identitas Tim"
            className="w-full max-w-5xl mt-4 rounded-xl border border-sky-200 bg-white/95 shadow-sm p-4 sm:p-6 space-y-5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00669E]">
                  Capstone Experience Semester 3 · Prodi D3 RMIK Universitas Esa Unggul
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#06253B] mt-0.5">
                  Media Pembelajaran Kodifikasi ICD-10 (Bab IV &amp; Bab V) &amp; ICD-9-CM Vol. 3
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Ruang lingkup dua bab utama: <strong>Bab IV (E00–E90: Endokrin, Nutrisi &amp; Metabolik)</strong> dan{' '}
                  <strong>Bab V (F00–F99: Gangguan Mental &amp; Perilaku)</strong> — dilengkapi 20 kasus telusur, diagram anatomi interaktif, farmakologi non-resep, dan 40 soal isian.
                </p>
              </div>
              <a
                href="/standalone/Index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center rounded-lg bg-[#0A3656] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#00669E] transition-colors"
              >
                Versi HTML/CSS/JS Murni ↗
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Integrasi 6 Mata Kuliah Semester 3 */}
              <div className="lg:col-span-5 space-y-2.5">
                <h3 className="text-sm font-bold text-[#0A3656]">
                  Integrasi 6 Mata Kuliah Semester 3
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {COURSE_INTEGRATION.map((item) => (
                    <div
                      key={item.course}
                      className="rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2"
                    >
                      <span className="block text-xs font-bold text-[#00669E]">{item.course}</span>
                      <p className="text-[11.5px] text-slate-700 leading-snug mt-0.5">
                        {item.contribution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabel Identitas Kelompok & Peran Tim (Editable) */}
              <div className="lg:col-span-7 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#0A3656]">
                      Identitas Anggota Kelompok &amp; Peran Tim
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Ketua terisi tetap; baris anggota 2–4 dapat diedit langsung &amp; tersimpan otomatis.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingGroup((v) => !v)}
                    className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-[#0A3656] hover:bg-sky-100 transition-colors cursor-pointer"
                  >
                    {editingGroup ? '✓ Simpan Perubahan' : '✎ Edit Anggota 2–4'}
                  </button>
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#0A3656] text-white">
                        <th className="py-2 px-2.5 font-semibold w-9">No</th>
                        <th className="py-2 px-2.5 font-semibold">Nama Mahasiswa</th>
                        <th className="py-2 px-2.5 font-semibold">NIM</th>
                        <th className="py-2 px-2.5 font-semibold">Peran dalam Proyek</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 tabular-nums">
                      {groupMembers.map((member, idx) => (
                        <tr key={member.no} className="even:bg-slate-50/70">
                          <td className="py-2 px-2.5 font-medium text-slate-700">{member.no}</td>
                          <td className="py-2 px-2.5 font-semibold text-slate-900">
                            {editingGroup && idx > 0 ? (
                              <input
                                type="text"
                                aria-label={`Nama Anggota ${member.no}`}
                                value={member.name}
                                onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                                className="w-full rounded border border-sky-300 px-2 py-1 text-xs font-normal"
                              />
                            ) : (
                              member.name
                            )}
                          </td>
                          <td className="py-2 px-2.5 font-mono text-[#0A3656]">
                            {editingGroup && idx > 0 ? (
                              <input
                                type="text"
                                aria-label={`NIM Anggota ${member.no}`}
                                value={member.nim}
                                onChange={(e) => handleMemberChange(idx, 'nim', e.target.value)}
                                className="w-full rounded border border-sky-300 px-2 py-1 text-xs font-mono"
                              />
                            ) : (
                              <code>{member.nim}</code>
                            )}
                          </td>
                          <td className="py-2 px-2.5 text-slate-700">
                            {editingGroup && idx > 0 ? (
                              <input
                                type="text"
                                aria-label={`Peran Anggota ${member.no}`}
                                value={member.role}
                                onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                                className="w-full rounded border border-sky-300 px-2 py-1 text-xs"
                              />
                            ) : (
                              member.role
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // =========================================================================
  // 3. KERANGKA HALAMAN DALAM MODUL (HEADER BIRU + KONTEN SUB-HALAMAN)
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FB]">
      {/* Header Atas Biru */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#06253B] via-[#0D4B75] to-[#00669E] text-white border-b border-white/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate('main-menu')}
              className="whitespace-nowrap shrink-0 rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors cursor-pointer"
            >
              ← Menu Utama
            </button>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-wider uppercase text-sky-200">
                <span>ICD-10 &amp; ICD-9-CM Training Module</span>
                <span className="font-semibold text-cyan-200 normal-case tracking-normal">
                  {currentBreadcrumb}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold truncate">
                {VIEW_TITLES[activeView]}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline text-xs font-medium text-sky-100 whitespace-nowrap">
              ICD-10 WHO (2010) · ICD-9-CM Vol. 3 | SATUSEHAT
            </span>
            <button
              type="button"
              onClick={() => setShowSplash(true)}
              className="whitespace-nowrap shrink-0 rounded-lg border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/15 transition-colors cursor-pointer"
            >
              Layar Pembuka
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ================= VIEW: USER GUIDE ================= */}
        {activeView === 'user-guide' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#06253B]">
                Petunjuk Penggunaan Aplikasi &amp; Etika Akademik
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Ikuti langkah berikut untuk mempelajari kodifikasi Bab IV dan Bab V secara sistematis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  num: '01.',
                  title: 'Mulai dari Modul BASICS',
                  body: 'Pahami perbedaan fungsi ICD-10 (kode diagnosis penyakit) dan ICD-9-CM Volume 3 (kode tindakan/prosedur medis) serta coba simulator 4 tahap verifikasi WHO.',
                },
                {
                  num: '02.',
                  title: 'Pelajari Bab IV & Bab V Secara Konsisten',
                  body: 'Setiap bab terbagi menjadi 4 sub-tab seragam: Pengantar Bab, Coding Review (beserta 10 studi kasus & ICD-9-CM), Medical Science interaktif, dan Farmakologi edukatif.',
                },
                {
                  num: '03.',
                  title: 'Evaluasi Kasus Isian (Kolom & Tombol ✓)',
                  body: 'Pilih filter bab dan jenis kode (10 soal ICD-10 & 10 soal ICD-9-CM per bab), ketik kode pada kolom isian, lalu tekan tombol centang (✓) untuk mengirim jawaban dan menampilkan kunci jawaban yang benar.',
                },
                {
                  num: '04.',
                  title: 'Etika Data & Batasan Non-Klinis',
                  body: 'Seluruh kasus menggunakan skenario fiktif tanpa data identitas pasien nyata. Materi farmakologi bersifat edukatif mekanistik tanpa anjuran resep atau dosis klinis.',
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-1.5"
                >
                  <h3 className="text-base font-bold text-[#0A3656]">
                    {item.num} {item.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW: MODULE INFO ================= */}
        {activeView === 'module-info' && (
          <div className="space-y-6">
            {/* Tabel Identitas Anggota Kelompok */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#06253B]">
                    Identitas Kelompok Penyusun — D3 Rekam Medis &amp; Informasi Kesehatan
                  </h2>
                  <p className="text-xs text-slate-500">
                    Universitas Esa Unggul · Semester 3 · Tahun Akademik 2026
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingGroup((v) => !v)}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {editingGroup ? '✓ Selesai Edit' : '✎ Edit Anggota 2–4'}
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0A3656] text-white">
                      <th className="py-2.5 px-3.5 font-semibold w-12">No.</th>
                      <th className="py-2.5 px-3.5 font-semibold">Nama Lengkap Mahasiswa</th>
                      <th className="py-2.5 px-3.5 font-semibold">NIM</th>
                      <th className="py-2.5 px-3.5 font-semibold">Peran dalam Proyek Capstone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 tabular-nums">
                    {groupMembers.map((member, idx) => (
                      <tr key={member.no} className="even:bg-slate-50/70">
                        <td className="py-2.5 px-3.5 font-medium text-slate-700">{member.no}</td>
                        <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                          {editingGroup && idx > 0 ? (
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                              className="w-full rounded border border-sky-300 px-2 py-1 text-sm font-normal"
                            />
                          ) : (
                            member.name
                          )}
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-xs text-[#0A3656]">
                          {editingGroup && idx > 0 ? (
                            <input
                              type="text"
                              value={member.nim}
                              onChange={(e) => handleMemberChange(idx, 'nim', e.target.value)}
                              className="w-full rounded border border-sky-300 px-2 py-1 text-xs font-mono"
                            />
                          ) : (
                            <code>{member.nim}</code>
                          )}
                        </td>
                        <td className="py-2.5 px-3.5 text-slate-700">
                          {editingGroup && idx > 0 ? (
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                              className="w-full rounded border border-sky-300 px-2 py-1 text-sm"
                            />
                          ) : (
                            member.role
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#06253B]">
                    Daftar Modul Capstone &amp; Integrasi 6 Mata Kuliah
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Struktur modul mengikuti pola WHO ICD-10 Training Tool dan Kerangka Acuan Kerja (KAK) Semester 3 D3 RMIK Universitas Esa Unggul.
                  </p>
                </div>
                <a
                  href="/standalone/Index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-[#0A3656] px-4 py-2 text-xs font-semibold text-white hover:bg-[#00669E] transition-colors"
                >
                  Buka Versi HTML/CSS/JS Murni ↗
                </a>
              </div>

              {/* Akses Langsung Module 4 & Module 5 ala WHO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-5 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00669E]">
                      MODULE 4 · KODE E00–E90
                    </span>
                    <h3 className="text-base font-bold text-[#06253B] mt-1">
                      Chapter IV: Endocrine, Nutritional and Metabolic Diseases
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Meliputi Menu Modul, Pengantar Bab, Coding Review Vol. 2 (10 Kasus + ICD-9-CM), Medical Science interaktif, dan Farmakologi.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('chapter-4')}
                    className="self-start rounded-lg bg-[#00669E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A3656] transition-colors cursor-pointer"
                  >
                    Buka Module 4 →
                  </button>
                </div>

                <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-5 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#0E7C7B]">
                      MODULE 5 · KODE F00–F99
                    </span>
                    <h3 className="text-base font-bold text-[#06253B] mt-1">
                      Chapter V: Mental and Behavioural Disorders
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Meliputi Menu Modul, Pengantar Bab, Coding Review Vol. 2 (10 Kasus + ICD-9-CM), Medical Science interaktif, dan Farmakologi.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('chapter-5')}
                    className="self-start rounded-lg bg-[#0E7C7B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#095C5B] transition-colors cursor-pointer"
                  >
                    Buka Module 5 →
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0A3656] text-white">
                      <th className="py-2.5 px-4 font-semibold">Mata Kuliah</th>
                      <th className="py-2.5 px-4 font-semibold">Kontribusi Utama dalam Proyek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {COURSE_INTEGRATION.map((row) => (
                      <tr key={row.course} className="even:bg-slate-50/70">
                        <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                          {row.course}
                        </td>
                        <td className="py-3 px-4 text-slate-700 leading-relaxed">
                          {row.contribution}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabel 8 KAK: Daftar Periksa (Checklist) Sebelum Pengumpulan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#06253B]">
                    Daftar Periksa Kelengkapan KAK (Tabel 8 KAK)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Audit mandiri kelompok sebelum serah terima akhir Minggu ke-14.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-[#0E7C7B] tabular-nums">
                  {kakChecklist.filter(Boolean).length} / {kakChecklist.length} Terpenuhi
                </span>
              </div>
              <div className="space-y-2">
                {[
                  '1. Kedua bab ICD (Bab IV & Bab V) tercantum lengkap dan disajikan dengan struktur konsisten.',
                  '2. Setiap bab memuat komponen Pengantar Bab, Coding Review, Medical Science, dan Farmakologi.',
                  '3. Penerapan ICD-10 untuk diagnosis dan ICD-9-CM untuk tindakan/prosedur dibedakan secara tepat.',
                  '4. Seluruh contoh kode diverifikasi menggunakan sumber WHO ICD-10 (Vol. 1, 2, 3) & ICD-9-CM Vol. 3.',
                  '5. Tersedia soal latihan berbasis kasus fiktif dengan kunci jawaban & pembahasan langkah demi langkah.',
                  '6. Versi klasifikasi ICD (WHO 2010 / SATUSEHAT) dan seluruh referensi dicantumkan lengkap.',
                  '7. Aplikasi dapat dibuka tanpa kendala dan seluruh menu navigasi berfungsi normal.',
                  '8. Seluruh skenario kasus bebas dari data pribadi pasien nyata.',
                ].map((label, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm text-slate-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={kakChecklist[idx]}
                      onChange={() =>
                        setKakChecklist((prev) =>
                          prev.map((val, i) => (i === idx ? !val : val))
                        )
                      }
                      className="mt-0.5 accent-[#0E7C7B]"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW: BASICS ================= */}
        {activeView === 'basics' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#06253B]">
                Dasar Kodifikasi Klinis: Alur Standar Verifikasi WHO
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Sesuai kaidah WHO ICD-10 Volume 2, Indeks Alfabetis (Vol. 3) dan Daftar Tabular (Vol. 1) wajib digunakan berpasangan.
              </p>
            </div>

            {/* Diagram 4 Tahap Standar Verifikasi Kodifikasi WHO */}
            <WhoVerificationFlow />

            {/* Simulator 4 Langkah Interaktif */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00669E]">
                  Simulasi Interaktif Alur 4 Tahap WHO
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {BASICS_EXAMPLES.map((ex, i) => (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => {
                        setBasicsExIdx(i);
                        setBasicsStepIdx(0);
                      }}
                      className={`whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        basicsExIdx === i
                          ? 'bg-[#0A3656] text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50'
                      }`}
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm">
                <span className="text-xs font-medium text-slate-500 block">Contoh Kasus Uji:</span>
                <strong className="text-slate-900">{currentExample.statement}</strong>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                {currentExample.steps.map((s, idx) => {
                  const active = idx === basicsStepIdx;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setBasicsStepIdx(idx)}
                      className={`rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-[#00669E] text-white border-[#00669E]'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-sky-50'
                      }`}
                    >
                      <span className="block text-xs font-bold">{s.step}</span>
                      <span
                        className={`mt-1 block text-xs leading-relaxed ${
                          active ? 'text-sky-50' : 'text-slate-600'
                        }`}
                      >
                        {s.detail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Perbandingan ICD-10 vs ICD-9-CM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-5 space-y-2.5">
                <h3 className="text-base font-bold text-[#0A3656]">
                  ICD-10 (Pengodean Diagnosis Penyakit)
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                  <li>
                    <strong>Fungsi:</strong> Mengkode diagnosis penyakit, kondisi klinis, dan gangguan kesehatan (Bab IV <code>E00–E90</code> &amp; Bab V <code>F00–F99</code>).
                  </li>
                  <li>
                    <strong>Format Kode:</strong> Alfanumerik (1 huruf + 2–3 angka, mis. <code>E10.3</code>, <code>F53.0</code>).
                  </li>
                  <li>
                    <strong>Sistem Dagger (†) &amp; Asterisk (*):</strong> Kode <code>†</code> menyatakan etiologi penyakit dasar dan kode <code>*</code> menyatakan manifestasi pada organ target (mis. <code>E10.3† H36.0*</code>).
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-5 space-y-2.5">
                <h3 className="text-base font-bold text-[#0E7C7B]">
                  ICD-9-CM Volume 3 (Pengodean Tindakan / Prosedur)
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                  <li>
                    <strong>Fungsi:</strong> Mengkode tindakan diagnostik, terapi non-operatif, dan prosedur bedah (mis. OCT, pemasangan NGT, psikoterapi, ECT).
                  </li>
                  <li>
                    <strong>Format Kode:</strong> Numerik seluruhnya (2 digit + titik + 1–2 digit, mis. <code>95.16</code>, <code>96.07</code>, <code>94.39</code>).
                  </li>
                  <li>
                    <strong>Aturan KAK:</strong> Kode prosedur <em>tidak dapat menggantikan</em> fungsi kode diagnosis pada pelaporan morbiditas.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW: BAB IV ================= */}
        {activeView === 'chapter-4' && (
          <ChapterView
            chapter={CHAPTER_DATA.ch4}
            initialTab={chapterInitialTab}
            onSubTabChange={setActiveSubTab}
            onExerciseBreadcrumbChange={setExerciseBreadcrumb}
            onOpenQuiz={openQuizForChapter}
          />
        )}

        {/* ================= VIEW: BAB V ================= */}
        {activeView === 'chapter-5' && (
          <ChapterView
            chapter={CHAPTER_DATA.ch5}
            initialTab={chapterInitialTab}
            onSubTabChange={setActiveSubTab}
            onExerciseBreadcrumbChange={setExerciseBreadcrumb}
            onOpenQuiz={openQuizForChapter}
          />
        )}

        {/* ================= VIEW: PHARMA TERPADU ================= */}
        {activeView === 'pharmacology' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#06253B]">
                  Farmakologi Edukatif Terpadu (Bab IV &amp; Bab V)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Disajikan berdasarkan pengelompokan diagnosis: nama generik, contoh nama dagang, golongan obat, bentuk sediaan &amp; rute, dan mekanisme kerja edukatif.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate('chapter-4', 'science')}
                  className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-[#0A3656] hover:bg-sky-100 cursor-pointer"
                >
                  Lihat Anatomi Bab IV →
                </button>
                <button
                  type="button"
                  onClick={() => navigate('chapter-5', 'science')}
                  className="rounded-lg border border-teal-300 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-[#0E7C7B] hover:bg-teal-100 cursor-pointer"
                >
                  Lihat Anatomi Bab V →
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
              <strong>Batasan Edukatif (Non-Resep):</strong> Materi ini khusus untuk pemahaman keterkaitan obat dengan patofisiologi pada proses kodifikasi medis RMIK dan <em>tidak</em> memuat aturan dosis maupun anjuran terapi klinis pasien.
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter Farmakologi per Bab">
              {(
                [
                  ['all', 'Semua Bab (IV & V)'],
                  ['ch4', 'Bab IV: Endokrin & Metabolik (E00–E90)'],
                  ['ch5', 'Bab V: Gangguan Mental & Perilaku (F00–F99)'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPharmaFilter(key)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    pharmaFilter === key
                      ? 'bg-[#0A3656] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {(pharmaFilter === 'all' || pharmaFilter === 'ch4') && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#00669E] border-b border-slate-200 pb-2">
                  Bagian 1 — Farmakologi Bab IV (E00–E90: Endokrin, Nutrisi &amp; Metabolik)
                </h3>
                <PharmacologyGroupedList items={CHAPTER_DATA.ch4.pharmacology} accent="blue" />
              </div>
            )}

            {(pharmaFilter === 'all' || pharmaFilter === 'ch5') && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0E7C7B] border-b border-slate-200 pb-2">
                  Bagian 2 — Farmakologi Bab V (F00–F99: Gangguan Mental &amp; Perilaku)
                </h3>
                <PharmacologyGroupedList items={CHAPTER_DATA.ch5.pharmacology} accent="teal" />
              </div>
            )}
          </div>
        )}

        {/* ================= VIEW: QUIZ ================= */}
        {activeView === 'quiz' && (
          <QuizView
            initialFilter={quizFilter}
            groupMembers={groupMembers}
            onBreadcrumbChange={setExerciseBreadcrumb}
          />
        )}

        {/* ================= VIEW: INFO / REFERENSI ================= */}
        {activeView === 'references' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#06253B]">
                Informasi Versi Klasifikasi &amp; Daftar Pustaka
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Seluruh kode diagnosis, prosedur, materi biomedis, dan farmakologi mengacu pada sumber resmi berikut.
              </p>
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-5 space-y-3 text-sm text-slate-800">
              <h3 className="font-bold text-[#0A3656]">Acuan Versi Klasifikasi &amp; Tautan Resmi Dosen</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Diagnosis Penyakit:</strong> WHO <em>ICD-10 Versi 2010</em> — selaras dengan standar dokumentasi terminologi nasional pada platform <strong>SATUSEHAT Kementerian Kesehatan RI</strong>.
                </li>
                <li>
                  <strong>Tindakan / Prosedur Medis:</strong> <em>ICD-9-CM Volume 3</em>.
                </li>
                <li>
                  <strong>WHO ICD-10 Volume 2 (Instruction Manual PDF):</strong>{' '}
                  <a
                    href="https://iris.who.int/bitstream/handle/10665/43764/9789241547215_eng.pdf?sequence=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00669E] underline font-medium break-all"
                  >
                    https://iris.who.int/bitstream/handle/10665/43764/9789241547215_eng.pdf?sequence=1 ↗
                  </a>
                </li>
                <li>
                  <strong>WHO ICD-10 Training Tool (Referensi Struktur Modul KAK):</strong>{' '}
                  <a
                    href="https://icdtraining.z16.web.core.windows.net/training/ICD10Training/ICD-10%20training/Start/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00669E] underline font-medium break-all"
                  >
                    WHO ICD-10 Interactive Training Tool ↗
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#06253B]">Daftar Pustaka</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                {REFERENCES_LIST.map((ref, idx) => (
                  <li key={idx} className="break-words">{ref}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#06253B] text-sky-100/80 text-xs py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>
            Capstone Experience Semester 3 · Prodi D3 Rekam Medis &amp; Informasi Kesehatan — Universitas Esa Unggul
          </span>
          <span>Media Pembelajaran Akademik · Bebas Data Pasien Nyata</span>
        </div>
      </footer>
    </div>
  );
}
