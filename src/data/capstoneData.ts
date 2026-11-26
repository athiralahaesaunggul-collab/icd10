export interface GroupMember {
  no: number;
  name: string;
  nim: string;
  role: string;
}

export interface CodeBlockItem {
  range: string;
  title: string;
  examples: string;
}

export interface CodingCaseStudy {
  no: number;
  title: string;
  scenario: string;
  icd10Code: string;
  icd10Steps: string[];
  icd9Procedures: {
    code: string;
    name: string;
    trace: string;
  }[];
  rationale: string;
}

export interface TerminologyRow {
  term: string;
  prefix: string;
  root: string;
  suffix: string;
  organRef: string;
  meaning: string;
}

export interface PharmaCardItem {
  diagnosisGroup: string;
  organTag: 'pancreas' | 'thyroid' | 'brain' | 'synapse';
  genericName: string;
  brandExamples: string;
  drugClass: string;
  dosageFormRoute: string;
  relatedDisease: string;
  educationalUse: string;
  mechanism: string;
  reference: string;
}

export interface DiseaseProfileItem {
  name: string;
  icdCode: string;
  definition: string;
  chapterRelation: string;
}

export interface CodingGuideSection {
  vol2Summary: string[];
  leadTermGuidance: string;
  tabularInspection: string;
  icd9Subchapter: {
    purpose: string;
    sampleProcedure: string;
    traceSteps: string;
    selectionRationale: string;
  };
}

export interface ChapterData {
  id: 'ch4' | 'ch5';
  numberRoman: 'IV' | 'V';
  codeRange: string;
  titleEn: string;
  titleId: string;
  subtitle: string;
  metaTags: string[];
  inclSummary: string[];
  exclSummary: string[];
  daggerAsteriskCategories: string[];
  learningObjectives: string[];
  codeBlocks: CodeBlockItem[];
  statisticsContext: string;
  excludesNotes: string[];
  specialRules: string[];
  codingGuide: CodingGuideSection;
  cases: CodingCaseStudy[];
  diseaseProfiles: DiseaseProfileItem[];
  terminology: TerminologyRow[];
  pharmacology: PharmaCardItem[];
}

export type QuizDifficulty = 'easy' | 'medium' | 'difficult';
export type QuizCodeType = 'icd10' | 'icd9';
export type QuizOrganType =
  | 'pancreas-eye'
  | 'pancreas-vascular'
  | 'pancreas-nerve'
  | 'pancreas-eye-vascular'
  | 'thyroid'
  | 'thyroid-brain'
  | 'kidney-adrenal'
  | 'pituitary'
  | 'eye'
  | 'gi-nutrition'
  | 'brain-limbic'
  | 'brain-visual'
  | 'brain-speech'
  | 'brain-cognition'
  | 'synapse'
  | 'lung';

export interface QuizQuestion {
  id: string;
  chapter: 'bab4' | 'bab5';
  chapterLabel: string;
  codeType: QuizCodeType;
  difficulty: QuizDifficulty;
  caseIcon: 'endocrine' | 'nutrition' | 'eye-nerve' | 'maternal' | 'brain' | 'phobia' | 'respiratory' | 'dementia';
  organType: QuizOrganType;
  organAnatomy: string;
  title: string;
  scenario: string;
  icd10PrimaryLabel: string;
  icd10PrimaryAccepted: string[];
  icd10PrimaryDisplay: string;
  icd10PrimaryPlaceholder: string;
  icd10SecondaryLabel?: string;
  icd10SecondaryAccepted?: string[];
  icd10SecondaryDisplay?: string;
  icd10SecondaryPlaceholder?: string;
  icd9Label?: string;
  icd9Accepted?: string[];
  icd9Display?: string;
  icd9Placeholder?: string;
  leadTermDisplay: string;
  traceSteps: string;
  commonMistakes: string;
  reference: string;
}

export const INITIAL_GROUP_MEMBERS: GroupMember[] = [
  {
    no: 1,
    name: 'Athira Laha Afaf Yudia',
    nim: '20250306001',
    role: 'Koordinator Kelompok & PJ Coding Review',
  },
  {
    no: 2,
    name: '[Nama Anggota Kelompok 2]',
    nim: '[NIM Anggota 2]',
    role: 'PJ Medical Science & Terminologi Medis',
  },
  {
    no: 3,
    name: '[Nama Anggota Kelompok 3]',
    nim: '[NIM Anggota 3]',
    role: 'PJ Farmakologi Edukatif & Soal Latihan',
  },
  {
    no: 4,
    name: '[Nama Anggota Kelompok 4]',
    nim: '[NIM Anggota 4]',
    role: 'Pengembang Aplikasi & Pemeriksa Akhir (QA)',
  },
];

export const COURSE_INTEGRATION = [
  {
    course: 'RKE313 Algoritma dan Pemrograman',
    contribution:
      'Merancang alur logika aplikasi, navigasi modul bertingkat, kontrol sub-tab, simulasi diagram interaktif, filter soal, serta kalkulasi skor otomatis.',
  },
  {
    course: 'RKE326 Kodifikasi',
    contribution:
      'Memastikan ketepatan alur penelusuran WHO (Lead Term → Indeks Alfabetis Vol. 3 → Daftar Tabular Vol. 1) serta pembedaan tegas antara ICD-10 (diagnosis) dan ICD-9-CM (prosedur).',
  },
  {
    course: 'RKE325 Patofisiologi dan Terminologi',
    contribution:
      'Menyajikan anatomi, fisiologi normal, patofisiologi gangguan endokrin-metabolik dan psikiatri, serta bedah struktur kata medis (prefix, root, suffix).',
  },
  {
    course: 'RKE361 Farmakologi',
    contribution:
      'Menelaah nama generik, golongan farmakologis, dan mekanisme hubungan edukatif obat–penyakit tanpa mencantumkan anjuran resep atau dosis klinis.',
  },
  {
    course: 'RKE352 Statistik Pelayanan Kesehatan',
    contribution:
      'Mengintegrasikan konteks morbiditas dan validitas pelaporan rutin rumah sakit (INA-CBGs & platform nasional SATUSEHAT Kemenkes RI).',
  },
  {
    course: 'RKE330 Organisasi dan Manajemen',
    contribution:
      'Mengelola pembagian peran tim, kontrol mutu substansi materi (QA), serta dokumentasi daftar pustaka dan versi klasifikasi.',
  },
];

