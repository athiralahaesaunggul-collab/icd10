import React, { useMemo, useState } from 'react';
import {
  GroupMember,
  INITIAL_GROUP_MEMBERS,
  QUIZ_BANK,
  QuizCodeType,
  QuizDifficulty,
  QuizOrganType,
  QuizQuestion,
} from '../data/capstoneData';
import whoHeadEndocrineImg from '../assets/images/who_head_endocrine_1795683026205.jpg';
import whoTorsoKidneyImg from '../assets/images/who_torso_endocrine_kidney_1795683028415.jpg';
import whoEyeImg from '../assets/images/who_eye_anatomy_1795683029460.jpg';
import whoGiNutritionImg from '../assets/images/who_gi_nutrition_1795683028853.jpg';
import whoLungImg from '../assets/images/who_lung_respiratory_1795683031312.jpg';
import whoBrainCortexImg from '../assets/images/who_brain_cortex_1795683030898.jpg';
import whoLegVascularImg from '../assets/images/who_vascular_nerve_leg_1795683031040.jpg';
import brainLimbicImg from '../assets/images/anatomy_brain_limbic_system_1795673494972.jpg';

type QuizFilter = 'all' | 'bab4' | 'bab5';
type CodeTypeFilter = 'all' | QuizCodeType;
type LevelSelection = QuizDifficulty | 'all-list' | null;

interface QuizAnswerInput {
  icd10Primary: string;
  icd10Secondary: string;
}

interface QuizViewProps {
  initialFilter?: QuizFilter;
  embeddedChapter?: 'bab4' | 'bab5';
  groupMembers?: GroupMember[];
  onBreadcrumbChange?: (crumb: string) => void;
}

const LEVEL_META: {
  key: QuizDifficulty;
  label: string;
  subtitle: string;
  stackLayers: number;
}[] = [
  {
    key: 'easy',
    label: 'Easy',
    subtitle: 'Kode tunggal diagnosis ICD-10 & prosedur langsung ICD-9-CM',
    stackLayers: 3,
  },
  {
    key: 'medium',
    label: 'Medium',
    subtitle: 'Kombinasi dua kode, subdivisi spesifik & tindakan diagnostik',
    stackLayers: 6,
  },
  {
    key: 'difficult',
    label: 'Difficult',
    subtitle: 'Kasus kompleks Dagger (†) / Asterisk (*) & tindakan lanjutan',
    stackLayers: 10,
  },
];

function normalizeCode(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[†*+]/g, '');
}

function isCodeMatch(userValue: string, acceptedList?: string[]): boolean {
  if (!acceptedList || acceptedList.length === 0) return true;
  const norm = normalizeCode(userValue);
  if (!norm) return false;
  return acceptedList.some((acc) => normalizeCode(acc) === norm);
}

/**
 * Ilustrasi Tumpukan Dokumen Rekam Medis WHO (Easy / Medium / Difficult)
 */
