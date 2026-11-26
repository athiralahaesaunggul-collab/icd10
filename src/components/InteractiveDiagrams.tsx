import React, { useState } from 'react';
import endocrineAnatomyImg from '../assets/images/anatomy_endocrine_system_1795673495487.jpg';
import brainAnatomyImg from '../assets/images/anatomy_brain_limbic_system_1795673494972.jpg';

type Ch4Stage = 'normal' | 'dm1' | 'dm2' | 'thyroid';
type Ch5Stage = 'normal' | 'psychosis' | 'depression' | 'phobia';

export const WhoVerificationFlow: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className="rounded-2xl border border-teal-200/90 bg-white p-4 sm:p-6 space-y-5">
      <div className="flex justify-center">
        <div className="rounded-full bg-[#0A254B] px-5 sm:px-8 py-2 text-center shadow-sm">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
            Alur Standar Verifikasi Kodifikasi (Standar WHO)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 items-stretch">
        {/* Langkah 1 */}
        <div className="rounded-2xl border-2 border-[#2563EB]/70 bg-white p-4 flex flex-col items-center justify-between text-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white text-sm font-extrabold flex items-center justify-center">
            1
          </div>
          <div className="w-28 h-20 rounded-xl bg-sky-50 flex items-center justify-center">
            <svg viewBox="0 0 96 68" className="w-20 h-14" aria-hidden="true">
              <rect x="14" y="10" width="46" height="48" rx="6" fill="#FFFFFF" stroke="#60A5FA" strokeWidth="2.2" />
              <line x1="22" y1="22" x2="46" y2="22" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="32" x2="50" y2="32" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="42" x2="42" y2="42" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="58" cy="40" r="13" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2.6" />
              <line x1="67" y1="49" x2="79" y2="61" stroke="#1D4ED8" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0A254B]">Identifikasi Lead Term</h4>
            {!compact && (
              <p className="text-xs text-slate-600 leading-relaxed">
                Menentukan kata kunci utama dari pernyataan diagnosis atau tindakan klinis.
              </p>
            )}
          </div>
          <span className="w-full rounded-full bg-sky-100 px-3 py-1 text-[11px] font-bold text-[#1E40AF]">
            Analisis Terminologi
          </span>
        </div>

        {/* Panah 1 -> 2 */}
        <div className="hidden lg:flex items-center justify-center text-[#0D9488]" aria-hidden="true">
          <svg viewBox="0 0 28 24" className="w-7 h-6">
            <path d="M2 12 H22 M16 6 L23 12 L16 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Langkah 2 */}
        <div className="rounded-2xl border-2 border-[#0D9488]/75 bg-white p-4 flex flex-col items-center justify-between text-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0F766E] text-white text-sm font-extrabold flex items-center justify-center">
            2
          </div>
          <div className="w-28 h-20 rounded-xl bg-teal-50/80 flex items-center justify-center">
            <svg viewBox="0 0 96 68" className="w-20 h-14" aria-hidden="true">
              <path d="M12 16 Q30 10 48 16 V54 Q30 48 12 54 Z" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.2" />
              <path d="M84 16 Q66 10 48 16 V54 Q66 48 84 54 Z" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.2" />
              <text x="30" y="37" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0F766E">A–Z</text>
              <text x="66" y="37" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0F766E">Vol. 3</text>
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0A254B]">Indeks Alfabetis</h4>
            {!compact && (
              <p className="text-xs text-slate-600 leading-relaxed">
                Menelusuri lead term &amp; modifier esensial pada ICD-10 Volume 3 / Indeks Prosedur.
              </p>
            )}
          </div>
          <span className="w-full rounded-full bg-teal-100/80 px-3 py-1 text-[11px] font-bold text-[#0F766E]">
            Kandidat Kode Awal
          </span>
        </div>

        {/* Panah 2 -> 3 */}
        <div className="hidden lg:flex items-center justify-center text-[#0D9488]" aria-hidden="true">
          <svg viewBox="0 0 28 24" className="w-7 h-6">
            <path d="M2 12 H22 M16 6 L23 12 L16 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Langkah 3 */}
        <div className="rounded-2xl border-2 border-[#D97706]/80 bg-white p-4 flex flex-col items-center justify-between text-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D97706] text-white text-sm font-extrabold flex items-center justify-center">
            3
          </div>
          <div className="w-28 h-20 rounded-xl bg-amber-50/90 flex items-center justify-center px-2">
            <div className="w-full rounded-lg border-2 border-[#D97706] bg-white px-2 py-1.5 text-center space-y-0.5">
              <span className="block text-[10px] font-extrabold text-[#B45309]">Vol. 1 Tabular</span>
              <span className="block text-[10px] font-bold text-emerald-700">✓ Includes</span>
              <span className="block text-[10px] font-bold text-red-600">✗ Excludes</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0A254B]">Daftar Tabular</h4>
            {!compact && (
              <p className="text-xs text-slate-600 leading-relaxed">
                Memeriksa catatan bab, blok, Includes/Excludes, tanda baca †/*, &amp; digit ke-4/5.
              </p>
            )}
          </div>
          <span className="w-full rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-[#92400E]">
            Verifikasi Aturan Bab
          </span>
        </div>

        {/* Panah 3 -> 4 */}
        <div className="hidden lg:flex items-center justify-center text-[#0D9488]" aria-hidden="true">
          <svg viewBox="0 0 28 24" className="w-7 h-6">
            <path d="M2 12 H22 M16 6 L23 12 L16 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Langkah 4 */}
        <div className="rounded-2xl border-2 border-[#059669]/80 bg-white p-4 flex flex-col items-center justify-between text-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#047857] text-white text-sm font-extrabold flex items-center justify-center">
            4
          </div>
          <div className="w-28 h-20 rounded-xl bg-emerald-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#10B981] text-white text-2xl font-extrabold flex items-center justify-center shadow-sm">
              ✓
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0A254B]">Kode Akurat</h4>
            {!compact && (
              <p className="text-xs text-slate-600 leading-relaxed">
                ICD-10 (Diagnosis) &amp; ICD-9-CM (Prosedur) ditetapkan disertai rasionalisasi.
              </p>
            )}
          </div>
          <span className="w-full rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-[#065F46]">
            Siap Disajikan
          </span>
        </div>
      </div>
    </div>
  );
};