export const CHAPTER_DATA: Record<'ch4' | 'ch5', ChapterData> = {
  ch4: {
    id: 'ch4',
    numberRoman: 'IV',
    codeRange: 'E00–E90',
    titleEn: 'Endocrine, Nutritional and Metabolic Diseases',
    titleId: 'Penyakit Endokrin, Nutrisi, dan Metabolik',
    subtitle:
      'Pemahaman kaidah kodifikasi endokrin–metabolik, sistem Dagger/Asterisk, tindakan ICD-9-CM, biomedis, dan farmakologi edukatif.',
    metaTags: ['8 Blok Utama', 'Subdivisi Karakter ke-4 DM', 'Dagger (†) & Asterisk (*)'],
    inclSummary: [
      'Penyakit kelenjar endokrin (tiroid, pankreas, paratiroid, hipofisis, adrenal, gonad).',
      'Malnutrisi energi-protein (Kwashiorkor, Marasmus) serta defisiensi vitamin & mineral.',
      'Obesitas, hiperalimentasi, gangguan metabolisme karbohidrat, lipid, dan elektrolit.',
    ],
    exclSummary: [
      'Komplikasi kehamilan, persalinan, dan masa nifas termasuk DM gestasional (O24.- → Bab XV).',
      'Gangguan endokrin dan metabolik transien yang khas pada masa perinatal/neonatus (P70–P74 → Bab XVI).',
      'Gejala, tanda, dan temuan abnormal laboratorium yang belum terdiagnosis (R00–R99 → Bab XVIII).',
    ],
    daggerAsteriskCategories: [
      'E35* — Disorders of endocrine glands in diseases classified elsewhere (kategori asterisk Bab IV)',
      'E90* — Nutritional and metabolic disorders in diseases classified elsewhere (kategori asterisk Bab IV)',
      'E10–E14 (.2†) → N08.3* (Nefropati diabetik pada gangguan glomerular)',
      'E10–E14 (.3†) → H36.0* (Retinopati diabetik) & H28.0* (Katarak diabetik)',
      'E10–E14 (.4†) → G63.2* (Polineuropati diabetik) · (.5†) → I79.2* (Angiopati perifer)',
    ],
    learningObjectives: [
      'Menjelaskan ruang lingkup klasifikasi gangguan kelenjar endokrin, malnutrisi, dan kelainan metabolik pada rentang kode E00–E90.',
      'Menerapkan subdivisi karakter ke-4 khusus Diabetes Melitus (E10–E14) serta pasangan kode etiologi Dagger (†) dan manifestasi Asterisk (*).',
      'Mengidentifikasi catatan Excludes Bab IV, seperti diabetes gestasional (O24.-) dan gangguan metabolik transien neonatus (P70–P74).',
      'Menelusuri dan memisahkan kode prosedur medis pada ICD-9-CM Volume 3 (mis. OCT retina, USG tiroid, pemasangan NGT, debridemen, EMG/NCV).',
    ],
    codeBlocks: [
      {
        range: 'E00–E07',
        title: 'Disorders of thyroid gland',
        examples: 'Sindrom defisiensi yodium kongenital (E00.0, E00.1), Tiroiditis akut (E06.0)',
      },
      {
        range: 'E10–E14',
        title: 'Diabetes mellitus',
        examples: 'DM Tipe 1 dengan retinopati (E10.3† H36.0*), DM dengan polineuropati (E10.4† G63.2*), DM dengan gangren (E14.5)',
      },
      {
        range: 'E15–E16',
        title: 'Other disorders of glucose regulation & pancreatic internal secretion',
        examples: 'Koma hipoglikemik non-diabetik (E15), Hipoglikemia tak spesifik (E16.2)',
      },
      {
        range: 'E20–E35',
        title: 'Disorders of other endocrine glands',
        examples: 'Diabetes insipidus (E23.2), Sindrom Cushing (E24.-)',
      },
      {
        range: 'E40–E46',
        title: 'Malnutrition',
        examples: 'Kwashiorkor (E40), Marasmus nutrisional (E41), Marasmic kwashiorkor (E42)',
      },
      {
        range: 'E50–E64',
        title: 'Other nutritional deficiencies',
        examples: 'Defisiensi vitamin A (E50.-), Defisiensi vitamin D (E55.-)',
      },
      {
        range: 'E65–E68',
        title: 'Obesity and other hyperalimentation',
        examples: 'Obesitas akibat kelebihan kalori (E66.0)',
      },
      {
        range: 'E70–E90',
        title: 'Metabolic disorders',
        examples: 'Gangguan metabolisme lipoprotein (E78.-), Ketidakseimbangan elektrolit (E87.8)',
      },
    ],
    statisticsContext:
      'Penyakit endokrin-metabolik kronis—terutama Diabetes Melitus beserta komplikasi mikrovaskular dan makrovaskularnya—menyumbang proporsi beban morbiditas rawat jalan/rawat inap serta berkontribusi signifikan terhadap mortalitas (termasuk koma ketoasidosis dan komplikasi kardiovaskular-renal) di Indonesia. Ketepatan penentuan karakter ke-4 (.0 s.d. .9), pasangan Dagger (†)/Asterisk (*), dan pemisahan kode prosedur ICD-9-CM sangat krusial bagi validitas pelaporan nasional SATUSEHAT Kemenkes RI (ICD-10 versi 2010) dan pengelompokan pembiayaan INA-CBGs.',
    excludesNotes: [
      'Komplikasi kehamilan, persalinan, dan nifas: Diabetes Melitus dalam kehamilan dikode ke Bab XV (O24.-), bukan E10–E14.',
      'Gangguan endokrin dan metabolik sementara yang khas pada periode perinatal/neonatus dikode ke Bab XVI (P70–P74).',
      'Gejala dan temuan laboratorium abnormal tanpa diagnosis pasti (misalnya glukosuria terisolasi) dikode ke Bab XVIII (R00–R99).',
      'Penyakit infeksi spesifik seperti tiroiditis akibat kuman tertentu dapat memerlukan kode tambahan Bab I (B95–B97) untuk mengidentifikasi agen infeksi.',
    ],
    specialRules: [
      'Subdivisi Karakter ke-4 pada E10–E14: .0 dengan koma | .1 dengan ketoasidosis | .2 komplikasi ginjal († N08.3*) | .3 komplikasi oftalmik († H36.0* retinopati, † H28.0* katarak) | .4 komplikasi neurologis († G63.2* polineuropati) | .5 komplikasi sirkulasi perifer (gangren, angiopati perifer † I79.2*) | .7 komplikasi multipel.',
      'Pemilihan Kategori E10–E14: E10 untuk Insulin-dependent (Tipe 1), E11 untuk Non-insulin-dependent (Tipe 2), dan E14 untuk Unspecified DM apabila dokumen medis tidak merinci tipe DM.',
      'Aturan Komplikasi Multipel (.7): Jika terdapat lebih dari satu komplikasi (mis. ulkus diabetikum + katarak), gunakan .7 sebagai kode utama dan dapat ditambahkan subkategori spesifik untuk merinci masing-masing manifestasi.',
      'Kaidah Dagger (†) dan Asterisk (*): Kode etiologi (†) selalu menjadi kode primer, diikuti kode manifestasi organ (*). Kode bertanda bintang (*) tidak pernah berdiri sendiri sebagai diagnosis utama.',
    ],
    codingGuide: {
      vol2Summary: [
        'WHO ICD-10 Volume 2 menetapkan bahwa kategori Diabetes Melitus (E10–E14) dipilih berdasarkan tipe klinis yang tertulis di rekam medis (E10 untuk Tipe 1/IDDM, E11 untuk Tipe 2/NIDDM, dan E14 hanya bila tipe tidak dirinci).',
        'Kondisi endokrin-metabolik yang terjadi khusus selama kehamilan, persalinan, atau masa nifas wajib dialihkan ke Bab XV (O24.-), sedangkan gangguan metabolik sementara neonatus ke Bab XVI (P70–P74).',
        'Jika terdapat komplikasi organ multipel pada satu episode Diabetes Melitus, kode utama diarahkan ke subdivisi karakter ke-4 .7 (With multiple complications), diikuti rincian komplikasi bila diperlukan.',
      ],
      leadTermGuidance:
        'Penelusuran dimulai dari kondisi/penyakit utama sebagai Lead Term di ICD-10 Volume 3 (Alphabetical Index Section I), misalnya "Diabetes, diabetic", "Thyroiditis", "Kwashiorkor", "Syndrome (iodine-deficiency)", atau "Imbalance (electrolyte)", lalu disaring melalui modifier esensial (type 1, with retinopathy, acute, congenital, insipidus) sebelum memverifikasi hasilnya pada Daftar Tabular Volume 1.',
      tabularInspection:
        'Pada Daftar Tabular Volume 1 blok E00–E90, koder wajib memeriksa catatan Includes (mis. E06.0 mencakup abses tiroid), Excludes (mis. E23.2 mengecualikan Diabetes Insipidus nefrogenik N25.1), instruksi "Use additional code" (B95–B97 untuk agen infeksi bakteri), serta penanda wajib Dagger (†) dan Asterisk (*) pada komplikasi DM.',
      icd9Subchapter: {
        purpose:
          'Kode prosedur ICD-9-CM Volume 3 berfungsi mendokumentasikan seluruh tindakan diagnostik penunjang, terapi medis non-operatif, maupun intervensi bedah pada pasien Bab IV secara terpisah dan tidak pernah menggantikan kode diagnosis ICD-10.',
        sampleProcedure: 'Pemasangan selang nasogastrik (NGT) untuk nutrisi enteral pada pasien Marasmus Kwashiorkor (E42) → Kode ICD-9-CM: 96.07.',
        traceSteps:
          '1) Tentukan Lead Term tindakan pada Alphabetic Index to Procedures: "Insertion" → 2) Telusuri subterm "tube" → "nasogastric (feeding/decompression)" → kandidat kode 96.07 → 3) Verifikasi pada Tabular List Procedures kategori 96.07 (Insertion of other (naso-)gastric tube) serta periksa catatan Excludes agar tidak tertukar dengan intubasi endotrakeal (96.04).',
        selectionRationale:
          'Kode 96.07 dipilih karena bersifat numerik khusus tindakan pemasangan selang lambung untuk pemberian nutrisi enteral (yang dapat dilengkapi 96.6 bila mencatat infus nutrisi enteral), melengkapi diagnosis E42 pada berkas rekam medis.',
      },
    },
    cases: [
      {
        no: 1,
        title: 'DM Tipe 1 dengan Retinopathy',
        scenario: 'Ny. A (fiktif) dengan diagnosis Diabetes Melitus Tipe 1 disertai Retinopati Diabetik, menjalani funduskopi, OCT mata, dan laser fotokoagulasi retina.',
        icd10Code: 'E10.3† H36.0*',
        icd10Steps: [
          'Lead Term: "Diabetes, diabetic" dengan modifier "type 1 (insulin-dependent)" dan "with retinopathy".',
          'Indeks Alfabetis (Vol. 3): Diabetes → type 1 → with → retinopathy → merujuk ke E10.3† H36.0*.',
          'Verifikasi Tabular (Vol. 1): E10.3 = Insulin-dependent diabetes mellitus with ophthalmic complications; catatan di bawah E10.3 merujuk Diabetic retinopathy (H36.0*).',
        ],
        icd9Procedures: [
          {
            code: '16.21',
            name: 'Ophthalmoscopy (pemeriksaan funduskopi)',
            trace: 'Lead Term "Ophthalmoscopy" → Indeks Prosedur → Tabular 16.21.',
          },
          {
            code: '95.16',
            name: 'Tomographic scan of eye / Optical Coherence Tomography (OCT)',
            trace: 'Lead Term "Tomography" → optical coherence → Tabular 95.16.',
          },
          {
            code: '14.24',
            name: 'Destruction of chorioretinal lesion by laser photocoagulation',
            trace: 'Lead Term "Photocoagulation" → retina → chorioretinal lesion → Tabular 14.24.',
          },
        ],
        rationale:
          'E10.3† ditetapkan sebagai kode utama etiologi DM Tipe 1 dengan komplikasi mata, dan H36.0* sebagai kode manifestasi wajib pada retina. Tindakan pemeriksaan dan terapi laser retina dikode terpisah pada ICD-9-CM.',
      },
      {
        no: 2,
        title: 'Tiroiditis Akut dengan Abses akibat Kuman Staphylococcus',
        scenario: 'Tn. B (fiktif) didiagnosis Tiroiditis Akut disertai abses kelenjar tiroid akibat infeksi bakteri Staphylococcus.',
        icd10Code: 'E06.0 + B95.8',
        icd10Steps: [
          'Lead Term: "Thyroiditis" dengan modifier "acute" atau "abscess".',
          'Indeks Alfabetis (Vol. 3): Thyroiditis → acute (suppurative) → E06.0. Untuk kuman penyebab: Infection → staphylococcal → as cause of disease classified elsewhere → B95.8 (atau B95.6 bila spesifik S. aureus).',
          'Verifikasi Tabular (Vol. 1): E06.0 (Acute thyroiditis) memiliki catatan Includes: Abscess of thyroid dan instruksi "Use additional code (B95–B97), if desired, to identify infectious agent".',
        ],
        icd9Procedures: [
          {
            code: '88.71',
            name: 'Diagnostic ultrasound of head and neck (USG tiroid)',
            trace: 'Lead Term "Ultrasonography" → head and neck → Tabular 88.71.',
          },
          {
            code: '06.11',
            name: 'Closed [percutaneous] [needle] biopsy of thyroid (aspirasi jarum halus)',
            trace: 'Lead Term "Biopsy" → thyroid → percutaneous (needle) → Tabular 06.11.',
          },
          {
            code: '06.09',
            name: 'Other incision of thyroid field (insisi dan drainase abses tiroid)',
            trace: 'Lead Term "Incision" → thyroid (field) → drainage → Tabular 06.09.',
          },
        ],
        rationale:
          'Abses tiroid sudah tercakup dalam catatan Includes E06.0 sehingga tidak dikode terpisah sebagai abses leher. Kode B95.8 ditambahkan sebagai informasi agen infeksi.',
      },
      {
        no: 3,
        title: 'Elektrolit Imbalance',
        scenario: 'Ny. C (fiktif) dirawat dengan gangguan ketidakseimbangan elektrolit (tanpa rincian spesifik jenis ion) dan menerima koreksi infus elektrolit.',
        icd10Code: 'E87.8',
        icd10Steps: [
          'Lead Term: "Imbalance" → modifier "electrolyte".',
          'Indeks Alfabetis (Vol. 3): Imbalance → electrolyte → E87.8.',
          'Verifikasi Tabular (Vol. 1): E87.8 = Other disorders of electrolyte and fluid balance, not elsewhere classified (Includes: Electrolyte imbalance NOS).',
        ],
        icd9Procedures: [
          {
            code: '99.18',
            name: 'Injection or infusion of electrolytes',
            trace: 'Lead Term "Infusion" → electrolytes → Tabular 99.18.',
          },
        ],
        rationale:
          'Karena jenis ketidakseimbangan spesifik (seperti hipokalemia E87.6 atau hiponatremia E87.1) tidak dirinci, maka E87.8 merupakan kode yang akurat pada blok E70–E90.',
      },
      {
        no: 4,
        title: 'DM dengan Komplikasi Gangrene dan Periferal Angiopathy',
        scenario: 'Tn. D (fiktif) menderita DM (tipe tidak dirinci) disertai gangren jari kaki dan angiopati perifer.',
        icd10Code: 'E14.5† I79.2*',
        icd10Steps: [
          'Lead Term: "Diabetes" → with → "gangrene" / "peripheral angiopathy".',
          'Indeks Alfabetis (Vol. 3): Diabetes → with → gangrene → E14.5; Diabetes → with → angiopathy, peripheral → E14.5† I79.2*.',
          'Verifikasi Tabular (Vol. 1): Subdivisi .5 (With peripheral circulatory complications) mencakup diabetic gangrene dan peripheral angiopathy (I79.2*).',
        ],
        icd9Procedures: [
          {
            code: '88.48',
            name: 'Arteriography of femoral and other lower extremity arteries',
            trace: 'Lead Term "Arteriography" → femoral / lower extremity → Tabular 88.48.',
          },
          {
            code: '86.22',
            name: 'Excisional debridement of wound, infection, or burn',
            trace: 'Lead Term "Debridement" → wound → excisional → Tabular 86.22.',
          },
          {
            code: '84.11',
            name: 'Amputation of toe (amputasi jari kaki)',
            trace: 'Lead Term "Amputation" → toe → Tabular 84.11.',
          },
        ],
        rationale:
          'Karakter ke-4 (.5) menghimpun komplikasi sirkulasi perifer (gangren dan angiopati perifer). Karena tipe DM tidak disebutkan, digunakan kategori E14.',
      },
      {
        no: 5,
        title: 'Marasmus Kwashiorkor',
        scenario: 'An. E (fiktif) balita dengan gizi buruk berat yang menunjukkan gejala gabungan Marasmus dan Kwashiorkor, dipasang NGT untuk nutrisi enteral.',
        icd10Code: 'E42',
        icd10Steps: [
          'Lead Term: "Marasmus" atau "Kwashiorkor" dengan modifier "marasmic".',
          'Indeks Alfabetis (Vol. 3): Kwashiorkor → marasmic → E42.',
          'Verifikasi Tabular (Vol. 1): E42 = Marasmic kwashiorkor (Severe protein-energy malnutrition with features of both kwashiorkor and marasmus).',
        ],
        icd9Procedures: [
          {
            code: '96.07',
            name: 'Insertion of other (naso-)gastric tube (pemasangan selang NGT)',
            trace: 'Lead Term "Insertion" → tube → nasogastric → Tabular 96.07.',
          },
          {
            code: '96.6',
            name: 'Enteral infusion of concentrated nutritional substances',
            trace: 'Lead Term "Infusion" → nutritional substance → enteral → Tabular 96.6.',
          },
        ],
        rationale:
          'ICD-10 menyediakan kode kombinasi tunggal E42 sehingga pengode tidak boleh memecah diagnosis menjadi E40 dan E41 secara terpisah.',
      },
      {
        no: 6,
        title: 'Congenital Iodine-Deficiency Syndrome, Myxoedematous Type dengan Retardasi Mental (IQ 25)',
        scenario: 'An. F (fiktif) didiagnosis sindrom defisiensi yodium kongenital tipe miksedematosa dengan hasil uji psikometri IQ 25.',
        icd10Code: 'E00.1 + F72',
        icd10Steps: [
          'Lead Term 1: "Syndrome" → iodine-deficiency, congenital → myxoedematous → E00.1.',
          'Lead Term 2: "Retardation" → mental → severe (IQ 20–34) → F72.',
          'Verifikasi Tabular (Vol. 1): E00.1 = Congenital iodine-deficiency syndrome, myxoedematous type; F72 = Severe mental retardation (rentang IQ 20–34).',
        ],
        icd9Procedures: [
          {
            code: '94.01',
            name: 'Administration of intelligence test (tes intelegensi klinis)',
            trace: 'Lead Term "Test" → intelligence → Tabular 94.01 (atau 94.08 evaluasi psikometri lain).',
          },
        ],
        rationale:
          'E00.1 merekam gangguan tiroid kongenital spesifiknya, sedangkan F72 ditambahkan untuk mendeskripsikan derajat retardasi mental berat (IQ 25 berada di rentang 20–34).',
      },
      {
        no: 7,
        title: 'DM Tipe 1 dengan Komplikasi Polyneuropathy',
        scenario: 'Tn. G (fiktif) pasien DM Tipe 1 mengeluhkan kesemutan dan nyeri saraf bilateral tungkai akibat polineuropati diabetik.',
        icd10Code: 'E10.4† G63.2*',
        icd10Steps: [
          'Lead Term: "Diabetes" → type 1 → with → polyneuropathy.',
          'Indeks Alfabetis (Vol. 3): Diabetes → type 1 → polyneuropathy → E10.4† G63.2*.',
          'Verifikasi Tabular (Vol. 1): E10.4 = Insulin-dependent DM with neurological complications; G63.2* = Diabetic polyneuropathy.',
        ],
        icd9Procedures: [
          {
            code: '93.08',
            name: 'Electromyography (pemeriksaan EMG)',
            trace: 'Lead Term "Electromyography" → Tabular 93.08.',
          },
          {
            code: '89.15',
            name: 'Other nonoperative neurologic function tests (pemeriksaan NCV)',
            trace: 'Lead Term "Study" → nerve conduction → Tabular 89.15.',
          },
          {
            code: '99.17',
            name: 'Injection of insulin (pemberian injeksi insulin)',
            trace: 'Lead Term "Injection" → insulin → Tabular 99.17.',
          },
        ],
        rationale:
          'Polineuropati diabetik merupakan manifestasi neurologis klasik DM yang wajib dikode menggunakan pasangan Dagger E10.4† dan Asterisk G63.2*.',
      },
      {
        no: 8,
        title: 'DM dengan Ulcer dan Cataract (Komplikasi Multipel)',
        scenario: 'Ny. H (fiktif) mengalami DM dengan dua komplikasi sekaligus: ulkus diabetikum pada kaki dan katarak diabetik.',
        icd10Code: 'E14.7 (opsional rinci: E14.3† H28.0* & E14.5)',
        icd10Steps: [
          'Lead Term: "Diabetes" → with → multiple complications.',
          'Indeks Alfabetis (Vol. 3): Diabetes → with → multiple complications → E14.7 (bila tipe DM tidak dirinci).',
          'Verifikasi Tabular (Vol. 1 & Vol. 2): E14.7 = Unspecified DM with multiple complications. Sesuai aturan Vol. 2, kode subkategori spesifik dapat ditambahkan untuk merinci masing-masing komplikasi (katarak diabetik E14.3† H28.0* dan ulkus perifer E14.5).',
        ],
        icd9Procedures: [
          {
            code: '86.22',
            name: 'Excisional debridement of wound, infection, or burn (debridemen ulkus)',
            trace: 'Lead Term "Debridement" → wound → excisional → Tabular 86.22.',
          },
          {
            code: '13.41',
            name: 'Phacoemulsification and aspiration of cataract',
            trace: 'Lead Term "Phacoemulsification" → cataract → Tabular 13.41.',
          },
          {
            code: '13.71',
            name: 'Insertion of intraocular lens prosthesis at time of cataract extraction',
            trace: 'Lead Term "Insertion" → lens → intraocular (at extraction) → Tabular 13.71.',
          },
        ],
        rationale:
          'Keberadaan lebih dari satu komplikasi organ yang berbeda pada satu episode DM dikelompokkan ke subdivisi .7 (komplikasi multipel), dengan opsi rincian kode tiap komplikasi.',
      },
      {
        no: 9,
        title: 'Congenital Iodine-Deficiency Syndrome, Neurological Type dengan Mild Mental Retardation',
        scenario: 'An. I (fiktif) didiagnosis sindrom defisiensi yodium kongenital tipe neurologis disertai retardasi mental ringan.',
        icd10Code: 'E00.0 + F70',
        icd10Steps: [
          'Lead Term 1: "Syndrome" → iodine-deficiency, congenital → neurological → E00.0.',
          'Lead Term 2: "Retardation" → mental → mild → F70.',
          'Verifikasi Tabular (Vol. 1): E00.0 = Congenital iodine-deficiency syndrome, neurological type; F70 = Mild mental retardation.',
        ],
        icd9Procedures: [
          {
            code: '88.91',
            name: 'Magnetic resonance imaging of brain and brain stem (MRI otak)',
            trace: 'Lead Term "Imaging, magnetic resonance" → brain → Tabular 88.91.',
          },
          {
            code: '93.75',
            name: 'Other speech training and therapy (terapi wicara)',
            trace: 'Lead Term "Therapy" → speech → Tabular 93.75.',
          },
          {
            code: '93.83',
            name: 'Occupational therapy (terapi okupasi)',
            trace: 'Lead Term "Therapy" → occupational → Tabular 93.83.',
          },
        ],
        rationale:
          'Berbeda dengan kasus 6 (tipe miksedematosa E00.1), tipe neurologis memiliki kode khusus E00.0 dan dipasangkan dengan F70 untuk derajat ringan.',
      },
      {
        no: 10,
        title: 'Diabetes Insipidus',
        scenario: 'Tn. J (fiktif) datang dengan keluhan poliuria dan polidipsia masif akibat gangguan sekresi ADH hipofisis, didiagnosis Diabetes Insipidus.',
        icd10Code: 'E23.2',
        icd10Steps: [
          'Lead Term: "Diabetes" → modifier "insipidus".',
          'Indeks Alfabetis (Vol. 3): Diabetes → insipidus → E23.2 (periksa juga catatan Excludes untuk tipe nefrogenik N25.1).',
          'Verifikasi Tabular (Vol. 1): E23.2 = Diabetes insipidus pada blok E20–E35 (Disorders of other endocrine glands).',
        ],
        icd9Procedures: [
          {
            code: '88.91',
            name: 'MRI of brain and brain stem / pituitary gland (MRI hipofisis)',
            trace: 'Lead Term "Imaging, magnetic resonance" → brain / pituitary → Tabular 88.91.',
          },
          {
            code: '93.09',
            name: 'Other diagnostic physical therapy procedure / evaluasi fungsi klinis',
            trace: 'Lead Term "Evaluation / Test" → physical therapy diagnostic → Tabular 93.09.',
          },
        ],
        rationale:
          'Meskipun bernama "Diabetes", Diabetes Insipidus bukan gangguan insulin (E10–E14), melainkan kelainan hormon antidiuretik (ADH) hipofisis sehingga berada pada E23.2.',
      },
    ],
    terminology: [
      {
        term: 'Hyperglycaemia',
        prefix: 'hyper- (berlebih)',
        root: 'glyc/o (gula/glukosa)',
        suffix: '-aemia (kondisi darah)',
        organRef: 'Pankreas (Sel Beta Pulau Langerhans · Insulin)',
        meaning: 'Kadar glukosa darah melebihi rentang normal akibat defisiensi/resistensi insulin; ciri metabolik utama DM (E10–E14).',
      },
      {
        term: 'Retinopathy',
        prefix: '—',
        root: 'retin/o (retina)',
        suffix: '-pathy (penyakit)',
        organRef: 'Retina Bola Mata (Target Mikrovaskular Pankreas)',
        meaning: 'Kerusakan kapiler retina akibat hiperglikemia kronis pada DM (H36.0*).',
      },
      {
        term: 'Polyneuropathy',
        prefix: 'poly- (banyak)',
        root: 'neur/o (saraf)',
        suffix: '-pathy (penyakit)',
        organRef: 'Saraf Perifer Ekstremitas (Dampak Hiperglikemia)',
        meaning: 'Gangguan fungsi beberapa saraf perifer secara simultan pada ekstremitas akibat DM (G63.2*).',
      },
      {
        term: 'Thyroiditis',
        prefix: '—',
        root: 'thyroid/o (kelenjar tiroid)',
        suffix: '-itis (peradangan)',
        organRef: 'Kelenjar Tiroid (Lobus Kanan & Kiri Leher)',
        meaning: 'Inflamasi atau infeksi supuratif pada kelenjar tiroid, mis. tiroiditis akut dengan abses (E06.0).',
      },
      {
        term: 'Myxoedema',
        prefix: '—',
        root: 'myx/o (mukus/lendir)',
        suffix: '-edema (pembengkakan)',
        organRef: 'Kelenjar Tiroid & Hipofisis (Aksis HPT · T3/T4)',
        meaning: 'Pembengkakan jaringan kulit akibat hipotiroidisme berat (terkait sindrom defisiensi yodium tipe miksedematosa E00.1).',
      },
    ],
    diseaseProfiles: [
      {
        name: 'Diabetes Melitus Tipe 1 & Retinopati Diabetik',
        icdCode: 'E10.3† H36.0*',
        definition:
          'Penyakit metabolik autoimun akibat destruksi sel beta Pulau Langerhans pankreas sehingga terjadi defisiensi insulin absolut, disertai mikroangiopati kapiler retina.',
        chapterRelation:
          'Etiologi metabolik diklasifikasikan di Bab IV (E10.3†), sedangkan manifestasi pada mata dirujuk lintas bab ke Bab VII (H36.0*) sesuai sistem Dagger/Asterisk.',
      },
      {
        name: 'Sindrom Defisiensi Yodium Kongenital (Kretinisme)',
        icdCode: 'E00.0 / E00.1',
        definition:
          'Gangguan perkembangan fisik dan kognitif sejak lahir akibat kekurangan hormon tiroid (T3/T4) selama masa janin yang dipicu defisiensi yodium endemik.',
        chapterRelation:
          'Berada pada blok E00–E07 (Disorders of thyroid gland) dengan instruksi pengodean tambahan F70–F79 (Bab V) untuk menyatakan derajat retardasi mental.',
      },
      {
        name: 'Tiroiditis Akut Supuratif',
        icdCode: 'E06.0 (+ B95.8)',
        definition:
          'Peradangan mendadak pada kelenjar tiroid akibat invasi mikroorganisme patogen yang dapat membentuk abses lokal pada lobus tiroid.',
        chapterRelation:
          'Masuk kategori E06.0 (Includes: Abscess of thyroid) pada Bab IV serta dapat dilengkapi kode tambahan agen infeksi bakteri dari Bab I (B95–B97).',
      },
      {
        name: 'Marasmus-Kwashiorkor (Malnutrisi Berat Campuran)',
        icdCode: 'E42',
        definition:
          'Bentuk malnutrisi energi-protein berat yang menggabungkan pengecilan massa otot/lemak (marasmus) dan edema akibat hipoalbuminemia (kwashiorkor).',
        chapterRelation:
          'Memiliki kode kombinasi tunggal khusus E42 pada blok E40–E46 (Malnutrition) Bab IV sehingga tidak boleh dipecah menjadi E40 + E41.',
      },
    ],
    pharmacology: [
      {
        diagnosisGroup: 'Diabetes Melitus & Komplikasi (E10–E14)',
        organTag: 'pancreas',
        genericName: 'Insulin (Insulin Lispro / Insulin Glargine)',
        brandExamples: 'Contoh nama dagang: Humalog / Lantus',
        drugClass: 'Hormon Pankreas / Antidiabetik Parenteral',
        dosageFormRoute: 'Larutan injeksi (Rute: Subkutan)',
        relatedDisease: 'Diabetes Melitus Tipe 1 (E10.-), Retinopati (E10.3† H36.0*), & Polineuropati (E10.4† G63.2*)',
        educationalUse: 'Menggantikan hormon insulin endogen yang tidak lagi diproduksi oleh sel beta pankreas dalam pembahasan mekanisme DM Tipe 1.',
        mechanism:
          'Berikatan dengan reseptor tirosin kinase insulin pada membran sel otot, hati, dan jaringan adiposa, memicu translokasi transporter glukosa (GLUT-4) ke permukaan sel untuk memasukkan glukosa ke intraseluler serta menekan glukoneogenesis hati.',
        reference: 'Katzung, Basic & Clinical Pharmacology (Pancreatic Hormones); WHO ICD-10 Bab IV.',
      },
      {
        diagnosisGroup: 'Diabetes Melitus & Komplikasi (E10–E14)',
        organTag: 'pancreas',
        genericName: 'Metformin',
        brandExamples: 'Contoh nama dagang: Glucophage / Forbetes',
        drugClass: 'Antidiabetik Oral (Golongan Biguanide)',
        dosageFormRoute: 'Tablet salut selaput (Rute: Oral)',
        relatedDisease: 'Diabetes Melitus Tipe 2 (E11.-)',
        educationalUse: 'Menjelaskan pendekatan non-insulin untuk membantu kendali glukosa darah pada kondisi resistensi insulin.',
        mechanism:
          'Mengaktivasi enzim AMPK di sel hati untuk menekan glukoneogenesis hepatik dan meningkatkan sensitivitas reseptor insulin pada jaringan perifer tanpa merangsang sekresi insulin berlebih.',
        reference: 'Katzung, Basic & Clinical Pharmacology (Glucose-Lowering Drugs).',
      },
      {
        diagnosisGroup: 'Gangguan Tiroid, Hipofisis & Nutrisi (E00–E06, E23, E42, E87)',
        organTag: 'thyroid',
        genericName: 'Levothyroxine (L-T4)',
        brandExamples: 'Contoh nama dagang: Euthyrox / Thyrax',
        drugClass: 'Terapi Pengganti Hormon Tiroid',
        dosageFormRoute: 'Tablet (Rute: Oral)',
        relatedDisease: 'Hipotiroidisme & Sindrom Defisiensi Yodium Kongenital (E00.0, E00.1)',
        educationalUse: 'Memahami konsep substitusi hormon tiroksin untuk menjaga laju metabolisme basal dan maturasi sistem saraf.',
        mechanism:
          'Diubah di jaringan perifer menjadi hormon aktif triiodothyronine (T3), lalu berikatan dengan reseptor tiroid di inti sel untuk meregulasi transkripsi gen metabolisme energi, termogenesis, dan perkembangan sistem saraf pusat.',
        reference: 'Katzung, Thyroid & Antithyroid Drugs; WHO Essential Medicines List.',
      },
      {
        diagnosisGroup: 'Gangguan Tiroid, Hipofisis & Nutrisi (E00–E06, E23, E42, E87)',
        organTag: 'thyroid',
        genericName: 'Desmopressin (DDAVP)',
        brandExamples: 'Contoh nama dagang: Minirin',
        drugClass: 'Analog Hormon Antidiuretik (Vasopresin)',
        dosageFormRoute: 'Tablet / Semprot Hidung (Rute: Oral / Intranasal)',
        relatedDisease: 'Diabetes Insipidus Sentral (E23.2)',
        educationalUse: 'Mengaitkan defisiensi hormon ADH hipofisis dengan mekanisme pemekatan urin di duktus ginjal.',
        mechanism:
          'Bekerja selektif sebagai agonis reseptor V2 pada duktus kolektivus ginjal sehingga kanal air akuaporin-2 terbuka dan reabsorpsi air kembali meningkat.',
        reference: 'Katzung, Hypothalamic & Pituitary Hormones; Tortora Anatomy & Physiology.',
      },
      {
        diagnosisGroup: 'Gangguan Tiroid, Hipofisis & Nutrisi (E00–E06, E23, E42, E87)',
        organTag: 'thyroid',
        genericName: 'Larutan Elektrolit (NaCl / KCl) & Formula Nutrisi Enteral',
        brandExamples: 'Contoh sediaan: Ringer Laktat / KCl / Formula F-75 & F-100',
        drugClass: 'Terapi Pengganti Cairan, Elektrolit & Nutrisi Klinis',
        dosageFormRoute: 'Larutan infus & formula cair (Rute: Intravena / Enteral NGT)',
        relatedDisease: 'Elektrolit Imbalance (E87.8) & Marasmus-Kwashiorkor (E42)',
        educationalUse: 'Memahami dukungan cairan elektrolit dan nutrisi bertahap (rehabilitasi metabolik) pada gangguan elektrolit dan gizi buruk.',
        mechanism:
          'Mengembalikan gradien ion transmembran (Na+, K+, Cl-) yang vital bagi eksitabilitas otot dan saraf, serta memperbaiki tekanan onkotik plasma melalui sintesis albumin secara bertahap (terkait tindakan ICD-9-CM 99.18 & 96.6).',
        reference: 'Kemenkes RI Tata Laksana Gizi Buruk; ICD-9-CM Vol. 3.',
      },
    ],
  },

  ch5: {
    id: 'ch5',
    numberRoman: 'V',
    codeRange: 'F00–F99',
    titleEn: 'Mental and Behavioural Disorders',
    titleId: 'Gangguan Mental dan Perilaku',
    subtitle:
      'Kaidah kodifikasi gangguan jiwa, penggunaan zat, retardasi mental, perbedaan gejala R-code, serta tindakan psikiatri ICD-9-CM.',
    metaTags: ['10 Blok Utama (F00–F99)', 'Psikoterapi ICD-9-CM (94.-)', 'Aturan Excludes & Puerperium'],
    inclSummary: [
      'Gangguan perkembangan psikologis dan gangguan mental bermakna klinis (organik hingga perilaku anak).',
      'Gangguan mental dan perilaku akibat penggunaan zat psikoaktif (F10–F19).',
      'Skizofrenia, gangguan suasana perasaan (mood), neurotik/fobia, sindrom nifas, dan retardasi mental.',
    ],
    exclSummary: [
      'Gejala atau tanda tunggal tanpa diagnosis psikiatri yang tegak, mis. halusinasi visual tunggal (R44.1 → Bab XVIII).',
      'Gangguan tidur dengan etiologi organik (G47.- → Bab VI) serta penyakit degeneratif primer seperti Alzheimer (G30.-).',
      'Gangguan masa nifas F53.- tidak dipakai bila kriteria gangguan memenuhi bagian lain Bab V.',
    ],
    daggerAsteriskCategories: [
      'G30.0† / G30.1† → F00.0* / F00.1* (Demensia pada penyakit Alzheimer)',
      'B22.0† → F02.4* (Demensia pada penyakit HIV)',
      'G20† → F02.3* (Demensia pada penyakit Parkinson)',
      'G40.- / A52.1† → F02.8* (Demensia pada penyakit lain yang terklasifikasi di tempat lain)',
    ],
    learningObjectives: [
      'Mengidentifikasi pembagian blok gangguan mental dan perilaku dalam rentang kode F00–F99 pada ICD-10 versi 2010.',
      'Membedakan diagnosis psikiatri definitif (F00–F99) dengan gejala/keluhan tunggal yang belum terdiagnosis seperti halusinasi visual terisolasi (R44.1).',
      'Menerapkan kaidah khusus seperti gangguan nifas (F53.0), gangguan penggunaan zat (F17.2), fobia spesifik (F40.2), derajat retardasi mental (F70–F73), dan pasangan Dagger/Asterisk demensia (B22.0† F02.4* / G30.1† F00.1*).',
      'Menelusuri kode prosedur kejiwaan dan rehabilitasi pada ICD-9-CM Volume 3 kategori 93–94 (psikoterapi, terapi perilaku, ECT, tes intelegensi, dan konseling berhenti merokok).',
    ],
    codeBlocks: [
      {
        range: 'F00–F09',
        title: 'Organic, including symptomatic, mental disorders',
        examples: 'Demensia pada penyakit HIV (B22.0† F02.4*), Delirium (F05.-)',
      },
      {
        range: 'F10–F19',
        title: 'Mental and behavioural disorders due to psychoactive substance use',
        examples: 'Ketergantungan tembakau/rokok (F17.2) disertai PPOK (J44.9)',
      },
      {
        range: 'F20–F29',
        title: 'Schizophrenia, schizotypal and delusional disorders',
        examples: 'Skizofrenia paranoid (F20.0), Gangguan skizoafektif tipe manik (F25.0)',
      },
      {
        range: 'F30–F39',
        title: 'Mood [affective] disorders',
        examples: 'Gangguan afektif bipolar tipe II (F31.8), Episode depresif (F32.-)',
      },
      {
        range: 'F40–F48',
        title: 'Neurotic, stress-related and somatoform disorders',
        examples: 'Fobia spesifik hewan/ular (F40.2), Gangguan panik (F41.0)',
      },
      {
        range: 'F50–F59',
        title: 'Behavioural syndromes associated with physiological disturbances',
        examples: 'Depresi pascamelahirkan/nifas ringan (F53.0), Insomnia nonorganik (F51.0)',
      },
      {
        range: 'F60–F69',
        title: 'Disorders of adult personality and behaviour',
        examples: 'Gangguan kepribadian emosional tak stabil (F60.3)',
      },
      {
        range: 'F70–F79',
        title: 'Mental retardation',
        examples: 'Retardasi mental ringan (F70), Retardasi mental berat IQ 20–34 (F72)',
      },
      {
        range: 'F80–F89',
        title: 'Disorders of psychological development',
        examples: 'Keterlambatan bicara/speech delay (F80.9), Gangguan membaca & mengeja (F81.0, F81.1)',
      },
      {
        range: 'F90–F99',
        title: 'Behavioural & emotional disorders with onset in childhood/adolescence',
        examples: 'Gangguan hiperkinetik/ADHD (F90.-)',
      },
    ],
    statisticsContext:
      'Gangguan mental dan perilaku berkontribusi besar terhadap angka kesakitan jangka panjang (morbiditas & Years Lived with Disability / YLD) serta memengaruhi angka mortalitas tidak langsung akibat komplikasi penyerta dan risiko penyalahgunaan zat di layanan primer maupun rumah sakit jiwa. Pencatatan yang cermat atas diagnosis Bab V serta pemisahan kode prosedur non-operatif kategori 93–94 ICD-9-CM (wawancara psikiatri, psikoterapi, tes intelegensi, ECT) menjamin validitas surveilans kesehatan jiwa nasional pada SATUSEHAT Kemenkes RI (ICD-10 versi 2010) dan ketepatan klaim INA-CBGs.',
    excludesNotes: [
      'Gejala, tanda, dan temuan abnormal tanpa diagnosis psikiatri yang tegak (mis. halusinasi visual tunggal tanpa diagnosis psikosis) dikode ke Bab XVIII kategori R44.- (R44.1 untuk halusinasi visual).',
      'F53.- (Gangguan mental masa nifas): Hanya digunakan untuk gangguan yang timbul dalam 6 minggu pascapersalinan yang TIDAK memenuhi kriteria klasifikasi di tempat lain pada Bab V.',
      'Gangguan tidur dengan etiologi organik (seperti sleep apnea atau narkolepsi) dikecualikan dari F51.- dan dikode ke Bab VI (G47.-).',
      'Retardasi mental (F70–F79) menggunakan instruksi "Use additional code, if desired, to identify any associated conditions" (mis. sindrom defisiensi yodium kongenital E00.-).',
    ],
    specialRules: [
      'Karakter ke-4 Blok Zat Psikoaktif (F10–F19): .0 Intoksikasi akut | .1 Penggunaan merugikan | .2 Sindrom ketergantungan (mis. F17.2 ketergantungan tembakau) | .3 Keadaan putus zat | .5 Gangguan psikotik.',
      'Rentang IQ Retardasi Mental (F70–F73): F70 Ringan (IQ 50–69) | F71 Sedang (IQ 35–49) | F72 Berat (IQ 20–34, contoh kasus IQ 25 & IQ 27) | F73 Sangat Berat (IQ < 20).',
      'Demensia Sekunder Penyakit Organik: Demensia pada penyakit HIV wajib mengikuti kaidah Dagger/Asterisk B22.0† F02.4* (penyakit HIV di Bab I sebagai etiologi, demensia di Bab V sebagai manifestasi).',
      'Klasifikasi Bipolar Tipe II: Dalam ICD-10, Bipolar II disorder secara spesifik diindeks ke subkategori F31.8 (Other bipolar affective disorders).',
    ],
    codingGuide: {
      vol2Summary: [
        'WHO ICD-10 Volume 2 menekankan kehati-hatian membedakan gangguan psikiatri definitif (Bab V F00–F99) dengan keluhan atau gejala tunggal yang belum terdiagnosis (mis. halusinasi visual terisolasi ke Bab XVIII R44.1).',
        'Kategori F53.- (Gangguan mental masa nifas) hanya dipakai apabila gangguan muncul dalam 6 minggu setelah persalinan dan tidak memenuhi kriteria diagnosis spesifik lain di Bab V.',
        'Blok F10–F19 memakai subdivisi karakter ke-4 yang seragam (.0 intoksikasi, .1 penggunaan merugikan, .2 sindrom ketergantungan), sedangkan F70–F73 ditentukan berdasarkan rentang skor IQ klinis.',
      ],
      leadTermGuidance:
        'Lead Term pada Bab V ditentukan dari kondisi psikopatologi atau keluhan klinis inti pada Indeks Alfabetis ICD-10 Volume 3, misalnya "Depression" (postpartum), "Phobia" (animal), "Delay" (speech), "Retardation" (mental), "Dependence" (tobacco), "Disorder" (bipolar/schizoaffective), dan "Dementia" (in HIV disease).',
      tabularInspection:
        'Pemeriksaan Daftar Tabular Volume 1 mencakup verifikasi Includes pada F40.2 (mencakup animal phobias) dan F31.8 (mencakup Bipolar II disorder), Excludes pada F51.- vs G47.- (gangguan tidur organik), instruksi kode tambahan kondisi penyerta pada F70–F79, serta tanda baca Dagger/Asterisk B22.0† F02.4* untuk demensia akibat HIV.',
      icd9Subchapter: {
        purpose:
          'Subbab ICD-9-CM Volume 3 pada Bab V (terutama kategori 93 dan 94) merekam prosedur evaluasi psikiatri, psikoterapi, tes psikometri, terapi perilaku, hingga terapi kejang listrik (ECT) terpisah dari kode diagnosis jiwa.',
        sampleProcedure: 'Psikoterapi individual suportif pada pasien Depresi Pascapersalinan (F53.0) → Kode ICD-9-CM: 94.39.',
        traceSteps:
          '1) Tentukan Lead Term tindakan pada Alphabetic Index to Procedures: "Psychotherapy" → 2) Telusuri modifier "individual" → kandidat kode 94.39 → 3) Verifikasi pada Tabular List Procedures kategori 94.39 (Other individual psychotherapy), memastikan bukan evaluasi psikiatri (94.19) maupun terapi keluarga (94.42).',
        selectionRationale:
          'Kode 94.39 dipilih secara tepat untuk sesi psikoterapi individual satu-lawan-satu dan melengkapi diagnosis F53.0 tanpa menggantikannya.',
      },
    },
    cases: [
      {
        no: 1,
        title: 'Depresi Setelah Melahirkan (Postpartum Depression)',
        scenario: 'Ny. K (fiktif), 27 tahun, mengalami kesedihan mendalam dan kecemasan 3 minggu pascapersalinan tanpa gejala psikotik, menjalani evaluasi psikiatri dan psikoterapi.',
        icd10Code: 'F53.0',
        icd10Steps: [
          'Lead Term: "Depression" dengan modifier "postpartum" atau "puerperal".',
          'Indeks Alfabetis (Vol. 3): Depression → postpartum / puerperal → F53.0.',
          'Verifikasi Tabular (Vol. 1): F53.0 = Mild mental and behavioural disorders associated with the puerperium, NEC (Includes: Postnatal depression NOS, Postpartum depression NOS).',
        ],
        icd9Procedures: [
          {
            code: '94.19',
            name: 'Other psychiatric interview and evaluation (evaluasi psikiatri klinis)',
            trace: 'Lead Term "Evaluation" → psychiatric → Tabular 94.19.',
          },
          {
            code: '94.39',
            name: 'Other individual psychotherapy (psikoterapi suportif individual)',
            trace: 'Lead Term "Psychotherapy" → individual → Tabular 94.39.',
          },
          {
            code: '94.42',
            name: 'Family therapy (konseling/terapi keluarga)',
            trace: 'Lead Term "Therapy" → family → Tabular 94.42.',
          },
        ],
        rationale:
          'F53.0 dipilih bila depresi nifas tanpa gejala psikosis (jika psikosis nifas berat masuk F53.1). Kode tindakan membedakan evaluasi diagnostik, psikoterapi individual, dan terapi keluarga.',
      },
      {
        no: 2,
        title: 'Halusinasi Melihat Bayangan Seperti Mengikuti',
        scenario: 'Tn. L (fiktif) datang ke poliklinik dengan keluhan melihat bayangan mengikuti dirinya (halusinasi visual) yang masih dalam proses wawancara diagnostik awal.',
        icd10Code: 'R44.1 (Catatan: bukan Bab V jika baru gejala tunggal)',
        icd10Steps: [
          'Lead Term: "Hallucination" dengan modifier "visual".',
          'Indeks Alfabetis (Vol. 3): Hallucination → visual → R44.1.',
          'Verifikasi Tabular (Vol. 1): R44.1 = Visual hallucinations (Bab XVIII). Catatan Penting: Bila dalam evaluasi psikiatri lanjutan tegak diagnosis skizofrenia/psikosis spesifik, gunakan kode blok F20–F29.',
        ],
        icd9Procedures: [
          {
            code: '94.19',
            name: 'Other psychiatric interview and evaluation (wawancara psikiatri diagnostik)',
            trace: 'Lead Term "Interview" → psychiatric → Tabular 94.19.',
          },
          {
            code: '94.25',
            name: 'Other psychiatric drug therapy (pemberian terapi antipsikotik)',
            trace: 'Lead Term "Therapy" → drug → psychiatric NEC → Tabular 94.25 (atau 99.29 injeksi substance).',
          },
        ],
        rationale:
          'Kasus ini menguji ketelitian koder agar tidak memaksakan kode F20 apabila dokumentasi baru mencantumkan gejala "halusinasi visual" tanpa diagnosis psikosis definitif.',
      },
      {
        no: 3,
        title: 'Phobia Ular Kobra',
        scenario: 'Sdr. M (fiktif) mengalami ketakutan hebat yang irasional dan panik setiap melihat ular kobra sehingga menghambat aktivitas luar ruang.',
        icd10Code: 'F40.2',
        icd10Steps: [
          'Lead Term: "Phobia, phobic" dengan modifier "animal" atau "specific (isolated)".',
          'Indeks Alfabetis (Vol. 3): Phobia → animal / specific → F40.2.',
          'Verifikasi Tabular (Vol. 1): F40.2 = Specific (isolated) phobias (Includes: Animal phobias, Acrophobia, Claustrophobia).',
        ],
        icd9Procedures: [
          {
            code: '94.33',
            name: 'Behavior therapy (terapi perilaku kognitif & desensitisasi sistematis)',
            trace: 'Lead Term "Therapy" → behavior → Tabular 94.33.',
          },
        ],
        rationale:
          'Fobia terhadap hewan tertentu (ular) tergolong Specific phobia (F40.2), bukan Agoraphobia (F40.0) maupun Social phobia (F40.1).',
      },
      {
        no: 4,
        title: 'Speech Delay (Keterlambatan Bicara)',
        scenario: 'An. N (fiktif), usia 4 tahun, dirujuk ke poli tumbuh kembang karena keterlambatan perkembangan bicara dan bahasa ekspresif.',
        icd10Code: 'F80.9',
        icd10Steps: [
          'Lead Term: "Delay, delayed" → modifier "speech (development)".',
          'Indeks Alfabetis (Vol. 3): Delay → development → speech → F80.9.',
          'Verifikasi Tabular (Vol. 1): F80.9 = Developmental disorder of speech and language, unspecified (blok F80–F89).',
        ],
        icd9Procedures: [
          {
            code: '93.75',
            name: 'Other speech training and therapy (evaluasi & terapi wicara)',
            trace: 'Lead Term "Therapy" → speech → Tabular 93.75 (atau 93.71 untuk terapi disleksia).',
          },
        ],
        rationale:
          'Keterlambatan perkembangan bahasa anak tanpa rincian tipe reseptif/ekspresif murni diklasifikasikan pada F80.9.',
      },
      {
        no: 5,
        title: 'Retardasi Mental karena IQ 27',
        scenario: 'Remaja O (fiktif) menjalani tes skala intelegensi standar dengan hasil skor IQ 27 dan memerlukan terapi okupasi rehabilitasi.',
        icd10Code: 'F72',
        icd10Steps: [
          'Lead Term: "Retardation" → modifier "mental" → "severe" (berdasarkan nilai IQ 27).',
          'Indeks Alfabetis (Vol. 3): Retardation → mental → severe → F72.',
          'Verifikasi Tabular (Vol. 1): Blok F70–F79 mencantumkan F72 = Severe mental retardation dengan rentang IQ perkiraan 20–34.',
        ],
        icd9Procedures: [
          {
            code: '94.01',
            name: 'Administration of intelligence test (tes psikometri / skala intelegensi)',
            trace: 'Lead Term "Test" → intelligence → Tabular 94.01.',
          },
          {
            code: '93.83',
            name: 'Occupational therapy (terapi okupasi rehabilitasi)',
            trace: 'Lead Term "Therapy" → occupational → Tabular 93.83.',
          },
        ],
        rationale:
          'Penentuan digit ke-3 pada blok F70–F79 bergantung pada rentang IQ: 50–69 (F70), 35–49 (F71), 20–34 (F72), dan <20 (F73). IQ 27 masuk ke F72.',
      },
      {
        no: 6,
        title: 'Kesulitan untuk Mengeja dan Membaca',
        scenario: 'An. P (fiktif), siswa sekolah dasar dengan inteligensi normal, mengalami kesulitan persisten dalam mengeja kata dan membaca kalimat.',
        icd10Code: 'F81.0 + F81.1',
        icd10Steps: [
          'Lead Term: "Disorder" → "reading (developmental)" dan "spelling (specific)".',
          'Indeks Alfabetis (Vol. 3): Disorder → learning / reading → F81.0; spelling → F81.1.',
          'Verifikasi Tabular (Vol. 1): F81.0 = Specific reading disorder; F81.1 = Specific spelling disorder (blok F81 Specific developmental disorders of scholastic skills).',
        ],
        icd9Procedures: [
          {
            code: '94.08',
            name: 'Other psychological evaluation and testing (asesmen neuropsikologis)',
            trace: 'Lead Term "Evaluation" → psychological → Tabular 94.08.',
          },
          {
            code: '93.82',
            name: 'Educational therapy (terapi remediasi belajar / edukasi khusus)',
            trace: 'Lead Term "Therapy" → educational → Tabular 93.82.',
          },
        ],
        rationale:
          'Gangguan spesifik keterampilan skolastik berada di kategori F81.-, dibedakan dari retardasi mental (F70–F79) dan dari keterlambatan bicara (F80.-).',
      },
      {
        no: 7,
        title: 'Kecanduan Rokok sehingga Menyebabkan PPOK',
        scenario: 'Tn. Q (fiktif) perokok berat jangka panjang dengan sindrom ketergantungan tembakau yang mengakibatkan Penyakit Paru Obstruktif Kronik (PPOK).',
        icd10Code: 'F17.2 + J44.9',
        icd10Steps: [
          'Lead Term 1: "Dependence" → tobacco / nicotine → F17.2.',
          'Lead Term 2: "Disease" → pulmonary, chronic obstructive → J44.9.',
          'Verifikasi Tabular (Vol. 1): F17.2 = Mental and behavioural disorders due to use of tobacco: dependence syndrome; J44.9 = Chronic obstructive pulmonary disease, unspecified.',
        ],
        icd9Procedures: [
          {
            code: '94.49',
            name: 'Other counseling (konseling berhenti merokok)',
            trace: 'Lead Term "Counseling" → tobacco / NEC → Tabular 94.49.',
          },
          {
            code: '89.37',
            name: 'Vital capacity determination (pemeriksaan spirometri)',
            trace: 'Lead Term "Determination" → vital capacity / spirometry → Tabular 89.37.',
          },
          {
            code: '93.94',
            name: 'Respiratory medication administered by nebulizer (inhalasi bronkodilator)',
            trace: 'Lead Term "Administration" → respiratory medication by nebulizer → Tabular 93.94.',
          },
        ],
        rationale:
          'Kasus ini memadukan ketergantungan zat Bab V (F17.2) dengan penyakit sistem pernapasan Bab X (J44.9) sebagai konsekuensi klinisnya.',
      },
      {
        no: 8,
        title: 'Bipolar Tipe II',
        scenario: 'Ny. R (fiktif) memiliki riwayat episode depresif berulang disertai episode hipomania (tanpa mania penuh), didiagnosis Gangguan Bipolar Tipe II.',
        icd10Code: 'F31.8',
        icd10Steps: [
          'Lead Term: "Disorder" → bipolar → II (type 2).',
          'Indeks Alfabetis (Vol. 3): Disorder → bipolar → II → F31.8.',
          'Verifikasi Tabular (Vol. 1): F31.8 = Other bipolar affective disorders (Includes: Bipolar II disorder, Recurrent manic episodes).',
        ],
        icd9Procedures: [
          {
            code: '94.11',
            name: 'Psychiatric mental status determination (evaluasi status mental psikiatri)',
            trace: 'Lead Term "Determination" → mental status (psychiatric) → Tabular 94.11.',
          },
          {
            code: '94.39',
            name: 'Other individual psychotherapy (psikoterapi interpersonal)',
            trace: 'Lead Term "Psychotherapy" → individual → Tabular 94.39.',
          },
        ],
        rationale:
          'Berbeda dengan Bipolar I yang dirinci menurut episode terkini (F31.0–F31.6), ICD-10 versi 2010 menempatkan Bipolar II disorder secara eksplisit di F31.8.',
      },
      {
        no: 9,
        title: 'Schizophrenia Schizoaffective Type Manic',
        scenario: 'Tn. S (fiktif) menunjukkan gejala psikotik skizofrenia yang muncul bersamaan dengan episode afek manik menonjol.',
        icd10Code: 'F25.0',
        icd10Steps: [
          'Lead Term: "Disorder" → schizoaffective → manic type (atau "Schizophrenia" → schizoaffective → manic).',
          'Indeks Alfabetis (Vol. 3): Disorder → schizoaffective → manic type → F25.0.',
          'Verifikasi Tabular (Vol. 1): F25.0 = Schizoaffective disorder, manic type.',
        ],
        icd9Procedures: [
          {
            code: '94.27',
            name: 'Other electroshock therapy [ECT] (terapi kejang listrik)',
            trace: 'Lead Term "Therapy" → electroconvulsive / electroshock → Tabular 94.27.',
          },
          {
            code: '94.39',
            name: 'Other individual psychotherapy (psikoterapi suportif)',
            trace: 'Lead Term "Psychotherapy" → individual → Tabular 94.39.',
          },
        ],
        rationale:
          'Gangguan skizoafektif memiliki kategori tersendiri di F25.- (bukan F20.- skizofrenia murni), dengan digit ke-4 (.0) khusus untuk tipe manik.',
      },
      {
        no: 10,
        title: 'Demensia pada Penderita HIV',
        scenario: 'Tn. T (fiktif), penyandang HIV stadium lanjut, mengalami kemunduran memori dan fungsi kognitif progresif akibat ensefalopati HIV.',
        icd10Code: 'B22.0† F02.4*',
        icd10Steps: [
          'Lead Term: "Dementia" → in (due to) → human immunodeficiency virus [HIV] disease.',
          'Indeks Alfabetis (Vol. 3): Dementia → in → HIV disease → B22.0† F02.4*.',
          'Verifikasi Tabular (Vol. 1): B22.0 = HIV disease resulting in encephalopathy; F02.4* = Dementia in human immunodeficiency virus [HIV] disease.',
        ],
        icd9Procedures: [
          {
            code: '88.91',
            name: 'Magnetic resonance imaging of brain and brain stem (MRI otak)',
            trace: 'Lead Term "Imaging, magnetic resonance" → brain → Tabular 88.91.',
          },
          {
            code: '93.83',
            name: 'Occupational therapy / cognitive rehabilitation',
            trace: 'Lead Term "Therapy" → occupational → Tabular 93.83.',
          },
        ],
        rationale:
          'Menerapkan kaidah Dagger/Asterisk lintas bab: etiologi infeksi HIV (B22.0†) menjadi kode utama, sedangkan demensia organik pada Bab V (F02.4*) menjadi kode manifestasi.',
      },
    ],
    terminology: [
      {
        term: 'Schizophrenia',
        prefix: '—',
        root: 'schiz/o (terbelah) + phren/o (pikiran)',
        suffix: '-ia (kondisi)',
        organRef: 'Korteks Prefrontal & Jaras Dopamin Mesolimbik',
        meaning: 'Gangguan psikotik dengan disorganisasi pikiran, persepsi, dan afek (F20–F25).',
      },
      {
        term: 'Claustrophobia / Phobia',
        prefix: '—',
        root: 'claustr/o (ruang tertutup) + phob/o (takut)',
        suffix: '-ia (kondisi)',
        organRef: 'Sistem Limbik (Amigdala & Respons Otonom)',
        meaning: 'Ketakutan menetap dan irasional terhadap objek atau situasi spesifik (F40.2).',
      },
      {
        term: 'Psychotherapy',
        prefix: '—',
        root: 'psych/o (jiwa/pikiran) + therap/o (terapi)',
        suffix: '-y (tindakan/proses)',
        organRef: 'Korteks Prefrontal & Sistem Limbik (Regulasi Emosi)',
        meaning: 'Intervensi psikologis terstruktur; tindakan dikode di ICD-9-CM 94.3- / 94.4-.',
      },
      {
        term: 'Postpartum',
        prefix: 'post- (setelah)',
        root: 'part/o (persalinan)',
        suffix: '-um (berkaitan dengan)',
        organRef: 'Sistem Limbik & Transmisi Sinaps Serotonin (5-HT)',
        meaning: 'Periode masa nifas setelah melahirkan yang menjadi rujukan kategori F53.-.',
      },
      {
        term: 'Anhedonia',
        prefix: 'an- (tanpa)',
        root: 'hedon/o (kesenangan)',
        suffix: '-ia (keadaan)',
        organRef: 'Celah Sinaps & Jalur Reward Dopamin–Serotonin',
        meaning: 'Hilangnya kemampuan merasakan senang terhadap aktivitas harian (gejala depresi F32/F53.0).',
      },
    ],
    diseaseProfiles: [
      {
        name: 'Gangguan Skizoafektif Tipe Manik & Skizofrenia',
        icdCode: 'F25.0 / F20.-',
        definition:
          'Gangguan psikotik yang memperlihatkan gejala skizofrenia (waham, halusinasi, disorganisasi pikiran) sekaligus gejala episode afek manik secara menonjol dalam episode penyakit yang sama.',
        chapterRelation:
          'Diklasifikasikan pada blok F20–F29; tipe skizoafektif manik menempati subkategori spesifik F25.0 agar terpisah dari skizofrenia murni (F20.-).',
      },
      {
        name: 'Depresi Pascamelahirkan (Postpartum Depression)',
        icdCode: 'F53.0',
        definition:
          'Gangguan suasana perasaan depresif ringan-sedang yang timbul dalam masa nifas (<6 minggu setelah persalinan) tanpa gejala psikotik berat.',
        chapterRelation:
          'Ditempatkan pada blok F50–F59 kategori F53.0 karena berkaitan erat dengan periode fisiologis puerperium dan tidak memenuhi kriteria gangguan mood lain.',
      },
      {
        name: 'Fobia Spesifik (Animal Phobia)',
        icdCode: 'F40.2',
        definition:
          'Ketakutan yang sangat kuat, persisten, dan irasional terhadap objek atau hewan spesifik (misalnya ular kobra) disertai aktivasi otonom akut dan perilaku menghindar.',
        chapterRelation:
          'Masuk dalam blok gangguan neurotik/terkait stres (F40–F48) pada subkategori F40.2 (Includes: Animal phobias).',
      },
      {
        name: 'Demensia pada Penyakit HIV',
        icdCode: 'B22.0† F02.4*',
        definition:
          'Kemunduran fungsi kognitif dan memori progresif yang terjadi akibat ensefalopati infeksi Human Immunodeficiency Virus pada sistem saraf pusat.',
        chapterRelation:
          'Menerapkan aturan Dagger/Asterisk lintas bab: infeksi HIV sebagai etiologi primer di Bab I (B22.0†) dipasangkan dengan manifestasi demensia organik di Bab V (F02.4*).',
      },
    ],
    pharmacology: [
      {
        diagnosisGroup: 'Gangguan Psikotik & Skizoafektif (F20, F25.0)',
        organTag: 'brain',
        genericName: 'Risperidone / Haloperidol',
        brandExamples: 'Contoh nama dagang: Risperdal / Serenace',
        drugClass: 'Antipsikotik Atipikal & Tipikal',
        dosageFormRoute: 'Tablet / Larutan Injeksi (Rute: Oral / Intramuskular)',
        relatedDisease: 'Skizofrenia (F20.-) & Gangguan Skizoafektif Tipe Manik (F25.0)',
        educationalUse: 'Memahami peran modulasi reseptor dopamin dalam meredakan gejala psikotik positif (halusinasi dan waham).',
        mechanism:
          'Bekerja sebagai antagonis reseptor dopamin D2 pada jaras mesolimbik (serta antagonis reseptor serotonin 5-HT2A pada antipsikotik atipikal) untuk menurunkan transmisi dopaminergik yang berlebihan.',
        reference: 'Katzung, Basic & Clinical Pharmacology (Antipsychotic Agents); WHO ICD-10 Bab V.',
      },
      {
        diagnosisGroup: 'Gangguan Mood, Depresi Nifas & Fobia (F53.0, F31.8, F40.2)',
        organTag: 'synapse',
        genericName: 'Sertraline / Fluoxetine',
        brandExamples: 'Contoh nama dagang: Zoloft / Prozac',
        drugClass: 'Antidepresan (Golongan SSRI)',
        dosageFormRoute: 'Tablet / Kapsul (Rute: Oral)',
        relatedDisease: 'Depresi Pascamelahirkan (F53.0), Episode Depresif (F32.-), & Gangguan Fobia (F40.-)',
        educationalUse: 'Menjelaskan konsep peningkatan ketersediaan serotonin sinaptik untuk stabilisasi mood dan kecemasan.',
        mechanism:
          'Menghambat secara selektif pompa ambilan ulang serotonin (Selective Serotonin Reuptake Inhibitor) pada neuron presinaps sehingga konsentrasi serotonin di celah sinaps meningkat dan memperbaiki sinyal emosi.',
        reference: 'Katzung, Antidepressant Agents; Kemenkes RI Pedoman Kefarmasian Kesehatan Jiwa.',
      },
      {
        diagnosisGroup: 'Gangguan Mood, Depresi Nifas & Fobia (F53.0, F31.8, F40.2)',
        organTag: 'synapse',
        genericName: 'Lithium Carbonate / Sodium Valproate',
        brandExamples: 'Contoh nama dagang: Frimania / Depakote',
        drugClass: 'Penstabil Suasana Hati (Mood Stabilizer)',
        dosageFormRoute: 'Tablet / Kaplet lepas lambat (Rute: Oral)',
        relatedDisease: 'Gangguan Afektif Bipolar Tipe II (F31.8) & Skizoafektif Tipe Manik (F25.0)',
        educationalUse: 'Memahami peran agen penstabil mood pada gangguan afektif siklik seperti Bipolar II dan skizoafektif.',
        mechanism:
          'Memodulasi jalur sinyal second-messenger intraseluler (inhibisi inositol monofosfatase oleh lithium) serta meningkatkan aktivitas neurotransmiter penghambat GABA pada sistem saraf pusat.',
        reference: 'Katzung, Antipsychotic Agents & Lithium; Stahl Essential Psychopharmacology.',
      },
      {
        diagnosisGroup: 'Gangguan Mood, Depresi Nifas & Fobia (F53.0, F31.8, F40.2)',
        organTag: 'synapse',
        genericName: 'Lorazepam / Diazepam',
        brandExamples: 'Contoh nama dagang: Ativan / Valium',
        drugClass: 'Ansiolitik (Golongan Benzodiazepin)',
        dosageFormRoute: 'Tablet / Injeksi (Rute: Oral / Intravena)',
        relatedDisease: 'Gangguan Ansietas Akut & Fobia Berat (F40.-)',
        educationalUse: 'Memahami mekanisme penghambatan GABAergik dalam menurunkan ketegangan otonom dan reaksi panik akut.',
        mechanism:
          'Berikatan pada situs alosterik reseptor GABA-A, meningkatkan frekuensi pembukaan kanal ion klorida (Cl-) sehingga terjadi hiperpolarisasi membran neuron dan penurunan hiperaktivitas amigdala.',
        reference: 'Katzung, Sedative-Hypnotic Drugs.',
      },
    ],
  },
};