const FolderStackIllustration: React.FC<{ label: string; layers: number }> = ({
  label,
  layers,
}) => {
  const stepY = 5.5;
  const baseTop = Math.max(12, 62 - (layers - 1) * stepY);
  const layerIndices = Array.from({ length: layers }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 210 150"
      className="w-full max-w-[205px] h-auto mx-auto"
      role="img"
      aria-label={`Tingkat kesulitan ${label}`}
    >
      <ellipse cx="105" cy="134" rx="82" ry="10" fill="#DCEEF8" />
      {layerIndices.map((idx) => {
        const y = baseTop + (layers - 1 - idx) * stepY;
        const isTop = idx === layers - 1;
        return (
          <g key={idx}>
            <polygon
              points={`28,${y + 4} 178,${y} 184,${y + 62} 22,${y + 66}`}
              fill={isTop ? '#FFFFFF' : '#F4FAFE'}
              stroke="#0284C7"
              strokeWidth={isTop ? 1.8 : 1.15}
            />
            {isTop && (
              <>
                <rect
                  x="136"
                  y={y + 8}
                  width="32"
                  height="16"
                  rx="2"
                  fill="#F8FCFF"
                  stroke="#7DD3FC"
                  strokeWidth="1"
                />
                <line x1="141" y1={y + 13} x2="163" y2={y + 13} stroke="#93C5FD" strokeWidth="1" />
                <line x1="141" y1={y + 18} x2="160" y2={y + 18} stroke="#93C5FD" strokeWidth="1" />
                <text
                  x="103"
                  y={y + 40}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#0369A1"
                >
                  {label}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Ilustrasi Anatomi Organ Bergaya Modul WHO (Gambar Anatomi Medis Bersih + Garis Penunjuk Lurus & Label Bahasa Indonesia)
 */
const OrganSvgArtwork: React.FC<{ organType: QuizOrganType }> = ({ organType }) => {
  switch (organType) {
    case 'thyroid':
      return (
        <svg
          viewBox="0 0 800 560"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi kelenjar tiroid, paratiroid, dan trakea"
        >
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href={whoHeadEndocrineImg} x="40" y="-10" width="720" height="540" />
          <line x1="206" y1="340" x2="376" y2="340" stroke="#475569" strokeWidth="2.2" />
          <circle cx="376" cy="340" r="3.5" fill="#0F172A" />
          <text x="196" y="336" textAnchor="end" fontSize="18" fontWeight="700" fill="#0F172A">
            Kelenjar Tiroid
          </text>
          <text x="196" y="357" textAnchor="end" fontSize="14" fill="#475569">
            (Lobus Kanan &amp; Kiri)
          </text>

          <line x1="428" y1="322" x2="585" y2="274" stroke="#475569" strokeWidth="2" />
          <line x1="428" y1="354" x2="585" y2="274" stroke="#475569" strokeWidth="2" />
          <circle cx="428" cy="322" r="3.5" fill="#B45309" />
          <circle cx="428" cy="354" r="3.5" fill="#B45309" />
          <text x="595" y="272" fontSize="18" fontWeight="700" fill="#0F172A">
            Paratiroid (4)
          </text>
          <text x="595" y="292" fontSize="14" fill="#475569">
            (Regulasi Kalsium)
          </text>

          <line x1="412" y1="392" x2="585" y2="392" stroke="#475569" strokeWidth="2.2" />
          <circle cx="412" cy="392" r="3.5" fill="#334155" />
          <text x="595" y="389" fontSize="17.5" fontWeight="700" fill="#334155">
            Trakea &amp; Isthmus
          </text>
          <text x="595" y="409" fontSize="14" fill="#475569">
            (Leher Anterior)
          </text>
        </svg>
      );

    case 'thyroid-brain':
      return (
        <svg
          viewBox="0 0 800 560"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi kelenjar tiroid dan maturasi otak"
        >
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href={whoHeadEndocrineImg} x="40" y="-10" width="720" height="540" />

          <line x1="448" y1="108" x2="585" y2="108" stroke="#475569" strokeWidth="2.2" />
          <circle cx="448" cy="108" r="3.5" fill="#0369A1" />
          <text x="595" y="105" fontSize="18" fontWeight="700" fill="#0369A1">
            Korteks Serebri
          </text>
          <text x="595" y="125" fontSize="14" fill="#475569">
            (Maturasi Otak / IQ)
          </text>

          <line x1="206" y1="170" x2="378" y2="170" stroke="#475569" strokeWidth="2.2" />
          <circle cx="378" cy="170" r="3.5" fill="#0F172A" />
          <text x="196" y="166" textAnchor="end" fontSize="17.5" fontWeight="700" fill="#0F172A">
            Hipofisis (TSH)
          </text>
          <text x="196" y="186" textAnchor="end" fontSize="14" fill="#475569">
            (Stimulasi Tiroid)
          </text>

          <line x1="206" y1="340" x2="376" y2="340" stroke="#475569" strokeWidth="2.2" />
          <circle cx="376" cy="340" r="3.5" fill="#B45309" />
          <text x="196" y="336" textAnchor="end" fontSize="18" fontWeight="700" fill="#B45309">
            Kelenjar Tiroid
          </text>
          <text x="196" y="357" textAnchor="end" fontSize="14" fill="#475569">
            (Hormon T3 / T4)
          </text>
        </svg>
      );

    case 'pituitary':
      return (
        <svg
          viewBox="0 0 800 560"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi hipotalamus, kelenjar hipofisis, dan batang otak"
        >
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href={whoHeadEndocrineImg} x="40" y="-10" width="720" height="540" />

          <line x1="392" y1="146" x2="585" y2="146" stroke="#475569" strokeWidth="2.2" />
          <circle cx="392" cy="146" r="3.5" fill="#0F172A" />
          <text x="595" y="143" fontSize="18" fontWeight="700" fill="#0F172A">
            Hipotalamus
          </text>
          <text x="595" y="163" fontSize="14" fill="#475569">
            (Sintesis ADH / Vasopresin)
          </text>

          <line x1="206" y1="170" x2="378" y2="170" stroke="#475569" strokeWidth="2.2" />
          <circle cx="378" cy="170" r="3.5" fill="#0369A1" />
          <text x="196" y="166" textAnchor="end" fontSize="18" fontWeight="700" fill="#0369A1">
            Kelenjar Hipofisis
          </text>
          <text x="196" y="186" textAnchor="end" fontSize="14" fill="#475569">
            (Sela Tursika / Posterior)
          </text>

          <line x1="422" y1="224" x2="585" y2="236" stroke="#475569" strokeWidth="2.2" />
          <circle cx="422" cy="224" r="3.5" fill="#334155" />
          <text x="595" y="234" fontSize="17.5" fontWeight="700" fill="#334155">
            Batang Otak
          </text>
          <text x="595" y="254" fontSize="14" fill="#475569">
            (Area Pencitraan MRI)
          </text>
        </svg>
      );

    case 'kidney-adrenal':
      return (
        <svg
          viewBox="0 0 800 560"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi kelenjar adrenal, ginjal, dan pembuluh darah utama"
        >
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href={whoTorsoKidneyImg} x="40" y="-15" width="720" height="540" />

          <line x1="205" y1="172" x2="342" y2="172" stroke="#475569" strokeWidth="2.2" />
          <circle cx="342" cy="172" r="3.5" fill="#0F172A" />
          <text x="195" y="168" textAnchor="end" fontSize="18" fontWeight="700" fill="#0F172A">
            Kelenjar Adrenal
          </text>
          <text x="195" y="189" textAnchor="end" fontSize="14" fill="#475569">
            (Aldosteron &amp; Ion)
          </text>

          <line x1="488" y1="232" x2="595" y2="232" stroke="#475569" strokeWidth="2.2" />
          <circle cx="488" cy="232" r="3.5" fill="#B91C1C" />
          <text x="605" y="229" fontSize="18" fontWeight="700" fill="#B91C1C">
            Ginjal &amp; Tubulus
          </text>
          <text x="605" y="250" fontSize="14" fill="#475569">
            (Keseimbangan Elektrolit)
          </text>

          <line x1="414" y1="348" x2="595" y2="348" stroke="#475569" strokeWidth="2.2" />
          <circle cx="414" cy="348" r="3.5" fill="#1D4ED8" />
          <text x="605" y="345" fontSize="17.5" fontWeight="700" fill="#1D4ED8">
            Vena / Intravaskular
          </text>
          <text x="605" y="365" fontSize="14" fill="#475569">
            (Koreksi Infus IV)
          </text>
        </svg>
      );

    case 'eye':
      return (
        <svg
          viewBox="0 0 800 540"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi penampang bola mata, kornea, lensa, retina, makula, dan nervus optikus"
        >
          <rect width="800" height="540" fill="#FFFFFF" />
          <image href={whoEyeImg} x="130" y="60" width="540" height="405" />

          <line x1="145" y1="258" x2="205" y2="258" stroke="#475569" strokeWidth="2.2" />
          <circle cx="205" cy="258" r="3.5" fill="#0369A1" />
          <text x="136" y="254" textAnchor="end" fontSize="17.5" fontWeight="700" fill="#0369A1">
            Kornea &amp; Iris
          </text>
          <text x="136" y="274" textAnchor="end" fontSize="13.5" fill="#475569">
            (Segmen Anterior)
          </text>

          <line x1="145" y1="150" x2="275" y2="232" stroke="#475569" strokeWidth="2.2" />
          <circle cx="275" cy="232" r="3.5" fill="#B45309" />
          <text x="136" y="144" textAnchor="end" fontSize="17.5" fontWeight="700" fill="#B45309">
            Lensa Kristalin
          </text>
          <text x="136" y="164" textAnchor="end" fontSize="13.5" fill="#475569">
            (Area Katarak)
          </text>

          <line x1="488" y1="192" x2="628" y2="152" stroke="#475569" strokeWidth="2.2" />
          <circle cx="488" cy="192" r="3.5" fill="#B91C1C" />
          <text x="636" y="148" fontSize="17.5" fontWeight="700" fill="#B91C1C">
            Retina &amp; Kapiler
          </text>
          <text x="636" y="168" fontSize="13.5" fill="#475569">
            (Retinopati)
          </text>

          <line x1="514" y1="278" x2="628" y2="278" stroke="#475569" strokeWidth="2.2" />
          <circle cx="514" cy="278" r="3.5" fill="#D97706" />
          <text x="636" y="274" fontSize="17.5" fontWeight="700" fill="#0F172A">
            Makula
          </text>
          <text x="636" y="294" fontSize="13.5" fill="#475569">
            (Pemindaian OCT)
          </text>

          <line x1="590" y1="334" x2="628" y2="395" stroke="#475569" strokeWidth="2.2" />
          <circle cx="590" cy="334" r="3.5" fill="#0F172A" />
          <text x="636" y="394" fontSize="17.5" fontWeight="700" fill="#334155">
            Nervus Optikus
          </text>
          <text x="636" y="414" fontSize="13.5" fill="#475569">
            (Segmen Posterior)
          </text>
        </svg>
      );

    case 'pancreas-eye':
      return (
        <svg
          viewBox="0 0 800 440"
          className="w-full max-w-[600px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi pankreas Pulau Langerhans dan retina bola mata"
        >
          <rect width="800" height="440" fill="#FFFFFF" />
          <image href={whoTorsoKidneyImg} x="15" y="15" width="380" height="285" />
          <image href={whoEyeImg} x="415" y="28" width="360" height="270" />

          <line x1="226" y1="142" x2="226" y2="335" stroke="#475569" strokeWidth="2.2" />
          <circle cx="226" cy="142" r="3.5" fill="#0369A1" />
          <text x="226" y="362" textAnchor="middle" fontSize="17.5" fontWeight="700" fill="#0F172A">
            Pulau Langerhans Pankreas
          </text>
          <text x="226" y="384" textAnchor="middle" fontSize="14" fill="#475569">
            (Sel Beta · Produksi Insulin)
          </text>

          <line x1="628" y1="168" x2="600" y2="335" stroke="#475569" strokeWidth="2.2" />
          <circle cx="628" cy="168" r="3.5" fill="#B91C1C" />
          <text x="600" y="362" textAnchor="middle" fontSize="17.5" fontWeight="700" fill="#B91C1C">
            Retina &amp; Pembuluh Mata
          </text>
          <text x="600" y="384" textAnchor="middle" fontSize="14" fill="#475569">
            (Komplikasi Retinopati H36.0*)
          </text>
        </svg>
      );

    case 'pancreas-vascular':
      return (
        <svg
          viewBox="0 0 800 440"
          className="w-full max-w-[600px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi pankreas dan pembuluh darah arteri perifer ekstremitas bawah"
        >
          <rect width="800" height="440" fill="#FFFFFF" />
          <image href={whoTorsoKidneyImg} x="15" y="15" width="380" height="285" />
          <image href={whoLegVascularImg} x="410" y="15" width="380" height="285" />

          <line x1="226" y1="142" x2="205" y2="335" stroke="#475569" strokeWidth="2.2" />
          <circle cx="226" cy="142" r="3.5" fill="#0F172A" />
          <text x="205" y="362" textAnchor="middle" fontSize="17.5" fontWeight="700" fill="#0F172A">
            Pankreas (Insulin)
          </text>
          <text x="205" y="384" textAnchor="middle" fontSize="14" fill="#475569">
            (Hiperglikemia Diabetes)
          </text>

          <line x1="600" y1="160" x2="555" y2="335" stroke="#475569" strokeWidth="2.2" />
          <circle cx="600" cy="160" r="3.5" fill="#B91C1C" />
          <line x1="636" y1="268" x2="645" y2="335" stroke="#475569" strokeWidth="2.2" />
          <circle cx="636" cy="268" r="3.5" fill="#991B1B" />
          <text x="600" y="362" textAnchor="middle" fontSize="17.5" fontWeight="700" fill="#B91C1C">
            Arteri Perifer &amp; Kaki
          </text>
          <text x="600" y="384" textAnchor="middle" fontSize="14" fill="#475569">
            (Angiopati, Ulkus &amp; Gangren)
          </text>
        </svg>
      );

    case 'pancreas-nerve':
      return (
        <svg
          viewBox="0 0 800 440"
          className="w-full max-w-[600px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi pankreas, saraf perifer, dan otot rangka tungkai"
        >
          <rect width="800" height="440" fill="#FFFFFF" />
          <image href={whoTorsoKidneyImg} x="15" y="15" width="380" height="285" />
          <image href={whoLegVascularImg} x="410" y="15" width="380" height="285" />

          <line x1="226" y1="142" x2="205" y2="335" stroke="#475569" strokeWidth="2.2" />
          <circle cx="226" cy="142" r="3.5" fill="#0F172A" />
          <text x="205" y="362" textAnchor="middle" fontSize="17.5" fontWeight="700" fill="#0F172A">
            Pankreas (Sel Beta)
          </text>
          <text x="205" y="384" textAnchor="middle" fontSize="14" fill="#475569">
            (Diabetes Melitus)
          </text>

          <line x1="588" y1="158" x2="575" y2="335" stroke="#475569" strokeWidth="2.2" />
          <circle cx="588" cy="158" r="3.5" fill="#B45309" />
          <line x1="566" y1="138" x2="625" y2="335" stroke="#475569" strokeWidth="2" />
          <circle cx="566" cy="138" r="3.5" fill="#B91C1C" />
          <text x="600" y="362" textAnchor="middle" fontSize="17.5" fontWeight="700" fill="#B45309">
            Saraf Perifer &amp; Otot Tungkai
          </text>
          <text x="600" y="384" textAnchor="middle" fontSize="14" fill="#475569">
            (Polineuropati G63.2* / Hantaran EMG)
          </text>
        </svg>
      );

    case 'pancreas-eye-vascular':
      return (
        <svg
          viewBox="0 0 800 390"
          className="w-full max-w-[600px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi komplikasi multipel DM pada pankreas, lensa mata, dan kaki"
        >
          <rect width="800" height="390" fill="#FFFFFF" />
          <image href={whoTorsoKidneyImg} x="5" y="25" width="260" height="195" />
          <image href={whoEyeImg} x="275" y="30" width="250" height="188" />
          <image href={whoLegVascularImg} x="535" y="25" width="260" height="195" />

          <line x1="149" y1="112" x2="135" y2="270" stroke="#475569" strokeWidth="2" />
          <circle cx="149" cy="112" r="3.2" fill="#0F172A" />
          <text x="135" y="295" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0F172A">
            Pankreas (DM)
          </text>
          <text x="135" y="316" textAnchor="middle" fontSize="13" fill="#475569">
            Regulasi Glukosa
          </text>

          <line x1="342" y1="122" x2="400" y2="270" stroke="#475569" strokeWidth="2" />
          <circle cx="342" cy="122" r="3.2" fill="#B45309" />
          <text x="400" y="295" textAnchor="middle" fontSize="16" fontWeight="700" fill="#B45309">
            Lensa Mata (Katarak)
          </text>
          <text x="400" y="316" textAnchor="middle" fontSize="13" fill="#475569">
            Kekeruhan Lensa
          </text>

          <line x1="686" y1="196" x2="665" y2="270" stroke="#475569" strokeWidth="2" />
          <circle cx="686" cy="196" r="3.2" fill="#B91C1C" />
          <text x="665" y="295" textAnchor="middle" fontSize="16" fontWeight="700" fill="#B91C1C">
            Ulkus Perifer
          </text>
          <text x="665" y="316" textAnchor="middle" fontSize="13" fill="#475569">
            Komplikasi Multipel (.7)
          </text>
        </svg>
      );

    case 'gi-nutrition':
      return (
        <svg
          viewBox="0 0 800 560"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi rongga hidung, esofagus, hepar, dan lambung"
        >
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href={whoGiNutritionImg} x="40" y="-10" width="720" height="540" />

          <line x1="205" y1="130" x2="340" y2="130" stroke="#475569" strokeWidth="2.2" />
          <circle cx="340" cy="130" r="3.5" fill="#0E7C7B" />
          <text x="195" y="126" textAnchor="end" fontSize="18" fontWeight="700" fill="#0E7C7B">
            Rongga Hidung
          </text>
          <text x="195" y="147" textAnchor="end" fontSize="14" fill="#475569">
            (Akses Selang NGT)
          </text>

          <line x1="406" y1="265" x2="585" y2="265" stroke="#475569" strokeWidth="2.2" />
          <circle cx="406" cy="265" r="3.5" fill="#334155" />
          <text x="595" y="262" fontSize="18" fontWeight="700" fill="#334155">
            Esofagus
          </text>
          <text x="595" y="282" fontSize="14" fill="#475569">
            (Jalur Nutrisi Enteral)
          </text>

          <line x1="205" y1="395" x2="344" y2="395" stroke="#475569" strokeWidth="2.2" />
          <circle cx="344" cy="395" r="3.5" fill="#B91C1C" />
          <text x="195" y="391" textAnchor="end" fontSize="18" fontWeight="700" fill="#B91C1C">
            Hepar (Hati)
          </text>
          <text x="195" y="411" textAnchor="end" fontSize="14" fill="#475569">
            (Metabolisme Protein)
          </text>

          <line x1="452" y1="432" x2="585" y2="432" stroke="#475569" strokeWidth="2.2" />
          <circle cx="452" cy="432" r="3.5" fill="#0F172A" />
          <text x="595" y="429" fontSize="18" fontWeight="700" fill="#0F172A">
            Lambung (Gaster)
          </text>
          <text x="595" y="449" fontSize="14" fill="#475569">
            (Absorpsi Gizi)
          </text>
        </svg>
      );

    case 'lung':
      return (
        <svg
          viewBox="0 0 800 560"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi trakea, bronkus, dan paru-paru"
        >
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href={whoLungImg} x="40" y="-10" width="720" height="540" />

          <line x1="190" y1="126" x2="386" y2="126" stroke="#475569" strokeWidth="2.2" />
          <circle cx="386" cy="126" r="3.5" fill="#0369A1" />
          <text x="180" y="131" textAnchor="end" fontSize="18" fontWeight="700" fill="#0369A1">
            Trakea
          </text>

          <line x1="190" y1="252" x2="372" y2="252" stroke="#475569" strokeWidth="2.2" />
          <circle cx="372" cy="252" r="3.5" fill="#0E7C7B" />
          <text x="180" y="248" textAnchor="end" fontSize="18" fontWeight="700" fill="#0E7C7B">
            Bronkus &amp; Paru
          </text>
          <text x="180" y="268" textAnchor="end" fontSize="14" fill="#475569">
            (Obstruksi PPOK)
          </text>

          <line x1="504" y1="304" x2="610" y2="304" stroke="#475569" strokeWidth="2.2" />
          <circle cx="504" cy="304" r="3.5" fill="#B91C1C" />
          <text x="618" y="301" fontSize="18" fontWeight="700" fill="#B91C1C">
            Alveoli Paru
          </text>
          <text x="618" y="321" fontSize="14" fill="#475569">
            (Uji Spirometri)
          </text>
        </svg>
      );

    case 'synapse':
      return (
        <svg
          viewBox="0 0 800 520"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi otak, sistem limbik, dan celah sinaps neurotransmiter"
        >
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href={brainLimbicImg} x="110" y="45" width="580" height="435" />

          <line x1="148" y1="168" x2="210" y2="200" stroke="#475569" strokeWidth="2.2" />
          <circle cx="210" cy="200" r="3.5" fill="#0369A1" />
          <text x="140" y="164" textAnchor="end" fontSize="17" fontWeight="700" fill="#0369A1">
            Korteks Prefrontal
          </text>
          <text x="140" y="184" textAnchor="end" fontSize="13.5" fill="#475569">
            &amp; Sistem Limbik
          </text>

          <line x1="538" y1="186" x2="660" y2="148" stroke="#475569" strokeWidth="2.2" />
          <circle cx="538" cy="186" r="3.5" fill="#B45309" />
          <text x="668" y="144" fontSize="17" fontWeight="700" fill="#B45309">
            Neuron Prasinaps
          </text>
          <text x="668" y="164" fontSize="13.5" fill="#475569">
            (Vesikel Neurotransmiter)
          </text>

          <line x1="548" y1="304" x2="660" y2="304" stroke="#475569" strokeWidth="2.2" />
          <circle cx="548" cy="304" r="3.5" fill="#0E7C7B" />
          <text x="668" y="300" fontSize="17" fontWeight="700" fill="#0E7C7B">
            Celah Sinaps
          </text>
          <text x="668" y="320" fontSize="13.5" fill="#475569">
            (5-HT / Dopamin / GABA)
          </text>

          <line x1="564" y1="376" x2="660" y2="412" stroke="#475569" strokeWidth="2.2" />
          <circle cx="564" cy="376" r="3.5" fill="#0F172A" />
          <text x="668" y="408" fontSize="17" fontWeight="700" fill="#0F172A">
            Reseptor Pascasinaps
          </text>
          <text x="668" y="428" fontSize="13.5" fill="#475569">
            (Modulasi Psikiatri)
          </text>
        </svg>
      );

    case 'brain-visual':
      return (
        <svg
          viewBox="0 0 800 520"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi korteks oksipital visual dan jaras optik otak"
        >
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href={whoBrainCortexImg} x="100" y="20" width="600" height="450" />

          <line x1="176" y1="202" x2="276" y2="202" stroke="#475569" strokeWidth="2.2" />
          <circle cx="276" cy="202" r="3.5" fill="#0369A1" />
          <text x="166" y="198" textAnchor="end" fontSize="18" fontWeight="700" fill="#0369A1">
            Orbita &amp; Jaras Optik
          </text>
          <text x="166" y="218" textAnchor="end" fontSize="14" fill="#475569">
            (Input Persepsi Visual)
          </text>

          <line x1="510" y1="226" x2="625" y2="226" stroke="#475569" strokeWidth="2.2" />
          <circle cx="510" cy="226" r="3.5" fill="#B91C1C" />
          <text x="633" y="222" fontSize="18" fontWeight="700" fill="#B91C1C">
            Korteks Oksipital
          </text>
          <text x="633" y="242" fontSize="14" fill="#475569">
            (Pusat Halusinasi Visual)
          </text>
        </svg>
      );

    case 'brain-speech':
      return (
        <svg
          viewBox="0 0 800 520"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi area Broca, area Wernicke, dan laring artikulasi bicara"
        >
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href={whoBrainCortexImg} x="100" y="20" width="600" height="450" />

          <line x1="176" y1="168" x2="345" y2="168" stroke="#475569" strokeWidth="2.2" />
          <circle cx="345" cy="168" r="3.5" fill="#0369A1" />
          <text x="166" y="164" textAnchor="end" fontSize="18" fontWeight="700" fill="#0369A1">
            Area Broca (Frontal)
          </text>
          <text x="166" y="184" textAnchor="end" fontSize="14" fill="#475569">
            (Produksi Bicara)
          </text>

          <line x1="455" y1="196" x2="625" y2="196" stroke="#475569" strokeWidth="2.2" />
          <circle cx="455" cy="196" r="3.5" fill="#B45309" />
          <text x="633" y="192" fontSize="18" fontWeight="700" fill="#B45309">
            Area Wernicke
          </text>
          <text x="633" y="212" fontSize="14" fill="#475569">
            (Pemahaman Bahasa)
          </text>

          <line x1="418" y1="395" x2="625" y2="395" stroke="#475569" strokeWidth="2.2" />
          <circle cx="418" cy="395" r="3.5" fill="#0E7C7B" />
          <text x="633" y="391" fontSize="17.5" fontWeight="700" fill="#0E7C7B">
            Jalur Artikulasi Leher
          </text>
          <text x="633" y="411" fontSize="14" fill="#475569">
            (Terapi Wicara 93.75)
          </text>
        </svg>
      );

    case 'brain-cognition':
      return (
        <svg
          viewBox="0 0 800 520"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi lobus frontal kognitif, girus angularis, dan serebelum"
        >
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href={whoBrainCortexImg} x="100" y="20" width="600" height="450" />

          <line x1="176" y1="152" x2="335" y2="152" stroke="#475569" strokeWidth="2.2" />
          <circle cx="335" cy="152" r="3.5" fill="#0369A1" />
          <text x="166" y="148" textAnchor="end" fontSize="18" fontWeight="700" fill="#0369A1">
            Lobus Frontal
          </text>
          <text x="166" y="168" textAnchor="end" fontSize="14" fill="#475569">
            (Kognisi &amp; Skor IQ)
          </text>

          <line x1="462" y1="168" x2="625" y2="168" stroke="#475569" strokeWidth="2.2" />
          <circle cx="462" cy="168" r="3.5" fill="#B45309" />
          <text x="633" y="164" fontSize="18" fontWeight="700" fill="#B45309">
            Girus Angularis
          </text>
          <text x="633" y="184" fontSize="14" fill="#475569">
            (Membaca &amp; Mengeja)
          </text>

          <line x1="468" y1="286" x2="625" y2="286" stroke="#475569" strokeWidth="2.2" />
          <circle cx="468" cy="286" r="3.5" fill="#0E7C7B" />
          <text x="633" y="282" fontSize="17.5" fontWeight="700" fill="#0E7C7B">
            Serebelum
          </text>
          <text x="633" y="302" fontSize="14" fill="#475569">
            (Fungsi Adaptif)
          </text>
        </svg>
      );

    case 'brain-limbic':
    default:
      return (
        <svg
          viewBox="0 0 800 520"
          className="w-full max-w-[580px] h-auto mx-auto block"
          role="img"
          aria-label="Diagram anatomi korteks prefrontal dan sistem limbik otak"
        >
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href={brainLimbicImg} x="110" y="45" width="580" height="435" />

          <line x1="152" y1="168" x2="212" y2="205" stroke="#475569" strokeWidth="2.2" />
          <circle cx="212" cy="205" r="3.5" fill="#0369A1" />
          <text x="144" y="164" textAnchor="end" fontSize="17.5" fontWeight="700" fill="#0369A1">
            Korteks Prefrontal
          </text>
          <text x="144" y="184" textAnchor="end" fontSize="13.5" fill="#475569">
            (Kontrol Eksekutif)
          </text>

          <line x1="342" y1="74" x2="342" y2="245" stroke="#475569" strokeWidth="2.2" />
          <circle cx="342" cy="245" r="3.5" fill="#B45309" />
          <text x="342" y="46" textAnchor="middle" fontSize="17.5" fontWeight="700" fill="#B45309">
            Sistem Limbik (Amigdala &amp; Hipokampus)
          </text>
          <text x="342" y="64" textAnchor="middle" fontSize="13.5" fill="#475569">
            (Pusat Emosi, Takut &amp; Memori)
          </text>

          <line x1="548" y1="304" x2="660" y2="304" stroke="#475569" strokeWidth="2.2" />
          <circle cx="548" cy="304" r="3.5" fill="#0E7C7B" />
          <text x="668" y="300" fontSize="17" fontWeight="700" fill="#0E7C7B">
            Transmisi Sinaps
          </text>
          <text x="668" y="320" fontSize="13.5" fill="#475569">
            (Modulasi Afek)
          </text>
        </svg>
      );
  }
};

const OrganAnatomyPanel: React.FC<{ q: QuizQuestion; focusedMode: boolean }> = ({
  q,
  focusedMode,
}) => {
  return (
    <div
      className={`rounded-xl border border-sky-200 bg-white ${
        focusedMode ? 'p-4 space-y-2.5' : 'p-3 space-y-2'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-2">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#00669E]">
            Anatomi Organ Terkait Soal
          </span>
          <h4 className="text-sm font-bold text-[#06253B]">{q.organAnatomy}</h4>
        </div>
        <span className="text-[11px] font-semibold text-[#0E7C7B] bg-teal-50 border border-teal-200 rounded-md px-2.5 py-0.5">
          {q.codeType === 'icd9' ? 'Fokus Tindakan Medis' : 'Fokus Patologi Diagnosis'}
        </span>
      </div>

      <div className="rounded-lg bg-gradient-to-b from-[#FAFDFE] to-white border border-slate-100 px-2 py-2">
        <OrganSvgArtwork organType={q.organType} />
      </div>
    </div>
  );
};

export const QuizView: React.FC<QuizViewProps> = ({
  initialFilter = 'all',
  embeddedChapter,
  groupMembers,
  onBreadcrumbChange,
}) => {
  const [filter, setFilter] = useState<QuizFilter>(embeddedChapter ?? initialFilter);
  const [codeTypeFilter, setCodeTypeFilter] = useState<CodeTypeFilter>('all');
  const [activeLevel, setActiveLevel] = useState<LevelSelection>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [inputs, setInputs] = useState<Record<string, QuizAnswerInput>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [validationNotice, setValidationNotice] = useState<Record<string, boolean>>({});
  const [showRecap, setShowRecap] = useState<boolean>(false);

  React.useEffect(() => {
    setFilter(embeddedChapter ?? initialFilter);
    setQuestionIndex(0);
  }, [initialFilter, embeddedChapter]);

  React.useEffect(() => {
    if (!onBreadcrumbChange) return;
    if (activeLevel === null) onBreadcrumbChange('> Exercises');
    else if (activeLevel === 'all-list') onBreadcrumbChange('> Exercises > Semua Soal');
    else {
      const cap = activeLevel.charAt(0).toUpperCase() + activeLevel.slice(1);
      onBreadcrumbChange(`> Exercises > ${cap}`);
    }
  }, [activeLevel, onBreadcrumbChange]);

  const chapterQuestions = useMemo(() => {
    if (filter === 'all') return QUIZ_BANK;
    return QUIZ_BANK.filter((q) => q.chapter === filter);
  }, [filter]);

  const filteredQuestions = useMemo(() => {
    if (codeTypeFilter === 'all') return chapterQuestions;
    return chapterQuestions.filter((q) => q.codeType === codeTypeFilter);
  }, [chapterQuestions, codeTypeFilter]);

  const levelQuestions = useMemo(() => {
    if (!activeLevel || activeLevel === 'all-list') return filteredQuestions;
    return filteredQuestions.filter((q) => q.difficulty === activeLevel);
  }, [filteredQuestions, activeLevel]);

  const getInput = (qid: string): QuizAnswerInput =>
    inputs[qid] || { icd10Primary: '', icd10Secondary: '' };

  const isQuestionFilled = (q: QuizQuestion): boolean => {
    const val = getInput(q.id);
    if (!val.icd10Primary.trim()) return false;
    if (q.icd10SecondaryAccepted && !val.icd10Secondary.trim()) return false;
    return true;
  };

  const evaluateQuestion = (q: QuizQuestion) => {
    const val = getInput(q.id);
    const primaryOk = isCodeMatch(val.icd10Primary, q.icd10PrimaryAccepted);
    const secondaryOk = q.icd10SecondaryAccepted
      ? isCodeMatch(val.icd10Secondary, q.icd10SecondaryAccepted)
      : true;
    const allCodesOk = primaryOk && secondaryOk;
    return { primaryOk, secondaryOk, allCodesOk };
  };

  const getStatsForList = (list: QuizQuestion[]) => {
    const total = list.length;
    let answered = 0;
    let correct = 0;
    list.forEach((q) => {
      const val = inputs[q.id];
      const hasAny =
        val && (val.icd10Primary.trim() !== '' || val.icd10Secondary.trim() !== '');
      if (hasAny) answered += 1;
      if (checked[q.id] && evaluateQuestion(q).allCodesOk) correct += 1;
    });
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, answered, correct, percent };
  };

  const overallStats = useMemo(
    () => getStatsForList(levelQuestions),
    [levelQuestions, inputs, checked]
  );

  const updateField = (qid: string, field: keyof QuizAnswerInput, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [qid]: { ...getInput(qid), [field]: value },
    }));
    setValidationNotice((prev) => ({ ...prev, [qid]: false }));
  };

  const handleCheckOne = (q: QuizQuestion) => {
    if (!isQuestionFilled(q)) {
      setValidationNotice((prev) => ({ ...prev, [q.id]: true }));
      return;
    }
    setValidationNotice((prev) => ({ ...prev, [q.id]: false }));
    setChecked((prev) => ({ ...prev, [q.id]: true }));
  };

  const handleReset = () => {
    setInputs({});
    setChecked({});
    setValidationNotice({});
    setQuestionIndex(0);
  };

  const resolvedMembers = useMemo<GroupMember[]>(() => {
    if (groupMembers && groupMembers.length > 0) return groupMembers;
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
  }, [groupMembers]);

  const recapScopeList = useMemo(
    () => (activeLevel === null ? filteredQuestions : levelQuestions),
    [activeLevel, filteredQuestions, levelQuestions]
  );

  const recapStats = useMemo(() => {
    const allChecked = recapScopeList.filter((q) => checked[q.id]);
    const list = allChecked.length > 0 ? allChecked : recapScopeList;
    const totalScope = recapScopeList.length;
    const checkedCount = allChecked.length;
    let correctCount = 0;
    allChecked.forEach((q) => {
      if (evaluateQuestion(q).allCodesOk) correctCount += 1;
    });
    const scorePct = checkedCount > 0 ? Math.round((correctCount / totalScope) * 100) : 0;
    return { list, totalScope, checkedCount, correctCount, scorePct };
  }, [recapScopeList, checked, inputs]);

  const handleDownloadRecapHtml = () => {
    const nowStr = new Date().toLocaleString('id-ID', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
    const esc = (s: string) =>
      String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const rowsHtml = recapStats.list
      .map((q, idx) => {
        const ans = getInput(q.id);
        const isChk = Boolean(checked[q.id]);
        const ok = isChk && evaluateQuestion(q).allCodesOk;
        const userAns = [ans.icd10Primary.trim(), ans.icd10Secondary.trim()]
          .filter(Boolean)
          .join(' ') || '—';
        const keyAns = `${q.icd10PrimaryDisplay}${q.icd10SecondaryDisplay ? ` ${q.icd10SecondaryDisplay}` : ''}`;
        return `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${esc(q.id)}</strong><br/><small>${esc(q.chapterLabel)} · ${esc(q.difficulty.toUpperCase())}</small><br/><em>${esc(q.title)}</em></td>
            <td><code>${esc(userAns)}</code></td>
            <td><code>${esc(keyAns)}</code></td>
            <td>${isChk ? (ok ? '<strong style="color:#047857;">Tepat</strong>' : '<strong style="color:#b91c1c;">Belum Tepat</strong>') : 'Belum diperiksa'}</td>
            <td>
              <div><strong>(c) Penelusuran:</strong> ${esc(q.leadTermDisplay)}. ${esc(q.traceSteps)}</div>
              <div><strong>(d) Rasionalisasi:</strong> ${esc(q.commonMistakes)}</div>
              <div><small><strong>(e) Rujukan:</strong> ${esc(q.reference)}</small></div>
            </td>
          </tr>`;
      })
      .join('');

    const htmlDoc = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Rekap Hasil Latihan Kodifikasi ICD-10 &amp; ICD-9-CM — Universitas Esa Unggul</title>
  <style>
    body { font-family: Arial, sans-serif; color: #0f172a; margin: 28px; line-height: 1.5; }
    h1 { font-size: 18px; color: #06253b; margin: 0 0 4px; }
    .meta { font-size: 12px; color: #475569; margin-bottom: 16px; }
    .summary { display: flex; gap: 16px; margin-bottom: 18px; flex-wrap: wrap; }
    .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; background: #f8fafc; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; vertical-align: top; }
    th { background: #0a3656; color: #fff; }
    code { font-family: monospace; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Rekap Hasil Latihan Soal Kasus Kodifikasi ICD-10 &amp; ICD-9-CM</h1>
  <div class="meta">Capstone Experience Semester 3 · Prodi D3 Rekam Medis &amp; Informasi Kesehatan — Universitas Esa Unggul · Dicetak: ${esc(nowStr)}</div>
  <div class="summary">
    <div class="card"><strong>Diperiksa:</strong> ${recapStats.checkedCount} / ${recapStats.totalScope} soal</div>
    <div class="card"><strong>Jawaban Tepat:</strong> ${recapStats.correctCount} soal</div>
    <div class="card"><strong>Skor Capaian:</strong> ${recapStats.scorePct}%</div>
  </div>
  <p style="font-size:12px;"><strong>Tim Penyusun:</strong> ${resolvedMembers.map((m) => `${esc(m.name)} (${esc(m.nim)})`).join(' · ')}</p>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>(a) Identitas &amp; Pokok Soal</th>
        <th>Jawaban Anda</th>
        <th>(b) Kunci Resmi</th>
        <th>Status</th>
        <th>(c) Langkah Penelusuran, (d) Rasionalisasi &amp; (e) Sumber Rujukan</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Rekap_Latihan_ICD_UEU.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openLevel = (lvl: LevelSelection) => {
    setActiveLevel(lvl);
    setQuestionIndex(0);
  };

  const icd10Count = chapterQuestions.filter((q) => q.codeType === 'icd10').length;
  const icd9Count = chapterQuestions.filter((q) => q.codeType === 'icd9').length;

  const renderQuestionCard = (q: QuizQuestion, displayNo: number, focusedMode: boolean) => {
    const val = getInput(q.id);
    const isChecked = Boolean(checked[q.id]);
    const evalRes = evaluateQuestion(q);
    const missingNotice = Boolean(validationNotice[q.id]);

    return (
      <article
        key={q.id}
        className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5"
      >
        <OrganAnatomyPanel q={q} focusedMode={focusedMode} />

        {/* Baris Pertanyaan dengan Ikon "?" ala WHO */}
        <div className="flex items-start gap-3.5">
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0284C7] to-[#005F99] text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-sm"
            aria-hidden="true"
          >
            ?
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#00669E] uppercase tracking-wider">
                Identitas Soal: {q.id} · Kasus {displayNo} · {q.chapterLabel} · Level {q.difficulty}
              </span>
              {isChecked && (
                <span
                  className={`text-xs font-bold ${
                    evalRes.allCodesOk ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {evalRes.allCodesOk ? '✓ Jawaban Tepat' : '✗ Belum Tepat'}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#06253B] mt-0.5">{q.title}</h3>
            <p className="text-sm sm:text-base text-slate-800 mt-1.5 leading-relaxed">
              <span className="font-bold text-[#0A3656] text-xs uppercase tracking-wider mr-1.5">
                Pokok Soal:
              </span>
              {q.scenario}
            </p>
          </div>
        </div>

        {/* HANYA Kolom Input Kode + Tombol Centang Biru Bulat (✓) */}
        <div className="pl-0 sm:pl-12 space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-full sm:w-44">
              <label
                htmlFor={`${q.id}-primary`}
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                {q.icd10PrimaryLabel}
              </label>
              <input
                id={`${q.id}-primary`}
                type="text"
                value={val.icd10Primary}
                onChange={(e) => updateField(q.id, 'icd10Primary', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckOne(q);
                }}
                placeholder={q.icd10PrimaryPlaceholder}
                className={`w-full rounded-md border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  isChecked
                    ? evalRes.primaryOk
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-red-400 bg-red-50 text-red-900'
                    : 'border-slate-400 bg-white text-slate-900'
                }`}
              />
            </div>

            {q.icd10SecondaryLabel && (
              <div className="w-full sm:w-44">
                <label
                  htmlFor={`${q.id}-secondary`}
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  {q.icd10SecondaryLabel}
                </label>
                <input
                  id={`${q.id}-secondary`}
                  type="text"
                  value={val.icd10Secondary}
                  onChange={(e) => updateField(q.id, 'icd10Secondary', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckOne(q);
                  }}
                  placeholder={q.icd10SecondaryPlaceholder}
                  className={`w-full rounded-md border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    isChecked
                      ? evalRes.secondaryOk
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-red-400 bg-red-50 text-red-900'
                      : 'border-slate-400 bg-white text-slate-900'
                  }`}
                />
              </div>
            )}

            {/* Tombol Bulat Centang Biru (✓) untuk Mengirim Jawaban */}
            <button
              type="button"
              onClick={() => handleCheckOne(q)}
              title="Kirim & Periksa Jawaban"
              aria-label="Kirim & Periksa Jawaban"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white font-extrabold text-lg flex items-center justify-center shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              ✓
            </button>
          </div>

          {missingNotice && !isChecked && (
            <p className="text-xs font-semibold text-amber-700">
              Isi seluruh kolom kode terlebih dahulu sebelum menekan tombol ✓.
            </p>
          )}

          {/* Jawaban yang Benar + Pembahasan Lampiran 2 KAK (a-e) muncul otomatis setelah dikirim */}
          {isChecked && (
            <div className="rounded-xl border border-sky-200 bg-sky-50/75 p-4 space-y-2 text-sm text-slate-700">
              <p className="text-xs text-slate-600">
                <strong className="text-[#0A3656]">(a) Identitas &amp; Pokok Soal:</strong>{' '}
                {q.id} ({q.chapterLabel} · Level {q.difficulty}) — {q.title}: {q.scenario}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="rounded bg-white border border-sky-300 px-2.5 py-1 font-bold text-[#0A3656]">
                  (b) Kunci Jawaban Resmi ({q.codeType === 'icd9' ? 'ICD-9-CM' : 'ICD-10'}):{' '}
                  {q.icd10PrimaryDisplay}
                  {q.icd10SecondaryDisplay ? ` ${q.icd10SecondaryDisplay}` : ''}
                </span>
              </div>
              <p>
                <strong className="text-[#0A3656]">(c) Langkah Penelusuran (Lead Term → Indeks → Tabular):</strong>{' '}
                {q.leadTermDisplay}. {q.traceSteps}
              </p>
              <p>
                <strong className="text-amber-900">(d) Rasionalisasi Analisis &amp; Kesalahan Umum:</strong>{' '}
                {q.commonMistakes}
              </p>
              <p className="text-xs text-slate-500">
                <strong>(e) Sumber Rujukan:</strong> <em>{q.reference}</em>
              </p>
            </div>
          )}
        </div>
      </article>
    );
  };

  const activeQuestion = levelQuestions[questionIndex] || levelQuestions[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col sm:flex-row">
      {/* Kolom Vertikal Samar Sisi Kiri ala WHO (> Exercises) */}
      <div className="sm:w-14 shrink-0 bg-gradient-to-b from-[#E5F2F2] to-[#F3F9FD] border-b sm:border-b-0 sm:border-r border-slate-200 flex items-center justify-center py-3 sm:py-8">
        <span className="vertical-overview-label text-xl sm:text-2xl font-extrabold tracking-[0.14em] text-[#00669E]/30 select-none">
          Exercises
        </span>
      </div>

      <div className="flex-1 p-5 sm:p-7 space-y-5 min-w-0">
        {/* Filter Bab & Jenis Kode (10 ICD-10 + 10 ICD-9-CM per Bab) */}
        <div className="flex flex-col gap-3 pb-3 border-b border-slate-200">
          {!embeddedChapter && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter Bab Soal">
                {[
                  { key: 'all' as QuizFilter, label: `Semua Bab (${QUIZ_BANK.length})` },
                  {
                    key: 'bab4' as QuizFilter,
                    label: `Bab IV: E00–E90 (${QUIZ_BANK.filter((q) => q.chapter === 'bab4').length})`,
                  },
                  {
                    key: 'bab5' as QuizFilter,
                    label: `Bab V: F00–F99 (${QUIZ_BANK.filter((q) => q.chapter === 'bab5').length})`,
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setFilter(item.key);
                      setQuestionIndex(0);
                    }}
                    className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      filter === item.key
                        ? 'bg-[#00669E] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-sky-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter Jenis Klasifikasi">
              {[
                { key: 'all' as CodeTypeFilter, label: `Semua Jenis (${chapterQuestions.length})` },
                { key: 'icd10' as CodeTypeFilter, label: `Diagnosis ICD-10 (${icd10Count})` },
                { key: 'icd9' as CodeTypeFilter, label: `Prosedur ICD-9-CM (${icd9Count})` },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setCodeTypeFilter(item.key);
                    setQuestionIndex(0);
                  }}
                  className={`whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    codeTypeFilter === item.key
                      ? 'bg-[#0E7C7B] text-white'
                      : 'bg-teal-50/70 text-[#0A3656] border border-teal-200 hover:bg-teal-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowRecap((v) => !v)}
                className="rounded-lg bg-[#0A3656] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#00669E] transition-colors cursor-pointer"
              >
                {showRecap ? '✕ Tutup Rekap Latihan' : '🖨 Cetak / Simpan Rekap Hasil Latihan'}
              </button>
              {activeLevel !== null && (
                <button
                  type="button"
                  onClick={() => setActiveLevel(null)}
                  className="rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-[#0A3656] hover:bg-sky-100 cursor-pointer"
                >
                  ← Pilih Level (Easy / Medium / Difficult)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= PANEL REKAP HASIL LATIHAN (PRINT / SIMPAN HTML) ================= */}
        {showRecap && (
          <section
            id="print-recap-sheet"
            className="rounded-2xl border-2 border-[#00669E] bg-[#F8FBFE] p-5 sm:p-6 space-y-4"
            aria-label="Rekap Hasil Latihan Soal"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-sky-200 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00669E]">
                  Rekapitulasi Evaluasi · Lampiran 2 KAK
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#06253B]">
                  Rekap Hasil Latihan Kodifikasi ICD-10 &amp; ICD-9-CM
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Penyusun: {resolvedMembers[0]?.name} ({resolvedMembers[0]?.nim}) · Prodi D3 RMIK Universitas Esa Unggul
                </p>
              </div>
              <div className="flex flex-wrap gap-2 no-print">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-lg bg-[#0A3656] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#00669E] cursor-pointer"
                >
                  🖨 Cetak / Simpan PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadRecapHtml}
                  className="rounded-lg bg-[#0E7C7B] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0A6261] cursor-pointer"
                >
                  ⬇ Simpan Rekap (.html)
                </button>
                <button
                  type="button"
                  onClick={() => setShowRecap(false)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs tabular-nums">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="block text-slate-500">Soal Diperiksa (Filter Aktif)</span>
                <strong className="text-base text-[#06253B]">
                  {recapStats.checkedCount} / {recapStats.totalScope} Soal
                </strong>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <span className="block text-slate-500">Jawaban Tepat</span>
                <strong className="text-base text-emerald-700">
                  {recapStats.correctCount} Soal
                </strong>
              </div>
              <div className="rounded-lg border border-teal-200 bg-teal-50 p-3">
                <span className="block text-teal-800">Skor Capaian</span>
                <strong className="text-base text-teal-950">{recapStats.scorePct}%</strong>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0A3656] text-white">
                    <th className="py-2 px-3">No</th>
                    <th className="py-2 px-3">(a) Identitas &amp; Pokok Soal</th>
                    <th className="py-2 px-3">Isian Anda</th>
                    <th className="py-2 px-3">(b) Kunci Resmi</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">(c) Penelusuran, (d) Rasionalisasi &amp; (e) Rujukan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recapStats.list.map((q, idx) => {
                    const ans = getInput(q.id);
                    const isChk = Boolean(checked[q.id]);
                    const ok = isChk && evaluateQuestion(q).allCodesOk;
                    const userAns =
                      [ans.icd10Primary.trim(), ans.icd10Secondary.trim()]
                        .filter(Boolean)
                        .join(' ') || '—';
                    return (
                      <tr key={q.id} className="even:bg-slate-50/70 align-top">
                        <td className="py-2 px-3 font-mono">{idx + 1}</td>
                        <td className="py-2 px-3">
                          <span className="font-bold text-[#0A3656] block">{q.id}</span>
                          <span className="font-semibold text-slate-900 block">{q.title}</span>
                          <span className="text-slate-600">{q.scenario}</span>
                        </td>
                        <td className="py-2 px-3 font-mono font-semibold">{userAns}</td>
                        <td className="py-2 px-3 font-mono font-bold text-[#00669E]">
                          {q.icd10PrimaryDisplay}
                          {q.icd10SecondaryDisplay ? ` ${q.icd10SecondaryDisplay}` : ''}
                        </td>
                        <td className="py-2 px-3 whitespace-nowrap font-bold">
                          {isChk ? (
                            ok ? (
                              <span className="text-emerald-700">✓ Tepat</span>
                            ) : (
                              <span className="text-red-700">✗ Belum Tepat</span>
                            )
                          ) : (
                            <span className="text-slate-400">Belum dicek</span>
                          )}
                        </td>
                        <td className="py-2 px-3 space-y-1 text-slate-700">
                          <div>
                            <strong>(c)</strong> {q.leadTermDisplay}. {q.traceSteps}
                          </div>
                          <div>
                            <strong>(d)</strong> {q.commonMistakes}
                          </div>
                          <div className="text-slate-500">
                            <strong>(e)</strong> <em>{q.reference}</em>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ================= TAMPILAN 1: HUB LEVEL KESULITAN (EASY / MEDIUM / DIFFICULT) ================= */}
        {activeLevel === null && (
          <div className="space-y-6">
            <div className="space-y-1.5 text-sm sm:text-base text-slate-700 max-w-3xl">
              <p>
                Latihan soal isian non-pilihan ganda terdiri atas <strong>10 soal ICD-10</strong> dan{' '}
                <strong>10 soal ICD-9-CM</strong> per bab.
              </p>
              <p className="text-xs sm:text-sm text-slate-600">
                Ketik kode pada kolom isian lalu klik tombol centang biru (<strong>✓</strong>) untuk mengirim jawaban dan melihat kunci jawaban yang benar beserta pembahasannya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {LEVEL_META.map((lvl) => {
                const list = filteredQuestions.filter((q) => q.difficulty === lvl.key);
                const st = getStatsForList(list);
                return (
                  <button
                    key={lvl.key}
                    type="button"
                    onClick={() => openLevel(lvl.key)}
                    className="group rounded-2xl border border-sky-200/90 bg-gradient-to-b from-white to-[#F5FAFE] p-5 text-center hover:border-[#00669E] hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-between gap-3"
                  >
                    <FolderStackIllustration label={lvl.label} layers={lvl.stackLayers} />
                    <div className="space-y-1">
                      <span className="block text-xs font-semibold text-[#00669E] tabular-nums">
                        {list.length} Soal · {st.correct}/{st.total} Tepat
                      </span>
                      <span className="block text-xs text-slate-600 leading-snug">
                        {lvl.subtitle}
                      </span>
                    </div>
                    <span className="inline-block rounded-lg bg-[#0A3656] px-4 py-1.5 text-xs font-semibold text-white group-hover:bg-[#00669E] transition-colors">
                      Mulai Level {lvl.label} →
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm text-slate-600">
              <span>
                Disarankan menyelesaikan mulai dari <strong>Easy</strong> lalu <strong>Medium</strong> dan{' '}
                <strong>Difficult</strong>.
              </span>
              <button
                type="button"
                onClick={() => openLevel('all-list')}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#0A3656] hover:bg-sky-50 cursor-pointer"
              >
                Atau Tampilkan Semua {filteredQuestions.length} Soal Sekaligus →
              </button>
            </div>
          </div>
        )}

        {/* ================= TAMPILAN 2: SOAL FOKUS PER LEVEL / DAFTAR LENGKAP ================= */}
        {activeLevel !== null && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-[#0A3656] capitalize">
                  {activeLevel === 'all-list'
                    ? `Semua Soal (${levelQuestions.length})`
                    : `Level ${activeLevel} (${questionIndex + 1} / ${levelQuestions.length})`}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openLevel(activeLevel === 'all-list' ? 'easy' : 'all-list')
                  }
                  className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-sky-50 cursor-pointer"
                >
                  {activeLevel === 'all-list' ? 'Mode Fokus 1 Soal' : 'Lihat Semua Soal'}
                </button>
              </div>

              <div className="flex items-center gap-2.5 tabular-nums text-xs" aria-live="polite">
                <span className="rounded-md bg-white border border-slate-200 px-2.5 py-1 font-semibold text-slate-700">
                  Diisi: {overallStats.answered}/{overallStats.total}
                </span>
                <span className="rounded-md bg-white border border-slate-200 px-2.5 py-1 font-semibold text-emerald-700">
                  Tepat: {overallStats.correct}
                </span>
                <span className="rounded-md bg-teal-50 border border-teal-200 px-2.5 py-1 font-bold text-teal-900">
                  {overallStats.percent}%
                </span>
              </div>
            </div>

            {activeLevel !== 'all-list' && activeQuestion && (
              <div className="space-y-4">
                {renderQuestionCard(activeQuestion, questionIndex + 1, true)}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={questionIndex <= 0}
                    onClick={() => setQuestionIndex((i) => Math.max(0, i - 1))}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                  >
                    ← Soal Sebelumnya
                  </button>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {levelQuestions.map((q, idx) => (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setQuestionIndex(idx)}
                        className={`w-7 h-7 rounded-full text-xs font-bold tabular-nums cursor-pointer transition-colors ${
                          idx === questionIndex
                            ? 'bg-[#00669E] text-white'
                            : checked[q.id] && evaluateQuestion(q).allCodesOk
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : checked[q.id]
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : 'bg-slate-100 text-slate-700 hover:bg-sky-100'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  {questionIndex < levelQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setQuestionIndex((i) => Math.min(levelQuestions.length - 1, i + 1))
                      }
                      className="rounded-lg bg-[#00669E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A3656] cursor-pointer"
                    >
                      Soal Berikutnya →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveLevel(null)}
                      className="rounded-lg bg-[#0E7C7B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A6261] cursor-pointer"
                    >
                      Selesai &amp; Pilih Level Lain →
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeLevel === 'all-list' && (
              <div className="space-y-4">
                {levelQuestions.map((q, idx) => renderQuestionCard(q, idx + 1, false))}
              </div>
            )}

            {/* Footer Aksi */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                ↻ Ulangi Latihan
              </button>
              <button
                type="button"
                onClick={() => setShowRecap(true)}
                className="rounded-lg bg-[#0A3656] px-4 py-2 text-xs font-semibold text-white hover:bg-[#00669E] transition-colors cursor-pointer"
              >
                🖨 Cetak / Simpan Rekap Hasil Latihan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