export const EndocrineAnatomyShowcase: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 sm:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <figure className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-2.5 overflow-hidden">
          {!imgError ? (
            <img
              src={endocrineAnatomyImg}
              alt="Ilustrasi Anatomi Sistem Endokrin Bab IV: Hipotalamus, Hipofisis, Kelenjar Tiroid, dan Pankreas beserta Pulau Langerhans"
              onError={() => setImgError(true)}
              className={`w-full rounded-lg object-contain bg-white ${compact ? 'max-h-[260px]' : 'h-auto'}`}
            />
          ) : (
            <div className="rounded-lg bg-sky-50 p-6 text-center text-xs text-slate-600">
              Ilustrasi anatomi organ endokrin (Hipotalamus–Hipofisis, Tiroid, dan Pankreas Pulau Langerhans).
            </div>
          )}
          <figcaption className="mt-2 text-center text-xs text-slate-500">
            Anatomi Organ Kunci Bab IV: Kelenjar hipofisis, tiroid, adrenal, dan pankreas (Pulau Langerhans sel α, β, δ).
          </figcaption>
        </figure>

        <div className="lg:col-span-5 space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00669E]">
              Anatomi Organ Sistem Endokrin (E00–E35)
            </span>
            <h4 className="text-base font-bold text-[#06253B] mt-0.5">
              Organ Kunci Penghasil Hormon pada Bab IV
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-lg border border-slate-200 bg-white p-2.5">
              <strong className="text-[#0A3656] block text-xs sm:text-sm">A. Hipotalamus &amp; Hipofisis (Pituitari)</strong>
              <span className="text-xs text-slate-600">
                Melepaskan hormon antidiuretik (ADH) pengatur keseimbangan air ginjal; defisitnya memicu Diabetes Insipidus (<code>E23.2</code>).
              </span>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-2.5">
              <strong className="text-[#0A3656] block text-xs sm:text-sm">B. Kelenjar Tiroid (Leher Anterior)</strong>
              <span className="text-xs text-slate-600">
                Menyerap yodium untuk sintesis hormon T3/T4; defisiensi kongenital memicu <code>E00.0/E00.1</code> dan infeksi memicu tiroiditis <code>E06.0</code>.
              </span>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-2.5">
              <strong className="text-[#0A3656] block text-xs sm:text-sm">C. Pankreas &amp; Pulau Langerhans</strong>
              <span className="text-xs text-slate-600">
                Sel beta mensekresi insulin pengatur glukosa darah; kerusakannya memicu Diabetes Melitus (<code>E10–E14</code>) beserta komplikasi vaskular/saraf.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const NeuroBrainAnatomyShowcase: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [brainImgError, setBrainImgError] = useState(false);

  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-4 sm:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <figure className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-2.5 overflow-hidden">
          {!brainImgError ? (
            <img
              src={brainAnatomyImg}
              alt="Ilustrasi Anatomi Otak Bab V: Korteks Prefrontal, Sistem Limbik (Amigdala dan Hipokampus), serta Celah Sinaps Neurotransmiter"
              onError={() => setBrainImgError(true)}
              className={`w-full rounded-lg object-contain bg-white ${compact ? 'max-h-[260px]' : 'h-auto'}`}
            />
          ) : (
            <div className="rounded-lg bg-teal-50 p-6 text-center text-xs text-slate-600">
              Ilustrasi anatomi otak (Korteks Prefrontal, Sistem Limbik/Amigdala–Hipokampus, dan Celah Sinaps).
            </div>
          )}
          <figcaption className="mt-2 text-center text-xs text-slate-500">
            Anatomi Organ Kunci Bab V: Korteks prefrontal, sistem limbik (amigdala &amp; hipokampus), dan celah sinaps neurotransmiter.
          </figcaption>
        </figure>

        <div className="lg:col-span-5 space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E7C7B]">
              Anatomi Regio Otak &amp; Sinaps (F00–F99)
            </span>
            <h4 className="text-base font-bold text-[#06253B] mt-0.5">
              Struktur Neuroanatomi Utama pada Bab V
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-lg border border-slate-200 bg-white p-2.5">
              <strong className="text-[#0E7C7B] block text-xs sm:text-sm">A. Korteks Prefrontal (PFC)</strong>
              <span className="text-xs text-slate-600">
                Pusat fungsi eksekutif dan penilaian realitas; gangguan jalur dopamin berperan pada skizofrenia/skizoafektif (<code>F20 / F25.0</code>).
              </span>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-2.5">
              <strong className="text-[#0E7C7B] block text-xs sm:text-sm">B. Sistem Limbik (Amigdala &amp; Hipokampus)</strong>
              <span className="text-xs text-slate-600">
                Mengatur mood, memori, dan respons takut; hiperaktivasi amigdala memicu fobia (<code>F40.2</code>), sedangkan disregulasi memicu <code>F53.0</code> &amp; <code>F31.8</code>.
              </span>
            </li>
            <li className="rounded-lg border border-slate-200 bg-white p-2.5">
              <strong className="text-[#0E7C7B] block text-xs sm:text-sm">C. Celah Sinaps &amp; Neurotransmiter</strong>
              <span className="text-xs text-slate-600">
                Titik transmisi dopamin, serotonin (5-HT), norepinefrin, dan GABA menuju reseptor postsinaps sebagai target kerja psikofarmaka.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const EndocrineInteractiveDiagram: React.FC = () => {
  const [stage, setStage] = useState<Ch4Stage>('normal');

  const stageInfo: Record<
    Ch4Stage,
    {
      label: string;
      statusTag: string;
      statusTone: 'nominal' | 'elevated' | 'critical';
      anatomy: string;
      physiology: string;
      pathophysiology: string;
      icdLink: string;
    }
  > = {
    normal: {
      label: 'Homeostasis Normal',
      statusTag: '● NOMINAL · Normoglikemia',
      statusTone: 'nominal',
      anatomy: 'Pulau Langerhans pankreas (sel beta & alfa), reseptor sel otot/adiposa, serta kelenjar tiroid & hipofisis.',
      physiology:
        'Peningkatan glukosa darah pasca makan merangsang sel beta pankreas mensekresi insulin. Insulin membuka kanal GLUT-4 agar glukosa masuk ke sel dan kadar glukosa darah tetap stabil.',
      pathophysiology:
        'Tidak ada gangguan; suplai energi seluler dan integritas mikrovaskular retina, saraf perifer, serta ginjal terjaga optimal.',
      icdLink: 'Status Fisiologis Pembanding',
    },
    dm1: {
      label: 'DM Tipe 1 (E10)',
      statusTag: '▲ DEFISIENSI ABSOLUT · E10.-',
      statusTone: 'critical',
      anatomy: 'Kerusakan spesifik pada sel beta Pulau Langerhans pankreas.',
      physiology: 'Produksi insulin endogen berhenti atau sangat minimal akibat proses autoimun.',
      pathophysiology:
        'Glukosa gagal memasuki sel → hiperglikemia berat → kerusakan endotel kapiler retina (Retinopati H36.0*) serta vasa nervorum (Polineuropati G63.2*).',
      icdLink: 'E10.3† H36.0* | E10.4† G63.2*',
    },
    dm2: {
      label: 'DM & Sirkulasi Perifer (E11/E14)',
      statusTag: '▲ RESISTENSI & KOMPLIKASI · .5 / .7',
      statusTone: 'elevated',
      anatomy: 'Reseptor insulin sel perifer, pembuluh darah ekstremitas bawah, dan lensa mata.',
      physiology: 'Sel target kurang responsif terhadap insulin disertai penurunan sekresi bertahap.',
      pathophysiology:
        'Hiperglikemia kronis memicu aterosklerosis & angiopati perifer (iskemia jaringan → ulkus/gangren .5) serta penumpukan sorbitol di lensa (katarak diabetik).',
      icdLink: 'E14.5† I79.2* | E14.7',
    },
    thyroid: {
      label: 'Tiroid & Hipofisis (E00–E06 / E23)',
      statusTag: '▲ DISFUNGSI HORMONAL · E00 / E06 / E23',
      statusTone: 'elevated',
      anatomy: 'Kelenjar tiroid (lobus kanan-kiri leher anterior) & lobus posterior hipofisis (penghasil ADH).',
      physiology:
        'Yodium membentuk hormon T3/T4 untuk laju metabolisme & maturasi otak janin; hipofisis melepas ADH guna menjaga reabsorpsi air di ginjal.',
      pathophysiology:
        'Defisiensi yodium kongenital (E00.0/E00.1) menghambat perkembangan saraf & menyebabkan retardasi mental; infeksi bakteri memicu tiroiditis supuratif (E06.0); defisit ADH memicu poliuria masif (E23.2).',
      icdLink: 'E00.0 / E00.1 | E06.0 | E23.2',
    },
  };

  const current = stageInfo[stage];

  return (
    <div className="space-y-6">
      {/* Gambar Anatomi Organ Kunci Bab IV */}
      <EndocrineAnatomyShowcase />

      {/* Interactive Stage Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Pilih skenario patofisiologi Bab IV">
          {(
            [
              ['normal', '1. Homeostasis Normal'],
              ['dm1', '2. DM Tipe 1 (E10)'],
              ['dm2', '3. Komplikasi Perifer (.5)'],
              ['thyroid', '4. Tiroid & ADH (E00/E23)'],
            ] as [Ch4Stage, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStage(key)}
              className={`whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                stage === key
                  ? 'bg-[#0A3656] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span
          className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md ${
            current.statusTone === 'nominal'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : current.statusTone === 'critical'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          {current.statusTag}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* SVG Canvas */}
        <figure className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-3 flex flex-col justify-between">
          <svg
            viewBox="0 0 600 340"
            className="w-full h-auto block"
            role="img"
            aria-label={`Diagram Interaktif Bab IV: ${current.label}`}
          >
            <defs>
              <marker id="ch4ArrowBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#0284C7" />
              </marker>
              <marker id="ch4ArrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#DC2626" />
              </marker>
            </defs>

            <rect width="600" height="340" rx="12" fill="#F8FBFE" stroke="#DCE7F2" strokeWidth="1.5" />
            <text x="300" y="26" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#0A3656">
              Jalur Regulasi Endokrin &amp; Patofisiologi Bab IV — {current.label}
            </text>

            {/* Node 1: Stimulus / Organ Sumber */}
            <rect
              x="28"
              y="52"
              width="175"
              height="74"
              rx="10"
              fill={stage === 'thyroid' ? '#FEF3C7' : '#E0F2FE'}
              stroke={stage === 'thyroid' ? '#D97706' : '#0284C7'}
              strokeWidth="1.8"
            />
            <text x="115" y="76" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#082F49">
              {stage === 'thyroid' ? 'Hipofisis & Tiroid' : 'Asupan Glukosa'}
            </text>
            <text x="115" y="94" textAnchor="middle" fontSize="10" fill="#334155">
              {stage === 'thyroid' ? 'Aksis T3/T4 & Hormon ADH' : 'Glukosa darah meningkat'}
            </text>
            <text x="115" y="110" textAnchor="middle" fontSize="9.5" fill="#475569">
              {stage === 'thyroid' ? 'Butuh Yodium & Sinyal Saraf' : 'Stimulus Pulau Langerhans'}
            </text>

            {/* Arrow 1 -> 2 */}
            <line
              x1="203"
              y1="89"
              x2="232"
              y2="89"
              stroke={stage === 'normal' ? '#0284C7' : '#DC2626'}
              strokeWidth="2.2"
              markerEnd={stage === 'normal' ? 'url(#ch4ArrowBlue)' : 'url(#ch4ArrowRed)'}
            />

            {/* Node 2: Kelenjar Endokrin */}
            <rect
              x="236"
              y="52"
              width="168"
              height="74"
              rx="10"
              fill={stage === 'dm1' ? '#FEE2E2' : stage === 'normal' ? '#DCFCE7' : '#FFEDD5'}
              stroke={stage === 'dm1' ? '#DC2626' : stage === 'normal' ? '#16A34A' : '#EA580C'}
              strokeWidth="1.8"
            />
            <text x="320" y="76" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">
              {stage === 'thyroid'
                ? 'Sekresi T4 / ADH'
                : stage === 'dm1'
                ? 'Destruksi Sel Beta'
                : stage === 'dm2'
                ? 'Resistensi Reseptor'
                : 'Sekresi Insulin'}
            </text>
            <text x="320" y="94" textAnchor="middle" fontSize="10" fill="#334155">
              {stage === 'thyroid'
                ? 'Defisit yodium / abses / ↓ADH'
                : stage === 'dm1'
                ? 'Defisiensi insulin absolut'
                : stage === 'dm2'
                ? 'GLUT-4 gagal merespons'
                : 'Kanal GLUT-4 terbuka'}
            </text>
            <text x="320" y="110" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0A3656">
              {stage === 'normal' ? '● Sinyal Efektif' : '▲ Gangguan Mekanisme'}
            </text>

            {/* Arrow 2 -> 3 */}
            <line
              x1="404"
              y1="89"
              x2="432"
              y2="89"
              stroke={stage === 'normal' ? '#0284C7' : '#DC2626'}
              strokeWidth="2.2"
              markerEnd={stage === 'normal' ? 'url(#ch4ArrowBlue)' : 'url(#ch4ArrowRed)'}
            />

            {/* Node 3: Efek Metabolik */}
            <rect
              x="436"
              y="52"
              width="136"
              height="74"
              rx="10"
              fill={stage === 'normal' ? '#DCFCE7' : '#FEE2E2'}
              stroke={stage === 'normal' ? '#16A34A' : '#DC2626'}
              strokeWidth="1.8"
            />
            <text x="504" y="76" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">
              {stage === 'normal'
                ? 'Normoglikemia'
                : stage === 'thyroid'
                ? 'Hipotiroid / Poliuria'
                : 'Hiperglikemia'}
            </text>
            <text x="504" y="94" textAnchor="middle" fontSize="9.8" fill="#334155">
              {stage === 'normal'
                ? 'Ambilan sel normal'
                : stage === 'thyroid'
                ? 'Metabolisme melambat'
                : 'Glukosa menumpuk'}
            </text>
            <text x="504" y="110" textAnchor="middle" fontSize="9.5" fill="#334155">
              {stage === 'normal' ? 'Energi seimbang' : 'Stres oksidatif vaskular'}
            </text>

            {/* Jalur Bawah: Organ Target & Manifestasi Kode ICD */}
            <line
              x1="320"
              y1="126"
              x2="320"
              y2="164"
              stroke={stage === 'normal' ? '#0284C7' : '#DC2626'}
              strokeWidth="2"
              markerEnd={stage === 'normal' ? 'url(#ch4ArrowBlue)' : 'url(#ch4ArrowRed)'}
            />

            <rect x="28" y="168" width="544" height="148" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.3" />
            <text x="300" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0A3656">
              Dampak Organ Target &amp; Pemetaan Kode ICD-10 / ICD-9-CM
            </text>

            {/* 3 Target Boxes */}
            <rect
              x="44"
              y="204"
              width="160"
              height="96"
              rx="8"
              fill={stage === 'dm1' ? '#FEF2F2' : '#F8FAFC'}
              stroke={stage === 'dm1' ? '#EF4444' : '#CBD5E1'}
              strokeWidth={stage === 'dm1' ? '2' : '1'}
            />
            <text x="124" y="224" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0F172A">
              Mata &amp; Saraf Perifer
            </text>
            <text x="124" y="242" textAnchor="middle" fontSize="9.5" fill="#475569">
              Retinopati (E10.3† H36.0*)
            </text>
            <text x="124" y="257" textAnchor="middle" fontSize="9.5" fill="#475569">
              Polineuropati (E10.4† G63.2*)
            </text>
            <text x="124" y="276" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284C7">
              ICD-9-CM: 95.16 OCT, 93.08 EMG
            </text>

            <rect
              x="220"
              y="204"
              width="160"
              height="96"
              rx="8"
              fill={stage === 'dm2' ? '#FFFBEB' : '#F8FAFC'}
              stroke={stage === 'dm2' ? '#F59E0B' : '#CBD5E1'}
              strokeWidth={stage === 'dm2' ? '2' : '1'}
            />
            <text x="300" y="224" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0F172A">
              Sirkulasi Perifer &amp; Ulkus
            </text>
            <text x="300" y="242" textAnchor="middle" fontSize="9.5" fill="#475569">
              Gangren &amp; Angiopati (E14.5)
            </text>
            <text x="300" y="257" textAnchor="middle" fontSize="9.5" fill="#475569">
              Ulkus + Katarak (E14.7)
            </text>
            <text x="300" y="276" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284C7">
              ICD-9-CM: 86.22 Debridemen, 84.11
            </text>

            <rect
              x="396"
              y="204"
              width="160"
              height="96"
              rx="8"
              fill={stage === 'thyroid' ? '#FFFBEB' : '#F8FAFC'}
              stroke={stage === 'thyroid' ? '#F59E0B' : '#CBD5E1'}
              strokeWidth={stage === 'thyroid' ? '2' : '1'}
            />
            <text x="476" y="224" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0F172A">
              Tiroid, Hipofisis &amp; Nutrisi
            </text>
            <text x="476" y="242" textAnchor="middle" fontSize="9.5" fill="#475569">
              Kretinisme (E00.0/E00.1)
            </text>
            <text x="476" y="257" textAnchor="middle" fontSize="9.5" fill="#475569">
              Marasmus-Kwash (E42), DI (E23.2)
            </text>
            <text x="476" y="276" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0284C7">
              ICD-9-CM: 96.07 NGT, 88.91 MRI
            </text>
          </svg>
          <figcaption className="mt-2 text-center text-xs text-slate-500">
            Klik tombol tahap di atas untuk membandingkan fisiologi normal dengan patofisiologi Bab IV dan pemetaan kode ICD.
          </figcaption>
        </figure>

        {/* Concept Deck dengan Watermark Siluet Anatomi di Sisi Kanan */}
        <div className="relative overflow-hidden lg:col-span-5 flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <svg
            viewBox="0 0 220 260"
            className="pointer-events-none absolute -right-4 -bottom-4 w-48 h-56 text-sky-200/55"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M72 48 C58 26, 32 30, 32 58 C32 88, 60 94, 76 74 H108 C124 94, 152 88, 152 58 C152 30, 126 26, 112 48 Z"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              d="M46 156 C78 148, 134 150, 176 132 C192 126, 198 148, 174 166 C140 190, 92 212, 48 198 C30 192, 28 162, 46 156 Z"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          <div className="relative z-10 space-y-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">Anatomi Terlibat</span>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{current.anatomy}</p>
            </div>
            <hr className="border-slate-100" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">Fisiologi Normal</span>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{current.physiology}</p>
            </div>
            <hr className="border-slate-100" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">Patofisiologi &amp; Gejala</span>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{current.pathophysiology}</p>
            </div>
          </div>
          <div className="relative z-10 rounded-lg bg-slate-50/95 border border-slate-200 p-3">
            <span className="block text-xs font-medium text-slate-500">Keterkaitan Kode ICD-10:</span>
            <code className="text-sm font-semibold text-[#0A3656]">{current.icdLink}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NeuroPsychInteractiveDiagram: React.FC = () => {
  const [stage, setStage] = useState<Ch5Stage>('normal');

  const stageInfo: Record<
    Ch5Stage,
    {
      label: string;
      statusTag: string;
      statusTone: 'nominal' | 'elevated' | 'critical';
      anatomy: string;
      physiology: string;
      pathophysiology: string;
      icdLink: string;
    }
  > = {
    normal: {
      label: 'Keseimbangan Neurotransmiter Normal',
      statusTag: '● NOMINAL · Regulasi Seimbang',
      statusTone: 'nominal',
      anatomy: 'Korteks prefrontal (fungsi eksekutif), sistem limbik/amigdala (regulasi emosi), dan celah sinaps neuron.',
      physiology:
        'Dopamin mengatur motivasi dan persepsi realitas; serotonin & norepinefrin menjaga suasana perasaan; GABA meredam eksitasi cemas berlebih.',
      pathophysiology:
        'Transmisi sinyal antarneuron presinaps dan reseptor postsinaps berlangsung proporsional sehingga perilaku, afek, dan kognisi stabil.',
      icdLink: 'Status Neurobiologis Pembanding',
    },
    psychosis: {
      label: 'Hiperaktivitas Dopamin (F20 / F25.0)',
      statusTag: '▲ HIPER-DOPAMINERGIK · F20 / F25.0',
      statusTone: 'critical',
      anatomy: 'Jaras dopaminergik mesolimbik–mesokortikal dan korteks prefrontal.',
      physiology: 'Dalam keadaan normal, dopamin memfilter stimulus penting dari lingkungan.',
      pathophysiology:
        'Pelepasan dopamin berlebih di jalur mesolimbik memicu gejala positif seperti halusinasi dan waham; bila disertai episode manik menonjol menjadi Skizoafektif Tipe Manik (F25.0).',
      icdLink: 'F20.0 | F25.0 | ICD-9-CM: 94.27 ECT',
    },
    depression: {
      label: 'Defisit Monoamin & Pascamelahirkan (F53.0 / F31.8)',
      statusTag: '▲ PENURUNAN SEROTONIN · F53.0 / F31.8',
      statusTone: 'elevated',
      anatomy: 'Korteks prefrontal, hipokampus, sistem limbik, serta aksis hipotalamus–pituitari–ovarium.',
      physiology: 'Serotonin (5-HT) dan norepinefrin menjaga kestabilan mood, kualitas tidur, dan energi psikis.',
      pathophysiology:
        'Penurunan drastis hormon reproduksi pascapersalinan memicu penurunan transmisi serotonin/GABA sehingga muncul afek sedih berkepanjangan dan anhedonia (F53.0). Pada Bipolar II (F31.8), episode depresif bergantian dengan hipomania.',
      icdLink: 'F53.0 | F31.8 | ICD-9-CM: 94.39 Psikoterapi',
    },
    phobia: {
      label: 'Hiperaktivasi Amigdala & Fobia Spesifik (F40.2)',
      statusTag: '▲ RESPON AMIGDALA BERLEBIH · F40.2',
      statusTone: 'elevated',
      anatomy: 'Amigdala (pusat respons takut) dan jaras penghambat korteks prefrontal–GABAergik.',
      physiology: 'Korteks prefrontal mengendalikan amigdala melalui neurotransmiter GABA agar rasa takut proporsional.',
      pathophysiology:
        'Saat melihat stimulus spesifik (mis. ular kobra), penurunan inhibisi GABA memicu aktivasi berlebih amigdala dan sistem saraf simpatis (palpitasi, panik, penghindaran ekstrem).',
      icdLink: 'F40.2 | ICD-9-CM: 94.33 Terapi Perilaku',
    },
  };

  const current = stageInfo[stage];

  return (
    <div className="space-y-6">
      {/* Gambar Anatomi Otak, Sistem Limbik & Sinaps Bab V */}
      <NeuroBrainAnatomyShowcase />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Pilih skenario neurobiologi Bab V">
          {(
            [
              ['normal', '1. Sinaps Normal'],
              ['psychosis', '2. Psikosis & Manik (F25.0)'],
              ['depression', '3. Depresi Nifas & Mood (F53.0)'],
              ['phobia', '4. Amigdala & Fobia (F40.2)'],
            ] as [Ch5Stage, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setStage(key)}
              className={`whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                stage === key
                  ? 'bg-[#0E8388] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-teal-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span
          className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md ${
            current.statusTone === 'nominal'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : current.statusTone === 'critical'
              ? 'bg-red-50 text-red-800 border border-red-200'
              : 'bg-amber-50 text-amber-800 border border-amber-200'
          }`}
        >
          {current.statusTag}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <figure className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-3 flex flex-col justify-between">
          <svg
            viewBox="0 0 600 340"
            className="w-full h-auto block"
            role="img"
            aria-label={`Diagram Interaktif Bab V: ${current.label}`}
          >
            <defs>
              <marker id="ch5ArrowTeal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#0D9488" />
              </marker>
            </defs>

            <rect width="600" height="340" rx="12" fill="#F4FBF9" stroke="#CCE8E2" strokeWidth="1.5" />
            <text x="300" y="26" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#115E59">
              Regio Otak &amp; Transmisi Sinaptik — {current.label}
            </text>

            {/* Panel Kiri: Anatomi Otak */}
            <rect x="24" y="44" width="256" height="274" rx="10" fill="#FFFFFF" stroke="#99F6E4" strokeWidth="1.5" />
            <text x="152" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0F766E">
              ANATOMI REGIO OTAK KUNCI
            </text>

            {/* Siluet Otak */}
            <path
              d="M78,158 C62,112 98,78 152,80 C206,82 238,112 232,154 C228,182 206,192 184,192 L162,214 L144,214 L140,190 C108,192 86,182 78,158 Z"
              fill="#CCFBF1"
              stroke="#0D9488"
              strokeWidth="2"
            />
            {/* PFC */}
            <circle
              cx="104"
              cy="132"
              r="18"
              fill={stage === 'psychosis' ? '#EF4444' : '#0284C7'}
              opacity={stage === 'psychosis' ? '0.95' : '0.85'}
            />
            <text x="104" y="136" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#FFFFFF">
              PFC
            </text>

            {/* Sistem Limbik / Amigdala */}
            <ellipse
              cx="158"
              cy="146"
              rx="25"
              ry="15"
              fill={stage === 'phobia' || stage === 'depression' ? '#D97706' : '#0D9488'}
              opacity="0.9"
            />
            <text x="158" y="150" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FFFFFF">
              Limbik
            </text>

            <rect x="38" y="226" width="228" height="78" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
            <text x="48" y="244" fontSize="10" fontWeight="700" fill="#0284C7">
              • Korteks Prefrontal (PFC):
            </text>
            <text x="48" y="258" fontSize="9.5" fill="#334155">
              Kontrol kognitif, pemrosesan realitas (F20/F25).
            </text>
            <text x="48" y="276" fontSize="10" fontWeight="700" fill="#B45309">
              • Sistem Limbik &amp; Amigdala:
            </text>
            <text x="48" y="290" fontSize="9.5" fill="#334155">
              Pusat afek mood (F31.8/F53.0) &amp; rasa takut (F40.2).
            </text>

            {/* Panel Kanan: Celah Sinaps */}
            <rect x="296" y="44" width="280" height="274" rx="10" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.5" />
            <text x="436" y="66" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369A1">
              CELAH SINAPS &amp; NEUROTRANSMITER
            </text>

            {/* Presinaps */}
            <path d="M376,82 L496,82 L482,134 C474,150 398,150 390,134 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.8" />
            <text x="436" y="106" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#082F49">
              Neuron Presinaps
            </text>
            <text x="436" y="122" textAnchor="middle" fontSize="9.2" fill="#334155">
              {stage === 'psychosis'
                ? 'Pelepasan Dopamin berlebih!'
                : stage === 'depression'
                ? 'Reuptake cepat → ↓ Serotonin'
                : stage === 'phobia'
                ? 'Sinyal GABA penghambat rendah'
                : 'Pelepasan teratur (5-HT, DA, GABA)'}
            </text>

            {/* Partikel Neurotransmiter dinamis */}
            {stage === 'psychosis' ? (
              <>
                <circle cx="400" cy="158" r="5" fill="#DC2626" />
                <circle cx="418" cy="162" r="5" fill="#DC2626" />
                <circle cx="436" cy="156" r="5" fill="#DC2626" />
                <circle cx="454" cy="162" r="5" fill="#DC2626" />
                <circle cx="470" cy="158" r="5" fill="#DC2626" />
              </>
            ) : stage === 'depression' ? (
              <>
                <circle cx="422" cy="160" r="4" fill="#D97706" />
                <circle cx="450" cy="160" r="4" fill="#D97706" />
              </>
            ) : (
              <>
                <circle cx="406" cy="158" r="4.5" fill="#0D9488" />
                <circle cx="426" cy="161" r="4.5" fill="#0284C7" />
                <circle cx="446" cy="158" r="4.5" fill="#0D9488" />
                <circle cx="466" cy="161" r="4.5" fill="#0284C7" />
              </>
            )}

            <line x1="436" y1="146" x2="436" y2="172" stroke="#0D9488" strokeWidth="1.8" markerEnd="url(#ch5ArrowTeal)" />

            {/* Postsinaps */}
            <path d="M366,182 C398,172 474,172 506,182 L512,218 L360,218 Z" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.8" />
            <text x="436" y="203" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#166534">
              Reseptor Postsinaps (D2 / 5-HT / GABA-A)
            </text>

            {/* Ringkasan Klinik */}
            <rect x="312" y="228" width="248" height="76" rx="8" fill="#F0FDF4" stroke="#86EFAC" />
            <text x="322" y="246" fontSize="10" fontWeight="700" fill="#0F766E">
              Korelasi Neurokimia &amp; Bab V:
            </text>
            <text x="322" y="262" fontSize="9.3" fill="#1E293B">
              • ↑ Dopamin mesolimbik → Psikosis (F20 / F25.0)
            </text>
            <text x="322" y="276" fontSize="9.3" fill="#1E293B">
              • ↓ Serotonin/NE → Depresi nifas (F53.0) &amp; Mood
            </text>
            <text x="322" y="290" fontSize="9.3" fill="#1E293B">
              • ↓ GABA + ↑ Amigdala → Fobia spesifik (F40.2)
            </text>
          </svg>
          <figcaption className="mt-2 text-center text-xs text-slate-500">
            Pilih kondisi neurobiologis di atas untuk melihat perubahan aktivitas jalur otak dan transmisi sinaps.
          </figcaption>
        </figure>

        <div className="relative overflow-hidden lg:col-span-5 flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <svg
            viewBox="0 0 220 220"
            className="pointer-events-none absolute -right-5 -bottom-5 w-48 h-48 text-teal-200/55"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M62 152 C32 146, 20 118, 28 92 C24 62, 52 34, 96 34 C114 22, 152 24, 172 42 C202 46, 214 78, 204 110 C206 136, 184 152, 154 148 L128 148 L124 180 H96 L100 144 Z"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          <div className="relative z-10 space-y-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Anatomi Terlibat</span>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{current.anatomy}</p>
            </div>
            <hr className="border-slate-100" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Fisiologi Normal</span>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{current.physiology}</p>
            </div>
            <hr className="border-slate-100" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Patofisiologi &amp; Gejala</span>
              <p className="mt-1 text-sm text-slate-700 leading-relaxed">{current.pathophysiology}</p>
            </div>
          </div>
          <div className="relative z-10 rounded-lg bg-slate-50/95 border border-slate-200 p-3">
            <span className="block text-xs font-medium text-slate-500">Keterkaitan Kode ICD-10 &amp; ICD-9-CM:</span>
            <code className="text-sm font-semibold text-[#0E8388]">{current.icdLink}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