export const QUIZ_BANK: QuizQuestion[] = [
  // =========================================================================
  // BAB IV (E00–E90) — 10 SOAL DIAGNOSIS ICD-10
  // =========================================================================
  {
    id: 'IV-ICD10-01',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'difficult',
    caseIcon: 'eye-nerve',
    organType: 'pancreas-eye',
    organAnatomy: 'Pankreas (Sel Beta · Insulin) & Retina Bola Mata',
    title: 'DM Tipe 1 dengan Retinopati Diabetik',
    scenario:
      'Ny. A (fiktif) didiagnosis Diabetes Melitus Tipe 1 disertai komplikasi Retinopati Diabetik. Berapa pasangan kode Dagger (†) dan Asterisk (*) ICD-10 yang tepat?',
    icd10PrimaryLabel: 'Kode ICD-10 Utama (†)',
    icd10PrimaryAccepted: ['E10.3', 'E10.3†'],
    icd10PrimaryDisplay: 'E10.3†',
    icd10PrimaryPlaceholder: 'Mis. E10.3',
    icd10SecondaryLabel: 'Kode Manifestasi (*)',
    icd10SecondaryAccepted: ['H36.0', 'H36.0*'],
    icd10SecondaryDisplay: 'H36.0*',
    icd10SecondaryPlaceholder: 'Mis. H36.0',
    leadTermDisplay: 'Diabetes → type 1 (insulin-dependent) → with retinopathy (Dagger † / Asterisk *)',
    traceSteps:
      'Vol. 3: "Diabetes" → type 1 → with retinopathy → E10.3† H36.0*. Vol. 1: E10.3 (ophthalmic complications) dan H36.0* (Diabetic retinopathy).',
    commonMistakes:
      'Tertukar menjadi E11.3 (DM Tipe 2) atau membalik urutan meletakkan kode manifestasi H36.0* di depan.',
    reference: 'WHO ICD-10 Vol. 1, 2 & 3 (2010) — E10.3† H36.0*.',
  },
  {
    id: 'IV-ICD10-02',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'endocrine',
    organType: 'thyroid',
    organAnatomy: 'Kelenjar Tiroid (Lobus Kanan & Kiri)',
    title: 'Tiroiditis Akut dengan Abses akibat Kuman Staphylococcus',
    scenario:
      'Tn. B (fiktif) mengalami Tiroiditis Akut supuratif dengan abses kelenjar tiroid akibat infeksi bakteri Staphylococcus. Tentukan kode utama dan kode tambahan agen infeksinya.',
    icd10PrimaryLabel: 'Kode ICD-10 Utama',
    icd10PrimaryAccepted: ['E06.0'],
    icd10PrimaryDisplay: 'E06.0',
    icd10PrimaryPlaceholder: 'Mis. E06.0',
    icd10SecondaryLabel: 'Kode Tambahan Agen Infeksi',
    icd10SecondaryAccepted: ['B95.8', 'B95.6'],
    icd10SecondaryDisplay: 'B95.8',
    icd10SecondaryPlaceholder: 'Mis. B95.8',
    leadTermDisplay: 'Thyroiditis → acute (Includes: abscess of thyroid) + Infection → staphylococcal',
    traceSteps:
      'Vol. 3: "Thyroiditis" → acute → E06.0 (sudah mencakup abses tiroid pada Includes). Gunakan kode tambahan B95.8 untuk agen infeksi Staphylococcus.',
    commonMistakes:
      'Mengode abses tiroid secara terpisah ke abses leher atau lupa menambahkan kode agen infeksi B95.-.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — E06.0 + B95.8.',
  },
  {
    id: 'IV-ICD10-03',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'easy',
    caseIcon: 'endocrine',
    organType: 'kidney-adrenal',
    organAnatomy: 'Kelenjar Adrenal & Tubulus Ginjal (Keseimbangan Elektrolit)',
    title: 'Elektrolit Imbalance (Tidak Dirinci)',
    scenario:
      'Ny. C (fiktif) dirawat dengan diagnosis Elektrolit Imbalance tanpa rincian jenis ion spesifik yang terganggu. Berapa kode ICD-10 yang tepat?',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['E87.8'],
    icd10PrimaryDisplay: 'E87.8',
    icd10PrimaryPlaceholder: 'Mis. E87.8',
    leadTermDisplay: 'Imbalance → electrolyte → E87.8',
    traceSteps:
      'Vol. 3: "Imbalance" → electrolyte → E87.8. Vol. 1: E87.8 = Other disorders of electrolyte and fluid balance, NEC (Includes: Electrolyte imbalance NOS).',
    commonMistakes:
      'Memilih E87.6 (hipokalemia) atau E87.1 (hiponatremia) tanpa data laboratorium ion spesifik di berkas.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — E87.8.',
  },
  {
    id: 'IV-ICD10-04',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'difficult',
    caseIcon: 'endocrine',
    organType: 'pancreas-vascular',
    organAnatomy: 'Pankreas & Pembuluh Darah Perifer Ekstremitas Bawah',
    title: 'DM dengan Komplikasi Gangren dan Angiopati Perifer',
    scenario:
      'Tn. D (fiktif) didiagnosis Diabetes Melitus (tipe tidak dirinci) disertai komplikasi gangren kaki dan angiopati perifer. Tentukan pasangan kode ICD-10-nya.',
    icd10PrimaryLabel: 'Kode ICD-10 Utama (†)',
    icd10PrimaryAccepted: ['E14.5', 'E14.5†'],
    icd10PrimaryDisplay: 'E14.5†',
    icd10PrimaryPlaceholder: 'Mis. E14.5',
    icd10SecondaryLabel: 'Kode Manifestasi (*)',
    icd10SecondaryAccepted: ['I79.2', 'I79.2*'],
    icd10SecondaryDisplay: 'I79.2*',
    icd10SecondaryPlaceholder: 'Mis. I79.2',
    leadTermDisplay: 'Diabetes → with → gangrene / peripheral angiopathy (subdivisi .5)',
    traceSteps:
      'Vol. 3: "Diabetes" → with peripheral circulatory complications → E14.5† I79.2* (E14 dipakai karena tipe DM tidak dijelaskan).',
    commonMistakes:
      'Memakai E11.5 tanpa keterangan Tipe 2 atau memecah ke subdivisi .7 padahal keduanya termasuk komplikasi sirkulasi perifer (.5).',
    reference: 'WHO ICD-10 Vol. 1 & 2 (2010) — E14.5† I79.2*.',
  },
  {
    id: 'IV-ICD10-05',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'easy',
    caseIcon: 'nutrition',
    organType: 'gi-nutrition',
    organAnatomy: 'Saluran Pencernaan, Hepar & Jaringan Otot/Adiposa',
    title: 'Marasmus Kwashiorkor',
    scenario:
      'An. E (fiktif) balita dirawat karena gizi buruk berat yang menampilkan gejala gabungan Marasmus dan Kwashiorkor sekaligus. Berapa kode ICD-10 yang tepat?',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['E42'],
    icd10PrimaryDisplay: 'E42',
    icd10PrimaryPlaceholder: 'Mis. E42',
    leadTermDisplay: 'Kwashiorkor → marasmic → E42 (kode kombinasi tunggal)',
    traceSteps:
      'Vol. 3: "Kwashiorkor" → marasmic → E42. Vol. 1: E42 = Marasmic kwashiorkor (Severe protein-energy malnutrition with features of both).',
    commonMistakes:
      'Memecah diagnosis menjadi dua kode terpisah (E40 dan E41) padahal tersedia kode kombinasi tunggal E42.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — E42.',
  },
  {
    id: 'IV-ICD10-06',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'endocrine',
    organType: 'thyroid-brain',
    organAnatomy: 'Kelenjar Tiroid (Hormon T3/T4) & Korteks Serebri',
    title: 'Congenital Iodine-Deficiency Syndrome (Myxoedematous) + IQ 25',
    scenario:
      'An. F (fiktif) didiagnosis Congenital iodine-deficiency syndrome, myxoedematous type disertai retardasi mental dengan hasil tes IQ 25. Tentukan kedua kode ICD-10-nya.',
    icd10PrimaryLabel: 'Kode ICD-10 Utama',
    icd10PrimaryAccepted: ['E00.1'],
    icd10PrimaryDisplay: 'E00.1',
    icd10PrimaryPlaceholder: 'Mis. E00.1',
    icd10SecondaryLabel: 'Kode Retardasi Mental (IQ 25)',
    icd10SecondaryAccepted: ['F72'],
    icd10SecondaryDisplay: 'F72',
    icd10SecondaryPlaceholder: 'Mis. F72',
    leadTermDisplay: 'Syndrome → iodine-deficiency, congenital → myxoedematous + Retardation → mental → severe',
    traceSteps:
      'Vol. 3: "Syndrome" → iodine-deficiency, congenital → myxoedematous → E00.1. "Retardation" → mental → severe (IQ 20–34) → F72.',
    commonMistakes:
      'Tertukar dengan tipe neurologis (E00.0) atau salah memasukkan IQ 25 ke F71 (IQ 35–49).',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — E00.1 + F72.',
  },
  {
    id: 'IV-ICD10-07',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'eye-nerve',
    organType: 'pancreas-nerve',
    organAnatomy: 'Pankreas & Saraf Perifer Tungkai',
    title: 'DM Tipe 1 dengan Komplikasi Polineuropati',
    scenario:
      'Tn. G (fiktif) penderita DM Tipe 1 mengeluhkan baal dan nyeri saraf kedua kaki dengan diagnosis Polineuropati Diabetik. Tentukan pasangan kode ICD-10 yang tepat.',
    icd10PrimaryLabel: 'Kode ICD-10 Utama (†)',
    icd10PrimaryAccepted: ['E10.4', 'E10.4†'],
    icd10PrimaryDisplay: 'E10.4†',
    icd10PrimaryPlaceholder: 'Mis. E10.4',
    icd10SecondaryLabel: 'Kode Manifestasi (*)',
    icd10SecondaryAccepted: ['G63.2', 'G63.2*'],
    icd10SecondaryDisplay: 'G63.2*',
    icd10SecondaryPlaceholder: 'Mis. G63.2',
    leadTermDisplay: 'Diabetes → type 1 → with → polyneuropathy → E10.4† G63.2*',
    traceSteps:
      'Vol. 3: "Diabetes" → type 1 → with polyneuropathy → E10.4† G63.2*. Vol. 1: .4 (neurological complications) dan G63.2* (Diabetic polyneuropathy).',
    commonMistakes:
      'Menggunakan G62.9 (polineuropati tak spesifik) dan lupa memakai pasangan kode Dagger/Asterisk.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — E10.4† G63.2*.',
  },
  {
    id: 'IV-ICD10-08',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'difficult',
    caseIcon: 'eye-nerve',
    organType: 'pancreas-eye-vascular',
    organAnatomy: 'Pankreas, Lensa Mata (Katarak) & Vaskular Perifer',
    title: 'DM dengan Ulcer dan Cataract (Komplikasi Multipel)',
    scenario:
      'Ny. H (fiktif) penderita DM (tipe tidak dirinci) mengalami dua komplikasi organ sekaligus, yaitu Ulkus Diabetikum dan Katarak Diabetik. Tentukan kode utama komplikasi multipelnya.',
    icd10PrimaryLabel: 'Kode ICD-10 Komplikasi Multipel',
    icd10PrimaryAccepted: ['E14.7', 'E14.7†'],
    icd10PrimaryDisplay: 'E14.7',
    icd10PrimaryPlaceholder: 'Mis. E14.7',
    leadTermDisplay: 'Diabetes → with → multiple complications → E14.7 (rincian opsional E14.3† H28.0* & E14.5)',
    traceSteps:
      'Vol. 3 & Vol. 2: Keberadaan >1 komplikasi organ (mata + ulkus perifer) dikode ke subdivisi .7 (With multiple complications) → E14.7.',
    commonMistakes:
      'Hanya mengode salah satu komplikasi saja (.3 atau .5) tanpa menetapkan .7 untuk komplikasi multipel.',
    reference: 'WHO ICD-10 Vol. 1 & 2 (2010) — E14.7.',
  },
  {
    id: 'IV-ICD10-09',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'thyroid-brain',
    organAnatomy: 'Kelenjar Tiroid & Sistem Saraf Pusat (Maturasi Otak)',
    title: 'Congenital Iodine-Deficiency Syndrome (Neurological) + Mild MR',
    scenario:
      'An. I (fiktif) didiagnosis Congenital iodine-deficiency syndrome, neurological type disertai retardasi mental ringan (Mild mental retardation). Tentukan kedua kode ICD-10-nya.',
    icd10PrimaryLabel: 'Kode ICD-10 Utama',
    icd10PrimaryAccepted: ['E00.0'],
    icd10PrimaryDisplay: 'E00.0',
    icd10PrimaryPlaceholder: 'Mis. E00.0',
    icd10SecondaryLabel: 'Kode Mild Mental Retardation',
    icd10SecondaryAccepted: ['F70'],
    icd10SecondaryDisplay: 'F70',
    icd10SecondaryPlaceholder: 'Mis. F70',
    leadTermDisplay: 'Syndrome → iodine-deficiency, congenital → neurological (E00.0) + Retardation → mental → mild (F70)',
    traceSteps:
      'Vol. 3: "Syndrome" → iodine-deficiency, congenital → neurological → E00.0; "Retardation" → mental → mild → F70.',
    commonMistakes:
      'Tertukar antara tipe miksedematosa (E00.1) dengan tipe neurologis (E00.0), atau salah derajat retardasi mental.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — E00.0 + F70.',
  },
  {
    id: 'IV-ICD10-10',
    chapter: 'bab4',
    chapterLabel: 'Bab IV (E00–E90)',
    codeType: 'icd10',
    difficulty: 'easy',
    caseIcon: 'endocrine',
    organType: 'pituitary',
    organAnatomy: 'Hipotalamus–Hipofisis Posterior (ADH) & Duktus Ginjal',
    title: 'Diabetes Insipidus',
    scenario:
      'Tn. J (fiktif) mengalami poliuria dan polidipsia akibat kekurangan sekresi ADH hipofisis serta didiagnosis Diabetes Insipidus (bukan DM gula). Berapa kode ICD-10 yang tepat?',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['E23.2'],
    icd10PrimaryDisplay: 'E23.2',
    icd10PrimaryPlaceholder: 'Mis. E23.2',
    leadTermDisplay: 'Diabetes → insipidus → E23.2 (blok E20–E35 kelenjar endokrin lain)',
    traceSteps:
      'Vol. 3: "Diabetes" → insipidus → E23.2. Vol. 1: E23.2 = Diabetes insipidus (kecualikan tipe nefrogenik N25.1).',
    commonMistakes:
      'Mengira kata "Diabetes" masuk blok E10–E14 (Diabetes Mellitus), padahal Diabetes Insipidus berada di E23.2.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — E23.2.',
  },

  // =========================================================================
  // BAB IV (E00–E90) — 10 SOAL PROSEDUR TINDAKAN ICD-9-CM
  // =========================================================================
  {
    id: 'IV-ICD9-01',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'easy',
    caseIcon: 'eye-nerve',
    organType: 'eye',
    organAnatomy: 'Bola Mata — Lapisan Retina & Makula (OCT)',
    title: 'Optical Coherence Tomography (OCT) Mata pada DM Retinopati',
    scenario:
      'Pada pasien DM Tipe 1 dengan Retinopati Diabetik, dokter melakukan pemeriksaan Optical Coherence Tomography (OCT) retina. Berapa kode tindakan ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['95.16'],
    icd10PrimaryDisplay: '95.16',
    icd10PrimaryPlaceholder: 'Mis. 95.16',
    leadTermDisplay: 'Tomography → optical coherence (eye) → 95.16',
    traceSteps:
      'ICD-9-CM Index: "Tomography" → optical coherence → Tabular 95.16 (Tomographic scan of eye / OCT).',
    commonMistakes:
      'Tertukar dengan funduskopi biasa (16.21) atau laser fotokoagulasi retina (14.24).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 95.16.',
  },
  {
    id: 'IV-ICD9-02',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'endocrine',
    organType: 'thyroid',
    organAnatomy: 'Kelenjar Tiroid & Trakea Leher Anterior (USG)',
    title: 'Diagnostic Ultrasound of Head and Neck (USG Tiroid)',
    scenario:
      'Pasien Tiroiditis Akut dengan dugaan abses tiroid menjalani pemeriksaan penunjang USG Tiroid (Diagnostic ultrasound of head and neck). Berapa kode ICD-9-CM yang tepat?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['88.71'],
    icd10PrimaryDisplay: '88.71',
    icd10PrimaryPlaceholder: 'Mis. 88.71',
    leadTermDisplay: 'Ultrasonography → head and neck → 88.71',
    traceSteps:
      'ICD-9-CM Index: "Ultrasonography" → head and neck → Tabular 88.71 (Diagnostic ultrasound of head and neck).',
    commonMistakes:
      'Salah memilih biopsi jarum halus tiroid (06.11) atau insisi drainase tiroid (06.09) padahal yang ditanyakan adalah USG diagnostiknya.',
    reference: 'ICD-9-CM Vol. 3 — Kategori 88.71.',
  },
  {
    id: 'IV-ICD9-03',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'easy',
    caseIcon: 'endocrine',
    organType: 'kidney-adrenal',
    organAnatomy: 'Pembuluh Vena Perifer, Ginjal & Kelenjar Adrenal',
    title: 'Injection or Infusion of Electrolytes',
    scenario:
      'Pasien dengan Elektrolit Imbalance menerima tindakan koreksi melalui infus cairan elektrolit intravena (Injection or infusion of electrolytes). Berapa kode ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['99.18'],
    icd10PrimaryDisplay: '99.18',
    icd10PrimaryPlaceholder: 'Mis. 99.18',
    leadTermDisplay: 'Infusion / Injection → electrolytes → 99.18',
    traceSteps:
      'ICD-9-CM Index: "Infusion" → electrolytes → Tabular 99.18 (Injection or infusion of electrolytes).',
    commonMistakes:
      'Tertukar dengan injeksi insulin (99.17) atau infus zat nutrisi enteral (96.6).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 99.18.',
  },
  {
    id: 'IV-ICD9-04',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'endocrine',
    organType: 'pancreas-vascular',
    organAnatomy: 'Jaringan Kulit, Subkutan & Vaskular Ekstremitas Bawah',
    title: 'Excisional Debridement Luka/Gangren Diabetik',
    scenario:
      'Pada pasien DM dengan gangren dan angiopati perifer, tim bedah melakukan pembersihan jaringan nekrotik secara eksisional (Excisional debridement of wound, infection, or burn). Tentukan kode ICD-9-CM-nya.',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['86.22'],
    icd10PrimaryDisplay: '86.22',
    icd10PrimaryPlaceholder: 'Mis. 86.22',
    leadTermDisplay: 'Debridement → wound / infection → excisional → 86.22',
    traceSteps:
      'ICD-9-CM Index: "Debridement" → wound, infection, or burn → excisional → Tabular 86.22.',
    commonMistakes:
      'Tertukar dengan nonexcisional debridement (86.28) atau amputasi jari kaki (84.11).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 86.22.',
  },
  {
    id: 'IV-ICD9-05',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'easy',
    caseIcon: 'nutrition',
    organType: 'gi-nutrition',
    organAnatomy: 'Rongga Hidung, Esofagus & Lambung (Gaster)',
    title: 'Pemasangan Selang Nasogastrik (NGT)',
    scenario:
      'Anak dengan Marasmus Kwashiorkor dipasangi selang nasogastrik untuk dukungan nutrisi enteral (Insertion of nasogastric tube). Berapa kode prosedur ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['96.07'],
    icd10PrimaryDisplay: '96.07',
    icd10PrimaryPlaceholder: 'Mis. 96.07',
    leadTermDisplay: 'Insertion → tube → nasogastric → 96.07',
    traceSteps:
      'ICD-9-CM Index: "Insertion" → tube → nasogastric → Tabular 96.07 (Insertion of other [naso-]gastric tube).',
    commonMistakes:
      'Tertukar dengan intubasi endotrakeal (96.04) atau infus nutrisi enteral (96.6).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 96.07.',
  },
  {
    id: 'IV-ICD9-06',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'brain-cognition',
    organAnatomy: 'Korteks Serebri & Lobus Frontal (Fungsi Kognitif/IQ)',
    title: 'Evaluasi Psikometri / Tes Intelegensi Klinis',
    scenario:
      'Pasien sindrom defisiensi yodium kongenital menjalani evaluasi psikometri berupa tes intelegensi klinis (Administration of intelligence test) untuk menentukan skor IQ. Berapa kode ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['94.01', '94.08'],
    icd10PrimaryDisplay: '94.01',
    icd10PrimaryPlaceholder: 'Mis. 94.01',
    leadTermDisplay: 'Test → intelligence → 94.01 (evaluasi psikologis lainnya: 94.08)',
    traceSteps:
      'ICD-9-CM Index: "Test" → intelligence → Tabular 94.01 (Administration of intelligence test; kategori psikometri lainnya 94.08).',
    commonMistakes:
      'Menggunakan kode wawancara psikiatri umum (94.19) alih-alih tes intelegensi/psikometri (94.01).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 94.01.',
  },
  {
    id: 'IV-ICD9-07',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'eye-nerve',
    organType: 'pancreas-nerve',
    organAnatomy: 'Saraf Motorik Perifer & Otot Rangka Ekstremitas',
    title: 'Pemeriksaan Elektromiografi (EMG)',
    scenario:
      'Pasien DM Tipe 1 dengan polineuropati menjalani pemeriksaan aktivitas listrik otot menggunakan Elektromiografi (Electromyography / EMG). Tentukan kode tindakan ICD-9-CM-nya.',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['93.08'],
    icd10PrimaryDisplay: '93.08',
    icd10PrimaryPlaceholder: 'Mis. 93.08',
    leadTermDisplay: 'Electromyography → 93.08',
    traceSteps:
      'ICD-9-CM Index: "Electromyography" → Tabular 93.08 (Electromyography).',
    commonMistakes:
      'Tertukar dengan Nerve Conduction Velocity / NCV (89.15) atau injeksi insulin (99.17).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 93.08.',
  },
  {
    id: 'IV-ICD9-08',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'difficult',
    caseIcon: 'eye-nerve',
    organType: 'eye',
    organAnatomy: 'Lensa Kristalin Bola Mata (Segmen Anterior)',
    title: 'Fakoemulsifikasi dan Aspirasi Katarak Diabetik',
    scenario:
      'Pasien DM dengan komplikasi multipel (ulkus dan katarak) menjalani operasi ekstraksi lensa katarak metode Phacoemulsification and aspiration of cataract. Berapa kode tindakan ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['13.41'],
    icd10PrimaryDisplay: '13.41',
    icd10PrimaryPlaceholder: 'Mis. 13.41',
    leadTermDisplay: 'Phacoemulsification → cataract → 13.41',
    traceSteps:
      'ICD-9-CM Index: "Phacoemulsification" → cataract → Tabular 13.41 (Phacoemulsification and aspiration of cataract).',
    commonMistakes:
      'Tertukar dengan kode insersi lensa intraokular / IOL (13.71) atau ekstraksi ekstrakapsular lain (13.59).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 13.41.',
  },
  {
    id: 'IV-ICD9-09',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'difficult',
    caseIcon: 'brain',
    organType: 'brain-speech',
    organAnatomy: 'Area Bahasa Otak (Broca–Wernicke) & Organ Artikulasi',
    title: 'Terapi Wicara (Speech Therapy) pada Gangguan Tiroid Kongenital',
    scenario:
      'Anak dengan Congenital iodine-deficiency syndrome tipe neurologis menjalani program rehabilitasi Terapi Wicara (Other speech training and therapy). Berapa kode ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['93.75'],
    icd10PrimaryDisplay: '93.75',
    icd10PrimaryPlaceholder: 'Mis. 93.75',
    leadTermDisplay: 'Therapy → speech → 93.75',
    traceSteps:
      'ICD-9-CM Index: "Therapy" → speech → Tabular 93.75 (Other speech training and therapy).',
    commonMistakes:
      'Tertukar dengan terapi okupasi (93.83) atau terapi disleksia spesifik (93.71).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 93.75.',
  },
  {
    id: 'IV-ICD9-10',
    chapter: 'bab4',
    chapterLabel: 'Bab IV · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'difficult',
    caseIcon: 'brain',
    organType: 'pituitary',
    organAnatomy: 'Sela Tursika, Kelenjar Hipofisis & Batang Otak',
    title: 'MRI Otak & Batang Otak / Hipofisis pada Diabetes Insipidus',
    scenario:
      'Pasien dengan Diabetes Insipidus sentral menjalani pencitraan kelenjar hipofisis menggunakan Magnetic resonance imaging of brain and brain stem. Tentukan kode ICD-9-CM-nya.',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['88.91'],
    icd10PrimaryDisplay: '88.91',
    icd10PrimaryPlaceholder: 'Mis. 88.91',
    leadTermDisplay: 'Imaging, magnetic resonance → brain → 88.91',
    traceSteps:
      'ICD-9-CM Index: "Imaging, magnetic resonance" → brain → Tabular 88.91 (MRI of brain and brain stem).',
    commonMistakes:
      'Tertukar dengan CT scan kepala (87.03) atau USG kepala dan leher (88.71).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 88.91.',
  },

  // =========================================================================
  // BAB V (F00–F99) — 10 SOAL DIAGNOSIS ICD-10
  // =========================================================================
  {
    id: 'V-ICD10-01',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'easy',
    caseIcon: 'maternal',
    organType: 'synapse',
    organAnatomy: 'Sistem Limbik, Aksis HPA & Celah Sinaps Serotonin (5-HT)',
    title: 'Depresi Setelah Melahirkan (Postpartum Depression)',
    scenario:
      'Ny. K (fiktif, 27 tahun) mengalami kesedihan mendalam 3 minggu pascapersalinan tanpa gejala psikotik berat dan didiagnosis Depresi Setelah Melahirkan. Berapa kode ICD-10-nya?',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['F53.0'],
    icd10PrimaryDisplay: 'F53.0',
    icd10PrimaryPlaceholder: 'Mis. F53.0',
    leadTermDisplay: 'Depression → postpartum / puerperal → F53.0',
    traceSteps:
      'Vol. 3: "Depression" → postpartum / puerperal → F53.0. Vol. 1: F53.0 = Mild mental & behavioural disorders associated with the puerperium, NEC.',
    commonMistakes:
      'Memilih F53.1 (psikosis nifas berat) atau F32.9 tanpa memperhatikan onset masa nifas (<6 minggu).',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F53.0.',
  },
  {
    id: 'V-ICD10-02',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'brain-visual',
    organAnatomy: 'Korteks Oksipital Visual & Jalur Persepsi Otak',
    title: 'Halusinasi Melihat Bayangan Seperti Mengikuti (Gejala Tunggal)',
    scenario:
      'Tn. L (fiktif) berobat dengan keluhan melihat bayangan mengikuti dirinya (halusinasi visual) tanpa adanya diagnosis psikiatri definitif dari dokter. Kode ICD-10 apa yang tepat?',
    icd10PrimaryLabel: 'Kode ICD-10 (Bab XVIII)',
    icd10PrimaryAccepted: ['R44.1'],
    icd10PrimaryDisplay: 'R44.1',
    icd10PrimaryPlaceholder: 'Mis. R44.1',
    leadTermDisplay: 'Hallucination → visual → R44.1 (bukan Bab V jika baru gejala tunggal)',
    traceSteps:
      'Vol. 3: "Hallucination" → visual → R44.1. Vol. 1 Bab XVIII: R44.1 = Visual hallucinations. Jangan memaksakan F20 bila diagnosis psikosis belum ditegakkan.',
    commonMistakes:
      'Langsung mengode F20.9 (skizofrenia) padahal berkas hanya mencatat gejala halusinasi visual tunggal.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — R44.1.',
  },
  {
    id: 'V-ICD10-03',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'easy',
    caseIcon: 'phobia',
    organType: 'brain-limbic',
    organAnatomy: 'Amigdala (Sistem Limbik) & Sistem Saraf Simpatis',
    title: 'Phobia Ular Kobra (Fobia Spesifik)',
    scenario:
      'Sdr. M (fiktif) mengalami ketakutan ekstrem dan panik spesifik setiap melihat ular kobra (animal phobia). Berapa kode ICD-10 yang tepat?',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['F40.2'],
    icd10PrimaryDisplay: 'F40.2',
    icd10PrimaryPlaceholder: 'Mis. F40.2',
    leadTermDisplay: 'Phobia → animal / specific (isolated) → F40.2',
    traceSteps:
      'Vol. 3: "Phobia" → animal / specific → F40.2. Vol. 1: F40.2 = Specific (isolated) phobias (Includes: Animal phobias).',
    commonMistakes:
      'Memilih agorafobia (F40.0), fobia sosial (F40.1), atau gangguan panik umum (F41.0).',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F40.2.',
  },
  {
    id: 'V-ICD10-04',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'easy',
    caseIcon: 'brain',
    organType: 'brain-speech',
    organAnatomy: 'Korteks Auditori–Wernicke–Broca & Jaras Bicara',
    title: 'Speech Delay (Keterlambatan Bicara Anak)',
    scenario:
      'An. N (fiktif, 4 tahun) dirujuk ke poli tumbuh kembang karena mengalami keterlambatan perkembangan bicara (Speech delay). Berapa kode ICD-10 yang tepat?',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['F80.9'],
    icd10PrimaryDisplay: 'F80.9',
    icd10PrimaryPlaceholder: 'Mis. F80.9',
    leadTermDisplay: 'Delay → development → speech → F80.9',
    traceSteps:
      'Vol. 3: "Delay" → development → speech → F80.9. Vol. 1: F80.9 = Developmental disorder of speech and language, unspecified.',
    commonMistakes:
      'Tertukar dengan gangguan artikulasi spesifik (F80.0) atau gejala disfasia R47.0.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F80.9.',
  },
  {
    id: 'V-ICD10-05',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'brain-cognition',
    organAnatomy: 'Korteks Prefrontal & Jaringan Konektivitas Serebral',
    title: 'Retardasi Mental dengan Skor IQ 27',
    scenario:
      'Remaja O (fiktif) didiagnosis Retardasi Mental berdasarkan hasil pemeriksaan psikometri dengan skor IQ 27. Tentukan kode ICD-10 yang sesuai rentang IQ tersebut.',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['F72', 'F72.9'],
    icd10PrimaryDisplay: 'F72',
    icd10PrimaryPlaceholder: 'Mis. F72',
    leadTermDisplay: 'Retardation → mental → severe (IQ 20–34) → F72',
    traceSteps:
      'Vol. 3: "Retardation" → mental → severe → F72. Vol. 1: F72 mencakup retardasi mental berat dengan rentang IQ 20–34.',
    commonMistakes:
      'Salah memilih F71 (IQ 35–49) atau F73 (IQ <20); skor IQ 27 berada pada rentang 20–34.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F72.',
  },
  {
    id: 'V-ICD10-06',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'difficult',
    caseIcon: 'brain',
    organType: 'brain-cognition',
    organAnatomy: 'Girus Angularis & Lobus Temporo-Parietal Otak',
    title: 'Kesulitan Spesifik Mengeja dan Membaca',
    scenario:
      'An. P (fiktif) usia sekolah dasar dengan kecerdasan normal mengalami kesulitan spesifik dalam membaca dan mengeja kata. Tentukan kedua kode ICD-10-nya.',
    icd10PrimaryLabel: 'Kode ICD-10 Membaca',
    icd10PrimaryAccepted: ['F81.0'],
    icd10PrimaryDisplay: 'F81.0',
    icd10PrimaryPlaceholder: 'Mis. F81.0',
    icd10SecondaryLabel: 'Kode ICD-10 Mengeja',
    icd10SecondaryAccepted: ['F81.1'],
    icd10SecondaryDisplay: 'F81.1',
    icd10SecondaryPlaceholder: 'Mis. F81.1',
    leadTermDisplay: 'Disorder → reading (F81.0) & Disorder → spelling, specific (F81.1)',
    traceSteps:
      'Vol. 3: "Disorder" → reading (developmental) → F81.0; "Disorder" → spelling (specific) → F81.1.',
    commonMistakes:
      'Mengode ke retardasi mental (F70–F79) atau menggabungkan ke F81.9 padahal kedua gangguan skolastik spesifiknya tercatat jelas.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F81.0 + F81.1.',
  },
  {
    id: 'V-ICD10-07',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'respiratory',
    organType: 'lung',
    organAnatomy: 'Reseptor Nikotinik Otak & Bronkus–Alveoli Paru (PPOK)',
    title: 'Kecanduan Rokok Menyebabkan PPOK',
    scenario:
      'Tn. Q (fiktif) perokok berat didiagnosis sindrom ketergantungan tembakau/rokok yang mengakibatkan Penyakit Paru Obstruktif Kronik (PPOK). Tentukan kedua kode ICD-10-nya.',
    icd10PrimaryLabel: 'Kode ICD-10 Ketergantungan Rokok',
    icd10PrimaryAccepted: ['F17.2'],
    icd10PrimaryDisplay: 'F17.2',
    icd10PrimaryPlaceholder: 'Mis. F17.2',
    icd10SecondaryLabel: 'Kode ICD-10 PPOK',
    icd10SecondaryAccepted: ['J44.9'],
    icd10SecondaryDisplay: 'J44.9',
    icd10SecondaryPlaceholder: 'Mis. J44.9',
    leadTermDisplay: 'Dependence → tobacco (F17.2) + Disease → pulmonary, chronic obstructive (J44.9)',
    traceSteps:
      'Vol. 3: "Dependence" → tobacco → F17.2 (karakter ke-4 .2 = dependence syndrome); "Disease" → pulmonary, chronic obstructive → J44.9.',
    commonMistakes:
      'Memilih F17.1 (penggunaan merugikan) atau F17.0 (intoksikasi) padahal kasus menyatakan kecanduan/ketergantungan (.2).',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F17.2 + J44.9.',
  },
  {
    id: 'V-ICD10-08',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'synapse',
    organAnatomy: 'Sistem Limbik & Celah Sinaps (Dopamin, Serotonin, GABA)',
    title: 'Gangguan Afektif Bipolar Tipe II',
    scenario:
      'Ny. R (fiktif) memiliki episode depresi berulang disertai riwayat hipomania (tanpa mania penuh) serta didiagnosis Bipolar Tipe II. Berapa kode ICD-10-nya?',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['F31.8'],
    icd10PrimaryDisplay: 'F31.8',
    icd10PrimaryPlaceholder: 'Mis. F31.8',
    leadTermDisplay: 'Disorder → bipolar → II (type 2) → F31.8',
    traceSteps:
      'Vol. 3: "Disorder" → bipolar → II → F31.8. Vol. 1: F31.8 = Other bipolar affective disorders (Includes: Bipolar II disorder).',
    commonMistakes:
      'Mengode ke F31.9 (tak spesifik) atau F31.0–F31.6 (Bipolar I) padahal Bipolar II secara eksplisit masuk di F31.8.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F31.8.',
  },
  {
    id: 'V-ICD10-09',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'difficult',
    caseIcon: 'brain',
    organType: 'synapse',
    organAnatomy: 'Jaras Dopaminergik Mesolimbik, PFC & Reseptor D2',
    title: 'Schizophrenia Schizoaffective Type Manic',
    scenario:
      'Tn. S (fiktif) dirawat inap karena gejala psikotik skizofrenia yang muncul bersamaan dengan episode mania menonjol (Schizophrenia schizoaffective type manic). Tentukan kode ICD-10-nya.',
    icd10PrimaryLabel: 'Kode ICD-10',
    icd10PrimaryAccepted: ['F25.0'],
    icd10PrimaryDisplay: 'F25.0',
    icd10PrimaryPlaceholder: 'Mis. F25.0',
    leadTermDisplay: 'Disorder → schizoaffective → manic type → F25.0',
    traceSteps:
      'Vol. 3: "Disorder" → schizoaffective → manic type → F25.0. Vol. 1: F25.0 = Schizoaffective disorder, manic type.',
    commonMistakes:
      'Mengode ke F20.0 (skizofrenia paranoid) atau F25.1 (tipe depresif) atau memecah F20 + F30.',
    reference: 'WHO ICD-10 Vol. 1 & 3 (2010) — F25.0.',
  },
  {
    id: 'V-ICD10-10',
    chapter: 'bab5',
    chapterLabel: 'Bab V (F00–F99)',
    codeType: 'icd10',
    difficulty: 'difficult',
    caseIcon: 'dementia',
    organType: 'brain-limbic',
    organAnatomy: 'Parenkim Otak, Hipokampus & Subkorteks (Ensefalopati HIV)',
    title: 'Demensia pada Penderita HIV',
    scenario:
      'Tn. T (fiktif) penyandang HIV mengalami penurunan kognitif progresif dan didiagnosis Demensia akibat penyakit HIV. Tentukan pasangan kode Dagger (†) dan Asterisk (*) yang benar.',
    icd10PrimaryLabel: 'Kode ICD-10 Utama (†)',
    icd10PrimaryAccepted: ['B22.0', 'B22.0†'],
    icd10PrimaryDisplay: 'B22.0†',
    icd10PrimaryPlaceholder: 'Mis. B22.0',
    icd10SecondaryLabel: 'Kode Manifestasi (*)',
    icd10SecondaryAccepted: ['F02.4', 'F02.4*'],
    icd10SecondaryDisplay: 'F02.4*',
    icd10SecondaryPlaceholder: 'Mis. F02.4',
    leadTermDisplay: 'Dementia → in → human immunodeficiency virus [HIV] disease → B22.0† F02.4*',
    traceSteps:
      'Vol. 3: "Dementia" → in → HIV disease → B22.0† F02.4*. Vol. 1: B22.0 (HIV encephalopathy) dan F02.4* (Dementia in HIV disease).',
    commonMistakes:
      'Membalik urutan menjadi F02.4 di depan atau memakai kode F03 (demensia tak spesifik).',
    reference: 'WHO ICD-10 Vol. 1, 2 & 3 (2010) — B22.0† F02.4*.',
  },

  // =========================================================================
  // BAB V (F00–F99) — 10 SOAL PROSEDUR TINDAKAN ICD-9-CM
  // =========================================================================
  {
    id: 'V-ICD9-01',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'easy',
    caseIcon: 'maternal',
    organType: 'synapse',
    organAnatomy: 'Korteks Prefrontal, Sistem Limbik & Regulasi Neurotransmiter',
    title: 'Psikoterapi Suportif Individual pada Depresi Nifas',
    scenario:
      'Ibu pascapersalinan dengan depresi nifas mendapatkan layanan terapi sesi tunggal berupa Other individual psychotherapy. Berapa kode tindakan ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['94.39'],
    icd10PrimaryDisplay: '94.39',
    icd10PrimaryPlaceholder: 'Mis. 94.39',
    leadTermDisplay: 'Psychotherapy → individual → 94.39',
    traceSteps:
      'ICD-9-CM Index: "Psychotherapy" → individual → Tabular 94.39 (Other individual psychotherapy).',
    commonMistakes:
      'Tertukar dengan evaluasi psikiatri (94.19) atau terapi keluarga (94.42).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 94.39.',
  },
  {
    id: 'V-ICD9-02',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'brain-visual',
    organAnatomy: 'Korteks Oksipital–Temporal & Sistem Limbik (Evaluasi Klinis)',
    title: 'Wawancara & Evaluasi Psikiatri Diagnostik',
    scenario:
      'Pasien dengan keluhan halusinasi visual menjalani sesi wawancara psikiatri diagnostik (Other psychiatric interview and evaluation). Tentukan kode tindakan ICD-9-CM-nya.',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['94.19'],
    icd10PrimaryDisplay: '94.19',
    icd10PrimaryPlaceholder: 'Mis. 94.19',
    leadTermDisplay: 'Interview / Evaluation → psychiatric → 94.19',
    traceSteps:
      'ICD-9-CM Index: "Interview" → psychiatric → Tabular 94.19 (Other psychiatric interview and evaluation).',
    commonMistakes:
      'Tertukar dengan penentuan status mental rutin (94.11) atau terapi obat psikiatri (94.25).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 94.19.',
  },
  {
    id: 'V-ICD9-03',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'easy',
    caseIcon: 'phobia',
    organType: 'brain-limbic',
    organAnatomy: 'Amigdala & Prefrontal Inhibitory Pathway (Desensitisasi)',
    title: 'Behavior Therapy pada Fobia Spesifik',
    scenario:
      'Pasien fobia ular kobra menjalani terapi desensitisasi sistematis yang diklasifikasikan sebagai Behavior therapy. Berapa kode prosedur ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['94.33'],
    icd10PrimaryDisplay: '94.33',
    icd10PrimaryPlaceholder: 'Mis. 94.33',
    leadTermDisplay: 'Therapy → behavior → 94.33',
    traceSteps:
      'ICD-9-CM Index: "Therapy" → behavior → Tabular 94.33 (Behavior therapy).',
    commonMistakes:
      'Tertukar dengan psikoterapi individual umum (94.39) atau konseling keluarga (94.42).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 94.33.',
  },
  {
    id: 'V-ICD9-04',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'easy',
    caseIcon: 'brain',
    organType: 'brain-speech',
    organAnatomy: 'Korteks Bahasa (Broca–Wernicke) & Organ Fonasi',
    title: 'Terapi Wicara pada Anak dengan Speech Delay',
    scenario:
      'Anak dengan keterlambatan bicara (Speech Delay) mengikuti sesi latihan bicara terstruktur (Other speech training and therapy). Berapa kode tindakan ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['93.75'],
    icd10PrimaryDisplay: '93.75',
    icd10PrimaryPlaceholder: 'Mis. 93.75',
    leadTermDisplay: 'Therapy → speech → 93.75',
    traceSteps:
      'ICD-9-CM Index: "Therapy" → speech → Tabular 93.75 (Other speech training and therapy).',
    commonMistakes:
      'Tertukar dengan evaluasi psikologis (94.08) atau terapi edukasi belajar (93.82).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 93.75.',
  },
  {
    id: 'V-ICD9-05',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'brain-cognition',
    organAnatomy: 'Korteks Motorik, Serebelum & Jaringan Kognitif Adaptif',
    title: 'Terapi Okupasi Rehabilitasi pada Retardasi Mental',
    scenario:
      'Remaja dengan retardasi mental (IQ 27) menjalani pelatihan kemandirian fungsional melalui Occupational therapy. Berapa kode prosedur ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['93.83'],
    icd10PrimaryDisplay: '93.83',
    icd10PrimaryPlaceholder: 'Mis. 93.83',
    leadTermDisplay: 'Therapy → occupational → 93.83',
    traceSteps:
      'ICD-9-CM Index: "Therapy" → occupational → Tabular 93.83 (Occupational therapy).',
    commonMistakes:
      'Tertukar dengan tes intelegensi (94.01) atau terapi wicara (93.75).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 93.83.',
  },
  {
    id: 'V-ICD9-06',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'brain',
    organType: 'brain-cognition',
    organAnatomy: 'Lobus Parieto-Temporal Kiri & Memori Kerja Kognitif',
    title: 'Asesmen Neuropsikologis Membaca dan Mengeja',
    scenario:
      'Siswa dengan gangguan membaca dan mengeja menjalani asesmen neuropsikologis terstruktur (Other psychological evaluation and testing). Tentukan kode tindakan ICD-9-CM-nya.',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['94.08'],
    icd10PrimaryDisplay: '94.08',
    icd10PrimaryPlaceholder: 'Mis. 94.08',
    leadTermDisplay: 'Evaluation → psychological → 94.08',
    traceSteps:
      'ICD-9-CM Index: "Evaluation" → psychological → Tabular 94.08 (Other psychological evaluation and testing).',
    commonMistakes:
      'Tertukar dengan tes intelegensi khusus IQ (94.01) atau terapi remediasi edukasi (93.82).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 94.08.',
  },
  {
    id: 'V-ICD9-07',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'medium',
    caseIcon: 'respiratory',
    organType: 'lung',
    organAnatomy: 'Trakea, Cabang Bronkus & Kapasitas Alveoli Paru',
    title: 'Pemeriksaan Spirometri pada Ketergantungan Rokok & PPOK',
    scenario:
      'Perokok kronis yang mengalami PPOK menjalani uji fungsi ventilasi paru Spirometri (Vital capacity determination). Berapa kode tindakan ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['89.37'],
    icd10PrimaryDisplay: '89.37',
    icd10PrimaryPlaceholder: 'Mis. 89.37',
    leadTermDisplay: 'Determination → vital capacity (spirometry) → 89.37',
    traceSteps:
      'ICD-9-CM Index: "Determination" → vital capacity → Tabular 89.37 (Vital capacity determination / spirometry).',
    commonMistakes:
      'Tertukar dengan terapi nebulizer (93.94) atau konseling berhenti merokok (94.49).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 89.37.',
  },
  {
    id: 'V-ICD9-08',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'difficult',
    caseIcon: 'brain',
    organType: 'brain-limbic',
    organAnatomy: 'Korteks Prefrontal, Sistem Limbik & Regulasi Afek',
    title: 'Penentuan Status Mental Psikiatri pada Bipolar II',
    scenario:
      'Pasien dengan Gangguan Afektif Bipolar Tipe II menjalani evaluasi status mental psikiatri (Psychiatric mental status determination). Tentukan kode tindakan ICD-9-CM-nya.',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['94.11'],
    icd10PrimaryDisplay: '94.11',
    icd10PrimaryPlaceholder: 'Mis. 94.11',
    leadTermDisplay: 'Determination → mental status (psychiatric) → 94.11',
    traceSteps:
      'ICD-9-CM Index: "Determination" → mental status, psychiatric → Tabular 94.11 (Psychiatric mental status determination).',
    commonMistakes:
      'Tertukar dengan wawancara psikiatri lain (94.19) atau psikoterapi individual (94.39).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 94.11.',
  },
  {
    id: 'V-ICD9-09',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'difficult',
    caseIcon: 'brain',
    organType: 'synapse',
    organAnatomy: 'Sirkuit Kortiko-Limbik & Reseptor Neurotransmiter Otak',
    title: 'Terapi Kejang Listrik (ECT) pada Skizoafektif Tipe Manik',
    scenario:
      'Pasien rawat inap dengan Skizofrenia Skizoafektif Tipe Manik menjalani prosedur Electroconvulsive therapy [ECT] / Other electroshock therapy. Berapa kode ICD-9-CM-nya?',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['94.27'],
    icd10PrimaryDisplay: '94.27',
    icd10PrimaryPlaceholder: 'Mis. 94.27',
    leadTermDisplay: 'Therapy → electroconvulsive / electroshock [ECT] → 94.27',
    traceSteps:
      'ICD-9-CM Index: "Therapy" → electroconvulsive / electroshock → Tabular 94.27 (Other electroshock therapy).',
    commonMistakes:
      'Tertukar dengan terapi obat psikiatri (94.25) atau pemeriksaan EEG (89.14).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 94.27.',
  },
  {
    id: 'V-ICD9-10',
    chapter: 'bab5',
    chapterLabel: 'Bab V · ICD-9-CM',
    codeType: 'icd9',
    difficulty: 'difficult',
    caseIcon: 'dementia',
    organType: 'brain-limbic',
    organAnatomy: 'Serebrum, Hipokampus & Batang Otak (Pencitraan MRI)',
    title: 'MRI Otak pada Demensia HIV',
    scenario:
      'Pasien penyandang HIV dengan gejala demensia progresif menjalani pencitraan Magnetic resonance imaging of brain and brain stem. Tentukan kode tindakan ICD-9-CM-nya.',
    icd10PrimaryLabel: 'Kode Tindakan ICD-9-CM',
    icd10PrimaryAccepted: ['88.91'],
    icd10PrimaryDisplay: '88.91',
    icd10PrimaryPlaceholder: 'Mis. 88.91',
    leadTermDisplay: 'Imaging, magnetic resonance → brain → 88.91',
    traceSteps:
      'ICD-9-CM Index: "Imaging, magnetic resonance" → brain → Tabular 88.91 (MRI of brain and brain stem).',
    commonMistakes:
      'Tertukar dengan terapi okupasi/rehabilitasi kognitif (93.83) atau pungsi lumbal (03.31).',
    reference: 'ICD-9-CM Vol. 3 — Kategori 88.91.',
  },
];

