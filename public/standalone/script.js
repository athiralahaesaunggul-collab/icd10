/* =========================================================================
   APLIKASI MEDIA PEMBELAJARAN KODIFIKASI (ICD-10 & ICD-9-CM)
   Topik: Bab IV (E00-E90) & Bab V (F00-F99) — Capstone Semester 3 D3 RMIK UEU
   Latihan Soal Kasus: 40 Soal (10 ICD-10 & 10 ICD-9-CM per Bab) · Kolom + ✓
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const splashScreen = document.getElementById("splash-screen");
  const appShell = document.getElementById("app-shell");
  const btnPlay = document.getElementById("btn-play");
  const btnBackSplash = document.getElementById("btn-back-splash");
  const btnBackMenu = document.getElementById("btn-back-menu");
  const activePageTitle = document.getElementById("active-page-title");
  const headerBreadcrumb = document.getElementById("header-breadcrumb");

  const views = document.querySelectorAll(".app-view");
  const subtabButtons = document.querySelectorAll(".subtab-btn[data-chapter]");

  const SUBTAB_BREADCRUMB = {
    pengantar: "> Overview of the chapter",
    coding: "> Coding Review",
    science: "> Medical Science",
    pharma: "> Pharmacology"
  };

  const VIEW_BREADCRUMB = {
    "view-main-menu": "> Main Menu & Identitas Kelompok",
    "view-user-guide": "> Petunjuk Penggunaan",
    "view-module-info": "> Ruang Lingkup Capstone",
    "view-references": "> Referensi & Versi Klasifikasi",
    "view-basics": "> Alur Verifikasi WHO",
    "view-chapter-4": "> Overview of the chapter",
    "view-chapter-5": "> Overview of the chapter",
    "view-pharma": "> Pharmacology (Non-Resep)",
    "view-quiz": "> Exercises"
  };

  let currentViewId = "view-main-menu";
  let currentFilter = "all";
  let currentCodeType = "all";
  let activeLevel = null; // null = Level Hub | "easy" | "medium" | "difficult" | "all-list"
  let currentQuestionIdx = 0;

  function getActiveChapterSubtab(ch) {
    const activeBtn = document.querySelector(`.subtab-btn[data-chapter="${ch}"].active`);
    return activeBtn ? activeBtn.getAttribute("data-tab") : "pengantar";
  }

  function updateHeaderBreadcrumb(viewId) {
    if (!headerBreadcrumb) return;
    if (viewId === "view-quiz") {
      if (activeLevel === null) headerBreadcrumb.textContent = "> Exercises";
      else if (activeLevel === "all-list") headerBreadcrumb.textContent = "> Exercises > Semua Soal";
      else {
        const cap = activeLevel.charAt(0).toUpperCase() + activeLevel.slice(1);
        headerBreadcrumb.textContent = `> Exercises > ${cap}`;
      }
      return;
    }
    if (viewId === "view-chapter-4") {
      const tab = getActiveChapterSubtab("4");
      headerBreadcrumb.textContent = SUBTAB_BREADCRUMB[tab] || "> Overview of the chapter";
    } else if (viewId === "view-chapter-5") {
      const tab = getActiveChapterSubtab("5");
      headerBreadcrumb.textContent = SUBTAB_BREADCRUMB[tab] || "> Overview of the chapter";
    } else {
      headerBreadcrumb.textContent = VIEW_BREADCRUMB[viewId] || "> Main Menu";
    }
  }

  function openAppFromSplash() {
    splashScreen.classList.add("hidden");
    appShell.classList.remove("hidden");
    navigateTo("view-main-menu", "Main menu");
  }

  function returnToSplash() {
    appShell.classList.add("hidden");
    splashScreen.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const appHeader = document.querySelector(".app-header");
  const appMain = document.querySelector(".app-main");
  const btnMainMenuClose = document.getElementById("btn-main-menu-close");

  function navigateTo(viewId, titleText) {
    currentViewId = viewId;
    views.forEach((view) => {
      view.classList.toggle("active", view.id === viewId);
    });
    activePageTitle.textContent = titleText;
    updateHeaderBreadcrumb(viewId);
    const isMainMenu = viewId === "view-main-menu";
    if (appHeader) appHeader.classList.toggle("hidden", isMainMenu);
    if (appMain) appMain.classList.toggle("main-menu-mode", isMainMenu);
    btnBackMenu.classList.toggle("hidden", isMainMenu);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  btnPlay.addEventListener("click", openAppFromSplash);
  btnBackSplash.addEventListener("click", returnToSplash);
  if (btnMainMenuClose) btnMainMenuClose.addEventListener("click", returnToSplash);
  btnBackMenu.addEventListener("click", () => navigateTo("view-main-menu", "Main menu"));

  document.querySelectorAll(".who-menu-row, .who-module-jump").forEach((row) => {
    row.addEventListener("click", () => {
      const targetView = row.getAttribute("data-target");
      const targetTitle = row.getAttribute("data-title");
      const targetSubtab = row.getAttribute("data-subtab");
      if (targetView) {
        if (targetSubtab && (targetView === "view-chapter-4" || targetView === "view-chapter-5")) {
          const ch = targetView === "view-chapter-4" ? "4" : "5";
          const subBtn = document.querySelector(`.subtab-btn[data-chapter="${ch}"][data-tab="${targetSubtab}"]`);
          if (subBtn) subBtn.click();
        }
        navigateTo(targetView, targetTitle || "Main menu");
      }
    });
  });

  subtabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const ch = btn.getAttribute("data-chapter");
      const tab = btn.getAttribute("data-tab");
      const panelId = `ch${ch}-${tab}`;

      document.querySelectorAll(`.subtab-btn[data-chapter="${ch}"]`).forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const chapterSection = document.getElementById(`view-chapter-${ch}`);
      chapterSection.querySelectorAll(".subtab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === panelId);
      });

      updateHeaderBreadcrumb(`view-chapter-${ch}`);
    });
  });

  // Tombol 5. Exercises langsung dari dalam Bab IV / Bab V
  document.querySelectorAll(".who-exercise-jump").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chFilter = btn.getAttribute("data-filter") || "all";
      currentFilter = chFilter;
      activeLevel = null;
      currentQuestionIdx = 0;
      document.querySelectorAll(".filter-btn").forEach((fb) => {
        fb.classList.toggle("active", fb.getAttribute("data-filter") === chFilter);
      });
      navigateTo("view-quiz", "Latihan Kasus — Exercises ICD-10 & ICD-9-CM");
      renderQuiz();
    });
  });

  // -----------------------------------------------------------------------
  // IDENTITAS KELOMPOK EDITABLE & SINKRON (HOME + MODULE INFO)
  // -----------------------------------------------------------------------
  const DEFAULT_TEAM_MEMBERS = [
    { no: 1, name: "Athira Laha Afaf Yudia", nim: "20250306001", role: "Koordinator Kelompok & PJ Coding Review" },
    { no: 2, name: "[Nama Anggota Kelompok 2]", nim: "[NIM Anggota 2]", role: "PJ Medical Science & Terminologi Medis" },
    { no: 3, name: "[Nama Anggota Kelompok 3]", nim: "[NIM Anggota 3]", role: "PJ Farmakologi Edukatif & Soal Latihan" },
    { no: 4, name: "[Nama Anggota Kelompok 4]", nim: "[NIM Anggota 4]", role: "Pengembang Aplikasi & Pemeriksa Akhir (QA)" }
  ];

  function loadTeamMembers() {
    try {
      const saved = window.localStorage.getItem("ueu_rmik_team_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_e) {
      // ignore storage error
    }
    return DEFAULT_TEAM_MEMBERS.map((m) => ({ ...m }));
  }

  let teamMembers = loadTeamMembers();
  let isEditingTeam = false;

  function saveTeamMembers() {
    try {
      window.localStorage.setItem("ueu_rmik_team_v1", JSON.stringify(teamMembers));
    } catch (_e) {
      // ignore storage error
    }
  }

  function escapeHtmlText(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderTeamTables() {
    const tbodyIds = ["home-team-tbody", "module-team-tbody"];
    tbodyIds.forEach((id) => {
      const tbody = document.getElementById(id);
      if (!tbody) return;
      tbody.innerHTML = teamMembers
        .map((m, idx) => {
          if (isEditingTeam && idx > 0) {
            return `<tr>
              <td>${m.no}</td>
              <td><input type="text" class="team-edit-input" data-idx="${idx}" data-field="name" aria-label="Nama Anggota ${m.no}" value="${escapeHtmlText(m.name)}" /></td>
              <td><input type="text" class="team-edit-input mono" data-idx="${idx}" data-field="nim" aria-label="NIM Anggota ${m.no}" value="${escapeHtmlText(m.nim)}" /></td>
              <td><input type="text" class="team-edit-input" data-idx="${idx}" data-field="role" aria-label="Peran Anggota ${m.no}" value="${escapeHtmlText(m.role)}" /></td>
            </tr>`;
          }
          return `<tr>
            <td>${m.no}</td>
            <td><strong>${escapeHtmlText(m.name)}</strong></td>
            <td><code>${escapeHtmlText(m.nim)}</code></td>
            <td>${escapeHtmlText(m.role)}</td>
          </tr>`;
        })
        .join("");

      if (isEditingTeam) {
        tbody.querySelectorAll(".team-edit-input").forEach((inp) => {
          inp.addEventListener("input", (e) => {
            const idx = Number(e.target.getAttribute("data-idx"));
            const field = e.target.getAttribute("data-field");
            if (teamMembers[idx] && field) {
              teamMembers[idx][field] = e.target.value;
              saveTeamMembers();
            }
          });
        });
      }
    });

    ["btn-edit-team-home", "btn-edit-team-module"].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) btn.textContent = isEditingTeam ? "✓ Simpan Perubahan" : "✎ Edit Anggota 2–4";
    });
  }

  ["btn-edit-team-home", "btn-edit-team-module"].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", () => {
        isEditingTeam = !isEditingTeam;
        renderTeamTables();
      });
    }
  });

  renderTeamTables();

  // -----------------------------------------------------------------------
  // DATA 10 KASUS BAB IV & 10 KASUS BAB V (CODING REVIEW PARITY)
  // -----------------------------------------------------------------------
  const ch4Cases = [
    {
      title: "1. DM Tipe 1 dengan Retinopathy",
      scenario: "Ny. A (fiktif) dengan diagnosis Diabetes Melitus Tipe 1 disertai Retinopati Diabetik, menjalani funduskopi, OCT mata, dan laser fotokoagulasi retina.",
      code: "E10.3† H36.0*",
      steps: [
        "Lead Term: 'Diabetes, diabetic' dengan modifier 'type 1 (insulin-dependent)' dan 'with retinopathy'.",
        "Indeks Alfabetis (Vol. 3): Diabetes → type 1 → with → retinopathy → merujuk ke E10.3† H36.0*.",
        "Verifikasi Tabular (Vol. 1): E10.3 (Insulin-dependent DM with ophthalmic complications) + H36.0* (Diabetic retinopathy)."
      ],
      procs: [
        { code: "16.21", name: "Ophthalmoscopy (pemeriksaan funduskopi)", trace: "Lead Term 'Ophthalmoscopy' → Indeks Prosedur → Tabular 16.21." },
        { code: "95.16", name: "Optical Coherence Tomography (OCT) retina", trace: "Lead Term 'Tomography' → optical coherence → Tabular 95.16." },
        { code: "14.24", name: "Destruction of chorioretinal lesion by laser photocoagulation", trace: "Lead Term 'Photocoagulation' → retina → Tabular 14.24." }
      ],
      rationale: "E10.3† ditetapkan sebagai kode etiologi DM Tipe 1 dengan komplikasi mata, diikuti H36.0* sebagai manifestasi wajib pada retina."
    },
    {
      title: "2. Tiroiditis Akut dengan Abses akibat Staphylococcus",
      scenario: "Tn. B (fiktif) didiagnosis Tiroiditis Akut supuratif disertai abses kelenjar tiroid akibat infeksi bakteri Staphylococcus.",
      code: "E06.0 + B95.8",
      steps: [
        "Lead Term: 'Thyroiditis' dengan modifier 'acute' atau 'abscess'.",
        "Indeks Alfabetis (Vol. 3): Thyroiditis → acute (suppurative) → E06.0; Infection → staphylococcal → B95.8.",
        "Verifikasi Tabular (Vol. 1): E06.0 memiliki catatan Includes: Abscess of thyroid dan instruksi kode tambahan B95–B97."
      ],
      procs: [
        { code: "88.71", name: "Diagnostic ultrasound of head and neck (USG tiroid)", trace: "Lead Term 'Ultrasonography' → head and neck → Tabular 88.71." },
        { code: "06.11", name: "Closed [needle] biopsy of thyroid (aspirasi jarum halus)", trace: "Lead Term 'Biopsy' → thyroid → percutaneous → Tabular 06.11." },
        { code: "06.09", name: "Other incision of thyroid field (insisi & drainase abses)", trace: "Lead Term 'Incision' → thyroid (field) → Tabular 06.09." }
      ],
      rationale: "Abses tiroid sudah tercakup di Includes E06.0 sehingga tidak dikode ganda sebagai abses leher; B95.8 ditambahkan sebagai agen infeksi."
    },
    {
      title: "3. Elektrolit Imbalance",
      scenario: "Ny. C (fiktif) dirawat dengan gangguan ketidakseimbangan elektrolit tanpa rincian ion spesifik dan menerima koreksi infus elektrolit.",
      code: "E87.8",
      steps: [
        "Lead Term: 'Imbalance' dengan modifier 'electrolyte'.",
        "Indeks Alfabetis (Vol. 3): Imbalance → electrolyte → E87.8.",
        "Verifikasi Tabular (Vol. 1): E87.8 = Other disorders of electrolyte and fluid balance, NEC."
      ],
      procs: [
        { code: "99.18", name: "Injection or infusion of electrolytes", trace: "Lead Term 'Infusion' → electrolytes → Tabular 99.18." }
      ],
      rationale: "Karena jenis ketidakseimbangan spesifik (hipokalemia E87.6 / hiponatremia E87.1) tidak dirinci, maka E87.8 paling tepat."
    },
    {
      title: "4. DM dengan Komplikasi Gangrene dan Periferal Angiopathy",
      scenario: "Tn. D (fiktif) menderita DM (tipe tidak dirinci) disertai gangren jari kaki dan angiopati perifer.",
      code: "E14.5† I79.2*",
      steps: [
        "Lead Term: 'Diabetes' → with → 'gangrene' / 'peripheral angiopathy'.",
        "Indeks Alfabetis (Vol. 3): Diabetes → with → peripheral angiopathy → E14.5† I79.2*.",
        "Verifikasi Tabular (Vol. 1): Subdivisi .5 mencakup diabetic gangrene dan peripheral angiopathy (I79.2*)."
      ],
      procs: [
        { code: "88.48", name: "Arteriography of femoral & lower extremity arteries", trace: "Lead Term 'Arteriography' → lower extremity → Tabular 88.48." },
        { code: "86.22", name: "Excisional debridement of wound, infection, or burn", trace: "Lead Term 'Debridement' → wound → excisional → Tabular 86.22." },
        { code: "84.11", name: "Amputation of toe", trace: "Lead Term 'Amputation' → toe → Tabular 84.11." }
      ],
      rationale: "Karakter ke-4 (.5) menghimpun komplikasi sirkulasi perifer; kategori E14 dipakai karena tipe DM tidak dirinci."
    },
    {
      title: "5. Marasmus Kwashiorkor",
      scenario: "An. E (fiktif) balita gizi buruk berat dengan gambaran gabungan Marasmus dan Kwashiorkor, dipasang NGT untuk nutrisi enteral.",
      code: "E42",
      steps: [
        "Lead Term: 'Kwashiorkor' dengan modifier 'marasmic'.",
        "Indeks Alfabetis (Vol. 3): Kwashiorkor → marasmic → E42.",
        "Verifikasi Tabular (Vol. 1): E42 = Marasmic kwashiorkor (kode kombinasi tunggal)."
      ],
      procs: [
        { code: "96.07", name: "Insertion of other (naso-)gastric tube (pemasangan NGT)", trace: "Lead Term 'Insertion' → tube → nasogastric → Tabular 96.07." },
        { code: "96.6", name: "Enteral infusion of concentrated nutritional substances", trace: "Lead Term 'Infusion' → nutritional substance → enteral → Tabular 96.6." }
      ],
      rationale: "ICD-10 menyediakan kode kombinasi tunggal E42 sehingga tidak boleh dipecah menjadi E40 dan E41 secara terpisah."
    },
    {
      title: "6. Congenital Iodine-Deficiency Syndrome, Myxoedematous Type + Retardasi Mental (IQ 25)",
      scenario: "An. F (fiktif) didiagnosis sindrom defisiensi yodium kongenital tipe miksedematosa dengan hasil uji psikometri IQ 25.",
      code: "E00.1 + F72",
      steps: [
        "Lead Term 1: 'Syndrome' → iodine-deficiency, congenital → myxoedematous → E00.1.",
        "Lead Term 2: 'Retardation' → mental → severe (IQ 20–34) → F72.",
        "Verifikasi Tabular (Vol. 1): E00.1 (myxoedematous type) dan F72 (Severe mental retardation, IQ 20–34)."
      ],
      procs: [
        { code: "94.01", name: "Administration of intelligence test (tes intelegensi klinis)", trace: "Lead Term 'Test' → intelligence → Tabular 94.01." }
      ],
      rationale: "E00.1 merekam kelainan tiroid kongenital spesifik, sedangkan F72 merinci derajat retardasi mental berat (IQ 25)."
    },
    {
      title: "7. DM Tipe 1 dengan Komplikasi Polyneuropathy",
      scenario: "Tn. G (fiktif) pasien DM Tipe 1 mengalami kesemutan dan nyeri saraf bilateral tungkai akibat polineuropati diabetik.",
      code: "E10.4† G63.2*",
      steps: [
        "Lead Term: 'Diabetes' → type 1 → with → polyneuropathy.",
        "Indeks Alfabetis (Vol. 3): Diabetes → type 1 → polyneuropathy → E10.4† G63.2*.",
        "Verifikasi Tabular (Vol. 1): E10.4 (neurological complications) + G63.2* (Diabetic polyneuropathy)."
      ],
      procs: [
        { code: "93.08", name: "Electromyography (pemeriksaan EMG)", trace: "Lead Term 'Electromyography' → Tabular 93.08." },
        { code: "89.15", name: "Other nonoperative neurologic function tests (NCV)", trace: "Lead Term 'Study' → nerve conduction → Tabular 89.15." },
        { code: "99.17", name: "Injection of insulin", trace: "Lead Term 'Injection' → insulin → Tabular 99.17." }
      ],
      rationale: "Polineuropati diabetik merupakan manifestasi neurologis klasik DM yang dikode dengan pasangan E10.4† G63.2*."
    },
    {
      title: "8. DM dengan Ulcer dan Cataract (Komplikasi Multipel)",
      scenario: "Ny. H (fiktif) mengalami DM dengan dua komplikasi sekaligus: ulkus diabetikum pada kaki dan katarak diabetik.",
      code: "E14.7 (+ E14.3† H28.0* & E14.5)",
      steps: [
        "Lead Term: 'Diabetes' → with → multiple complications → E14.7.",
        "Indeks Alfabetis (Vol. 3): Diabetes → with → multiple complications → E14.7 (tipe DM tidak dirinci).",
        "Verifikasi Tabular (Vol. 1 & 2): E14.7 sebagai kode utama, dapat dirinci dengan E14.3† H28.0* (katarak) & E14.5 (ulkus)."
      ],
      procs: [
        { code: "86.22", name: "Excisional debridement of wound (debridemen ulkus)", trace: "Lead Term 'Debridement' → wound → excisional → Tabular 86.22." },
        { code: "13.41", name: "Phacoemulsification and aspiration of cataract", trace: "Lead Term 'Phacoemulsification' → cataract → Tabular 13.41." },
        { code: "13.71", name: "Insertion of intraocular lens prosthesis (IOL)", trace: "Lead Term 'Insertion' → lens → intraocular → Tabular 13.71." }
      ],
      rationale: "Keberadaan lebih dari satu komplikasi organ pada satu episode DM dikelompokkan ke subdivisi .7 (komplikasi multipel)."
    },
    {
      title: "9. Congenital Iodine-Deficiency Syndrome, Neurological Type + Mild Mental Retardation",
      scenario: "An. I (fiktif) didiagnosis sindrom defisiensi yodium kongenital tipe neurologis disertai retardasi mental ringan.",
      code: "E00.0 + F70",
      steps: [
        "Lead Term 1: 'Syndrome' → iodine-deficiency, congenital → neurological → E00.0.",
        "Lead Term 2: 'Retardation' → mental → mild → F70.",
        "Verifikasi Tabular (Vol. 1): E00.0 (neurological type) dan F70 (Mild mental retardation)."
      ],
      procs: [
        { code: "88.91", name: "Magnetic resonance imaging of brain and brain stem (MRI otak)", trace: "Lead Term 'Imaging, magnetic resonance' → brain → Tabular 88.91." },
        { code: "93.75", name: "Other speech training and therapy (terapi wicara)", trace: "Lead Term 'Therapy' → speech → Tabular 93.75." },
        { code: "93.83", name: "Occupational therapy (terapi okupasi)", trace: "Lead Term 'Therapy' → occupational → Tabular 93.83." }
      ],
      rationale: "Berbeda dengan tipe miksedematosa (E00.1), tipe neurologis memiliki kode khusus E00.0 berpasangan dengan F70."
    },
    {
      title: "10. Diabetes Insipidus",
      scenario: "Tn. J (fiktif) datang dengan poliuria dan polidipsia masif akibat gangguan sekresi ADH hipofisis, didiagnosis Diabetes Insipidus.",
      code: "E23.2",
      steps: [
        "Lead Term: 'Diabetes' → modifier 'insipidus'.",
        "Indeks Alfabetis (Vol. 3): Diabetes → insipidus → E23.2 (periksa Excludes tipe nefrogenik N25.1).",
        "Verifikasi Tabular (Vol. 1): E23.2 = Diabetes insipidus pada blok E20–E35."
      ],
      procs: [
        { code: "88.91", name: "MRI of brain and brain stem / pituitary gland", trace: "Lead Term 'Imaging, magnetic resonance' → brain → Tabular 88.91." },
        { code: "93.09", name: "Other diagnostic physical therapy procedure", trace: "Lead Term 'Evaluation' → physical therapy diagnostic → Tabular 93.09." }
      ],
      rationale: "Diabetes Insipidus bukan gangguan insulin (E10–E14), melainkan kelainan hormon ADH hipofisis pada kategori E23.2."
    }
  ];

  const ch5Cases = [
    {
      title: "1. Depresi Setelah Melahirkan",
      scenario: "Ny. K (fiktif), 27 tahun, mengalami kesedihan mendalam 3 minggu pascapersalinan tanpa gejala psikotik, menjalani evaluasi dan psikoterapi.",
      code: "F53.0",
      steps: [
        "Lead Term: 'Depression' dengan modifier 'postpartum' atau 'puerperal'.",
        "Indeks Alfabetis (Vol. 3): Depression → postpartum / puerperal → F53.0.",
        "Verifikasi Tabular (Vol. 1): F53.0 = Mild mental & behavioural disorders associated with the puerperium, NEC."
      ],
      procs: [
        { code: "94.19", name: "Other psychiatric interview and evaluation", trace: "Lead Term 'Evaluation' → psychiatric → Tabular 94.19." },
        { code: "94.39", name: "Other individual psychotherapy", trace: "Lead Term 'Psychotherapy' → individual → Tabular 94.39." },
        { code: "94.42", name: "Family therapy (konseling/terapi keluarga)", trace: "Lead Term 'Therapy' → family → Tabular 94.42." }
      ],
      rationale: "F53.0 dipakai bila depresi nifas tanpa gejala psikosis berat (F53.1) dan terjadi dalam 6 minggu pascapersalinan."
    },
    {
      title: "2. Halusinasi Melihat Bayangan Seperti Mengikuti",
      scenario: "Tn. L (fiktif) datang ke poliklinik dengan keluhan melihat bayangan mengikuti dirinya (halusinasi visual) dalam evaluasi awal.",
      code: "R44.1 (Gejala tunggal) / F20–F29 jika psikosis tegak",
      steps: [
        "Lead Term: 'Hallucination' dengan modifier 'visual'.",
        "Indeks Alfabetis (Vol. 3): Hallucination → visual → R44.1 (Bab XVIII).",
        "Verifikasi Tabular (Vol. 1): R44.1 = Visual hallucinations; gunakan F20–F29 hanya bila diagnosis psikosis tegak."
      ],
      procs: [
        { code: "94.19", name: "Other psychiatric interview and evaluation", trace: "Lead Term 'Interview' → psychiatric → Tabular 94.19." },
        { code: "94.25", name: "Other psychiatric drug therapy", trace: "Lead Term 'Therapy' → drug → psychiatric NEC → Tabular 94.25." }
      ],
      rationale: "Koder tidak boleh memaksakan kode F20 apabila dokumentasi baru mencatat gejala tunggal halusinasi visual."
    },
    {
      title: "3. Phobia Ular Kobra",
      scenario: "Sdr. M (fiktif) mengalami ketakutan hebat irasional dan panik setiap melihat ular kobra sehingga menghambat aktivitas luar ruang.",
      code: "F40.2",
      steps: [
        "Lead Term: 'Phobia, phobic' → modifier 'animal' / 'specific (isolated)'.",
        "Indeks Alfabetis (Vol. 3): Phobia → animal / specific → F40.2.",
        "Verifikasi Tabular (Vol. 1): F40.2 = Specific (isolated) phobias (Includes: Animal phobias)."
      ],
      procs: [
        { code: "94.33", name: "Behavior therapy (terapi perilaku & desensitisasi)", trace: "Lead Term 'Therapy' → behavior → Tabular 94.33." }
      ],
      rationale: "Fobia hewan spesifik (ular) masuk F40.2, berbeda dari Agoraphobia (F40.0) maupun Social phobia (F40.1)."
    },
    {
      title: "4. Speech Delay",
      scenario: "An. N (fiktif), usia 4 tahun, dirujuk ke poli tumbuh kembang karena keterlambatan perkembangan bicara dan bahasa ekspresif.",
      code: "F80.9",
      steps: [
        "Lead Term: 'Delay, delayed' → modifier 'speech (development)'.",
        "Indeks Alfabetis (Vol. 3): Delay → development → speech → F80.9.",
        "Verifikasi Tabular (Vol. 1): F80.9 = Developmental disorder of speech and language, unspecified."
      ],
      procs: [
        { code: "93.75", name: "Other speech training and therapy (terapi wicara)", trace: "Lead Term 'Therapy' → speech → Tabular 93.75." }
      ],
      rationale: "Keterlambatan perkembangan bicara anak tanpa rincian subtipe reseptif/ekspresif murni dikode F80.9."
    },
    {
      title: "5. Retardasi Mental karena IQ 27",
      scenario: "Remaja O (fiktif) menjalani tes skala intelegensi standar dengan hasil skor IQ 27 dan memerlukan terapi okupasi rehabilitasi.",
      code: "F72",
      steps: [
        "Lead Term: 'Retardation' → mental → severe (IQ 20–34).",
        "Indeks Alfabetis (Vol. 3): Retardation → mental → severe → F72.",
        "Verifikasi Tabular (Vol. 1): F72 = Severe mental retardation (rentang IQ 20–34)."
      ],
      procs: [
        { code: "94.01", name: "Administration of intelligence test (tes intelegensi)", trace: "Lead Term 'Test' → intelligence → Tabular 94.01." },
        { code: "93.83", name: "Occupational therapy (terapi okupasi rehabilitasi)", trace: "Lead Term 'Therapy' → occupational → Tabular 93.83." }
      ],
      rationale: "Digit ke-3 blok F70–F73 mengikuti rentang IQ baku: 50–69 (F70), 35–49 (F71), 20–34 (F72), dan <20 (F73)."
    },
    {
      title: "6. Kesulitan untuk Mengeja dan Membaca",
      scenario: "An. P (fiktif) siswa sekolah dasar dengan inteligensi normal mengalami kesulitan persisten mengeja kata dan membaca kalimat.",
      code: "F81.0 + F81.1",
      steps: [
        "Lead Term: 'Disorder' → 'reading (developmental)' dan 'spelling (specific)'.",
        "Indeks Alfabetis (Vol. 3): Disorder → reading → F81.0; spelling → F81.1.",
        "Verifikasi Tabular (Vol. 1): F81.0 (Specific reading disorder) & F81.1 (Specific spelling disorder)."
      ],
      procs: [
        { code: "94.08", name: "Other psychological evaluation and testing", trace: "Lead Term 'Evaluation' → psychological → Tabular 94.08." },
        { code: "93.82", name: "Educational therapy (terapi remediasi belajar)", trace: "Lead Term 'Therapy' → educational → Tabular 93.82." }
      ],
      rationale: "Gangguan keterampilan skolastik spesifik berada pada blok F81.-, terpisah dari F70–F79 dan F80.-."
    },
    {
      title: "7. Kecanduan Rokok sehingga Menyebabkan PPOK",
      scenario: "Tn. Q (fiktif) perokok berat jangka panjang dengan sindrom ketergantungan tembakau yang memicu PPOK.",
      code: "F17.2 + J44.9",
      steps: [
        "Lead Term 1: 'Dependence' → tobacco / nicotine → F17.2.",
        "Lead Term 2: 'Disease' → pulmonary, chronic obstructive → J44.9.",
        "Verifikasi Tabular (Vol. 1): F17.2 (Tobacco dependence syndrome) + J44.9 (COPD, unspecified)."
      ],
      procs: [
        { code: "94.49", name: "Other counseling (konseling berhenti merokok)", trace: "Lead Term 'Counseling' → tobacco / NEC → Tabular 94.49." },
        { code: "89.37", name: "Vital capacity determination (spirometri)", trace: "Lead Term 'Determination' → vital capacity → Tabular 89.37." },
        { code: "93.94", name: "Respiratory medication administered by nebulizer", trace: "Lead Term 'Administration' → respiratory medication by nebulizer → Tabular 93.94." }
      ],
      rationale: "Memadukan ketergantungan zat Bab V (F17.2) dengan penyakit pernapasan Bab X (J44.9) sebagai konsekuensi klinisnya."
    },
    {
      title: "8. Bipolar Tipe II",
      scenario: "Ny. R (fiktif) memiliki riwayat episode depresif berulang disertai hipomania tanpa mania penuh, didiagnosis Bipolar Tipe II.",
      code: "F31.8",
      steps: [
        "Lead Term: 'Disorder' → bipolar → II (type 2).",
        "Indeks Alfabetis (Vol. 3): Disorder → bipolar → II → F31.8.",
        "Verifikasi Tabular (Vol. 1): F31.8 = Other bipolar affective disorders (Includes: Bipolar II disorder)."
      ],
      procs: [
        { code: "94.11", name: "Psychiatric mental status determination", trace: "Lead Term 'Determination' → mental status (psychiatric) → Tabular 94.11." },
        { code: "94.39", name: "Other individual psychotherapy", trace: "Lead Term 'Psychotherapy' → individual → Tabular 94.39." }
      ],
      rationale: "ICD-10 versi 2010 menempatkan Bipolar II disorder secara eksplisit pada subkategori F31.8."
    },
    {
      title: "9. Schizophrenia Schizoaffective Type Manic",
      scenario: "Tn. S (fiktif) menunjukkan gejala psikotik skizofrenia yang muncul bersamaan dengan episode afek manik menonjol.",
      code: "F25.0",
      steps: [
        "Lead Term: 'Disorder' → schizoaffective → manic type.",
        "Indeks Alfabetis (Vol. 3): Disorder → schizoaffective → manic type → F25.0.",
        "Verifikasi Tabular (Vol. 1): F25.0 = Schizoaffective disorder, manic type."
      ],
      procs: [
        { code: "94.27", name: "Other electroshock therapy [ECT] (terapi kejang listrik)", trace: "Lead Term 'Therapy' → electroconvulsive → Tabular 94.27." },
        { code: "94.39", name: "Other individual psychotherapy", trace: "Lead Term 'Psychotherapy' → individual → Tabular 94.39." }
      ],
      rationale: "Gangguan skizoafektif menempati kategori F25.- (bukan F20.-), dengan karakter ke-4 (.0) khusus tipe manik."
    },
    {
      title: "10. Demensia pada Penderita HIV",
      scenario: "Tn. T (fiktif), penyandang HIV stadium lanjut, mengalami kemunduran memori dan fungsi kognitif progresif akibat ensefalopati HIV.",
      code: "B22.0† F02.4*",
      steps: [
        "Lead Term: 'Dementia' → in (due to) → human immunodeficiency virus [HIV] disease.",
        "Indeks Alfabetis (Vol. 3): Dementia → in → HIV disease → B22.0† F02.4*.",
        "Verifikasi Tabular (Vol. 1): B22.0 (HIV encephalopathy) sebagai etiologi † dan F02.4* (Dementia in HIV) sebagai manifestasi."
      ],
      procs: [
        { code: "88.91", name: "Magnetic resonance imaging of brain and brain stem (MRI otak)", trace: "Lead Term 'Imaging, magnetic resonance' → brain → Tabular 88.91." },
        { code: "93.83", name: "Occupational therapy / cognitive rehabilitation", trace: "Lead Term 'Therapy' → occupational → Tabular 93.83." }
      ],
      rationale: "Menerapkan kaidah Dagger/Asterisk lintas bab: infeksi HIV (B22.0†) menjadi kode utama, demensia (F02.4*) menjadi kode manifestasi."
    }
  ];

  function renderCases(containerId, list) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = list
      .map(
        (c) => `
      <div class="case-box">
        <div class="case-head">
          <strong>${c.title}</strong>
          <code>${c.code}</code>
        </div>
        <p class="case-scenario">${c.scenario}</p>
        <ol class="trace-steps">
          ${c.steps.map((s) => `<li>${s}</li>`).join("")}
        </ol>
        <div class="case-proc-list">
          <strong>Subbab Prosedur (ICD-9-CM Vol. 3 — Terpisah dari Diagnosis):</strong>
          <div class="case-proc-grid">
            ${c.procs
              .map(
                (p) => `<div class="case-proc-chip">
                  <div class="case-proc-top"><span>${p.name}</span><code>${p.code}</code></div>
                  <div class="case-proc-trace">${p.trace}</div>
                </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="case-rationale"><strong>Rasionalisasi Kodifikasi:</strong> ${c.rationale}</div>
      </div>`
      )
      .join("");
  }

  renderCases("ch4-cases-container", ch4Cases);
  renderCases("ch5-cases-container", ch5Cases);

  // -----------------------------------------------------------------------
  // ILUSTRASI TUMPUKAN FOLDER LEVEL (EASY / MEDIUM / DIFFICULT) & KASUS WHO
  // -----------------------------------------------------------------------
  function renderFolderStackSvg(label, layers) {
    const stepY = 5.5;
    const baseTop = Math.max(12, 62 - (layers - 1) * stepY);
    let rects = "";
    for (let i = 0; i < layers; i++) {
      const y = baseTop + (layers - 1 - i) * stepY;
      const isTop = i === layers - 1;
      rects += `<polygon points="28,${y + 4} 178,${y} 184,${y + 62} 22,${y + 66}" fill="${
        isTop ? "#FFFFFF" : "#F4FAFE"
      }" stroke="#0284C7" stroke-width="${isTop ? 1.8 : 1.15}" />`;
      if (isTop) {
        rects += `
          <rect x="136" y="${y + 8}" width="32" height="16" rx="2" fill="#F8FCFF" stroke="#7DD3FC" stroke-width="1"/>
          <line x1="141" y1="${y + 13}" x2="163" y2="${y + 13}" stroke="#93C5FD" stroke-width="1"/>
          <line x1="141" y1="${y + 18}" x2="160" y2="${y + 18}" stroke="#93C5FD" stroke-width="1"/>
          <text x="103" y="${y + 40}" text-anchor="middle" font-size="16" font-weight="700" fill="#0369A1">${label}</text>
        `;
      }
    }
    return `<svg viewBox="0 0 210 150" role="img" aria-label="Level ${label}"><ellipse cx="105" cy="134" rx="82" ry="10" fill="#DCEEF8" />${rects}</svg>`;
  }

  function renderOrganSvgArtwork(organType) {
    switch (organType) {
      case "thyroid":
        return `<svg viewBox="0 0 800 560" role="img" aria-label="Diagram anatomi kelenjar tiroid, paratiroid, dan trakea">
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href="./images/who_head_endocrine.jpg" x="40" y="-10" width="720" height="540" />
          <line x1="206" y1="340" x2="376" y2="340" stroke="#475569" stroke-width="2.2" />
          <circle cx="376" cy="340" r="3.5" fill="#0F172A" />
          <text x="196" y="336" text-anchor="end" font-size="18" font-weight="700" fill="#0F172A">Kelenjar Tiroid</text>
          <text x="196" y="357" text-anchor="end" font-size="14" fill="#475569">(Lobus Kanan &amp; Kiri)</text>
          <line x1="428" y1="322" x2="585" y2="274" stroke="#475569" stroke-width="2" />
          <line x1="428" y1="354" x2="585" y2="274" stroke="#475569" stroke-width="2" />
          <circle cx="428" cy="322" r="3.5" fill="#B45309" />
          <circle cx="428" cy="354" r="3.5" fill="#B45309" />
          <text x="595" y="272" font-size="18" font-weight="700" fill="#0F172A">Paratiroid (4)</text>
          <text x="595" y="292" font-size="14" fill="#475569">(Regulasi Kalsium)</text>
          <line x1="412" y1="392" x2="585" y2="392" stroke="#475569" stroke-width="2.2" />
          <circle cx="412" cy="392" r="3.5" fill="#334155" />
          <text x="595" y="389" font-size="17.5" font-weight="700" fill="#334155">Trakea &amp; Isthmus</text>
          <text x="595" y="409" font-size="14" fill="#475569">(Leher Anterior)</text>
        </svg>`;

      case "thyroid-brain":
        return `<svg viewBox="0 0 800 560" role="img" aria-label="Diagram anatomi kelenjar tiroid dan maturasi otak">
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href="./images/who_head_endocrine.jpg" x="40" y="-10" width="720" height="540" />
          <line x1="448" y1="108" x2="585" y2="108" stroke="#475569" stroke-width="2.2" />
          <circle cx="448" cy="108" r="3.5" fill="#0369A1" />
          <text x="595" y="105" font-size="18" font-weight="700" fill="#0369A1">Korteks Serebri</text>
          <text x="595" y="125" font-size="14" fill="#475569">(Maturasi Otak / IQ)</text>
          <line x1="206" y1="170" x2="378" y2="170" stroke="#475569" stroke-width="2.2" />
          <circle cx="378" cy="170" r="3.5" fill="#0F172A" />
          <text x="196" y="166" text-anchor="end" font-size="17.5" font-weight="700" fill="#0F172A">Hipofisis (TSH)</text>
          <text x="196" y="186" text-anchor="end" font-size="14" fill="#475569">(Stimulasi Tiroid)</text>
          <line x1="206" y1="340" x2="376" y2="340" stroke="#475569" stroke-width="2.2" />
          <circle cx="376" cy="340" r="3.5" fill="#B45309" />
          <text x="196" y="336" text-anchor="end" font-size="18" font-weight="700" fill="#B45309">Kelenjar Tiroid</text>
          <text x="196" y="357" text-anchor="end" font-size="14" fill="#475569">(Hormon T3 / T4)</text>
        </svg>`;

      case "pituitary":
        return `<svg viewBox="0 0 800 560" role="img" aria-label="Diagram anatomi hipotalamus, kelenjar hipofisis, dan batang otak">
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href="./images/who_head_endocrine.jpg" x="40" y="-10" width="720" height="540" />
          <line x1="392" y1="146" x2="585" y2="146" stroke="#475569" stroke-width="2.2" />
          <circle cx="392" cy="146" r="3.5" fill="#0F172A" />
          <text x="595" y="143" font-size="18" font-weight="700" fill="#0F172A">Hipotalamus</text>
          <text x="595" y="163" font-size="14" fill="#475569">(Sintesis ADH / Vasopresin)</text>
          <line x1="206" y1="170" x2="378" y2="170" stroke="#475569" stroke-width="2.2" />
          <circle cx="378" cy="170" r="3.5" fill="#0369A1" />
          <text x="196" y="166" text-anchor="end" font-size="18" font-weight="700" fill="#0369A1">Kelenjar Hipofisis</text>
          <text x="196" y="186" text-anchor="end" font-size="14" fill="#475569">(Sela Tursika / Posterior)</text>
          <line x1="422" y1="224" x2="585" y2="236" stroke="#475569" stroke-width="2.2" />
          <circle cx="422" cy="224" r="3.5" fill="#334155" />
          <text x="595" y="234" font-size="17.5" font-weight="700" fill="#334155">Batang Otak</text>
          <text x="595" y="254" font-size="14" fill="#475569">(Area Pencitraan MRI)</text>
        </svg>`;

      case "kidney-adrenal":
        return `<svg viewBox="0 0 800 560" role="img" aria-label="Diagram anatomi kelenjar adrenal, ginjal, dan pembuluh darah utama">
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href="./images/who_torso_endocrine_kidney.jpg" x="40" y="-15" width="720" height="540" />
          <line x1="205" y1="172" x2="342" y2="172" stroke="#475569" stroke-width="2.2" />
          <circle cx="342" cy="172" r="3.5" fill="#0F172A" />
          <text x="195" y="168" text-anchor="end" font-size="18" font-weight="700" fill="#0F172A">Kelenjar Adrenal</text>
          <text x="195" y="189" text-anchor="end" font-size="14" fill="#475569">(Aldosteron &amp; Ion)</text>
          <line x1="488" y1="232" x2="595" y2="232" stroke="#475569" stroke-width="2.2" />
          <circle cx="488" cy="232" r="3.5" fill="#B91C1C" />
          <text x="605" y="229" font-size="18" font-weight="700" fill="#B91C1C">Ginjal &amp; Tubulus</text>
          <text x="605" y="250" font-size="14" fill="#475569">(Keseimbangan Elektrolit)</text>
          <line x1="414" y1="348" x2="595" y2="348" stroke="#475569" stroke-width="2.2" />
          <circle cx="414" cy="348" r="3.5" fill="#1D4ED8" />
          <text x="605" y="345" font-size="17.5" font-weight="700" fill="#1D4ED8">Vena / Intravaskular</text>
          <text x="605" y="365" font-size="14" fill="#475569">(Koreksi Infus IV)</text>
        </svg>`;

      case "eye":
        return `<svg viewBox="0 0 800 540" role="img" aria-label="Diagram anatomi penampang bola mata, kornea, lensa, retina, makula, dan nervus optikus">
          <rect width="800" height="540" fill="#FFFFFF" />
          <image href="./images/who_eye_anatomy.jpg" x="130" y="60" width="540" height="405" />
          <line x1="145" y1="258" x2="205" y2="258" stroke="#475569" stroke-width="2.2" />
          <circle cx="205" cy="258" r="3.5" fill="#0369A1" />
          <text x="136" y="254" text-anchor="end" font-size="17.5" font-weight="700" fill="#0369A1">Kornea &amp; Iris</text>
          <text x="136" y="274" text-anchor="end" font-size="13.5" fill="#475569">(Segmen Anterior)</text>
          <line x1="145" y1="150" x2="275" y2="232" stroke="#475569" stroke-width="2.2" />
          <circle cx="275" cy="232" r="3.5" fill="#B45309" />
          <text x="136" y="144" text-anchor="end" font-size="17.5" font-weight="700" fill="#B45309">Lensa Kristalin</text>
          <text x="136" y="164" text-anchor="end" font-size="13.5" fill="#475569">(Area Katarak)</text>
          <line x1="488" y1="192" x2="628" y2="152" stroke="#475569" stroke-width="2.2" />
          <circle cx="488" cy="192" r="3.5" fill="#B91C1C" />
          <text x="636" y="148" font-size="17.5" font-weight="700" fill="#B91C1C">Retina &amp; Kapiler</text>
          <text x="636" y="168" font-size="13.5" fill="#475569">(Retinopati)</text>
          <line x1="514" y1="278" x2="628" y2="278" stroke="#475569" stroke-width="2.2" />
          <circle cx="514" cy="278" r="3.5" fill="#D97706" />
          <text x="636" y="274" font-size="17.5" font-weight="700" fill="#0F172A">Makula</text>
          <text x="636" y="294" font-size="13.5" fill="#475569">(Pemindaian OCT)</text>
          <line x1="590" y1="334" x2="628" y2="395" stroke="#475569" stroke-width="2.2" />
          <circle cx="590" cy="334" r="3.5" fill="#0F172A" />
          <text x="636" y="394" font-size="17.5" font-weight="700" fill="#334155">Nervus Optikus</text>
          <text x="636" y="414" font-size="13.5" fill="#475569">(Segmen Posterior)</text>
        </svg>`;

      case "pancreas-eye":
        return `<svg viewBox="0 0 800 440" role="img" aria-label="Diagram anatomi pankreas Pulau Langerhans dan retina bola mata">
          <rect width="800" height="440" fill="#FFFFFF" />
          <image href="./images/who_torso_endocrine_kidney.jpg" x="15" y="15" width="380" height="285" />
          <image href="./images/who_eye_anatomy.jpg" x="415" y="28" width="360" height="270" />
          <line x1="226" y1="142" x2="226" y2="335" stroke="#475569" stroke-width="2.2" />
          <circle cx="226" cy="142" r="3.5" fill="#0369A1" />
          <text x="226" y="362" text-anchor="middle" font-size="17.5" font-weight="700" fill="#0F172A">Pulau Langerhans Pankreas</text>
          <text x="226" y="384" text-anchor="middle" font-size="14" fill="#475569">(Sel Beta · Produksi Insulin)</text>
          <line x1="628" y1="168" x2="600" y2="335" stroke="#475569" stroke-width="2.2" />
          <circle cx="628" cy="168" r="3.5" fill="#B91C1C" />
          <text x="600" y="362" text-anchor="middle" font-size="17.5" font-weight="700" fill="#B91C1C">Retina &amp; Pembuluh Mata</text>
          <text x="600" y="384" text-anchor="middle" font-size="14" fill="#475569">(Komplikasi Retinopati H36.0*)</text>
        </svg>`;

      case "pancreas-vascular":
        return `<svg viewBox="0 0 800 440" role="img" aria-label="Diagram anatomi pankreas dan pembuluh darah arteri perifer ekstremitas bawah">
          <rect width="800" height="440" fill="#FFFFFF" />
          <image href="./images/who_torso_endocrine_kidney.jpg" x="15" y="15" width="380" height="285" />
          <image href="./images/who_vascular_nerve_leg.jpg" x="410" y="15" width="380" height="285" />
          <line x1="226" y1="142" x2="205" y2="335" stroke="#475569" stroke-width="2.2" />
          <circle cx="226" cy="142" r="3.5" fill="#0F172A" />
          <text x="205" y="362" text-anchor="middle" font-size="17.5" font-weight="700" fill="#0F172A">Pankreas (Insulin)</text>
          <text x="205" y="384" text-anchor="middle" font-size="14" fill="#475569">(Hiperglikemia Diabetes)</text>
          <line x1="600" y1="160" x2="555" y2="335" stroke="#475569" stroke-width="2.2" />
          <circle cx="600" cy="160" r="3.5" fill="#B91C1C" />
          <line x1="636" y1="268" x2="645" y2="335" stroke="#475569" stroke-width="2.2" />
          <circle cx="636" cy="268" r="3.5" fill="#991B1B" />
          <text x="600" y="362" text-anchor="middle" font-size="17.5" font-weight="700" fill="#B91C1C">Arteri Perifer &amp; Kaki</text>
          <text x="600" y="384" text-anchor="middle" font-size="14" fill="#475569">(Angiopati, Ulkus &amp; Gangren)</text>
        </svg>`;

      case "pancreas-nerve":
        return `<svg viewBox="0 0 800 440" role="img" aria-label="Diagram anatomi pankreas, saraf perifer, dan otot rangka tungkai">
          <rect width="800" height="440" fill="#FFFFFF" />
          <image href="./images/who_torso_endocrine_kidney.jpg" x="15" y="15" width="380" height="285" />
          <image href="./images/who_vascular_nerve_leg.jpg" x="410" y="15" width="380" height="285" />
          <line x1="226" y1="142" x2="205" y2="335" stroke="#475569" stroke-width="2.2" />
          <circle cx="226" cy="142" r="3.5" fill="#0F172A" />
          <text x="205" y="362" text-anchor="middle" font-size="17.5" font-weight="700" fill="#0F172A">Pankreas (Sel Beta)</text>
          <text x="205" y="384" text-anchor="middle" font-size="14" fill="#475569">(Diabetes Melitus)</text>
          <line x1="588" y1="158" x2="575" y2="335" stroke="#475569" stroke-width="2.2" />
          <circle cx="588" cy="158" r="3.5" fill="#B45309" />
          <line x1="566" y1="138" x2="625" y2="335" stroke="#475569" stroke-width="2" />
          <circle cx="566" cy="138" r="3.5" fill="#B91C1C" />
          <text x="600" y="362" text-anchor="middle" font-size="17.5" font-weight="700" fill="#B45309">Saraf Perifer &amp; Otot Tungkai</text>
          <text x="600" y="384" text-anchor="middle" font-size="14" fill="#475569">(Polineuropati G63.2* / Hantaran EMG)</text>
        </svg>`;

      case "pancreas-eye-vascular":
        return `<svg viewBox="0 0 800 390" role="img" aria-label="Diagram anatomi komplikasi multipel DM pada pankreas, lensa mata, dan kaki">
          <rect width="800" height="390" fill="#FFFFFF" />
          <image href="./images/who_torso_endocrine_kidney.jpg" x="5" y="25" width="260" height="195" />
          <image href="./images/who_eye_anatomy.jpg" x="275" y="30" width="250" height="188" />
          <image href="./images/who_vascular_nerve_leg.jpg" x="535" y="25" width="260" height="195" />
          <line x1="149" y1="112" x2="135" y2="270" stroke="#475569" stroke-width="2" />
          <circle cx="149" cy="112" r="3.2" fill="#0F172A" />
          <text x="135" y="295" text-anchor="middle" font-size="16" font-weight="700" fill="#0F172A">Pankreas (DM)</text>
          <text x="135" y="316" text-anchor="middle" font-size="13" fill="#475569">Regulasi Glukosa</text>
          <line x1="342" y1="122" x2="400" y2="270" stroke="#475569" stroke-width="2" />
          <circle cx="342" cy="122" r="3.2" fill="#B45309" />
          <text x="400" y="295" text-anchor="middle" font-size="16" font-weight="700" fill="#B45309">Lensa Mata (Katarak)</text>
          <text x="400" y="316" text-anchor="middle" font-size="13" fill="#475569">Kekeruhan Lensa</text>
          <line x1="686" y1="196" x2="665" y2="270" stroke="#475569" stroke-width="2" />
          <circle cx="686" cy="196" r="3.2" fill="#B91C1C" />
          <text x="665" y="295" text-anchor="middle" font-size="16" font-weight="700" fill="#B91C1C">Ulkus Perifer</text>
          <text x="665" y="316" text-anchor="middle" font-size="13" fill="#475569">Komplikasi Multipel (.7)</text>
        </svg>`;

      case "gi-nutrition":
        return `<svg viewBox="0 0 800 560" role="img" aria-label="Diagram anatomi rongga hidung, esofagus, hepar, dan lambung">
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href="./images/who_gi_nutrition.jpg" x="40" y="-10" width="720" height="540" />
          <line x1="205" y1="130" x2="340" y2="130" stroke="#475569" stroke-width="2.2" />
          <circle cx="340" cy="130" r="3.5" fill="#0E7C7B" />
          <text x="195" y="126" text-anchor="end" font-size="18" font-weight="700" fill="#0E7C7B">Rongga Hidung</text>
          <text x="195" y="147" text-anchor="end" font-size="14" fill="#475569">(Akses Selang NGT)</text>
          <line x1="406" y1="265" x2="585" y2="265" stroke="#475569" stroke-width="2.2" />
          <circle cx="406" cy="265" r="3.5" fill="#334155" />
          <text x="595" y="262" font-size="18" font-weight="700" fill="#334155">Esofagus</text>
          <text x="595" y="282" font-size="14" fill="#475569">(Jalur Nutrisi Enteral)</text>
          <line x1="205" y1="395" x2="344" y2="395" stroke="#475569" stroke-width="2.2" />
          <circle cx="344" cy="395" r="3.5" fill="#B91C1C" />
          <text x="195" y="391" text-anchor="end" font-size="18" font-weight="700" fill="#B91C1C">Hepar (Hati)</text>
          <text x="195" y="411" text-anchor="end" font-size="14" fill="#475569">(Metabolisme Protein)</text>
          <line x1="452" y1="432" x2="585" y2="432" stroke="#475569" stroke-width="2.2" />
          <circle cx="452" cy="432" r="3.5" fill="#0F172A" />
          <text x="595" y="429" font-size="18" font-weight="700" fill="#0F172A">Lambung (Gaster)</text>
          <text x="595" y="449" font-size="14" fill="#475569">(Absorpsi Gizi)</text>
        </svg>`;

      case "lung":
        return `<svg viewBox="0 0 800 560" role="img" aria-label="Diagram anatomi trakea, bronkus, dan paru-paru">
          <rect width="800" height="560" fill="#FFFFFF" />
          <image href="./images/who_lung_respiratory.jpg" x="40" y="-10" width="720" height="540" />
          <line x1="190" y1="126" x2="386" y2="126" stroke="#475569" stroke-width="2.2" />
          <circle cx="386" cy="126" r="3.5" fill="#0369A1" />
          <text x="180" y="131" text-anchor="end" font-size="18" font-weight="700" fill="#0369A1">Trakea</text>
          <line x1="190" y1="252" x2="372" y2="252" stroke="#475569" stroke-width="2.2" />
          <circle cx="372" cy="252" r="3.5" fill="#0E7C7B" />
          <text x="180" y="248" text-anchor="end" font-size="18" font-weight="700" fill="#0E7C7B">Bronkus &amp; Paru</text>
          <text x="180" y="268" text-anchor="end" font-size="14" fill="#475569">(Obstruksi PPOK)</text>
          <line x1="504" y1="304" x2="610" y2="304" stroke="#475569" stroke-width="2.2" />
          <circle cx="504" cy="304" r="3.5" fill="#B91C1C" />
          <text x="618" y="301" font-size="18" font-weight="700" fill="#B91C1C">Alveoli Paru</text>
          <text x="618" y="321" font-size="14" fill="#475569">(Uji Spirometri)</text>
        </svg>`;

      case "synapse":
        return `<svg viewBox="0 0 800 520" role="img" aria-label="Diagram anatomi otak, sistem limbik, dan celah sinaps neurotransmiter">
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href="./images/anatomy_brain_synapse.jpg" x="110" y="45" width="580" height="435" />
          <line x1="148" y1="168" x2="210" y2="200" stroke="#475569" stroke-width="2.2" />
          <circle cx="210" cy="200" r="3.5" fill="#0369A1" />
          <text x="140" y="164" text-anchor="end" font-size="17" font-weight="700" fill="#0369A1">Korteks Prefrontal</text>
          <text x="140" y="184" text-anchor="end" font-size="13.5" fill="#475569">&amp; Sistem Limbik</text>
          <line x1="538" y1="186" x2="660" y2="148" stroke="#475569" stroke-width="2.2" />
          <circle cx="538" cy="186" r="3.5" fill="#B45309" />
          <text x="668" y="144" font-size="17" font-weight="700" fill="#B45309">Neuron Prasinaps</text>
          <text x="668" y="164" font-size="13.5" fill="#475569">(Vesikel Neurotransmiter)</text>
          <line x1="548" y1="304" x2="660" y2="304" stroke="#475569" stroke-width="2.2" />
          <circle cx="548" cy="304" r="3.5" fill="#0E7C7B" />
          <text x="668" y="300" font-size="17" font-weight="700" fill="#0E7C7B">Celah Sinaps</text>
          <text x="668" y="320" font-size="13.5" fill="#475569">(5-HT / Dopamin / GABA)</text>
          <line x1="564" y1="376" x2="660" y2="412" stroke="#475569" stroke-width="2.2" />
          <circle cx="564" cy="376" r="3.5" fill="#0F172A" />
          <text x="668" y="408" font-size="17" font-weight="700" fill="#0F172A">Reseptor Pascasinaps</text>
          <text x="668" y="428" font-size="13.5" fill="#475569">(Modulasi Psikiatri)</text>
        </svg>`;

      case "brain-visual":
        return `<svg viewBox="0 0 800 520" role="img" aria-label="Diagram anatomi korteks oksipital visual dan jaras optik otak">
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href="./images/who_brain_cortex.jpg" x="100" y="20" width="600" height="450" />
          <line x1="176" y1="202" x2="276" y2="202" stroke="#475569" stroke-width="2.2" />
          <circle cx="276" cy="202" r="3.5" fill="#0369A1" />
          <text x="166" y="198" text-anchor="end" font-size="18" font-weight="700" fill="#0369A1">Orbita &amp; Jaras Optik</text>
          <text x="166" y="218" text-anchor="end" font-size="14" fill="#475569">(Input Persepsi Visual)</text>
          <line x1="510" y1="226" x2="625" y2="226" stroke="#475569" stroke-width="2.2" />
          <circle cx="510" cy="226" r="3.5" fill="#B91C1C" />
          <text x="633" y="222" font-size="18" font-weight="700" fill="#B91C1C">Korteks Oksipital</text>
          <text x="633" y="242" font-size="14" fill="#475569">(Pusat Halusinasi Visual)</text>
        </svg>`;

      case "brain-speech":
        return `<svg viewBox="0 0 800 520" role="img" aria-label="Diagram anatomi area Broca, area Wernicke, dan laring artikulasi bicara">
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href="./images/who_brain_cortex.jpg" x="100" y="20" width="600" height="450" />
          <line x1="176" y1="168" x2="345" y2="168" stroke="#475569" stroke-width="2.2" />
          <circle cx="345" cy="168" r="3.5" fill="#0369A1" />
          <text x="166" y="164" text-anchor="end" font-size="18" font-weight="700" fill="#0369A1">Area Broca (Frontal)</text>
          <text x="166" y="184" text-anchor="end" font-size="14" fill="#475569">(Produksi Bicara)</text>
          <line x1="455" y1="196" x2="625" y2="196" stroke="#475569" stroke-width="2.2" />
          <circle cx="455" cy="196" r="3.5" fill="#B45309" />
          <text x="633" y="192" font-size="18" font-weight="700" fill="#B45309">Area Wernicke</text>
          <text x="633" y="212" font-size="14" fill="#475569">(Pemahaman Bahasa)</text>
          <line x1="418" y1="395" x2="625" y2="395" stroke="#475569" stroke-width="2.2" />
          <circle cx="418" cy="395" r="3.5" fill="#0E7C7B" />
          <text x="633" y="391" font-size="17.5" font-weight="700" fill="#0E7C7B">Jalur Artikulasi Leher</text>
          <text x="633" y="411" font-size="14" fill="#475569">(Terapi Wicara 93.75)</text>
        </svg>`;

      case "brain-cognition":
        return `<svg viewBox="0 0 800 520" role="img" aria-label="Diagram anatomi lobus frontal kognitif, girus angularis, dan serebelum">
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href="./images/who_brain_cortex.jpg" x="100" y="20" width="600" height="450" />
          <line x1="176" y1="152" x2="335" y2="152" stroke="#475569" stroke-width="2.2" />
          <circle cx="335" cy="152" r="3.5" fill="#0369A1" />
          <text x="166" y="148" text-anchor="end" font-size="18" font-weight="700" fill="#0369A1">Lobus Frontal</text>
          <text x="166" y="168" text-anchor="end" font-size="14" fill="#475569">(Kognisi &amp; Skor IQ)</text>
          <line x1="462" y1="168" x2="625" y2="168" stroke="#475569" stroke-width="2.2" />
          <circle cx="462" cy="168" r="3.5" fill="#B45309" />
          <text x="633" y="164" font-size="18" font-weight="700" fill="#B45309">Girus Angularis</text>
          <text x="633" y="184" font-size="14" fill="#475569">(Membaca &amp; Mengeja)</text>
          <line x1="468" y1="286" x2="625" y2="286" stroke="#475569" stroke-width="2.2" />
          <circle cx="468" cy="286" r="3.5" fill="#0E7C7B" />
          <text x="633" y="282" font-size="17.5" font-weight="700" fill="#0E7C7B">Serebelum</text>
          <text x="633" y="302" font-size="14" fill="#475569">(Fungsi Adaptif)</text>
        </svg>`;

      case "brain-limbic":
      default:
        return `<svg viewBox="0 0 800 520" role="img" aria-label="Diagram anatomi korteks prefrontal dan sistem limbik otak">
          <rect width="800" height="520" fill="#FFFFFF" />
          <image href="./images/anatomy_brain_synapse.jpg" x="110" y="45" width="580" height="435" />
          <line x1="152" y1="168" x2="212" y2="205" stroke="#475569" stroke-width="2.2" />
          <circle cx="212" cy="205" r="3.5" fill="#0369A1" />
          <text x="144" y="164" text-anchor="end" font-size="17.5" font-weight="700" fill="#0369A1">Korteks Prefrontal</text>
          <text x="144" y="184" text-anchor="end" font-size="13.5" fill="#475569">(Kontrol Eksekutif)</text>
          <line x1="342" y1="74" x2="342" y2="245" stroke="#475569" stroke-width="2.2" />
          <circle cx="342" cy="245" r="3.5" fill="#B45309" />
          <text x="342" y="46" text-anchor="middle" font-size="17.5" font-weight="700" fill="#B45309">Sistem Limbik (Amigdala &amp; Hipokampus)</text>
          <text x="342" y="64" text-anchor="middle" font-size="13.5" fill="#475569">(Pusat Emosi, Takut &amp; Memori)</text>
          <line x1="548" y1="304" x2="660" y2="304" stroke="#475569" stroke-width="2.2" />
          <circle cx="548" cy="304" r="3.5" fill="#0E7C7B" />
          <text x="668" y="300" font-size="17" font-weight="700" fill="#0E7C7B">Transmisi Sinaps</text>
          <text x="668" y="320" font-size="13.5" fill="#475569">(Modulasi Afek)</text>
        </svg>`;
    }
  }

  function renderOrganAnatomyPanel(q, focusedMode) {
    const organSvg = renderOrganSvgArtwork(q.organType);
    return `<div class="organ-anatomy-panel${focusedMode ? "" : " compact"}">
      <div class="organ-anatomy-header">
        <div>
          <span class="organ-anatomy-eyebrow">Anatomi Organ Terkait Soal</span>
          <h4 class="organ-anatomy-title">${q.organAnatomy}</h4>
        </div>
        <span class="organ-anatomy-pill">${q.codeType === "icd9" ? "Fokus Tindakan Medis" : "Fokus Patologi Diagnosis"}</span>
      </div>
      <div class="organ-svg-stage">${organSvg}</div>
    </div>`;
  }

  // -----------------------------------------------------------------------
  // BANK 40 SOAL LATIHAN KASUS ISIAN (10 ICD-10 & 10 ICD-9-CM PER BAB)
  // -----------------------------------------------------------------------
  const quizData = [
    // BAB IV — 10 SOAL ICD-10
    {
      id: "IV-ICD10-01",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "difficult",
      caseIcon: "eye-nerve",
      organType: "pancreas-eye",
      organAnatomy: "Pankreas (Sel Beta · Insulin) & Retina Bola Mata",
      title: "DM Tipe 1 dengan Retinopati Diabetik",
      scenario: "Ny. A (fiktif) didiagnosis Diabetes Melitus Tipe 1 disertai komplikasi Retinopati Diabetik. Berapa pasangan kode Dagger (†) dan Asterisk (*) ICD-10 yang tepat?",
      icd10PrimaryLabel: "Kode ICD-10 Utama (†)",
      icd10PrimaryAccepted: ["E10.3", "E10.3†"],
      icd10PrimaryDisplay: "E10.3†",
      icd10PrimaryPlaceholder: "Mis. E10.3",
      icd10SecondaryLabel: "Kode Manifestasi (*)",
      icd10SecondaryAccepted: ["H36.0", "H36.0*"],
      icd10SecondaryDisplay: "H36.0*",
      icd10SecondaryPlaceholder: "Mis. H36.0",
      leadTermDisplay: "Diabetes → type 1 (insulin-dependent) → with retinopathy (Dagger † / Asterisk *)",
      traceSteps: "Vol. 3: 'Diabetes' → type 1 → with retinopathy → E10.3† H36.0*. Vol. 1: E10.3 (ophthalmic complications) & H36.0* (Diabetic retinopathy).",
      commonMistakes: "Tertukar menjadi E11.3 (DM Tipe 2) atau membalik urutan meletakkan kode manifestasi H36.0* di depan.",
      reference: "WHO ICD-10 Vol. 1, 2 & 3 (2010) — E10.3† H36.0*."
    },
    {
      id: "IV-ICD10-02",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "endocrine",
      organType: "thyroid",
      organAnatomy: "Kelenjar Tiroid (Lobus Kanan & Kiri)",
      title: "Tiroiditis Akut dengan Abses akibat Staphylococcus",
      scenario: "Tn. B (fiktif) mengalami Tiroiditis Akut supuratif dengan abses kelenjar tiroid akibat infeksi bakteri Staphylococcus. Tentukan kode utama dan kode tambahan agen infeksinya.",
      icd10PrimaryLabel: "Kode ICD-10 Utama",
      icd10PrimaryAccepted: ["E06.0"],
      icd10PrimaryDisplay: "E06.0",
      icd10PrimaryPlaceholder: "Mis. E06.0",
      icd10SecondaryLabel: "Kode Tambahan Agen Infeksi",
      icd10SecondaryAccepted: ["B95.8", "B95.6"],
      icd10SecondaryDisplay: "B95.8",
      icd10SecondaryPlaceholder: "Mis. B95.8",
      leadTermDisplay: "Thyroiditis → acute (Includes: abscess of thyroid) + Infection → staphylococcal",
      traceSteps: "Vol. 3: 'Thyroiditis' → acute → E06.0 (mencakup abses tiroid pada Includes). Gunakan kode tambahan B95.8 untuk agen Staphylococcus.",
      commonMistakes: "Mengode abses tiroid secara terpisah ke abses leher atau lupa menambahkan kode agen infeksi B95.-.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — E06.0 + B95.8."
    },
    {
      id: "IV-ICD10-03",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "easy",
      caseIcon: "endocrine",
      organType: "kidney-adrenal",
      organAnatomy: "Kelenjar Adrenal & Tubulus Ginjal (Keseimbangan Elektrolit)",
      title: "Elektrolit Imbalance (Tidak Dirinci)",
      scenario: "Ny. C (fiktif) dirawat dengan diagnosis Elektrolit Imbalance tanpa rincian jenis ion spesifik yang terganggu. Berapa kode ICD-10 yang tepat?",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["E87.8"],
      icd10PrimaryDisplay: "E87.8",
      icd10PrimaryPlaceholder: "Mis. E87.8",
      leadTermDisplay: "Imbalance → electrolyte → E87.8",
      traceSteps: "Vol. 3: 'Imbalance' → electrolyte → E87.8. Vol. 1: E87.8 = Other disorders of electrolyte and fluid balance, NEC.",
      commonMistakes: "Memilih E87.6 (hipokalemia) atau E87.1 (hiponatremia) tanpa data laboratorium ion spesifik.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — E87.8."
    },
    {
      id: "IV-ICD10-04",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "difficult",
      caseIcon: "endocrine",
      organType: "pancreas-vascular",
      organAnatomy: "Pankreas & Pembuluh Darah Perifer Ekstremitas Bawah",
      title: "DM dengan Komplikasi Gangren dan Angiopati Perifer",
      scenario: "Tn. D (fiktif) didiagnosis Diabetes Melitus (tipe tidak dirinci) disertai komplikasi gangren kaki dan angiopati perifer. Tentukan pasangan kode ICD-10-nya.",
      icd10PrimaryLabel: "Kode ICD-10 Utama (†)",
      icd10PrimaryAccepted: ["E14.5", "E14.5†"],
      icd10PrimaryDisplay: "E14.5†",
      icd10PrimaryPlaceholder: "Mis. E14.5",
      icd10SecondaryLabel: "Kode Manifestasi (*)",
      icd10SecondaryAccepted: ["I79.2", "I79.2*"],
      icd10SecondaryDisplay: "I79.2*",
      icd10SecondaryPlaceholder: "Mis. I79.2",
      leadTermDisplay: "Diabetes → with → gangrene / peripheral angiopathy (subdivisi .5)",
      traceSteps: "Vol. 3: 'Diabetes' → with peripheral circulatory complications → E14.5† I79.2* (E14 dipakai karena tipe DM tidak dijelaskan).",
      commonMistakes: "Memakai E11.5 tanpa keterangan Tipe 2 atau memecah ke subdivisi .7 padahal keduanya berada pada subdivisi .5.",
      reference: "WHO ICD-10 Vol. 1 & 2 (2010) — E14.5† I79.2*."
    },
    {
      id: "IV-ICD10-05",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "easy",
      caseIcon: "nutrition",
      organType: "gi-nutrition",
      organAnatomy: "Saluran Pencernaan, Hepar & Jaringan Otot/Adiposa",
      title: "Marasmus Kwashiorkor",
      scenario: "An. E (fiktif) balita dirawat karena gizi buruk berat yang menampilkan gejala gabungan Marasmus dan Kwashiorkor sekaligus. Berapa kode ICD-10 yang tepat?",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["E42"],
      icd10PrimaryDisplay: "E42",
      icd10PrimaryPlaceholder: "Mis. E42",
      leadTermDisplay: "Kwashiorkor → marasmic → E42 (kode kombinasi tunggal)",
      traceSteps: "Vol. 3: 'Kwashiorkor' → marasmic → E42. Vol. 1: E42 = Marasmic kwashiorkor.",
      commonMistakes: "Memecah diagnosis menjadi dua kode terpisah (E40 + E41) padahal tersedia kode kombinasi tunggal E42.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — E42."
    },
    {
      id: "IV-ICD10-06",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "endocrine",
      organType: "thyroid-brain",
      organAnatomy: "Kelenjar Tiroid (Hormon T3/T4) & Korteks Serebri",
      title: "Congenital Iodine-Deficiency Syndrome (Myxoedematous) + IQ 25",
      scenario: "An. F (fiktif) didiagnosis Congenital iodine-deficiency syndrome, myxoedematous type disertai retardasi mental dengan hasil tes IQ 25. Tentukan kedua kode ICD-10-nya.",
      icd10PrimaryLabel: "Kode ICD-10 Utama",
      icd10PrimaryAccepted: ["E00.1"],
      icd10PrimaryDisplay: "E00.1",
      icd10PrimaryPlaceholder: "Mis. E00.1",
      icd10SecondaryLabel: "Kode Retardasi Mental (IQ 25)",
      icd10SecondaryAccepted: ["F72"],
      icd10SecondaryDisplay: "F72",
      icd10SecondaryPlaceholder: "Mis. F72",
      leadTermDisplay: "Syndrome → iodine-deficiency, congenital → myxoedematous + Retardation → mental → severe",
      traceSteps: "Vol. 3: 'Syndrome' → iodine-deficiency, congenital → myxoedematous → E00.1. 'Retardation' → mental → severe (IQ 20–34) → F72.",
      commonMistakes: "Tertukar dengan tipe neurologis (E00.0) atau salah memasukkan IQ 25 ke F71 (IQ 35–49).",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — E00.1 + F72."
    },
    {
      id: "IV-ICD10-07",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "eye-nerve",
      organType: "pancreas-nerve",
      organAnatomy: "Pankreas & Saraf Perifer Tungkai",
      title: "DM Tipe 1 dengan Komplikasi Polineuropati",
      scenario: "Tn. G (fiktif) penderita DM Tipe 1 mengeluhkan baal dan nyeri saraf kedua kaki dengan diagnosis Polineuropati Diabetik. Tentukan pasangan kode ICD-10 yang tepat.",
      icd10PrimaryLabel: "Kode ICD-10 Utama (†)",
      icd10PrimaryAccepted: ["E10.4", "E10.4†"],
      icd10PrimaryDisplay: "E10.4†",
      icd10PrimaryPlaceholder: "Mis. E10.4",
      icd10SecondaryLabel: "Kode Manifestasi (*)",
      icd10SecondaryAccepted: ["G63.2", "G63.2*"],
      icd10SecondaryDisplay: "G63.2*",
      icd10SecondaryPlaceholder: "Mis. G63.2",
      leadTermDisplay: "Diabetes → type 1 → with → polyneuropathy → E10.4† G63.2*",
      traceSteps: "Vol. 3: 'Diabetes' → type 1 → with polyneuropathy → E10.4† G63.2*. Vol. 1: .4 (neurological complications) dan G63.2* (Diabetic polyneuropathy).",
      commonMistakes: "Menggunakan G62.9 (polineuropati tak spesifik) dan lupa memakai pasangan kode Dagger/Asterisk.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — E10.4† G63.2*."
    },
    {
      id: "IV-ICD10-08",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "difficult",
      caseIcon: "eye-nerve",
      organType: "pancreas-eye-vascular",
      organAnatomy: "Pankreas, Lensa Mata (Katarak) & Vaskular Perifer",
      title: "DM dengan Ulcer dan Cataract (Komplikasi Multipel)",
      scenario: "Ny. H (fiktif) penderita DM (tipe tidak dirinci) mengalami dua komplikasi organ sekaligus, yaitu Ulkus Diabetikum dan Katarak Diabetik. Tentukan kode utama komplikasi multipelnya.",
      icd10PrimaryLabel: "Kode ICD-10 Komplikasi Multipel",
      icd10PrimaryAccepted: ["E14.7", "E14.7†"],
      icd10PrimaryDisplay: "E14.7",
      icd10PrimaryPlaceholder: "Mis. E14.7",
      leadTermDisplay: "Diabetes → with → multiple complications → E14.7",
      traceSteps: "Vol. 3 & Vol. 2: Keberadaan >1 komplikasi organ (mata + ulkus perifer) dikode ke subdivisi .7 (With multiple complications) → E14.7.",
      commonMistakes: "Hanya mengode salah satu komplikasi (.3 atau .5) tanpa menetapkan .7 untuk komplikasi multipel.",
      reference: "WHO ICD-10 Vol. 1 & 2 (2010) — E14.7."
    },
    {
      id: "IV-ICD10-09",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "thyroid-brain",
      organAnatomy: "Kelenjar Tiroid & Sistem Saraf Pusat (Maturasi Otak)",
      title: "Congenital Iodine-Deficiency Syndrome (Neurological) + Mild MR",
      scenario: "An. I (fiktif) didiagnosis Congenital iodine-deficiency syndrome, neurological type disertai retardasi mental ringan (Mild mental retardation). Tentukan kedua kode ICD-10-nya.",
      icd10PrimaryLabel: "Kode ICD-10 Utama",
      icd10PrimaryAccepted: ["E00.0"],
      icd10PrimaryDisplay: "E00.0",
      icd10PrimaryPlaceholder: "Mis. E00.0",
      icd10SecondaryLabel: "Kode Mild Mental Retardation",
      icd10SecondaryAccepted: ["F70"],
      icd10SecondaryDisplay: "F70",
      icd10SecondaryPlaceholder: "Mis. F70",
      leadTermDisplay: "Syndrome → iodine-deficiency, congenital → neurological (E00.0) + Retardation → mental → mild (F70)",
      traceSteps: "Vol. 3: 'Syndrome' → iodine-deficiency, congenital → neurological → E00.0; 'Retardation' → mental → mild → F70.",
      commonMistakes: "Tertukar antara tipe miksedematosa (E00.1) dengan tipe neurologis (E00.0).",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — E00.0 + F70."
    },
    {
      id: "IV-ICD10-10",
      chapter: "bab4",
      chapterLabel: "Bab IV (E00–E90)",
      codeType: "icd10",
      difficulty: "easy",
      caseIcon: "endocrine",
      organType: "pituitary",
      organAnatomy: "Hipotalamus–Hipofisis Posterior (ADH) & Duktus Ginjal",
      title: "Diabetes Insipidus",
      scenario: "Tn. J (fiktif) mengalami poliuria dan polidipsia akibat kekurangan sekresi ADH hipofisis serta didiagnosis Diabetes Insipidus (bukan DM gula). Berapa kode ICD-10 yang tepat?",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["E23.2"],
      icd10PrimaryDisplay: "E23.2",
      icd10PrimaryPlaceholder: "Mis. E23.2",
      leadTermDisplay: "Diabetes → insipidus → E23.2 (blok E20–E35 kelenjar endokrin lain)",
      traceSteps: "Vol. 3: 'Diabetes' → insipidus → E23.2. Vol. 1: E23.2 = Diabetes insipidus.",
      commonMistakes: "Mengira kata 'Diabetes' masuk blok E10–E14 (Diabetes Mellitus), padahal Diabetes Insipidus berada di E23.2.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — E23.2."
    },

    // BAB IV — 10 SOAL ICD-9-CM
    {
      id: "IV-ICD9-01",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "easy",
      caseIcon: "eye-nerve",
      organType: "eye",
      organAnatomy: "Bola Mata — Lapisan Retina & Makula (OCT)",
      title: "Optical Coherence Tomography (OCT) Mata",
      scenario: "Pada pasien DM Tipe 1 dengan Retinopati Diabetik, dokter melakukan pemeriksaan Optical Coherence Tomography (OCT) retina. Berapa kode tindakan ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["95.16"],
      icd10PrimaryDisplay: "95.16",
      icd10PrimaryPlaceholder: "Mis. 95.16",
      leadTermDisplay: "Tomography → optical coherence (eye) → 95.16",
      traceSteps: "ICD-9-CM Index: 'Tomography' → optical coherence → Tabular 95.16 (Tomographic scan of eye / OCT).",
      commonMistakes: "Tertukar dengan funduskopi biasa (16.21) atau laser fotokoagulasi retina (14.24).",
      reference: "ICD-9-CM Vol. 3 — Kategori 95.16."
    },
    {
      id: "IV-ICD9-02",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "endocrine",
      organType: "thyroid",
      organAnatomy: "Kelenjar Tiroid & Trakea Leher Anterior (USG)",
      title: "Diagnostic Ultrasound of Head and Neck (USG Tiroid)",
      scenario: "Pasien Tiroiditis Akut dengan dugaan abses tiroid menjalani pemeriksaan penunjang USG Tiroid (Diagnostic ultrasound of head and neck). Berapa kode ICD-9-CM yang tepat?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["88.71"],
      icd10PrimaryDisplay: "88.71",
      icd10PrimaryPlaceholder: "Mis. 88.71",
      leadTermDisplay: "Ultrasonography → head and neck → 88.71",
      traceSteps: "ICD-9-CM Index: 'Ultrasonography' → head and neck → Tabular 88.71.",
      commonMistakes: "Salah memilih biopsi jarum halus tiroid (06.11) atau insisi drainase tiroid (06.09).",
      reference: "ICD-9-CM Vol. 3 — Kategori 88.71."
    },
    {
      id: "IV-ICD9-03",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "easy",
      caseIcon: "endocrine",
      organType: "kidney-adrenal",
      organAnatomy: "Pembuluh Vena Perifer, Ginjal & Kelenjar Adrenal",
      title: "Injection or Infusion of Electrolytes",
      scenario: "Pasien dengan Elektrolit Imbalance menerima tindakan koreksi melalui infus cairan elektrolit intravena (Injection or infusion of electrolytes). Berapa kode ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["99.18"],
      icd10PrimaryDisplay: "99.18",
      icd10PrimaryPlaceholder: "Mis. 99.18",
      leadTermDisplay: "Infusion / Injection → electrolytes → 99.18",
      traceSteps: "ICD-9-CM Index: 'Infusion' → electrolytes → Tabular 99.18 (Injection or infusion of electrolytes).",
      commonMistakes: "Tertukar dengan injeksi insulin (99.17) atau infus zat nutrisi enteral (96.6).",
      reference: "ICD-9-CM Vol. 3 — Kategori 99.18."
    },
    {
      id: "IV-ICD9-04",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "endocrine",
      organType: "pancreas-vascular",
      organAnatomy: "Jaringan Kulit, Subkutan & Vaskular Ekstremitas Bawah",
      title: "Excisional Debridement Luka/Gangren Diabetik",
      scenario: "Pada pasien DM dengan gangren dan angiopati perifer, tim bedah melakukan pembersihan jaringan nekrotik secara eksisional (Excisional debridement of wound, infection, or burn). Tentukan kode ICD-9-CM-nya.",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["86.22"],
      icd10PrimaryDisplay: "86.22",
      icd10PrimaryPlaceholder: "Mis. 86.22",
      leadTermDisplay: "Debridement → wound / infection → excisional → 86.22",
      traceSteps: "ICD-9-CM Index: 'Debridement' → wound, infection, or burn → excisional → Tabular 86.22.",
      commonMistakes: "Tertukar dengan nonexcisional debridement (86.28) atau amputasi jari kaki (84.11).",
      reference: "ICD-9-CM Vol. 3 — Kategori 86.22."
    },
    {
      id: "IV-ICD9-05",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "easy",
      caseIcon: "nutrition",
      organType: "gi-nutrition",
      organAnatomy: "Rongga Hidung, Esofagus & Lambung (Gaster)",
      title: "Pemasangan Selang Nasogastrik (NGT)",
      scenario: "Anak dengan Marasmus Kwashiorkor dipasangi selang nasogastrik untuk dukungan nutrisi enteral (Insertion of nasogastric tube). Berapa kode prosedur ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["96.07"],
      icd10PrimaryDisplay: "96.07",
      icd10PrimaryPlaceholder: "Mis. 96.07",
      leadTermDisplay: "Insertion → tube → nasogastric → 96.07",
      traceSteps: "ICD-9-CM Index: 'Insertion' → tube → nasogastric → Tabular 96.07.",
      commonMistakes: "Tertukar dengan intubasi endotrakeal (96.04) atau infus nutrisi enteral (96.6).",
      reference: "ICD-9-CM Vol. 3 — Kategori 96.07."
    },
    {
      id: "IV-ICD9-06",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "brain-cognition",
      organAnatomy: "Korteks Serebri & Lobus Frontal (Fungsi Kognitif/IQ)",
      title: "Evaluasi Psikometri / Tes Intelegensi Klinis",
      scenario: "Pasien sindrom defisiensi yodium kongenital menjalani evaluasi psikometri berupa tes intelegensi klinis (Administration of intelligence test) untuk menentukan skor IQ. Berapa kode ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["94.01", "94.08"],
      icd10PrimaryDisplay: "94.01",
      icd10PrimaryPlaceholder: "Mis. 94.01",
      leadTermDisplay: "Test → intelligence → 94.01",
      traceSteps: "ICD-9-CM Index: 'Test' → intelligence → Tabular 94.01 (Administration of intelligence test).",
      commonMistakes: "Menggunakan kode wawancara psikiatri umum (94.19) alih-alih tes intelegensi/psikometri (94.01).",
      reference: "ICD-9-CM Vol. 3 — Kategori 94.01."
    },
    {
      id: "IV-ICD9-07",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "eye-nerve",
      organType: "pancreas-nerve",
      organAnatomy: "Saraf Motorik Perifer & Otot Rangka Ekstremitas",
      title: "Pemeriksaan Elektromiografi (EMG)",
      scenario: "Pasien DM Tipe 1 dengan polineuropati menjalani pemeriksaan aktivitas listrik otot menggunakan Elektromiografi (Electromyography / EMG). Tentukan kode tindakan ICD-9-CM-nya.",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["93.08"],
      icd10PrimaryDisplay: "93.08",
      icd10PrimaryPlaceholder: "Mis. 93.08",
      leadTermDisplay: "Electromyography → 93.08",
      traceSteps: "ICD-9-CM Index: 'Electromyography' → Tabular 93.08 (Electromyography).",
      commonMistakes: "Tertukar dengan Nerve Conduction Velocity / NCV (89.15) atau injeksi insulin (99.17).",
      reference: "ICD-9-CM Vol. 3 — Kategori 93.08."
    },
    {
      id: "IV-ICD9-08",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "difficult",
      caseIcon: "eye-nerve",
      organType: "eye",
      organAnatomy: "Lensa Kristalin Bola Mata (Segmen Anterior)",
      title: "Fakoemulsifikasi dan Aspirasi Katarak Diabetik",
      scenario: "Pasien DM dengan komplikasi multipel (ulkus dan katarak) menjalani operasi ekstraksi lensa katarak metode Phacoemulsification and aspiration of cataract. Berapa kode tindakan ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["13.41"],
      icd10PrimaryDisplay: "13.41",
      icd10PrimaryPlaceholder: "Mis. 13.41",
      leadTermDisplay: "Phacoemulsification → cataract → 13.41",
      traceSteps: "ICD-9-CM Index: 'Phacoemulsification' → cataract → Tabular 13.41.",
      commonMistakes: "Tertukar dengan kode insersi lensa intraokular / IOL (13.71) atau ekstraksi ekstrakapsular lain (13.59).",
      reference: "ICD-9-CM Vol. 3 — Kategori 13.41."
    },
    {
      id: "IV-ICD9-09",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "difficult",
      caseIcon: "brain",
      organType: "brain-speech",
      organAnatomy: "Area Bahasa Otak (Broca–Wernicke) & Organ Artikulasi",
      title: "Terapi Wicara pada Gangguan Tiroid Kongenital",
      scenario: "Anak dengan Congenital iodine-deficiency syndrome tipe neurologis menjalani program rehabilitasi Terapi Wicara (Other speech training and therapy). Berapa kode ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["93.75"],
      icd10PrimaryDisplay: "93.75",
      icd10PrimaryPlaceholder: "Mis. 93.75",
      leadTermDisplay: "Therapy → speech → 93.75",
      traceSteps: "ICD-9-CM Index: 'Therapy' → speech → Tabular 93.75.",
      commonMistakes: "Tertukar dengan terapi okupasi (93.83) atau terapi disleksia spesifik (93.71).",
      reference: "ICD-9-CM Vol. 3 — Kategori 93.75."
    },
    {
      id: "IV-ICD9-10",
      chapter: "bab4",
      chapterLabel: "Bab IV · ICD-9-CM",
      codeType: "icd9",
      difficulty: "difficult",
      caseIcon: "brain",
      organType: "pituitary",
      organAnatomy: "Sela Tursika, Kelenjar Hipofisis & Batang Otak",
      title: "MRI Otak & Batang Otak pada Diabetes Insipidus",
      scenario: "Pasien dengan Diabetes Insipidus sentral menjalani pencitraan kelenjar hipofisis menggunakan Magnetic resonance imaging of brain and brain stem. Tentukan kode ICD-9-CM-nya.",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["88.91"],
      icd10PrimaryDisplay: "88.91",
      icd10PrimaryPlaceholder: "Mis. 88.91",
      leadTermDisplay: "Imaging, magnetic resonance → brain → 88.91",
      traceSteps: "ICD-9-CM Index: 'Imaging, magnetic resonance' → brain → Tabular 88.91.",
      commonMistakes: "Tertukar dengan CT scan kepala (87.03) atau USG kepala dan leher (88.71).",
      reference: "ICD-9-CM Vol. 3 — Kategori 88.91."
    },

    // BAB V — 10 SOAL ICD-10
    {
      id: "V-ICD10-01",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "easy",
      caseIcon: "maternal",
      organType: "synapse",
      organAnatomy: "Sistem Limbik, Aksis HPA & Celah Sinaps Serotonin (5-HT)",
      title: "Depresi Setelah Melahirkan (Postpartum Depression)",
      scenario: "Ny. K (fiktif, 27 tahun) mengalami kesedihan mendalam 3 minggu pascapersalinan tanpa gejala psikotik berat dan didiagnosis Depresi Setelah Melahirkan. Berapa kode ICD-10-nya?",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["F53.0"],
      icd10PrimaryDisplay: "F53.0",
      icd10PrimaryPlaceholder: "Mis. F53.0",
      leadTermDisplay: "Depression → postpartum / puerperal → F53.0",
      traceSteps: "Vol. 3: 'Depression' → postpartum / puerperal → F53.0. Vol. 1: F53.0 = Mild mental & behavioural disorders associated with the puerperium, NEC.",
      commonMistakes: "Memilih F53.1 (psikosis nifas berat) atau F32.9 tanpa memperhatikan onset masa nifas (<6 minggu).",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F53.0."
    },
    {
      id: "V-ICD10-02",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "brain-visual",
      organAnatomy: "Korteks Oksipital Visual & Jalur Persepsi Otak",
      title: "Halusinasi Melihat Bayangan Seperti Mengikuti (Gejala Tunggal)",
      scenario: "Tn. L (fiktif) berobat dengan keluhan melihat bayangan mengikuti dirinya (halusinasi visual) tanpa adanya diagnosis psikiatri definitif dari dokter. Kode ICD-10 apa yang tepat?",
      icd10PrimaryLabel: "Kode ICD-10 (Bab XVIII)",
      icd10PrimaryAccepted: ["R44.1"],
      icd10PrimaryDisplay: "R44.1",
      icd10PrimaryPlaceholder: "Mis. R44.1",
      leadTermDisplay: "Hallucination → visual → R44.1 (bukan Bab V jika baru gejala tunggal)",
      traceSteps: "Vol. 3: 'Hallucination' → visual → R44.1. Vol. 1 Bab XVIII: R44.1 = Visual hallucinations.",
      commonMistakes: "Langsung mengode F20.9 (skizofrenia) padahal berkas hanya mencatat gejala halusinasi visual tunggal.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — R44.1."
    },
    {
      id: "V-ICD10-03",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "easy",
      caseIcon: "phobia",
      organType: "brain-limbic",
      organAnatomy: "Amigdala (Sistem Limbik) & Sistem Saraf Simpatis",
      title: "Phobia Ular Kobra (Fobia Spesifik)",
      scenario: "Sdr. M (fiktif) mengalami ketakutan ekstrem dan panik spesifik setiap melihat ular kobra (animal phobia). Berapa kode ICD-10 yang tepat?",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["F40.2"],
      icd10PrimaryDisplay: "F40.2",
      icd10PrimaryPlaceholder: "Mis. F40.2",
      leadTermDisplay: "Phobia → animal / specific (isolated) → F40.2",
      traceSteps: "Vol. 3: 'Phobia' → animal / specific → F40.2. Vol. 1: F40.2 = Specific (isolated) phobias (Includes: Animal phobias).",
      commonMistakes: "Memilih agorafobia (F40.0), fobia sosial (F40.1), atau gangguan panik umum (F41.0).",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F40.2."
    },
    {
      id: "V-ICD10-04",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "easy",
      caseIcon: "brain",
      organType: "brain-speech",
      organAnatomy: "Korteks Auditori–Wernicke–Broca & Jaras Bicara",
      title: "Speech Delay (Keterlambatan Bicara Anak)",
      scenario: "An. N (fiktif, 4 tahun) dirujuk ke poli tumbuh kembang karena mengalami keterlambatan perkembangan bicara (Speech delay). Berapa kode ICD-10 yang tepat?",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["F80.9"],
      icd10PrimaryDisplay: "F80.9",
      icd10PrimaryPlaceholder: "Mis. F80.9",
      leadTermDisplay: "Delay → development → speech → F80.9",
      traceSteps: "Vol. 3: 'Delay' → development → speech → F80.9. Vol. 1: F80.9 = Developmental disorder of speech and language, unspecified.",
      commonMistakes: "Tertukar dengan gangguan artikulasi spesifik (F80.0) atau gejala disfasia R47.0.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F80.9."
    },
    {
      id: "V-ICD10-05",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "brain-cognition",
      organAnatomy: "Korteks Prefrontal & Jaringan Konektivitas Serebral",
      title: "Retardasi Mental dengan Skor IQ 27",
      scenario: "Remaja O (fiktif) didiagnosis Retardasi Mental berdasarkan hasil pemeriksaan psikometri dengan skor IQ 27. Tentukan kode ICD-10 yang sesuai rentang IQ tersebut.",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["F72", "F72.9"],
      icd10PrimaryDisplay: "F72",
      icd10PrimaryPlaceholder: "Mis. F72",
      leadTermDisplay: "Retardation → mental → severe (IQ 20–34) → F72",
      traceSteps: "Vol. 3: 'Retardation' → mental → severe → F72. Vol. 1: F72 mencakup retardasi mental berat dengan rentang IQ 20–34.",
      commonMistakes: "Salah memilih F71 (IQ 35–49) atau F73 (IQ <20); skor IQ 27 berada pada rentang 20–34.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F72."
    },
    {
      id: "V-ICD10-06",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "difficult",
      caseIcon: "brain",
      organType: "brain-cognition",
      organAnatomy: "Girus Angularis & Lobus Temporo-Parietal Otak",
      title: "Kesulitan Spesifik Mengeja dan Membaca",
      scenario: "An. P (fiktif) usia sekolah dasar dengan kecerdasan normal mengalami kesulitan spesifik dalam membaca dan mengeja kata. Tentukan kedua kode ICD-10-nya.",
      icd10PrimaryLabel: "Kode ICD-10 Membaca",
      icd10PrimaryAccepted: ["F81.0"],
      icd10PrimaryDisplay: "F81.0",
      icd10PrimaryPlaceholder: "Mis. F81.0",
      icd10SecondaryLabel: "Kode ICD-10 Mengeja",
      icd10SecondaryAccepted: ["F81.1"],
      icd10SecondaryDisplay: "F81.1",
      icd10SecondaryPlaceholder: "Mis. F81.1",
      leadTermDisplay: "Disorder → reading (F81.0) & Disorder → spelling, specific (F81.1)",
      traceSteps: "Vol. 3: 'Disorder' → reading (developmental) → F81.0; 'Disorder' → spelling (specific) → F81.1.",
      commonMistakes: "Mengode ke retardasi mental (F70–F79) atau menggabungkan ke F81.9 padahal keduanya tercatat spesifik.",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F81.0 + F81.1."
    },
    {
      id: "V-ICD10-07",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "respiratory",
      organType: "lung",
      organAnatomy: "Reseptor Nikotinik Otak & Bronkus–Alveoli Paru (PPOK)",
      title: "Kecanduan Rokok Menyebabkan PPOK",
      scenario: "Tn. Q (fiktif) perokok berat didiagnosis sindrom ketergantungan tembakau/rokok yang mengakibatkan Penyakit Paru Obstruktif Kronik (PPOK). Tentukan kedua kode ICD-10-nya.",
      icd10PrimaryLabel: "Kode ICD-10 Rokok",
      icd10PrimaryAccepted: ["F17.2"],
      icd10PrimaryDisplay: "F17.2",
      icd10PrimaryPlaceholder: "Mis. F17.2",
      icd10SecondaryLabel: "Kode ICD-10 PPOK",
      icd10SecondaryAccepted: ["J44.9"],
      icd10SecondaryDisplay: "J44.9",
      icd10SecondaryPlaceholder: "Mis. J44.9",
      leadTermDisplay: "Dependence → tobacco (F17.2) + Disease → pulmonary, chronic obstructive (J44.9)",
      traceSteps: "Vol. 3: 'Dependence' → tobacco → F17.2; 'Disease' → pulmonary, chronic obstructive → J44.9.",
      commonMistakes: "Memilih F17.1 (penggunaan merugikan) atau F17.0 (intoksikasi) padahal kasus menyatakan kecanduan/ketergantungan (.2).",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F17.2 + J44.9."
    },
    {
      id: "V-ICD10-08",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "synapse",
      organAnatomy: "Sistem Limbik & Celah Sinaps (Dopamin, Serotonin, GABA)",
      title: "Gangguan Afektif Bipolar Tipe II",
      scenario: "Ny. R (fiktif) memiliki episode depresi berulang disertai riwayat hipomania (tanpa mania penuh) serta didiagnosis Bipolar Tipe II. Berapa kode ICD-10-nya?",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["F31.8"],
      icd10PrimaryDisplay: "F31.8",
      icd10PrimaryPlaceholder: "Mis. F31.8",
      leadTermDisplay: "Disorder → bipolar → II (type 2) → F31.8",
      traceSteps: "Vol. 3: 'Disorder' → bipolar → II → F31.8. Vol. 1: F31.8 = Other bipolar affective disorders (Includes: Bipolar II disorder).",
      commonMistakes: "Mengode ke F31.9 (tak spesifik) atau F31.0–F31.6 (Bipolar I).",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F31.8."
    },
    {
      id: "V-ICD10-09",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "difficult",
      caseIcon: "brain",
      organType: "synapse",
      organAnatomy: "Jaras Dopaminergik Mesolimbik, PFC & Reseptor D2",
      title: "Schizophrenia Schizoaffective Type Manic",
      scenario: "Tn. S (fiktif) dirawat inap karena gejala psikotik skizofrenia yang muncul bersamaan dengan episode mania menonjol (Schizophrenia schizoaffective type manic). Tentukan kode ICD-10-nya.",
      icd10PrimaryLabel: "Kode ICD-10",
      icd10PrimaryAccepted: ["F25.0"],
      icd10PrimaryDisplay: "F25.0",
      icd10PrimaryPlaceholder: "Mis. F25.0",
      leadTermDisplay: "Disorder → schizoaffective → manic type → F25.0",
      traceSteps: "Vol. 3: 'Disorder' → schizoaffective → manic type → F25.0. Vol. 1: F25.0 = Schizoaffective disorder, manic type.",
      commonMistakes: "Mengode ke F20.0 (skizofrenia paranoid) atau F25.1 (tipe depresif).",
      reference: "WHO ICD-10 Vol. 1 & 3 (2010) — F25.0."
    },
    {
      id: "V-ICD10-10",
      chapter: "bab5",
      chapterLabel: "Bab V (F00–F99)",
      codeType: "icd10",
      difficulty: "difficult",
      caseIcon: "dementia",
      organType: "brain-limbic",
      organAnatomy: "Parenkim Otak, Hipokampus & Subkorteks (Ensefalopati HIV)",
      title: "Demensia pada Penderita HIV",
      scenario: "Tn. T (fiktif) penyandang HIV mengalami penurunan kognitif progresif dan didiagnosis Demensia akibat penyakit HIV. Tentukan pasangan kode Dagger (†) dan Asterisk (*) yang benar.",
      icd10PrimaryLabel: "Kode ICD-10 Utama (†)",
      icd10PrimaryAccepted: ["B22.0", "B22.0†"],
      icd10PrimaryDisplay: "B22.0†",
      icd10PrimaryPlaceholder: "Mis. B22.0",
      icd10SecondaryLabel: "Kode Manifestasi (*)",
      icd10SecondaryAccepted: ["F02.4", "F02.4*"],
      icd10SecondaryDisplay: "F02.4*",
      icd10SecondaryPlaceholder: "Mis. F02.4",
      leadTermDisplay: "Dementia → in → human immunodeficiency virus [HIV] disease → B22.0† F02.4*",
      traceSteps: "Vol. 3: 'Dementia' → in → HIV disease → B22.0† F02.4*. Vol. 1: B22.0 (HIV encephalopathy) & F02.4* (Dementia in HIV).",
      commonMistakes: "Membalik urutan menjadi F02.4 di depan atau memakai kode F03 (demensia tak spesifik).",
      reference: "WHO ICD-10 Vol. 1, 2 & 3 (2010) — B22.0† F02.4*."
    },

    // BAB V — 10 SOAL ICD-9-CM
    {
      id: "V-ICD9-01",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "easy",
      caseIcon: "maternal",
      organType: "synapse",
      organAnatomy: "Korteks Prefrontal, Sistem Limbik & Regulasi Neurotransmiter",
      title: "Psikoterapi Suportif Individual pada Depresi Nifas",
      scenario: "Ibu pascapersalinan dengan depresi nifas mendapatkan layanan terapi sesi tunggal berupa Other individual psychotherapy. Berapa kode tindakan ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["94.39"],
      icd10PrimaryDisplay: "94.39",
      icd10PrimaryPlaceholder: "Mis. 94.39",
      leadTermDisplay: "Psychotherapy → individual → 94.39",
      traceSteps: "ICD-9-CM Index: 'Psychotherapy' → individual → Tabular 94.39 (Other individual psychotherapy).",
      commonMistakes: "Tertukar dengan evaluasi psikiatri (94.19) atau terapi keluarga (94.42).",
      reference: "ICD-9-CM Vol. 3 — Kategori 94.39."
    },
    {
      id: "V-ICD9-02",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "brain-visual",
      organAnatomy: "Korteks Oksipital–Temporal & Sistem Limbik (Evaluasi Klinis)",
      title: "Wawancara & Evaluasi Psikiatri Diagnostik",
      scenario: "Pasien dengan keluhan halusinasi visual menjalani sesi wawancara psikiatri diagnostik (Other psychiatric interview and evaluation). Tentukan kode tindakan ICD-9-CM-nya.",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["94.19"],
      icd10PrimaryDisplay: "94.19",
      icd10PrimaryPlaceholder: "Mis. 94.19",
      leadTermDisplay: "Interview / Evaluation → psychiatric → 94.19",
      traceSteps: "ICD-9-CM Index: 'Interview' → psychiatric → Tabular 94.19 (Other psychiatric interview and evaluation).",
      commonMistakes: "Tertukar dengan penentuan status mental rutin (94.11) atau terapi obat psikiatri (94.25).",
      reference: "ICD-9-CM Vol. 3 — Kategori 94.19."
    },
    {
      id: "V-ICD9-03",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "easy",
      caseIcon: "phobia",
      organType: "brain-limbic",
      organAnatomy: "Amigdala & Prefrontal Inhibitory Pathway (Desensitisasi)",
      title: "Behavior Therapy pada Fobia Spesifik",
      scenario: "Pasien fobia ular kobra menjalani terapi desensitisasi sistematis yang diklasifikasikan sebagai Behavior therapy. Berapa kode prosedur ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["94.33"],
      icd10PrimaryDisplay: "94.33",
      icd10PrimaryPlaceholder: "Mis. 94.33",
      leadTermDisplay: "Therapy → behavior → 94.33",
      traceSteps: "ICD-9-CM Index: 'Therapy' → behavior → Tabular 94.33 (Behavior therapy).",
      commonMistakes: "Tertukar dengan psikoterapi individual umum (94.39) atau konseling keluarga (94.42).",
      reference: "ICD-9-CM Vol. 3 — Kategori 94.33."
    },
    {
      id: "V-ICD9-04",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "easy",
      caseIcon: "brain",
      organType: "brain-speech",
      organAnatomy: "Korteks Bahasa (Broca–Wernicke) & Organ Fonasi",
      title: "Terapi Wicara pada Anak dengan Speech Delay",
      scenario: "Anak dengan keterlambatan bicara (Speech Delay) mengikuti sesi latihan bicara terstruktur (Other speech training and therapy). Berapa kode tindakan ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["93.75"],
      icd10PrimaryDisplay: "93.75",
      icd10PrimaryPlaceholder: "Mis. 93.75",
      leadTermDisplay: "Therapy → speech → 93.75",
      traceSteps: "ICD-9-CM Index: 'Therapy' → speech → Tabular 93.75 (Other speech training and therapy).",
      commonMistakes: "Tertukar dengan evaluasi psikologis (94.08) atau terapi edukasi belajar (93.82).",
      reference: "ICD-9-CM Vol. 3 — Kategori 93.75."
    },
    {
      id: "V-ICD9-05",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "brain-cognition",
      organAnatomy: "Korteks Motorik, Serebelum & Jaringan Kognitif Adaptif",
      title: "Terapi Okupasi Rehabilitasi pada Retardasi Mental",
      scenario: "Remaja dengan retardasi mental (IQ 27) menjalani pelatihan kemandirian fungsional melalui Occupational therapy. Berapa kode prosedur ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["93.83"],
      icd10PrimaryDisplay: "93.83",
      icd10PrimaryPlaceholder: "Mis. 93.83",
      leadTermDisplay: "Therapy → occupational → 93.83",
      traceSteps: "ICD-9-CM Index: 'Therapy' → occupational → Tabular 93.83 (Occupational therapy).",
      commonMistakes: "Tertukar dengan tes intelegensi (94.01) atau terapi wicara (93.75).",
      reference: "ICD-9-CM Vol. 3 — Kategori 93.83."
    },
    {
      id: "V-ICD9-06",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "brain",
      organType: "brain-cognition",
      organAnatomy: "Lobus Parieto-Temporal Kiri & Memori Kerja Kognitif",
      title: "Asesmen Neuropsikologis Membaca dan Mengeja",
      scenario: "Siswa dengan gangguan membaca dan mengeja menjalani asesmen neuropsikologis terstruktur (Other psychological evaluation and testing). Tentukan kode tindakan ICD-9-CM-nya.",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["94.08"],
      icd10PrimaryDisplay: "94.08",
      icd10PrimaryPlaceholder: "Mis. 94.08",
      leadTermDisplay: "Evaluation → psychological → 94.08",
      traceSteps: "ICD-9-CM Index: 'Evaluation' → psychological → Tabular 94.08.",
      commonMistakes: "Tertukar dengan tes intelegensi khusus IQ (94.01) atau terapi remediasi edukasi (93.82).",
      reference: "ICD-9-CM Vol. 3 — Kategori 94.08."
    },
    {
      id: "V-ICD9-07",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "medium",
      caseIcon: "respiratory",
      organType: "lung",
      organAnatomy: "Trakea, Cabang Bronkus & Kapasitas Alveoli Paru",
      title: "Pemeriksaan Spirometri pada Ketergantungan Rokok & PPOK",
      scenario: "Perokok kronis yang mengalami PPOK menjalani uji fungsi ventilasi paru Spirometri (Vital capacity determination). Berapa kode tindakan ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["89.37"],
      icd10PrimaryDisplay: "89.37",
      icd10PrimaryPlaceholder: "Mis. 89.37",
      leadTermDisplay: "Determination → vital capacity (spirometry) → 89.37",
      traceSteps: "ICD-9-CM Index: 'Determination' → vital capacity → Tabular 89.37.",
      commonMistakes: "Tertukar dengan terapi nebulizer (93.94) atau konseling berhenti merokok (94.49).",
      reference: "ICD-9-CM Vol. 3 — Kategori 89.37."
    },
    {
      id: "V-ICD9-08",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "difficult",
      caseIcon: "brain",
      organType: "brain-limbic",
      organAnatomy: "Korteks Prefrontal, Sistem Limbik & Regulasi Afek",
      title: "Penentuan Status Mental Psikiatri pada Bipolar II",
      scenario: "Pasien dengan Gangguan Afektif Bipolar Tipe II menjalani evaluasi status mental psikiatri (Psychiatric mental status determination). Tentukan kode tindakan ICD-9-CM-nya.",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["94.11"],
      icd10PrimaryDisplay: "94.11",
      icd10PrimaryPlaceholder: "Mis. 94.11",
      leadTermDisplay: "Determination → mental status (psychiatric) → 94.11",
      traceSteps: "ICD-9-CM Index: 'Determination' → mental status, psychiatric → Tabular 94.11.",
      commonMistakes: "Tertukar dengan wawancara psikiatri lain (94.19) atau psikoterapi individual (94.39).",
      reference: "ICD-9-CM Vol. 3 — Kategori 94.11."
    },
    {
      id: "V-ICD9-09",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "difficult",
      caseIcon: "brain",
      organType: "synapse",
      organAnatomy: "Sirkuit Kortiko-Limbik & Reseptor Neurotransmiter Otak",
      title: "Terapi Kejang Listrik (ECT) pada Skizoafektif Tipe Manik",
      scenario: "Pasien rawat inap dengan Skizofrenia Skizoafektif Tipe Manik menjalani prosedur Electroconvulsive therapy [ECT] / Other electroshock therapy. Berapa kode ICD-9-CM-nya?",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["94.27"],
      icd10PrimaryDisplay: "94.27",
      icd10PrimaryPlaceholder: "Mis. 94.27",
      leadTermDisplay: "Therapy → electroconvulsive / electroshock [ECT] → 94.27",
      traceSteps: "ICD-9-CM Index: 'Therapy' → electroconvulsive / electroshock → Tabular 94.27.",
      commonMistakes: "Tertukar dengan terapi obat psikiatri (94.25) atau pemeriksaan EEG (89.14).",
      reference: "ICD-9-CM Vol. 3 — Kategori 94.27."
    },
    {
      id: "V-ICD9-10",
      chapter: "bab5",
      chapterLabel: "Bab V · ICD-9-CM",
      codeType: "icd9",
      difficulty: "difficult",
      caseIcon: "dementia",
      organType: "brain-limbic",
      organAnatomy: "Serebrum, Hipokampus & Batang Otak (Pencitraan MRI)",
      title: "MRI Otak pada Demensia HIV",
      scenario: "Pasien penyandang HIV dengan gejala demensia progresif menjalani pencitraan Magnetic resonance imaging of brain and brain stem. Tentukan kode tindakan ICD-9-CM-nya.",
      icd10PrimaryLabel: "Kode Tindakan ICD-9-CM",
      icd10PrimaryAccepted: ["88.91"],
      icd10PrimaryDisplay: "88.91",
      icd10PrimaryPlaceholder: "Mis. 88.91",
      leadTermDisplay: "Imaging, magnetic resonance → brain → 88.91",
      traceSteps: "ICD-9-CM Index: 'Imaging, magnetic resonance' → brain → Tabular 88.91.",
      commonMistakes: "Tertukar dengan terapi okupasi/rehabilitasi kognitif (93.83) atau pungsi lumbal (03.31).",
      reference: "ICD-9-CM Vol. 3 — Kategori 88.91."
    }
  ];

  // -----------------------------------------------------------------------
  // LOGIKA PENILAIAN TOLERAN NON-PILIHAN GANDA
  // -----------------------------------------------------------------------
  function normalizeCode(val) {
    return (val || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "")
      .replace(/[†*+]/g, "");
  }

  function isCodeMatch(input, acceptedList) {
    const clean = normalizeCode(input);
    if (!clean) return false;
    return acceptedList.some((acc) => normalizeCode(acc) === clean);
  }

  function isQuestionFilled(q, ans) {
    if (!ans.icd10Primary.trim()) return false;
    if (q.icd10SecondaryAccepted && !ans.icd10Secondary.trim()) return false;
    return true;
  }

  function evaluateCase(q, ans) {
    const primaryOk = isCodeMatch(ans.icd10Primary, q.icd10PrimaryAccepted);
    const secondaryOk = q.icd10SecondaryAccepted
      ? isCodeMatch(ans.icd10Secondary, q.icd10SecondaryAccepted)
      : true;
    const allCodesOk = primaryOk && secondaryOk;
    return { primaryOk, secondaryOk, allCodesOk };
  }

  const levelHubEl = document.getElementById("quiz-level-hub");
  const quizContainer = document.getElementById("quiz-container");
  const quizActionsFooter = document.getElementById("quiz-actions-footer");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const codeTypeButtons = document.querySelectorAll(".code-type-btn");
  const countAllEl = document.getElementById("count-type-all");
  const countIcd10El = document.getElementById("count-type-icd10");
  const countIcd9El = document.getElementById("count-type-icd9");
  const btnBackLevels = document.getElementById("btn-back-levels");
  const btnResetQuiz = document.getElementById("btn-reset-quiz");
  const btnToggleRecap = document.getElementById("btn-toggle-recap");
  const btnFooterRecap = document.getElementById("btn-footer-recap");
  const recapSheetEl = document.getElementById("print-recap-sheet");
  const scoreAnsweredEl = document.getElementById("score-answered");
  const scoreCorrectEl = document.getElementById("score-correct");
  const scorePercentEl = document.getElementById("score-percent");

  let userAnswers = {};
  let checkedQuestions = {};
  let missingNotice = {};
  let isRecapVisible = false;

  function getAns(qId) {
    if (!userAnswers[qId]) {
      userAnswers[qId] = { icd10Primary: "", icd10Secondary: "" };
    }
    return userAnswers[qId];
  }

  function getChapterQuestions() {
    if (currentFilter === "all") return quizData;
    return quizData.filter((q) => q.chapter === currentFilter);
  }

  function getFilteredQuestions() {
    const byChapter = getChapterQuestions();
    if (currentCodeType === "all") return byChapter;
    return byChapter.filter((q) => q.codeType === currentCodeType);
  }

  function getVisibleQuestions() {
    const byType = getFilteredQuestions();
    if (!activeLevel || activeLevel === "all-list") return byType;
    return byType.filter((q) => q.difficulty === activeLevel);
  }

  function calcStats(list) {
    const total = list.length;
    let answered = 0;
    let correct = 0;
    list.forEach((q) => {
      const a = getAns(q.id);
      if (a.icd10Primary.trim() || a.icd10Secondary.trim()) {
        answered++;
      }
      if (checkedQuestions[q.id] && evaluateCase(q, a).allCodesOk) {
        correct++;
      }
    });
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, answered, correct, pct };
  }

  function updateScoreboard() {
    const byChapter = getChapterQuestions();
    if (countAllEl) countAllEl.textContent = String(byChapter.length);
    if (countIcd10El) countIcd10El.textContent = String(byChapter.filter((q) => q.codeType === "icd10").length);
    if (countIcd9El) countIcd9El.textContent = String(byChapter.filter((q) => q.codeType === "icd9").length);

    const visible = getVisibleQuestions();
    const st = calcStats(visible);
    scoreAnsweredEl.textContent = `${st.answered} / ${st.total}`;
    scoreCorrectEl.textContent = `${st.correct}`;
    scorePercentEl.textContent = `${st.pct}%`;
  }

  function escapeAttr(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildQuestionCardElement(q, displayNo, focusedMode) {
    const card = document.createElement("article");
    card.className = "quiz-card";
    const ans = getAns(q.id);
    const isChecked = Boolean(checkedQuestions[q.id]);
    const hasMissing = Boolean(missingNotice[q.id]);
    const evalRes = isChecked ? evaluateCase(q, ans) : null;

    const statusHtml = isChecked
      ? evalRes.allCodesOk
        ? `<span class="quiz-status-tag ok">✓ Jawaban Tepat</span>`
        : `<span class="quiz-status-tag err">✗ Belum Tepat</span>`
      : "";

    const primaryClass = isChecked ? (evalRes.primaryOk ? "input-ok" : "input-err") : "";
    const secondaryClass = isChecked ? (evalRes.secondaryOk ? "input-ok" : "input-err") : "";

    const secondaryInputHtml = q.icd10SecondaryLabel
      ? `<div class="who-field-col">
          <label class="quiz-input-label" for="${q.id}-sec">
            <span>${q.icd10SecondaryLabel}</span>
          </label>
          <input id="${q.id}-sec" data-field="icd10Secondary" class="quiz-text-input ${secondaryClass}" type="text" placeholder="${escapeAttr(q.icd10SecondaryPlaceholder)}" value="${escapeAttr(ans.icd10Secondary)}" />
        </div>`
      : "";

    const feedbackHtml = isChecked
      ? `<div class="quiz-feedback">
          <p class="quiz-kak-item-a"><strong>(a) Identitas &amp; Pokok Soal:</strong> ${q.id} (${q.chapterLabel} · Level ${q.difficulty}) — ${q.title}: ${q.scenario}</p>
          <div class="quiz-key-strip">
            <span class="quiz-key-pill"><strong>(b) Kunci Jawaban Resmi (${q.codeType === "icd9" ? "ICD-9-CM" : "ICD-10"}):</strong> <code>${q.icd10PrimaryDisplay}${q.icd10SecondaryDisplay ? ` ${q.icd10SecondaryDisplay}` : ""}</code></span>
          </div>
          <p><strong>(c) Langkah Penelusuran (Lead Term → Indeks → Tabular):</strong> ${q.leadTermDisplay}. ${q.traceSteps}</p>
          <p><strong>(d) Rasionalisasi Analisis &amp; Kesalahan Umum:</strong> ${q.commonMistakes}</p>
          <p><strong>(e) Sumber Rujukan:</strong> <em>${q.reference}</em></p>
        </div>`
      : "";

    const noticeHtml =
      hasMissing && !isChecked
        ? `<p class="validation-msg">Isi seluruh kolom kode terlebih dahulu sebelum menekan tombol ✓.</p>`
        : "";

    card.innerHTML = `
      <div class="quiz-card-top">
        <span class="quiz-badge">Identitas Soal: ${q.id} · Kasus ${displayNo} · ${q.chapterLabel} · Level ${q.difficulty.toUpperCase()}</span>
        ${statusHtml}
      </div>
      ${renderOrganAnatomyPanel(q, focusedMode)}
      <div class="who-q-row">
        <div class="who-q-badge" aria-hidden="true">?</div>
        <div>
          <h4 class="quiz-case-title">${q.title}</h4>
          <p class="quiz-question"><strong style="font-size:0.75rem;color:#0a3656;text-transform:uppercase;letter-spacing:0.04em;margin-right:6px;">Pokok Soal:</strong>${q.scenario}</p>
        </div>
      </div>
      <div class="who-answer-inline">
        <div class="who-field-col">
          <label class="quiz-input-label" for="${q.id}-pri">
            <span>${q.icd10PrimaryLabel}</span>
          </label>
          <input id="${q.id}-pri" data-field="icd10Primary" class="quiz-text-input ${primaryClass}" type="text" placeholder="${escapeAttr(q.icd10PrimaryPlaceholder)}" value="${escapeAttr(ans.icd10Primary)}" />
        </div>
        ${secondaryInputHtml}
        <button class="who-submit-circle" type="button" title="Kirim &amp; Periksa Jawaban" aria-label="Kirim &amp; Periksa Jawaban">✓</button>
      </div>
      ${noticeHtml}
      ${feedbackHtml}
    `;

    const submitOne = () => {
      if (!isQuestionFilled(q, getAns(q.id))) {
        missingNotice[q.id] = true;
        renderQuiz();
        return;
      }
      missingNotice[q.id] = false;
      checkedQuestions[q.id] = true;
      renderQuiz();
    };

    card.querySelectorAll(".quiz-text-input").forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        const field = e.target.getAttribute("data-field");
        getAns(q.id)[field] = e.target.value;
        missingNotice[q.id] = false;
        updateScoreboard();
      });
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitOne();
      });
    });

    card.querySelector(".who-submit-circle").addEventListener("click", submitOne);

    return card;
  }

  function renderLevelHub() {
    const byType = getFilteredQuestions();
    const levels = [
      { key: "easy", label: "Easy", layers: 3, desc: "Kode tunggal diagnosis ICD-10 & prosedur langsung ICD-9-CM" },
      { key: "medium", label: "Medium", layers: 6, desc: "Kombinasi dua kode, subdivisi spesifik & tindakan diagnostik" },
      { key: "difficult", label: "Difficult", layers: 10, desc: "Kasus kompleks Dagger (†) / Asterisk (*) & tindakan lanjutan" }
    ];

    const cardsHtml = levels
      .map((lvl) => {
        const list = byType.filter((q) => q.difficulty === lvl.key);
        const st = calcStats(list);
        return `
          <button class="level-folder-card" data-level="${lvl.key}" type="button">
            ${renderFolderStackSvg(lvl.label, lvl.layers)}
            <span class="level-folder-meta">${list.length} Soal · ${st.correct}/${st.total} Tepat</span>
            <span class="level-folder-desc">${lvl.desc}</span>
            <span class="level-folder-cta">Mulai Level ${lvl.label} →</span>
          </button>
        `;
      })
      .join("");

    levelHubEl.innerHTML = `
      <div class="level-hub-intro">
        <p>Latihan soal isian non-pilihan ganda terdiri atas <strong>10 soal ICD-10</strong> dan <strong>10 soal ICD-9-CM</strong> per bab.</p>
        <p>Ketik kode pada kolom isian lalu klik tombol centang biru (<strong>✓</strong>) untuk mengirim jawaban dan melihat kunci jawaban yang benar beserta pembahasannya.</p>
      </div>
      <div class="level-hub-grid">${cardsHtml}</div>
      <div class="level-hub-footer">
        <span>Disarankan menyelesaikan mulai dari <strong>Easy</strong> lalu <strong>Medium</strong> dan <strong>Difficult</strong>.</span>
        <button id="btn-open-all-list" class="btn-toggle-key" type="button">
          Atau Tampilkan Semua ${byType.length} Soal Sekaligus →
        </button>
      </div>
    `;

    levelHubEl.querySelectorAll(".level-folder-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeLevel = btn.getAttribute("data-level");
        currentQuestionIdx = 0;
        renderQuiz();
      });
    });

    const openAllBtn = document.getElementById("btn-open-all-list");
    if (openAllBtn) {
      openAllBtn.addEventListener("click", () => {
        activeLevel = "all-list";
        currentQuestionIdx = 0;
        renderQuiz();
      });
    }
  }

  function renderQuiz() {
    if (currentViewId === "view-quiz") updateHeaderBreadcrumb("view-quiz");

    if (activeLevel === null) {
      levelHubEl.classList.remove("hidden");
      quizContainer.innerHTML = "";
      quizActionsFooter.classList.add("hidden");
      btnBackLevels.classList.add("hidden");
      renderLevelHub();
      updateScoreboard();
      return;
    }

    levelHubEl.classList.add("hidden");
    quizActionsFooter.classList.remove("hidden");
    btnBackLevels.classList.remove("hidden");
    quizContainer.innerHTML = "";

    const questions = getVisibleQuestions();

    if (activeLevel === "all-list") {
      questions.forEach((q, idx) => {
        quizContainer.appendChild(buildQuestionCardElement(q, idx + 1, false));
      });
    } else {
      if (currentQuestionIdx >= questions.length) currentQuestionIdx = 0;
      const q = questions[currentQuestionIdx];
      if (q) {
        quizContainer.appendChild(buildQuestionCardElement(q, currentQuestionIdx + 1, true));

        const navRow = document.createElement("div");
        navRow.className = "who-step-nav";
        const dotsHtml = questions
          .map((item, idx) => {
            const isItemChecked = Boolean(checkedQuestions[item.id]);
            const ok = isItemChecked && evaluateCase(item, getAns(item.id)).allCodesOk;
            const cls = idx === currentQuestionIdx ? "active" : ok ? "done" : isItemChecked ? "wrong" : "";
            return `<button type="button" class="step-dot ${cls}" data-step="${idx}">${idx + 1}</button>`;
          })
          .join("");

        navRow.innerHTML = `
          <button id="btn-prev-q" class="btn-secondary" type="button" ${currentQuestionIdx <= 0 ? "disabled" : ""}>← Soal Sebelumnya</button>
          <div class="step-dots">${dotsHtml}</div>
          ${
            currentQuestionIdx < questions.length - 1
              ? `<button id="btn-next-q" class="btn-primary" type="button">Soal Berikutnya →</button>`
              : `<button id="btn-finish-lvl" class="btn-primary" type="button">Selesai &amp; Pilih Level Lain →</button>`
          }
        `;
        quizContainer.appendChild(navRow);

        const prevBtn = navRow.querySelector("#btn-prev-q");
        const nextBtn = navRow.querySelector("#btn-next-q");
        const finishBtn = navRow.querySelector("#btn-finish-lvl");

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            if (currentQuestionIdx > 0) {
              currentQuestionIdx--;
              renderQuiz();
            }
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            if (currentQuestionIdx < questions.length - 1) {
              currentQuestionIdx++;
              renderQuiz();
            }
          });
        }
        if (finishBtn) {
          finishBtn.addEventListener("click", () => {
            activeLevel = null;
            renderQuiz();
          });
        }
        navRow.querySelectorAll(".step-dot").forEach((dot) => {
          dot.addEventListener("click", () => {
            currentQuestionIdx = Number(dot.getAttribute("data-step"));
            renderQuiz();
          });
        });
      }
    }

    updateScoreboard();
  }

  function getRecapData() {
    const scopeList = activeLevel === null ? getFilteredQuestions() : getVisibleQuestions();
    const checkedList = scopeList.filter((q) => checkedQuestions[q.id]);
    const list = checkedList.length > 0 ? checkedList : scopeList;
    const totalScope = scopeList.length;
    const checkedCount = checkedList.length;
    let correctCount = 0;
    checkedList.forEach((q) => {
      if (evaluateCase(q, getAns(q.id)).allCodesOk) correctCount += 1;
    });
    const scorePct = totalScope > 0 ? Math.round((correctCount / totalScope) * 100) : 0;
    return { list, totalScope, checkedCount, correctCount, scorePct };
  }

  function downloadRecapHtml() {
    const recap = getRecapData();
    const nowStr = new Date().toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short"
    });
    const rowsHtml = recap.list
      .map((q, idx) => {
        const ans = getAns(q.id);
        const isChk = Boolean(checkedQuestions[q.id]);
        const ok = isChk && evaluateCase(q, ans).allCodesOk;
        const userAns =
          [ans.icd10Primary.trim(), ans.icd10Secondary.trim()].filter(Boolean).join(" ") || "—";
        const keyAns = `${q.icd10PrimaryDisplay}${q.icd10SecondaryDisplay ? ` ${q.icd10SecondaryDisplay}` : ""}`;
        return `<tr>
          <td>${idx + 1}</td>
          <td><strong>${escapeHtmlText(q.id)}</strong><br/><small>${escapeHtmlText(q.chapterLabel)} · ${escapeHtmlText(q.difficulty.toUpperCase())}</small><br/><em>${escapeHtmlText(q.title)}</em></td>
          <td><code>${escapeHtmlText(userAns)}</code></td>
          <td><code>${escapeHtmlText(keyAns)}</code></td>
          <td>${isChk ? (ok ? '<strong style="color:#047857;">Tepat</strong>' : '<strong style="color:#b91c1c;">Belum Tepat</strong>') : "Belum diperiksa"}</td>
          <td>
            <div><strong>(c) Penelusuran:</strong> ${escapeHtmlText(q.leadTermDisplay)}. ${escapeHtmlText(q.traceSteps)}</div>
            <div><strong>(d) Rasionalisasi:</strong> ${escapeHtmlText(q.commonMistakes)}</div>
            <div><small><strong>(e) Rujukan:</strong> ${escapeHtmlText(q.reference)}</small></div>
          </td>
        </tr>`;
      })
      .join("");

    const docHtml = `<!DOCTYPE html>
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
  <div class="meta">Capstone Experience Semester 3 · Prodi D3 Rekam Medis &amp; Informasi Kesehatan — Universitas Esa Unggul · Dicetak: ${escapeHtmlText(nowStr)}</div>
  <div class="summary">
    <div class="card"><strong>Diperiksa:</strong> ${recap.checkedCount} / ${recap.totalScope} soal</div>
    <div class="card"><strong>Jawaban Tepat:</strong> ${recap.correctCount} soal</div>
    <div class="card"><strong>Skor Capaian:</strong> ${recap.scorePct}%</div>
  </div>
  <p style="font-size:12px;"><strong>Tim Penyusun:</strong> ${teamMembers.map((m) => `${escapeHtmlText(m.name)} (${escapeHtmlText(m.nim)})`).join(" · ")}</p>
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

    const blob = new Blob([docHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Rekap_Latihan_ICD_UEU.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function renderRecapPanel() {
    if (!recapSheetEl) return;
    if (!isRecapVisible) {
      recapSheetEl.classList.add("hidden");
      recapSheetEl.innerHTML = "";
      if (btnToggleRecap) btnToggleRecap.textContent = "🖨 Cetak / Simpan Rekap Hasil Latihan";
      return;
    }

    if (btnToggleRecap) btnToggleRecap.textContent = "✕ Tutup Rekap Latihan";
    recapSheetEl.classList.remove("hidden");
    const recap = getRecapData();
    const rowsHtml = recap.list
      .map((q, idx) => {
        const ans = getAns(q.id);
        const isChk = Boolean(checkedQuestions[q.id]);
        const ok = isChk && evaluateCase(q, ans).allCodesOk;
        const userAns =
          [ans.icd10Primary.trim(), ans.icd10Secondary.trim()].filter(Boolean).join(" ") || "—";
        const keyAns = `${q.icd10PrimaryDisplay}${q.icd10SecondaryDisplay ? ` ${q.icd10SecondaryDisplay}` : ""}`;
        return `<tr>
          <td><code>${idx + 1}</code></td>
          <td>
            <strong style="color:#0a3656;display:block;">${escapeHtmlText(q.id)}</strong>
            <strong style="display:block;">${escapeHtmlText(q.title)}</strong>
            <span style="color:#475569;">${escapeHtmlText(q.scenario)}</span>
          </td>
          <td><code>${escapeHtmlText(userAns)}</code></td>
          <td><code style="color:#00669e;">${escapeHtmlText(keyAns)}</code></td>
          <td>${isChk ? (ok ? '<strong style="color:#047857;">✓ Tepat</strong>' : '<strong style="color:#b91c1c;">✗ Belum Tepat</strong>') : '<span style="color:#94a3b8;">Belum dicek</span>'}</td>
          <td>
            <div><strong>(c)</strong> ${escapeHtmlText(q.leadTermDisplay)}. ${escapeHtmlText(q.traceSteps)}</div>
            <div><strong>(d)</strong> ${escapeHtmlText(q.commonMistakes)}</div>
            <div style="color:#64748b;"><strong>(e)</strong> <em>${escapeHtmlText(q.reference)}</em></div>
          </td>
        </tr>`;
      })
      .join("");

    recapSheetEl.innerHTML = `
      <div class="recap-head">
        <div>
          <span class="recap-eyebrow">Rekapitulasi Evaluasi · Lampiran 2 KAK</span>
          <h4>Rekap Hasil Latihan Kodifikasi ICD-10 &amp; ICD-9-CM</h4>
          <p>Penyusun: ${escapeHtmlText(teamMembers[0].name)} (${escapeHtmlText(teamMembers[0].nim)}) · Prodi D3 RMIK Universitas Esa Unggul</p>
        </div>
        <div class="recap-actions no-print">
          <button id="btn-print-recap" class="btn-primary" type="button" style="padding:7px 13px;font-size:0.8rem;">🖨 Cetak / Simpan PDF</button>
          <button id="btn-download-recap" class="btn-secondary" type="button" style="padding:7px 13px;font-size:0.8rem;background:#0e7c7b;color:#fff;border-color:#0e7c7b;">⬇ Simpan Rekap (.html)</button>
          <button id="btn-close-recap" class="btn-secondary" type="button" style="padding:7px 12px;font-size:0.8rem;">Tutup</button>
        </div>
      </div>
      <div class="recap-stats-grid">
        <div class="recap-stat-box"><span>Soal Diperiksa (Filter Aktif)</span><strong>${recap.checkedCount} / ${recap.totalScope} Soal</strong></div>
        <div class="recap-stat-box"><span>Jawaban Tepat</span><strong style="color:#047857;">${recap.correctCount} Soal</strong></div>
        <div class="recap-stat-box highlight"><span>Skor Capaian</span><strong>${recap.scorePct}%</strong></div>
      </div>
      <div class="table-responsive">
        <table class="data-table recap-table">
          <thead>
            <tr>
              <th>No</th>
              <th>(a) Identitas &amp; Pokok Soal</th>
              <th>Isian Anda</th>
              <th>(b) Kunci Resmi</th>
              <th>Status</th>
              <th>(c) Penelusuran, (d) Rasionalisasi &amp; (e) Rujukan</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;

    const printBtn = document.getElementById("btn-print-recap");
    const dlBtn = document.getElementById("btn-download-recap");
    const closeBtn = document.getElementById("btn-close-recap");
    if (printBtn) printBtn.addEventListener("click", () => window.print());
    if (dlBtn) dlBtn.addEventListener("click", downloadRecapHtml);
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        isRecapVisible = false;
        renderRecapPanel();
      });
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      currentQuestionIdx = 0;
      renderQuiz();
      if (isRecapVisible) renderRecapPanel();
    });
  });

  codeTypeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      codeTypeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCodeType = btn.getAttribute("data-codetype");
      currentQuestionIdx = 0;
      renderQuiz();
      if (isRecapVisible) renderRecapPanel();
    });
  });

  if (btnBackLevels) {
    btnBackLevels.addEventListener("click", () => {
      activeLevel = null;
      currentQuestionIdx = 0;
      renderQuiz();
      if (isRecapVisible) renderRecapPanel();
    });
  }

  if (btnToggleRecap) {
    btnToggleRecap.addEventListener("click", () => {
      isRecapVisible = !isRecapVisible;
      renderRecapPanel();
    });
  }

  if (btnFooterRecap) {
    btnFooterRecap.addEventListener("click", () => {
      isRecapVisible = true;
      renderRecapPanel();
      if (recapSheetEl) recapSheetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  btnResetQuiz.addEventListener("click", () => {
    userAnswers = {};
    checkedQuestions = {};
    missingNotice = {};
    currentQuestionIdx = 0;
    renderQuiz();
    if (isRecapVisible) renderRecapPanel();
  });

  renderQuiz();
});
