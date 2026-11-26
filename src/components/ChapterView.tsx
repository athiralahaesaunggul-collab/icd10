import React, { useEffect, useState } from 'react';
import { ChapterData, PharmaCardItem } from '../data/capstoneData';
import {
  EndocrineAnatomyShowcase,
  EndocrineInteractiveDiagram,
  NeuroBrainAnatomyShowcase,
  NeuroPsychInteractiveDiagram,
} from './InteractiveDiagrams';
import { QuizView } from './QuizView';

export type SubTabKey = 'menu' | 'pengantar' | 'coding' | 'science' | 'pharma' | 'exercises';

interface ChapterViewProps {
  chapter: ChapterData;
  initialTab?: SubTabKey;
  onSubTabChange?: (tab: SubTabKey) => void;
  onExerciseBreadcrumbChange?: (crumb: string) => void;
  onOpenQuiz?: (chapterFilter: 'bab4' | 'bab5') => void;
}

const DiagnosisOrganIcon: React.FC<{ tag: PharmaCardItem['organTag'] }> = ({ tag }) => {
  if (tag === 'pancreas') {
    return (
      <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true" fill="none">
          <path d="M9 28 C14 23, 24 23, 38 17 C41 16, 42 22, 36 26 C27 32, 16 36, 9 32 Z" fill="#FDE68A" stroke="#0369A1" strokeWidth="2.2" />
          <circle cx="20" cy="28" r="2" fill="#0284C7" />
          <circle cx="28" cy="24" r="2" fill="#0284C7" />
        </svg>
      </div>
    );
  }
  if (tag === 'thyroid') {
    return (
      <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true" fill="none">
          <rect x="20" y="7" width="8" height="34" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.6" />
          <path d="M21 20 C16 13, 10 15, 10 24 C10 33, 16 35, 21 28 H27 C32 35, 38 33, 38 24 C38 15, 32 13, 27 20 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  if (tag === 'brain') {
    return (
      <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true" fill="none">
          <path d="M16 33 C10 32, 8 25, 11 19 C10 13, 16 9, 24 10 C32 9, 38 14, 37 22 C38 28, 33 33, 27 32 L24 37 L20 33 Z" fill="#CCFBF1" stroke="#0E7C7B" strokeWidth="2" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 48 48" className="w-8 h-8" aria-hidden="true" fill="none">
        <path d="M8 18 H20 C24 18, 25 29, 20 29 H8 Z" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2" />
        <path d="M31 15 C27 20, 27 28, 31 33 H41 V15 Z" fill="#CCFBF1" stroke="#0E7C7B" strokeWidth="2" />
        <circle cx="24" cy="21" r="2" fill="#0E7C7B" />
        <circle cx="25" cy="27" r="2" fill="#D97706" />
      </svg>
    </div>
  );
};

const DrugGlyphIcon: React.FC<{ idx: number; accent: 'blue' | 'teal' }> = ({ idx, accent }) => {
  const main = accent === 'teal' ? '#0E7C7B' : '#0284C7';
  const soft = accent === 'teal' ? '#CCFBF1' : '#E0F2FE';
  if (idx % 3 === 1) {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" aria-hidden="true">
        <circle cx="18" cy="18" r="14" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
        <line x1="8" y1="24" x2="28" y2="12" stroke="#94A3B8" strokeWidth="2" />
      </svg>
    );
  }
  if (idx % 3 === 2) {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" aria-hidden="true">
        <rect x="11" y="10" width="14" height="20" rx="3" fill={soft} stroke="#475569" strokeWidth="1.8" />
        <rect x="13" y="6" width="10" height="4" rx="1" fill="#94A3B8" />
        <rect x="12" y="17" width="12" height="7" fill="#FFFFFF" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 36 36" className="w-9 h-9 shrink-0" aria-hidden="true">
      <g transform="rotate(-35 18 18)">
        <rect x="7" y="12" width="11" height="12" rx="5.5" fill={main} />
        <rect x="18" y="12" width="11" height="12" rx="5.5" fill={soft} stroke={main} strokeWidth="1.6" />
      </g>
    </svg>
  );
};

export const PharmacologyGroupedList: React.FC<{
  items: PharmaCardItem[];
  accent?: 'blue' | 'teal';
}> = ({ items, accent = 'blue' }) => {
  const groups = items.reduce<Record<string, PharmaCardItem[]>>((acc, item) => {
    if (!acc[item.diagnosisGroup]) acc[item.diagnosisGroup] = [];
    acc[item.diagnosisGroup].push(item);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
      {Object.entries(groups).map(([groupTitle, drugs]) => (
        <section
          key={groupTitle}
          className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
        >
          {/* Header Diagnosis Card ala Referensi Farmakologi */}
          <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200 flex items-center gap-3.5">
            <DiagnosisOrganIcon tag={drugs[0].organTag} />
            <div className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                DIAGNOSIS:
              </span>
              <h4 className="text-base font-extrabold text-[#06253B] leading-snug">
                {groupTitle}
              </h4>
            </div>
          </div>

          {/* Daftar Obat Terstruktur per Diagnosis (Tanpa Dosis / Resep) */}
          <div className="divide-y divide-slate-200">
            {drugs.map((drug, idx) => (
              <article key={drug.genericName} className="p-5 flex items-start gap-3.5">
                <DrugGlyphIcon idx={idx} accent={accent} />
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <h5 className="text-base font-bold text-[#0A3656]">{drug.genericName}</h5>
                    <p className="text-xs text-slate-500">
                      {drug.brandExamples} · {drug.dosageFormRoute}
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-4">
                    <li>
                      <strong className="text-slate-900">Nama Generik:</strong>{' '}
                      {drug.genericName}
                    </li>
                    <li>
                      <strong className="text-slate-900">Golongan Farmakologis:</strong>{' '}
                      {drug.drugClass}
                    </li>
                    <li>
                      <strong className="text-slate-900">Penyakit Terkait:</strong>{' '}
                      {drug.relatedDisease}
                    </li>
                    <li>
                      <strong className="text-slate-900">Kegunaan Umum:</strong>{' '}
                      {drug.educationalUse}
                    </li>
                    <li>
                      <strong className="text-slate-900">Mekanisme Edukatif Obat–Penyakit:</strong>{' '}
                      {drug.mechanism}
                    </li>
                    <li className="text-xs text-slate-500">
                      <strong className="text-slate-700">Sumber Rujukan Ilmiah:</strong>{' '}
                      <em>{drug.reference}</em>
                    </li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  initialTab = 'pengantar',
  onSubTabChange,
  onExerciseBreadcrumbChange,
  onOpenQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<SubTabKey>(initialTab);
  const [selectedCaseNo, setSelectedCaseNo] = useState<number>(1);
  const [codingSubView, setCodingSubView] = useState<'all' | 'rules' | 'cases'>('all');

  useEffect(() => {
    setActiveTab(initialTab);
    setSelectedCaseNo(1);
    setCodingSubView('all');
    onSubTabChange?.(initialTab);
  }, [chapter.id, initialTab]);

  const isCh4 = chapter.id === 'ch4';
  const moduleNumber = isCh4 ? '4' : '5';
  const selectedCase = chapter.cases.find((c) => c.no === selectedCaseNo) || chapter.cases[0];

  const subTabs: { key: SubTabKey; label: string }[] = [
    { key: 'pengantar', label: '1. Overview' },
    { key: 'coding', label: '2. Coding Review' },
    { key: 'science', label: '3. Medical Science' },
    { key: 'pharma', label: '4. Pharmacology' },
    { key: 'exercises', label: '5. Exercises' },
    { key: 'menu', label: '≡ Menu Modul' },
  ];

  const tabOrder: SubTabKey[] = ['pengantar', 'coding', 'science', 'pharma', 'exercises', 'menu'];
  const currentIdx = tabOrder.indexOf(activeTab);

  const openSection = (tab: SubTabKey, codingMode: 'all' | 'rules' | 'cases' = 'all') => {
    setCodingSubView(codingMode);
    setActiveTab(tab);
    onSubTabChange?.(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-5">
      {/* Chapter Header Banner ala WHO Module Header (Gambar 1 KAK) */}
      <div
        className={`rounded-2xl overflow-hidden border border-slate-200 text-white ${
          isCh4
            ? 'bg-gradient-to-r from-[#062E51] via-[#00669E] to-[#0096C7]'
            : 'bg-gradient-to-r from-[#053B48] via-[#0E7C7B] to-[#14A098]'
        }`}
      >
        <div className="px-5 py-3 bg-black/15 border-b border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <span className="bg-white/20 px-2.5 py-0.5 rounded font-mono">
              Module {moduleNumber}
            </span>
            <span>
              Chapter {chapter.numberRoman} — {chapter.codeRange}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sky-100">
            <span>Estimasi belajar: 120 menit</span>
            <span aria-hidden="true">·</span>
            <span>ICD-10 WHO Vol. 2 &amp; ICD-9-CM</span>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-balance">
              {chapter.titleEn}
            </h2>
            <p className="text-sm md:text-base text-sky-50/90 max-w-3xl">
              {chapter.titleId} — {chapter.subtitle}
            </p>
          </div>
          <div className="text-xs font-medium text-sky-100 whitespace-nowrap shrink-0">
            {chapter.metaTags.join(' · ')}
          </div>
        </div>
      </div>

      {/* 5 Navigation Tabs: Menu Modul + 4 Sub-Tab Wajib KAK */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-xl bg-white border border-slate-200"
        role="tablist"
        aria-label={`Sub-modul Bab ${chapter.numberRoman}`}
      >
        {subTabs.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => openSection(tab.key, 'all')}
              className={`whitespace-nowrap shrink-0 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                active
                  ? isCh4
                    ? 'bg-[#0A3656] text-white'
                    : 'bg-[#0E7C7B] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 0: MENU MODUL ALA WHO TRAINING TOOL (GAMBAR 1 KAK) ================= */}
      {activeTab === 'menu' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-[#06253B]">
                Menu Utama Module {moduleNumber}: Bab {chapter.numberRoman} ({chapter.codeRange})
              </h3>
              <p className="text-sm text-slate-600 mt-0.5">
                Pilih salah satu bagian materi di bawah ini sesuai alur modul pelatihan WHO ICD-10 &amp; KAK Capstone.
              </p>
            </div>
            <div className="text-xs font-medium text-slate-500 whitespace-nowrap">
              Durasi Modul: 120 menit · 4 Sub-Bab Wajib KAK
            </div>
          </div>

          {/* Kelompok 1: Pengantar & Coding Review */}
          <div className="space-y-2.5">
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="md:w-56 shrink-0 bg-[#06253B] text-white p-4 flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold">
                    Bagian 1
                  </span>
                  <span className="font-bold text-base mt-0.5">
                    Coding — Review of the Chapter
                  </span>
                </div>
                <div className="flex-1 flex flex-col divide-y divide-white/20">
                  <button
                    type="button"
                    onClick={() => openSection('pengantar')}
                    className="w-full text-left px-5 py-3.5 bg-[#0B5A8A] hover:bg-[#00669E] text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm block">
                      1.1 Pengantar Bab (Introduction, Tujuan &amp; Blok Kode Overview)
                    </span>
                    <span className="text-xs text-sky-100">
                      Ruang lingkup {chapter.codeRange}, tabel blok kode utama, dan konteks statistik pelayanan kesehatan.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openSection('coding', 'rules')}
                    className="w-full text-left px-5 py-3.5 bg-[#0D679B] hover:bg-[#0077B6] text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm block">
                      1.2 Coding Review Part 1 — Kaidah WHO Vol. 2, Excludes &amp; Dagger/Asterisk
                    </span>
                    <span className="text-xs text-sky-100">
                      Aturan morbiditas WHO ICD-10 Volume 2, catatan pengecualian bab, dan pasangan kode †/*.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openSection('coding', 'cases')}
                    className="w-full text-left px-5 py-3.5 bg-[#0E74A8] hover:bg-[#0082C0] text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm block">
                      1.3 Coding Review Part 2 — Penelusuran 10 Kasus ICD-10 &amp; Prosedur ICD-9-CM
                    </span>
                    <span className="text-xs text-sky-100">
                      Simulasi Lead Term → Indeks Vol. 3 → Daftar Tabular Vol. 1 serta subbab tindakan medis ICD-9-CM.
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Kelompok 2: Medical Science */}
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="md:w-56 shrink-0 bg-[#0A3656] text-white p-4 flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold">
                    Bagian 2
                  </span>
                  <span className="font-bold text-base mt-0.5">Medical Science</span>
                </div>
                <div className="flex-1 flex flex-col divide-y divide-white/20">
                  <button
                    type="button"
                    onClick={() => openSection('science')}
                    className="w-full text-left px-5 py-3.5 bg-[#0E7C7B] hover:bg-[#0B6A69] text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm block">
                      2.1 Gambar Anatomi, Fisiologi &amp; Patofisiologi Interaktif
                    </span>
                    <span className="text-xs text-teal-50">
                      Ilustrasi anatomi organ kunci, diagram jalur fisiologi–patofisiologi, dan pemetaan kode ICD-10.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openSection('science')}
                    className="w-full text-left px-5 py-3.5 bg-[#128E8D] hover:bg-[#0E7C7B] text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm block">
                      2.2 Bedah Terminologi Medis (Prefix, Root, Suffix)
                    </span>
                    <span className="text-xs text-teal-50">
                      Analisis struktur kata istilah medis kunci pada Bab {chapter.numberRoman}.
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Kelompok 3: Farmakologi & Evaluasi */}
            <div className="rounded-xl overflow-hidden border border-slate-200">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="md:w-56 shrink-0 bg-[#073B4C] text-white p-4 flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold">
                    Bagian 3 &amp; 4
                  </span>
                  <span className="font-bold text-base mt-0.5">
                    Farmakologi &amp; Self-Check
                  </span>
                </div>
                <div className="flex-1 flex flex-col divide-y divide-white/20">
                  <button
                    type="button"
                    onClick={() => openSection('pharma')}
                    className="w-full text-left px-5 py-3.5 bg-[#146C94] hover:bg-[#0D577A] text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm block">
                      3.1 Farmakologi Edukatif — Hubungan Golongan Obat &amp; Penyakit (Non-Resep)
                    </span>
                    <span className="text-xs text-sky-100">
                      Nama generik, golongan farmakologis, mekanisme kerja edukatif, dan sumber rujukan resmi.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openSection('exercises')}
                    className="w-full text-left px-5 py-3.5 bg-[#0F8B8D] hover:bg-[#0C7173] text-white transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-sm block">
                      ✓ 4.1 Exercises — Latihan Kasus Bab {chapter.numberRoman} (Easy · Medium · Difficult)
                    </span>
                    <span className="text-xs text-teal-50">
                      Soal isian kode ICD-10 &amp; ICD-9-CM non-pilihan ganda per tingkat kesulitan lengkap dengan langkah penelusuran.
                    </span>
                  </button>
                  {onOpenQuiz && (
                    <button
                      type="button"
                      onClick={() => onOpenQuiz(isCh4 ? 'bab4' : 'bab5')}
                      className="w-full text-left px-5 py-3.5 bg-[#0B6F73] hover:bg-[#08565A] text-white transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-sm block">
                        ↗ Buka Halaman Exercises Gabungan (Bab IV &amp; Bab V)
                      </span>
                      <span className="text-xs text-teal-50">
                        Latih seluruh 40 kasus (10 ICD-10 &amp; 10 ICD-9-CM per Bab) dalam satu halaman terpadu.
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 1: OVERVIEW OF THE CHAPTER ================= */}
      {activeTab === 'pengantar' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col sm:flex-row">
          <div className="sm:w-14 shrink-0 bg-gradient-to-b from-[#E7F4FC] to-[#F3F9FD] border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center justify-center py-3 sm:py-6">
            <span className="vertical-overview-label text-xl sm:text-2xl font-extrabold tracking-[0.14em] text-[#00669E]/35 select-none">
              Overview
            </span>
          </div>

          <div className="flex-1 p-5 md:p-7 space-y-6 min-w-0">
            {/* Grid 2 Kolom: Kiri Kartu Ringkasan WHO Berbingkai Garis Biru Tipis, Kanan Cakupan & Tujuan */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Kartu Ringkasan WHO Volume 1 Berbingkai Garis Biru Tipis di Kiri */}
              <aside className="lg:col-span-5 rounded-xl border border-sky-200 border-l-[3px] border-l-[#00669E] bg-[#F8FBFE] p-5 space-y-4">
                <div className="border-b border-sky-200/80 pb-3">
                  <span className="font-mono text-xs font-bold text-[#00669E]">
                    CHAPTER {chapter.numberRoman} · {chapter.codeRange}
                  </span>
                  <h3 className="text-base font-bold text-[#06253B] mt-0.5 leading-snug">
                    {chapter.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">{chapter.titleId}</p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00669E]">
                    Incl. (Termasuk dalam Bab)
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
                    {chapter.inclSummary.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Excl. (Dikecualikan dari Bab)
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
                    {chapter.exclSummary.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A3656]">
                    Blok Kode Utama ({chapter.codeRange})
                  </span>
                  <div className="space-y-1">
                    {chapter.codeBlocks.map((b) => (
                      <div key={b.range} className="flex items-baseline gap-2 text-xs">
                        <code className="font-mono font-bold text-[#00669E] shrink-0 tabular-nums">
                          {b.range}
                        </code>
                        <span className="text-slate-700 leading-snug">{b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-sky-200 bg-white p-3 space-y-1.5">
                  <span className="text-xs font-bold text-[#0A3656] block">
                    Kategori Dagger (†) &amp; Asterisk (*) Relevan
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 list-disc pl-4">
                    {chapter.daggerAsteriskCategories.map((pair, idx) => (
                      <li key={idx} className="leading-snug">
                        {pair}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Sisi Kanan: Cakupan Bab, Tujuan Pembelajaran & Statistik */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#0A3656] mb-2.5">
                    Cakupan &amp; Tujuan Pembelajaran Bab {chapter.numberRoman} ({chapter.codeRange})
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                    {chapter.learningObjectives.map((obj, i) => (
                      <li key={i} className="leading-relaxed">
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 md:p-5">
                  <h4 className="text-sm font-bold text-[#0A3656] mb-1.5">
                    Konteks Statistik Pelayanan Kesehatan
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{chapter.statisticsContext}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openSection('coding', 'all')}
                    className="rounded-lg bg-[#0A3656] px-4 py-2 text-xs font-semibold text-white hover:bg-[#00669E] transition-colors cursor-pointer"
                  >
                    Lanjut ke Coding Review →
                  </button>
                  <button
                    type="button"
                    onClick={() => openSection('science', 'all')}
                    className="rounded-lg border border-teal-300 bg-teal-50 px-4 py-2 text-xs font-semibold text-[#0E7C7B] hover:bg-teal-100 transition-colors cursor-pointer"
                  >
                    Buka Medical Science &amp; Anatomi →
                  </button>
                  <button
                    type="button"
                    onClick={() => openSection('pharma', 'all')}
                    className="rounded-lg border border-sky-300 bg-sky-50 px-4 py-2 text-xs font-semibold text-[#00669E] hover:bg-sky-100 transition-colors cursor-pointer"
                  >
                    Buka Pharmacology →
                  </button>
                </div>
              </div>
            </div>

            {/* Gambar Anatomi Organ Kunci Bab (Sesuai Referensi WHO Overview) */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-[#0A3656]">
                  Anatomi Organ Kunci Bab {chapter.numberRoman} ({chapter.codeRange})
                </h3>
                <button
                  type="button"
                  onClick={() => openSection('science', 'all')}
                  className="text-xs font-semibold text-[#00669E] hover:underline cursor-pointer"
                >
                  Lihat Simulasi Fisiologi &amp; Bedah Terminologi di Medical Science →
                </button>
              </div>
              {isCh4 ? <EndocrineAnatomyShowcase compact /> : <NeuroBrainAnatomyShowcase compact />}
            </div>

            {/* Tabel Rincian Blok Kode Utama */}
            <div>
              <h3 className="text-lg font-bold text-[#0A3656] mb-3">
                Rincian Blok Kode Utama &amp; Contoh Kasus (ICD-10 WHO Versi 2010)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0A3656] text-white">
                      <th className="py-2.5 px-3.5 font-semibold whitespace-nowrap">Rentang Blok</th>
                      <th className="py-2.5 px-3.5 font-semibold">Kelompok Kondisi</th>
                      <th className="py-2.5 px-3.5 font-semibold">Contoh Kasus Relevan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {chapter.codeBlocks.map((block) => (
                      <tr key={block.range} className="even:bg-slate-50/70">
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-[#00669E] whitespace-nowrap tabular-nums">
                          {block.range}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium text-slate-900">{block.title}</td>
                        <td className="py-2.5 px-3.5 text-slate-700">{block.examples}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: CODING REVIEW ================= */}
      {activeTab === 'coding' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col sm:flex-row">
          <div className="sm:w-14 shrink-0 bg-gradient-to-b from-[#E7F4FC] to-[#F3F9FD] border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center justify-center py-3 sm:py-6">
            <span className="vertical-overview-label text-lg sm:text-xl font-extrabold tracking-[0.12em] text-[#00669E]/35 select-none whitespace-nowrap">
              Coding Review
            </span>
          </div>
          <div className="flex-1 p-5 md:p-7 space-y-8 min-w-0">
          {/* Filter Sub-Bagian Coding Review */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500">
              Rujukan metodologi: WHO ICD-10 Volume 2 (Instruction Manual) &amp; Volume 1/3
            </span>
            <div className="flex gap-1.5">
              {[
                { key: 'all' as const, label: 'Tampilkan Semua' },
                { key: 'rules' as const, label: 'Part 1: Aturan Vol. 2' },
                { key: 'cases' as const, label: 'Part 2: 10 Studi Kasus' },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setCodingSubView(m.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    codingSubView === m.key
                      ? 'bg-[#0A3656] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* A. Ringkasan Aturan Bab, Lead Term, Alur Penelusuran & Catatan Tabular (KAK 5.1) */}
          {(codingSubView === 'all' || codingSubView === 'rules') && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-[#0A3656]">
                A. Ringkasan Aturan Bab, Lead Term &amp; Pemeriksaan Catatan Tabular (WHO Vol. 1–3)
              </h3>

              {/* Ringkasan Aturan Bab (Vol. 2), Lead Term & Pemeriksaan Tabular */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00669E]">
                    1. Ringkasan Aturan Bab (Vol. 2)
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-4">
                    {chapter.codingGuide.vol2Summary.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7B]">
                    2. Penentuan Lead Term &amp; Sumber Indeks
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {chapter.codingGuide.leadTermGuidance}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    3. Pemeriksaan Catatan Tabular (Vol. 1)
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {chapter.codingGuide.tabularInspection}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-2">
                  <h4 className="text-sm font-bold text-amber-900">
                    Catatan Excludes &amp; Batasan Penting
                  </h4>
                  <ul className="space-y-1.5 text-sm text-amber-950 list-disc pl-5">
                    {chapter.excludesNotes.map((note, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 space-y-2">
                  <h4 className="text-sm font-bold text-[#0A3656]">
                    Aturan Volume 2, Subdivisi &amp; Sistem Dagger (†) / Asterisk (*)
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-800 list-disc pl-5">
                    {chapter.specialRules.map((rule, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Subbab ICD-9-CM Eksplisit per KAK 5.1 */}
              <div className="rounded-xl border border-teal-200 bg-[#F2FBFA] p-4 sm:p-5 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#0E7C7B]">
                    Subbab ICD-9-CM Volume 3: Prosedur &amp; Tindakan Medis Bab {chapter.numberRoman}
                  </h4>
                  <span className="text-xs font-mono font-semibold text-[#0E7C7B]">
                    Terpisah dari Diagnosis ICD-10
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Fungsi Kode Prosedur:</strong> {chapter.codingGuide.icd9Subchapter.purpose}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Contoh Tindakan Relevan:</strong> {chapter.codingGuide.icd9Subchapter.sampleProcedure}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Langkah Penelusuran Indeks–Tabular Prosedur:</strong> {chapter.codingGuide.icd9Subchapter.traceSteps}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong>Alasan Pemilihan Kode:</strong> {chapter.codingGuide.icd9Subchapter.selectionRationale}
                </p>
              </div>
            </div>
          )}

          {/* B. Penelusuran 10 Kasus Bab (ICD-10 + ICD-9-CM) */}
          {(codingSubView === 'all' || codingSubView === 'cases') && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-[#0A3656]">
                    B. Studi Kasus Penelusuran Kode Diagnosis (ICD-10) &amp; Tindakan (ICD-9-CM)
                  </h3>
                  <p className="text-sm text-slate-600">
                    Pilih salah satu dari 10 kasus latihan Bab {chapter.numberRoman} untuk melihat alur verifikasi Lead Term → Indeks → Tabular.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500 whitespace-nowrap tabular-nums">
                  Kasus {selectedCase.no} dari {chapter.cases.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {chapter.cases.map((c) => {
                  const isSelected = c.no === selectedCase.no;
                  return (
                    <button
                      key={c.no}
                      type="button"
                      onClick={() => setSelectedCaseNo(c.no)}
                      className={`rounded-lg px-3 py-2 text-left text-xs font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? isCh4
                            ? 'bg-[#0A3656] text-white border-[#0A3656]'
                            : 'bg-[#0E7C7B] text-white border-[#0E7C7B]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                      }`}
                    >
                      <span className="block font-mono font-semibold tabular-nums">Kasus {c.no}</span>
                      <span className="block truncate">{c.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                      Kasus Fiktif {chapter.numberRoman}.{selectedCase.no}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">{selectedCase.title}</h4>
                    <p className="text-sm text-slate-700 mt-1">{selectedCase.scenario}</p>
                  </div>
                  <div className="shrink-0 rounded-lg bg-white border border-sky-200 px-4 py-2.5 text-right">
                    <span className="block text-[11px] font-medium text-slate-500">Kode Akhir ICD-10</span>
                    <code className="text-base font-bold text-[#0A3656]">{selectedCase.icd10Code}</code>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-3">
                    <h5 className="text-sm font-bold text-[#0A3656]">
                      1. Penelusuran Diagnosis (ICD-10 Vol. 3 → Vol. 1)
                    </h5>
                    <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
                      {selectedCase.icd10Steps.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">Rasionalisasi:</strong> {selectedCase.rationale}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-3">
                    <h5 className="text-sm font-bold text-[#0E7C7B]">
                      2. Subbab Prosedur Tindakan Medis (ICD-9-CM Vol. 3)
                    </h5>
                    <p className="text-xs text-slate-500">
                      Kode prosedur mendokumentasikan tindakan medis dan tidak menggantikan kode diagnosis.
                    </p>
                    <div className="space-y-2.5">
                      {selectedCase.icd9Procedures.map((proc, idx) => (
                        <div key={idx} className="rounded-lg bg-teal-50/50 border border-teal-200/80 p-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-900">{proc.name}</span>
                            <code className="shrink-0 font-mono text-xs font-bold bg-white border border-teal-300 text-[#0E7C7B] px-2 py-0.5 rounded tabular-nums">
                              {proc.code}
                            </code>
                          </div>
                          <p className="mt-1 text-xs text-slate-600">{proc.trace}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: MEDICAL SCIENCE (SESUAI REFERENSI & KAK 5.2) ================= */}
      {activeTab === 'science' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col sm:flex-row">
          <div className="sm:w-14 shrink-0 bg-gradient-to-b from-[#E6F8F6] to-[#F3FBFD] border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center justify-center py-3 sm:py-6">
            <span className="vertical-overview-label text-lg sm:text-xl font-extrabold tracking-[0.12em] text-[#0E7C7B]/35 select-none whitespace-nowrap">
              Medical Science
            </span>
          </div>
          <div className="flex-1 p-5 md:p-7 space-y-8 min-w-0">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#0A3656]">
                A. Anatomi, Fisiologi &amp; Patofisiologi Organ Kunci Bab {chapter.numberRoman}
              </h3>
              {isCh4 ? <EndocrineInteractiveDiagram /> : <NeuroPsychInteractiveDiagram />}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#0A3656]">
                B. Profil Penyakit Contoh &amp; Keterkaitan Klasifikasi Bab {chapter.numberRoman}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapter.diseaseProfiles.map((prof) => (
                  <article
                    key={prof.name}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2">
                      <h4 className="text-sm font-bold text-[#06253B]">{prof.name}</h4>
                      <code className="shrink-0 font-mono text-xs font-bold bg-white border border-sky-200 text-[#00669E] px-2 py-0.5 rounded">
                        {prof.icdCode}
                      </code>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Definisi Ringkas:</strong> {prof.definition}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <strong className="text-slate-900">Keterkaitan Bab ICD:</strong> {prof.chapterRelation}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-[#0A3656]">
                  C. Bedah Terminologi Medis (Prefix, Root, Suffix) &amp; Kaitan Diagram Anatomi — Bab {chapter.numberRoman}
                </h3>
                <span className="text-xs font-medium text-[#0E7C7B]">
                  Terhubung dengan Diagram Anatomi Bagian A
                </span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0A3656] text-white">
                      <th className="py-2.5 px-3.5 font-semibold">Istilah Medis</th>
                      <th className="py-2.5 px-3.5 font-semibold">Prefix</th>
                      <th className="py-2.5 px-3.5 font-semibold">Root / Combining Form</th>
                      <th className="py-2.5 px-3.5 font-semibold">Suffix</th>
                      <th className="py-2.5 px-3.5 font-semibold">Organ / Struktur Terkait (Diagram)</th>
                      <th className="py-2.5 px-3.5 font-semibold">Makna Klinis &amp; Kode Terkait</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {chapter.terminology.map((row) => (
                      <tr key={row.term} className="even:bg-slate-50/70">
                        <td className="py-2.5 px-3.5 font-bold text-slate-900">{row.term}</td>
                        <td className="py-2.5 px-3.5 font-mono text-xs text-slate-700">{row.prefix}</td>
                        <td className="py-2.5 px-3.5 font-mono text-xs text-[#00669E]">{row.root}</td>
                        <td className="py-2.5 px-3.5 font-mono text-xs text-slate-700">{row.suffix}</td>
                        <td className="py-2.5 px-3.5 text-xs font-semibold text-[#0E7C7B]">{row.organRef}</td>
                        <td className="py-2.5 px-3.5 text-slate-700">{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: FARMAKOLOGI ================= */}
      {activeTab === 'pharma' && (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col sm:flex-row">
          <div className="sm:w-14 shrink-0 bg-gradient-to-b from-[#E7F4FC] to-[#F3F9FD] border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center justify-center py-3 sm:py-6">
            <span className="vertical-overview-label text-lg sm:text-xl font-extrabold tracking-[0.12em] text-[#00669E]/35 select-none whitespace-nowrap">
              Pharmacology
            </span>
          </div>
          <div className="flex-1 p-5 md:p-7 space-y-6 min-w-0">
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
              <strong>Batasan Edukatif (Non-Resep):</strong> Bagian ini menyajikan keterkaitan golongan, nama generik, contoh nama dagang, bentuk sediaan, rute pemberian, dan mekanisme kerja obat terhadap patofisiologi penyakit pada Bab {chapter.numberRoman} semata-mata untuk pemahaman akademik mahasiswa RMIK, <em>tanpa mencantumkan aturan dosis, jumlah obat, maupun saran terapi klinis pasien</em>.
            </div>

            <PharmacologyGroupedList
              items={chapter.pharmacology}
              accent={isCh4 ? 'blue' : 'teal'}
            />
          </div>
        </div>
      )}

      {/* ================= TAB 5: EXERCISES (EASY / MEDIUM / DIFFICULT) ================= */}
      {activeTab === 'exercises' && (
        <QuizView
          embeddedChapter={isCh4 ? 'bab4' : 'bab5'}
          onBreadcrumbChange={onExerciseBreadcrumbChange}
        />
      )}

      {/* Footer Navigasi Antar Sub-Bagian ala WHO Module (Prev / Menu Modul / Next) */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <button
          type="button"
          disabled={currentIdx <= 0}
          onClick={() => openSection(tabOrder[currentIdx - 1], 'all')}
          className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
        >
          ← Sebelumnya
        </button>

        <button
          type="button"
          onClick={() => openSection('menu', 'all')}
          className="rounded-lg bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-[#0A3656] hover:bg-sky-100 cursor-pointer"
        >
          ≡ Menu Modul {moduleNumber}
        </button>

        {currentIdx < tabOrder.length - 1 ? (
          <button
            type="button"
            onClick={() => openSection(tabOrder[currentIdx + 1], 'all')}
            className="rounded-lg bg-[#0A3656] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#00669E] cursor-pointer"
          >
            Berikutnya →
          </button>
        ) : onOpenQuiz ? (
          <button
            type="button"
            onClick={() => onOpenQuiz(isCh4 ? 'bab4' : 'bab5')}
            className="rounded-lg bg-[#0E7C7B] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0A6261] cursor-pointer"
          >
            Lanjut ke Latihan Soal →
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};