export const REFERENCES_LIST = [
  'World Health Organization (WHO). (2010). International Statistical Classification of Diseases and Related Health Problems, 10th Revision (ICD-10), Volume 1: Tabular List. Geneva: WHO.',
  'World Health Organization (WHO). (2010). ICD-10 Volume 2: Instruction Manual (ISBN 9789241547215 — Aturan Kodifikasi Morbiditas, Dagger/Asterisk, Bab IV & Bab V). Diakses dari: https://iris.who.int/bitstream/handle/10665/43764/9789241547215_eng.pdf?sequence=1',
  'World Health Organization (WHO). (2010). ICD-10 Volume 3: Alphabetical Index. Geneva: WHO.',
  'World Health Organization (WHO). WHO ICD-10 Interactive Training Tool (Referensi Struktur Modul KAK). Diakses dari: https://icdtraining.z16.web.core.windows.net/training/ICD10Training/ICD-10%20training/Start/index.html',
  'Centers for Medicare & Medicaid Services / NCHS. International Classification of Diseases, 9th Revision, Clinical Modification (ICD-9-CM) Volume 3: Procedures.',
  'Kementerian Kesehatan Republik Indonesia. Standar Terminologi Klinis & Dokumentasi Platform SATUSEHAT (ICD-10 Versi 2010) serta Pedoman INA-CBGs. Jakarta: Kemenkes RI.',
  'Tortora, G. J., & Derrickson, B. Principles of Anatomy and Physiology (Sistem Endokrin & Sistem Saraf Pusat).',
  'Katzung, B. G., & Vanderah, T. W. Basic & Clinical Pharmacology (Pancreatic Hormones, Thyroid Drugs, Antipsychotics, Antidepressants).',
  'Program Studi D3 Rekam Medis & Informasi Kesehatan Universitas Esa Unggul. (2026). Kerangka Acuan Kerja (KAK) & Kompilasi Soal Kodifikasi Capstone Experience Semester 3.',
];
