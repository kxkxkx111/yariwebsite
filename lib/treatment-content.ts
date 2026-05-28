// Treatment content registry — extracted and curated from the live-site
// Elementor inventory in `/tmp/dryary/pages_md/*.md` and the master
// `docs/OLD_SITE_INVENTORY.md`. Curated to fix typos and rewrite stilted phrasing
// from the WP source; pricing/timings stay verbatim (from the live site).
//
// Each treatment page has:
//   - hero (eyebrow / title / tagline / image)
//   - sub-procedures (each with description, indication, details, image)
//   - related (3 link refs)
//
// Add new treatments by extending the records below. The page template reads
// from `getTreatmentContent(category, slug, locale)`.

import type { Locale } from "./i18n/config";
import type { TreatmentSlug, MinimalInvasiveSlug } from "./routes";

export type ProcedureDetails = {
  /** German label, falls back to English copy for EN. */
  cost: string;
  recovery: string;
  duration: string;
  /** Optional — anaesthesia, contraindications, etc. */
  notes?: string;
};

export type SubProcedure = {
  id: string;
  title: string;
  description: string;
  details: ProcedureDetails;
  /** Optional bullet indication list — "Für wen geeignet". */
  indication?: string[];
};

export type TreatmentContent = {
  eyebrow: string;
  title: string;
  tagline: string;
  /** Hero image — relative to /public. */
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  subProcedures: SubProcedure[];
  /** A 3-item list of related-route keys. */
  related: ReadonlyArray<
    | { type: "treatment"; key: TreatmentSlug }
    | { type: "minimal"; key: MinimalInvasiveSlug }
  >;
};

/** Labels for the procedure-details box (locale-specific). */
export const detailLabels: Record<
  Locale,
  { cost: string; recovery: string; duration: string; notes: string }
> = {
  de: {
    cost: "Behandlungskosten",
    recovery: "Gesellschaftliche Erholung",
    duration: "Dauer der Operation",
    notes: "Hinweise",
  },
  en: {
    cost: "Treatment Costs",
    recovery: "Social Recovery",
    duration: "Procedure Duration",
    notes: "Notes",
  },
};

// ─────────────────────────────────────────────────────────────
// OPERATIVE TREATMENTS
// ─────────────────────────────────────────────────────────────

const breast: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Operative Eingriffe",
    title: "Brust",
    tagline: "Sinnlichkeit, Weiblichkeit, Ästhetik.",
    heroImage: "/portraits/beratung.jpg",
    heroImageAlt: "Brustchirurgie — Beratung bei Dr. Yary",
    intro:
      "Die Brust ist über das Leben hinweg von hormonellen Veränderungen, Schwangerschaften und genetischen Faktoren geprägt. Operative Eingriffe an der Brust bieten Korrekturmöglichkeiten — von der Vergrößerung über die Straffung bis zur Reduktion — stets mit dem Ziel eines natürlichen, harmonischen Ergebnisses.",
    subProcedures: [
      {
        id: "implantate",
        title: "Brustvergrößerung mit Implantaten",
        description:
          "Der Wunsch nach strafferen und volleren Brüsten kann mit Implantaten erfüllt werden. Eine Brustvergrößerung mit Implantaten wird zur Vergrößerung der Brustgröße oder zur Korrektur von Asymmetrien gewählt.",
        details: { cost: "ab 5.900 €", recovery: "Nach 1 Woche", duration: "Ca. 1 Stunde" },
        indication: [
          "Wunsch nach mehr Volumen oder Definition",
          "Korrektur asymmetrischer Brüste",
          "Wiederaufbau nach Schwangerschaft oder Gewichtsverlust",
        ],
      },
      {
        id: "eigenfett",
        title: "Brustvergrößerung mit Eigenfetttransfer",
        description:
          "Eine sehr natürliche und nachhaltige Möglichkeit, die Brust zu vergrößern, ist die Operation mit körpereigenem Gewebe. Fett aus Bauch und Oberschenkeln eignet sich besonders gut. Neben der Natürlichkeit bietet diese Methode den Vorteil einer simultanen Fettabsaugung.",
        details: { cost: "ab 3.500 €", recovery: "Nach 1 Woche", duration: "Ca. 1 Stunde" },
        indication: [
          "Wunsch nach moderater Vergrößerung ohne Fremdkörper",
          "Spenderareale (Bauch, Oberschenkel) vorhanden",
          "Bevorzugung natürlicher Konturen",
        ],
      },
      {
        id: "bruststraffung",
        title: "Bruststraffung",
        description:
          "Wie der gesamte Körper ist die Brust im Laufe der Zeit Veränderungen unterworfen — beeinflusst durch Hormone, Schwangerschaft, Menopause oder Gewichtsschwankungen. Eine Bruststraffung kann Form und Position bei Brustptosis korrigieren.",
        details: { cost: "ab 6.900 €", recovery: "Nach 1 Woche", duration: "Ca. 2 Stunden" },
        indication: [
          "Erschlaffung nach Schwangerschaft oder Gewichtsverlust",
          "Brustptosis verschiedener Schweregrade",
          "Ergebnis: angehobene, harmonische Form",
        ],
      },
      {
        id: "verkleinerung",
        title: "Brustverkleinerung",
        description:
          "Aufgrund genetischer und hormoneller Faktoren können Brüste erheblich an Volumen und Gewicht zunehmen. Eine Brustverkleinerung kann Gewicht reduzieren und Form sowie Höhe anpassen — oft auch aus medizinischer Indikation.",
        details: { cost: "ab 7.900 €", recovery: "Nach 1 Woche", duration: "2 Stunden" },
        indication: [
          "Rücken- und Nackenschmerzen",
          "Hautirritationen in der Brustfalte",
          "Funktionelle Einschränkung im Alltag",
        ],
      },
      {
        id: "gynaekomastie",
        title: "Gynäkomastie-Operation",
        description:
          "Auch die männliche Brust kann von der gewünschten Form abweichen. Durch die chirurgische Reduktion von Brustdrüse, Fettgewebe und Haut — entweder durch Fettabsaugung, Radiofrequenz-Hautstraffung oder Schnitttechnik — wird die gewünschte Form wiederhergestellt.",
        details: { cost: "ab 3.900 €", recovery: "Nach 3 Tagen", duration: "Ab 1 Stunde" },
        indication: [
          "Vergrößerung der männlichen Brust",
          "Hormonell oder genetisch bedingt",
          "Wunsch nach maskulinerem Brustprofil",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "buttocks" },
      { type: "minimal", key: "biostimulation" },
    ],
  },
  en: {
    eyebrow: "Surgical Procedures",
    title: "Breast",
    tagline: "Sensuality, femininity, aesthetic.",
    heroImage: "/portraits/beratung.jpg",
    heroImageAlt: "Breast surgery — consultation with Dr. Yary",
    intro:
      "The breast is shaped by hormonal changes, pregnancies and genetic factors throughout life. Surgical breast procedures offer correction options — from augmentation through lift to reduction — always with the aim of a natural, harmonious result.",
    subProcedures: [
      {
        id: "implants",
        title: "Breast Augmentation with Implants",
        description:
          "The desire for firmer, fuller breasts can be fulfilled with implants. Breast augmentation with implants is chosen to increase breast size or correct asymmetries.",
        details: { cost: "from €5,900", recovery: "After 1 week", duration: "Approx. 1 hour" },
        indication: [
          "Desire for more volume or definition",
          "Correction of asymmetric breasts",
          "Reconstruction after pregnancy or weight loss",
        ],
      },
      {
        id: "lipofilling",
        title: "Breast Augmentation with Lipofilling",
        description:
          "A very natural and lasting option for breast augmentation uses the body's own tissue. Fat from the abdomen and thighs is particularly suitable. In addition to its natural feel, this method offers the advantage of simultaneous liposuction.",
        details: { cost: "from €3,500", recovery: "After 1 week", duration: "Approx. 1 hour" },
        indication: [
          "Desire for moderate augmentation without foreign body",
          "Adequate donor sites (abdomen, thighs)",
          "Preference for natural contours",
        ],
      },
      {
        id: "lift",
        title: "Breast Lift",
        description:
          "Like the entire body, the breast undergoes changes over time — influenced by hormones, pregnancy, menopause or weight fluctuations. A breast lift can correct shape and position in cases of ptosis.",
        details: { cost: "from €6,900", recovery: "After 1 week", duration: "Approx. 2 hours" },
        indication: [
          "Sagging after pregnancy or weight loss",
          "Breast ptosis of various degrees",
          "Result: lifted, harmonious shape",
        ],
      },
      {
        id: "reduction",
        title: "Breast Reduction",
        description:
          "Due to genetic and hormonal factors, breasts can significantly increase in volume and weight. A breast reduction can reduce weight and adjust shape and height — often a medical indication as well.",
        details: { cost: "from €7,900", recovery: "After 1 week", duration: "2 hours" },
        indication: [
          "Back and neck pain",
          "Skin irritation in the inframammary fold",
          "Functional limitation in daily life",
        ],
      },
      {
        id: "gynecomastia",
        title: "Gynecomastia Surgery",
        description:
          "The male chest can also deviate from the desired form. Through surgical reduction of glandular tissue, fat and skin — by liposuction, radiofrequency skin tightening or excision — the desired contour is restored.",
        details: { cost: "from €3,900", recovery: "After 3 days", duration: "From 1 hour" },
        indication: [
          "Male chest enlargement",
          "Hormonally or genetically caused",
          "Desire for a more masculine chest profile",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "buttocks" },
      { type: "minimal", key: "biostimulation" },
    ],
  },
};

const face: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Operative Eingriffe",
    title: "Gesicht",
    tagline: "Ein klares Gesicht. Erkennbar Sie.",
    heroImage: "/portraits/dr-yary-hero-alt.jpg",
    heroImageAlt: "Gesichtschirurgie — Behandlungsbereich Gesicht bei Dr. Yary",
    intro:
      "Das Gesicht ist die individuellste Region des Körpers. Operative Eingriffe — vom Lifting über Lidkorrekturen bis zur Nasenchirurgie — folgen dem Prinzip: Strukturen anheben, statt Haut zu spannen. Ergebnisse, die natürlich altern.",
    subProcedures: [
      {
        id: "deep-plane-facelift",
        title: "Deep Plane Facelift",
        description:
          "Das Deep-Plane-Facelift ist ein hochwirksames Verfahren zur umfassenden Straffung und Verjüngung des Gesichts. Im Gegensatz zu minimalinvasiven Methoden behandelt es nicht nur die oberflächliche Haut, sondern auch tiefere Gewebeschichten (SMAS), um abgesunkene Strukturen nachhaltig anzuheben.",
        details: { cost: "ab 12.900 €", recovery: "Nach 2–3 Wochen", duration: "Ca. 4–5 Stunden", notes: "Vollnarkose" },
        indication: [
          "Ausgeprägte Hauterschlaffung im Mittel- und Untergesicht",
          "Marionetten- und Nasolabialfalten",
          "Wunsch nach langanhaltendem (10+ Jahre) Ergebnis",
        ],
      },
      {
        id: "oberlid",
        title: "Oberlidstraffung",
        description:
          "Die Oberlidstraffung ist einer der häufigsten chirurgischen Eingriffe weltweit. Auch ohne das gesamte Gesicht zu verändern, lässt sie die Augen frischer und wacher erscheinen.",
        details: { cost: "ab 2.900 €", recovery: "Nach 1 Woche", duration: "Ca. 1 Stunde", notes: "Lokalanästhesie" },
        indication: [
          "Erschlaffung des Oberlides",
          "Müde, schwere Augenpartie",
          "Sichtfeld-Einschränkung in fortgeschrittenen Fällen",
        ],
      },
      {
        id: "unterlid",
        title: "Unterlidstraffung",
        description:
          "Die Unterlidstraffung kann durch einen äußeren Schnitt (klassische Methode) oder einen unsichtbaren inneren Schnitt (transkonjunktivaler Zugang) erfolgen. Die optimale Methode wird in der Beratung festgelegt.",
        details: { cost: "ab 3.500 €", recovery: "Nach 1 Woche", duration: "Ca. 1–2 Stunden" },
        indication: [
          "Tränensäcke und Schatten unter den Augen",
          "Erschlaffte Unterlidhaut",
          "Wunsch nach wachem, ausgeruhtem Blick",
        ],
      },
      {
        id: "bichektomie",
        title: "Entfernung des Wangenfettpolsters (Bichektomie)",
        description:
          "Die Bichektomie reduziert das Bichat'sche Fettpolster der Wange. Bei voluminösem Erwachsenenfett spricht man umgangssprachlich von „Babygesicht“. Die Entfernung kann zu einem schlankeren, definierteren Gesicht beitragen.",
        details: { cost: "ab 2.500 €", recovery: "Nach 3–5 Tagen", duration: "Ca. 45 Minuten" },
        indication: [
          "Wunsch nach definierterer Wangenkontur",
          "Voluminöses Wangenfettpolster",
          "Athletisches, schlankes Gesichtsprofil als Ziel",
        ],
      },
      {
        id: "augenbrauenlift",
        title: "Augenbrauenlift",
        description:
          "Ein Augenbrauenlift hebt die Augenbrauenpartie an, öffnet den Blick und reduziert horizontale Stirnfalten. Es kann offen, endoskopisch oder fadenbasiert durchgeführt werden — abhängig von der individuellen Anatomie.",
        details: { cost: "ab 3.900 €", recovery: "Nach 1 Woche", duration: "Ca. 1–2 Stunden" },
        indication: [
          "Abgesunkene Augenbrauen",
          "Müder Gesichtsausdruck",
          "Asymmetrie der Augenbrauenhöhe",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "botox" },
      { type: "minimal", key: "filler" },
      { type: "minimal", key: "microneedling" },
    ],
  },
  en: {
    eyebrow: "Surgical Procedures",
    title: "Face",
    tagline: "A clear face. Recognisably you.",
    heroImage: "/portraits/dr-yary-hero-alt.jpg",
    heroImageAlt: "Facial surgery — face treatment area with Dr. Yary",
    intro:
      "The face is the most individual region of the body. Surgical procedures — from facelifts through eyelid corrections to nose surgery — follow one principle: lift structures rather than stretch skin. Results that age naturally.",
    subProcedures: [
      {
        id: "deep-plane-facelift",
        title: "Deep Plane Facelift",
        description:
          "The deep-plane facelift is a highly effective procedure for comprehensive lifting and rejuvenation of the face. Unlike minimally invasive methods it treats not only superficial skin but also deeper tissue layers (SMAS) to lift descended structures sustainably.",
        details: { cost: "from €12,900", recovery: "After 2–3 weeks", duration: "Approx. 4–5 hours", notes: "General anaesthesia" },
        indication: [
          "Pronounced skin laxity in the mid- and lower face",
          "Marionette and nasolabial folds",
          "Desire for a long-lasting (10+ year) result",
        ],
      },
      {
        id: "upper-lid",
        title: "Upper Lid Surgery",
        description:
          "Upper lid surgery is one of the most common surgical procedures worldwide. Even without dramatically changing the entire face it makes the eyes appear fresher and more alert.",
        details: { cost: "from €2,900", recovery: "After 1 week", duration: "Approx. 1 hour", notes: "Local anaesthesia" },
        indication: [
          "Sagging of the upper lid",
          "Tired, heavy eye area",
          "Visual field restriction in advanced cases",
        ],
      },
      {
        id: "lower-lid",
        title: "Lower Lid Surgery",
        description:
          "Lower lid surgery can be performed through an external incision (classic method) or an invisible internal incision (transconjunctival approach). The optimal method is determined during consultation.",
        details: { cost: "from €3,500", recovery: "After 1 week", duration: "Approx. 1–2 hours" },
        indication: [
          "Eye bags and shadows under the eyes",
          "Sagging lower lid skin",
          "Desire for a fresh, rested look",
        ],
      },
      {
        id: "bichectomy",
        title: "Buccal Fat Removal (Bichectomy)",
        description:
          "Bichectomy reduces the buccal fat pad. In adults with prominent buccal fat the result is colloquially called \"baby face\". Removal can contribute to a slimmer, more defined facial contour.",
        details: { cost: "from €2,500", recovery: "After 3–5 days", duration: "Approx. 45 minutes" },
        indication: [
          "Desire for more defined cheek contour",
          "Voluminous buccal fat pad",
          "Athletic, slim face profile as goal",
        ],
      },
      {
        id: "brow-lift",
        title: "Brow Lift",
        description:
          "A brow lift raises the eyebrow area, opens the gaze and reduces horizontal forehead lines. It can be performed open, endoscopically or with threads — depending on individual anatomy.",
        details: { cost: "from €3,900", recovery: "After 1 week", duration: "Approx. 1–2 hours" },
        indication: [
          "Descended eyebrows",
          "Tired facial expression",
          "Brow height asymmetry",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "botox" },
      { type: "minimal", key: "filler" },
      { type: "minimal", key: "microneedling" },
    ],
  },
};

const abdomen: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Operative Eingriffe",
    title: "Bauch",
    tagline: "Eine straffe Mitte. Wiedergewonnene Kontur.",
    heroImage: "/portraits/implantat.jpg",
    heroImageAlt: "Bauchchirurgie — Behandlungsbereich Bauch bei Dr. Yary",
    intro:
      "Schwangerschaft, starke Gewichtsabnahme oder genetische Faktoren hinterlassen am Bauch Spuren, die Sport und Pflege oft nicht erreichen. Operative Verfahren wie Abdominoplastik und VASER-Liposuktion stellen die Kontur wieder her — angepasst an Ihre individuelle Anatomie.",
    subProcedures: [
      {
        id: "abdominoplastik",
        title: "Bauchdeckenstraffung (Abdominoplastik)",
        description:
          "Die klassische Bauchdeckenstraffung entfernt überschüssige Haut und Fett, repariert auseinandergewichene Bauchmuskeln und versetzt den Nabel neu. Sie ist die Methode der Wahl nach Schwangerschaft oder massiver Gewichtsabnahme.",
        details: { cost: "ab 8.900 €", recovery: "Nach 2 Wochen", duration: "Ca. 3 Stunden", notes: "Vollnarkose" },
        indication: [
          "Überschüssige Haut nach Schwangerschaft oder Gewichtsverlust",
          "Auseinandergewichene Bauchmuskeln (Rektusdiastase)",
          "Hängender Hautmantel über der Bauchdecke",
        ],
      },
      {
        id: "mini-abdominoplastik",
        title: "Mini-Abdominoplastik",
        description:
          "Eine schonendere Variante für Patientinnen mit Hautüberschuss ausschließlich unterhalb des Nabels. Kürzere Narbe, schnellere Heilung.",
        details: { cost: "ab 5.900 €", recovery: "Nach 1 Woche", duration: "Ca. 1,5 Stunden" },
        indication: [
          "Hautüberschuss nur unterhalb des Nabels",
          "Schwache Indikation für Vollabdominoplastik",
          "Wunsch nach kurzer Narbe",
        ],
      },
      {
        id: "liposuktion",
        title: "VASER Liposuktion Bauch",
        description:
          "Die VASER-Liposuktion löst Fettzellen mit Ultraschall, bevor sie abgesaugt werden. Schonender für umliegendes Gewebe, präzisere Konturierung, kürzere Erholungszeit als bei klassischer Liposuktion.",
        details: { cost: "ab 4.500 €", recovery: "Nach 5–7 Tagen", duration: "Ca. 2 Stunden" },
        indication: [
          "Lokale Fettdepots am Bauch",
          "Definition der Bauchmuskel-Kontur erwünscht",
          "Sport-/Diätresistente Fettpolster",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "legs" },
      { type: "treatment", key: "buttocks" },
      { type: "treatment", key: "arms" },
    ],
  },
  en: {
    eyebrow: "Surgical Procedures",
    title: "Abdomen",
    tagline: "A firm midsection. Restored contour.",
    heroImage: "/portraits/implantat.jpg",
    heroImageAlt: "Abdominal surgery — abdomen treatment area with Dr. Yary",
    intro:
      "Pregnancy, significant weight loss or genetic factors leave traces on the abdomen that exercise and skincare often cannot reach. Surgical procedures such as abdominoplasty and VASER liposuction restore contour — tailored to your individual anatomy.",
    subProcedures: [
      {
        id: "abdominoplasty",
        title: "Tummy Tuck (Abdominoplasty)",
        description:
          "The classic abdominoplasty removes excess skin and fat, repairs separated abdominal muscles and repositions the navel. It is the method of choice after pregnancy or massive weight loss.",
        details: { cost: "from €8,900", recovery: "After 2 weeks", duration: "Approx. 3 hours", notes: "General anaesthesia" },
        indication: [
          "Excess skin after pregnancy or weight loss",
          "Separated abdominal muscles (rectus diastasis)",
          "Hanging skin envelope over the abdominal wall",
        ],
      },
      {
        id: "mini-abdominoplasty",
        title: "Mini Abdominoplasty",
        description:
          "A gentler variant for patients with skin excess only below the navel. Shorter scar, faster healing.",
        details: { cost: "from €5,900", recovery: "After 1 week", duration: "Approx. 1.5 hours" },
        indication: [
          "Skin excess only below the navel",
          "Weak indication for full abdominoplasty",
          "Preference for a short scar",
        ],
      },
      {
        id: "liposuction",
        title: "VASER Abdominal Liposuction",
        description:
          "VASER liposuction loosens fat cells with ultrasound before extraction. Gentler on surrounding tissue, more precise contouring, shorter recovery than classic liposuction.",
        details: { cost: "from €4,500", recovery: "After 5–7 days", duration: "Approx. 2 hours" },
        indication: [
          "Local fat deposits on the abdomen",
          "Definition of abdominal muscle contour desired",
          "Sport-/diet-resistant fat pads",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "legs" },
      { type: "treatment", key: "buttocks" },
      { type: "treatment", key: "arms" },
    ],
  },
};

const legs: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Operative Eingriffe",
    title: "Beine",
    tagline: "Definierte Linien. Leichte Beine.",
    heroImage: "/portraits/implantat.jpg",
    heroImageAlt: "Beinchirurgie — Behandlungsbereich Beine bei Dr. Yary",
    intro:
      "Lipödem, lokale Fettdepots oder Hauterschlaffung an Oberschenkeln und Innenseiten — die Beine reagieren sensibel auf Hormone, Genetik und Gewicht. Differenzierte chirurgische Konzepte schaffen langfristige Kontur und Lebensqualität.",
    subProcedures: [
      {
        id: "vaser-liposuktion",
        title: "VASER Liposuktion Beine",
        description:
          "Ultraschall-gestützte Fettabsaugung an Oberschenkeln, Knien und Waden. Besonders geeignet für Konturierung mit muskulärer Definition.",
        details: { cost: "ab 5.900 €", recovery: "Nach 1 Woche", duration: "Ca. 2–3 Stunden" },
        indication: [
          "Sport-/Diätresistente Fettpolster",
          "Reiterhosen-Areal außen",
          "Innenseiten-Konturierung",
        ],
      },
      {
        id: "lipoedem",
        title: "Lipödem-Chirurgie",
        description:
          "Die Lipödem-Operation ist eine spezialisierte Form der Fettabsaugung mit dem Ziel, krankhaftes Lipödem-Fett zu reduzieren, Schmerzen zu lindern und die Mobilität wiederherzustellen.",
        details: { cost: "ab 7.500 € pro Sitzung", recovery: "Nach 2 Wochen", duration: "Ca. 3–4 Stunden", notes: "Mehrere Sitzungen üblich" },
        indication: [
          "Diagnose Lipödem Stadium I–III",
          "Druckschmerzhaftigkeit der Beine",
          "Erfolglose konservative Therapie (Kompression, Lymphdrainage)",
        ],
      },
      {
        id: "oberschenkelstraffung",
        title: "Oberschenkelstraffung",
        description:
          "Nach massiver Gewichtsabnahme oder altersbedingter Hauterschlaffung. Die Schnittführung (innen vertikal, leistenwärts oder kombiniert) wird nach Hautüberschussmenge gewählt.",
        details: { cost: "ab 7.900 €", recovery: "Nach 2 Wochen", duration: "Ca. 3 Stunden", notes: "Vollnarkose" },
        indication: [
          "Hängender Hautmantel nach Gewichtsverlust",
          "Erschlaffung der Oberschenkelinnenseite",
          "Funktionelle Beeinträchtigung beim Gehen",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "arms" },
      { type: "minimal", key: "microneedling" },
    ],
  },
  en: {
    eyebrow: "Surgical Procedures",
    title: "Legs",
    tagline: "Defined lines. Light legs.",
    heroImage: "/portraits/implantat.jpg",
    heroImageAlt: "Leg surgery — legs treatment area with Dr. Yary",
    intro:
      "Lipedema, local fat deposits or skin laxity on the thighs and inner sides — the legs respond sensitively to hormones, genetics and weight. Differentiated surgical concepts create lasting contour and quality of life.",
    subProcedures: [
      {
        id: "vaser-liposuction",
        title: "VASER Leg Liposuction",
        description:
          "Ultrasound-assisted liposuction of thighs, knees and calves. Particularly suitable for contouring with muscular definition.",
        details: { cost: "from €5,900", recovery: "After 1 week", duration: "Approx. 2–3 hours" },
        indication: [
          "Sport-/diet-resistant fat pads",
          "Outer saddlebag area",
          "Inner thigh contouring",
        ],
      },
      {
        id: "lipedema",
        title: "Lipedema Surgery",
        description:
          "Lipedema surgery is a specialised form of liposuction aimed at reducing pathological lipedema fat, relieving pain and restoring mobility.",
        details: { cost: "from €7,500 per session", recovery: "After 2 weeks", duration: "Approx. 3–4 hours", notes: "Multiple sessions usual" },
        indication: [
          "Diagnosed lipedema stage I–III",
          "Pressure pain in the legs",
          "Failed conservative therapy (compression, lymphatic drainage)",
        ],
      },
      {
        id: "thigh-lift",
        title: "Thigh Lift",
        description:
          "After massive weight loss or age-related skin laxity. The incision (inner vertical, groin or combined) is chosen according to the amount of excess skin.",
        details: { cost: "from €7,900", recovery: "After 2 weeks", duration: "Approx. 3 hours", notes: "General anaesthesia" },
        indication: [
          "Hanging skin envelope after weight loss",
          "Laxity of the inner thigh",
          "Functional impairment when walking",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "arms" },
      { type: "minimal", key: "microneedling" },
    ],
  },
};

const arms: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Operative Eingriffe",
    title: "Arme",
    tagline: "Schlanke Arme. Ungehemmte Bewegung.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Armchirurgie — Behandlungsbereich Arme bei Dr. Yary",
    intro:
      "Die Oberarme zeigen früh Anzeichen von Hauterschlaffung — besonders nach Gewichtsabnahme oder altersbedingt. Liposuktion, Bracioplastik und Hautstraffungs-Konzepte stellen schlanke, definierte Konturen wieder her.",
    subProcedures: [
      {
        id: "armliposuktion",
        title: "VASER Liposuktion Arme",
        description:
          "Ultraschall-gestützte Fettabsaugung der Oberarme. Konturiert die Silhouette des Arms und kann mit Radiofrequenz-Hautstraffung kombiniert werden, um leichte Hauterschlaffung zu adressieren.",
        details: { cost: "ab 3.500 €", recovery: "Nach 5–7 Tagen", duration: "Ca. 1,5–2 Stunden" },
        indication: [
          "Fettdepots am Oberarm",
          "Wunsch nach definierter Armkontur",
          "Leichte Hauterschlaffung (in Kombination)",
        ],
      },
      {
        id: "brachioplastik",
        title: "Oberarmstraffung (Brachioplastik)",
        description:
          "Bei ausgeprägter Hauterschlaffung nach Gewichtsverlust oder altersbedingt entfernt die Brachioplastik überschüssige Haut über einen Schnitt entlang der Arminnenseite. Längere Narbe, definitives Ergebnis.",
        details: { cost: "ab 6.900 €", recovery: "Nach 2 Wochen", duration: "Ca. 2 Stunden", notes: "Lokal- oder Vollnarkose" },
        indication: [
          "Hängender Hautmantel am Oberarm",
          "Nach massiver Gewichtsabnahme",
          "Altersbedingte Hauterschlaffung",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "legs" },
      { type: "minimal", key: "biostimulation" },
    ],
  },
  en: {
    eyebrow: "Surgical Procedures",
    title: "Arms",
    tagline: "Slim arms. Unrestrained movement.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Arm surgery — arms treatment area with Dr. Yary",
    intro:
      "The upper arms show early signs of skin laxity — especially after weight loss or age-related. Liposuction, brachioplasty and skin tightening concepts restore slim, defined contours.",
    subProcedures: [
      {
        id: "arm-liposuction",
        title: "VASER Arm Liposuction",
        description:
          "Ultrasound-assisted liposuction of the upper arms. Contours the silhouette of the arm and can be combined with radiofrequency skin tightening to address mild skin laxity.",
        details: { cost: "from €3,500", recovery: "After 5–7 days", duration: "Approx. 1.5–2 hours" },
        indication: [
          "Fat deposits on the upper arm",
          "Desire for defined arm contour",
          "Mild skin laxity (in combination)",
        ],
      },
      {
        id: "brachioplasty",
        title: "Arm Lift (Brachioplasty)",
        description:
          "For pronounced skin laxity after weight loss or age-related, brachioplasty removes excess skin through an incision along the inside of the arm. Longer scar, definitive result.",
        details: { cost: "from €6,900", recovery: "After 2 weeks", duration: "Approx. 2 hours", notes: "Local or general anaesthesia" },
        indication: [
          "Hanging skin on the upper arm",
          "After massive weight loss",
          "Age-related skin laxity",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "legs" },
      { type: "minimal", key: "biostimulation" },
    ],
  },
};

const buttocks: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Operative Eingriffe",
    title: "Gesäß",
    tagline: "Eine harmonische Silhouette. Aus eigenem Gewebe.",
    heroImage: "/portraits/beratung.jpg",
    heroImageAlt: "Gesäßchirurgie — Behandlungsbereich Gesäß bei Dr. Yary",
    intro:
      "Form und Projektion des Gesäßes prägen die gesamte Körpersilhouette. Dr. Yary arbeitet bevorzugt mit körpereigenem Fett (BBL) — die natürlichste, nachhaltigste Methode zur Konturierung und Volumengabe.",
    subProcedures: [
      {
        id: "bbl",
        title: "Gesäßvergrößerung mit Eigenfetttransfer (BBL)",
        description:
          "Brazilian Butt Lift mit körpereigenem Fett — entnommen über VASER-Liposuktion an Bauch und Taille, aufbereitet und in das Gesäß transplantiert. Ergebnis: harmonische, natürliche Form mit verbessertem Taille-Hüft-Verhältnis.",
        details: { cost: "ab 7.900 €", recovery: "Nach 2 Wochen", duration: "Ca. 3 Stunden", notes: "Vollnarkose; Sitzbeschränkung 2 Wochen" },
        indication: [
          "Wunsch nach mehr Volumen oder Projektion",
          "Spenderareale vorhanden (Bauch, Taille, Rücken)",
          "Bevorzugung körpereigenes Material",
        ],
      },
      {
        id: "lift",
        title: "Gesäßstraffung",
        description:
          "Bei ausgeprägter Hauterschlaffung — etwa nach massivem Gewichtsverlust — kann eine Gesäßstraffung mit Hautresektion und ggf. Eigenfettmodellierung indiziert sein. Komplexer Eingriff mit längerer Heilung, dafür definitives Ergebnis.",
        details: { cost: "ab 9.500 €", recovery: "Nach 2–3 Wochen", duration: "Ca. 3–4 Stunden", notes: "Vollnarkose" },
        indication: [
          "Hängende Gesäßhaut nach Gewichtsverlust",
          "Erschlaffte Glutealfalte",
          "Wunsch nach definitiver Korrektur",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "legs" },
      { type: "treatment", key: "breast" },
    ],
  },
  en: {
    eyebrow: "Surgical Procedures",
    title: "Buttocks",
    tagline: "A harmonious silhouette. From your own tissue.",
    heroImage: "/portraits/beratung.jpg",
    heroImageAlt: "Buttock surgery — buttocks treatment area with Dr. Yary",
    intro:
      "Shape and projection of the buttocks define the entire body silhouette. Dr. Yary preferentially works with autologous fat (BBL) — the most natural, sustainable method for contouring and volumising.",
    subProcedures: [
      {
        id: "bbl",
        title: "Buttock Augmentation with Lipofilling (BBL)",
        description:
          "Brazilian Butt Lift with the body's own fat — harvested via VASER liposuction at the waist and abdomen, processed and transplanted to the buttocks. Result: harmonious, natural shape with improved waist-to-hip ratio.",
        details: { cost: "from €7,900", recovery: "After 2 weeks", duration: "Approx. 3 hours", notes: "General anaesthesia; sitting restriction 2 weeks" },
        indication: [
          "Desire for more volume or projection",
          "Available donor sites (abdomen, waist, back)",
          "Preference for autologous material",
        ],
      },
      {
        id: "lift",
        title: "Buttock Lift",
        description:
          "For pronounced skin laxity — such as after massive weight loss — a buttock lift with skin resection and possibly fat modelling may be indicated. Complex procedure with longer healing but definitive result.",
        details: { cost: "from €9,500", recovery: "After 2–3 weeks", duration: "Approx. 3–4 hours", notes: "General anaesthesia" },
        indication: [
          "Sagging buttock skin after weight loss",
          "Lax gluteal fold",
          "Desire for definitive correction",
        ],
      },
    ],
    related: [
      { type: "treatment", key: "abdomen" },
      { type: "treatment", key: "legs" },
      { type: "treatment", key: "breast" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// MINIMAL-INVASIVE TREATMENTS
// ─────────────────────────────────────────────────────────────

const botox: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Minimal-invasive Verfahren",
    title: "Botox",
    tagline: "Natürliche Verjüngung ohne Operation.",
    heroImage: "/portraits/filler.jpg",
    heroImageAlt: "Botulinumtoxin-Behandlung bei Dr. Yary",
    intro:
      "Die Botulinumtoxin-Behandlung ist eine sichere, schnelle und effektive Methode zur Bekämpfung von Mimikfalten — bei gleichzeitigem Erhalt eines natürlichen Aussehens. Botulinumtoxin entspannt vorübergehend die Gesichtsmuskulatur und ist vollständig reversibel.",
    subProcedures: [
      {
        id: "mimik",
        title: "Mimische Faltenbehandlung",
        description:
          "Horizontale Stirnfalten, vertikale Zornesfalten zwischen den Augenbrauen und Krähenfüße um die Augen — die häufigsten Indikationen für Botulinumtoxin. Behandlungsdauer 15–20 Minuten, sofortige Rückkehr in den Alltag.",
        details: { cost: "ab 200 €", recovery: "Sofortige Rückkehr", duration: "15–20 Minuten", notes: "Wirkung 3–6 Monate" },
        indication: [
          "Horizontale Stirnfalten",
          "Vertikale Linien zwischen den Augenbrauen (Zornesfalten)",
          "Krähenfüße um die Augen",
        ],
      },
      {
        id: "bruxismus",
        title: "Bruxismus (Zähneknirschen)",
        description:
          "Botulinumtoxin in den Kaumuskel (Masseter) entspannt die Muskulatur, reduziert nächtliches Knirschen und kann gleichzeitig die Kieferlinie schmaler erscheinen lassen.",
        details: { cost: "ab 350 €", recovery: "Sofortige Rückkehr", duration: "15 Minuten", notes: "Wirkung 4–6 Monate" },
        indication: [
          "Nächtliches Zähneknirschen",
          "Verspannungsschmerz im Kiefer",
          "Wunsch nach schmalerer Kieferlinie",
        ],
      },
      {
        id: "hyperhidrose",
        title: "Hyperhidrose (übermäßiges Schwitzen)",
        description:
          "Botulinumtoxin blockiert die Schweißdrüsen in Achseln, Handflächen oder Fußsohlen. Eine Behandlung pro Saison ausreichend, signifikante Reduktion des Schwitzens.",
        details: { cost: "ab 450 € pro Areal", recovery: "Sofortige Rückkehr", duration: "30 Minuten", notes: "Wirkung 6–9 Monate" },
        indication: [
          "Übermäßiges axilläres Schwitzen",
          "Schwitzen an Handflächen oder Fußsohlen",
          "Erfolglose topische Therapie",
        ],
      },
      {
        id: "migraene",
        title: "Migräne",
        description:
          "Chronische Migräne kann durch Botulinumtoxin-Injektionen (PREEMPT-Protokoll) reduziert werden. Mehrere Sitzungen, oft begleitend zu neurologischer Therapie.",
        details: { cost: "auf Anfrage", recovery: "Sofortige Rückkehr", duration: "30–45 Minuten" },
        indication: [
          "Chronische Migräne (≥15 Tage/Monat)",
          "Erfolglose orale Migräneprophylaxe",
          "In Abstimmung mit Neurologie",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "filler" },
      { type: "minimal", key: "biostimulation" },
      { type: "treatment", key: "face" },
    ],
  },
  en: {
    eyebrow: "Minimally Invasive Procedures",
    title: "Botox",
    tagline: "Natural rejuvenation without surgery.",
    heroImage: "/portraits/filler.jpg",
    heroImageAlt: "Botulinum toxin treatment with Dr. Yary",
    intro:
      "Botulinum toxin treatment is a safe, fast and effective method to combat expression lines — while preserving a natural look. Botulinum toxin temporarily relaxes facial muscles and is fully reversible.",
    subProcedures: [
      {
        id: "expression-lines",
        title: "Expression Line Treatment",
        description:
          "Horizontal forehead lines, vertical glabellar lines between the eyebrows and crow's feet around the eyes — the most common indications for botulinum toxin. Treatment 15–20 minutes, immediate return to daily activities.",
        details: { cost: "from €200", recovery: "Immediate return", duration: "15–20 minutes", notes: "Effect 3–6 months" },
        indication: [
          "Horizontal forehead lines",
          "Vertical lines between the eyebrows (glabellar lines)",
          "Crow's feet around the eyes",
        ],
      },
      {
        id: "bruxism",
        title: "Bruxism (Teeth Grinding)",
        description:
          "Botulinum toxin in the masseter muscle relaxes the chewing muscle, reduces nocturnal grinding and can make the jawline appear slimmer at the same time.",
        details: { cost: "from €350", recovery: "Immediate return", duration: "15 minutes", notes: "Effect 4–6 months" },
        indication: [
          "Nocturnal teeth grinding",
          "Tension pain in the jaw",
          "Desire for slimmer jawline",
        ],
      },
      {
        id: "hyperhidrosis",
        title: "Hyperhidrosis (Excessive Sweating)",
        description:
          "Botulinum toxin blocks sweat glands in the underarms, palms or soles. One treatment per season suffices, significant reduction of sweating.",
        details: { cost: "from €450 per area", recovery: "Immediate return", duration: "30 minutes", notes: "Effect 6–9 months" },
        indication: [
          "Excessive axillary sweating",
          "Sweating of palms or soles",
          "Failed topical therapy",
        ],
      },
      {
        id: "migraine",
        title: "Migraine",
        description:
          "Chronic migraine can be reduced through botulinum toxin injections (PREEMPT protocol). Multiple sessions, often alongside neurological therapy.",
        details: { cost: "on request", recovery: "Immediate return", duration: "30–45 minutes" },
        indication: [
          "Chronic migraine (≥15 days/month)",
          "Failed oral migraine prophylaxis",
          "In coordination with neurology",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "filler" },
      { type: "minimal", key: "biostimulation" },
      { type: "treatment", key: "face" },
    ],
  },
};

const filler: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Minimal-invasive Verfahren",
    title: "Filler",
    tagline: "Volumen. Kontur. Natürlich.",
    heroImage: "/portraits/filler.jpg",
    heroImageAlt: "Filler-Behandlung mit Hyaluronsäure bei Dr. Yary",
    intro:
      "Hyaluronsäure-Filler stellen verlorenes Volumen wieder her, konturieren Gesichtspartien und glätten statische Falten. Eingesetzt mit Augenmaß und anatomischem Wissen — niemals als pauschale Aufpolsterung.",
    subProcedures: [
      {
        id: "lippen",
        title: "Lippenvergrößerung mit Hyaluronsäure",
        description:
          "Subtile bis ausgeprägte Lippenkonturierung mit Hyaluronsäure. Die individuelle Lippenanatomie steht im Mittelpunkt — Symmetrie, Proportion und natürliche Form sind das Ziel.",
        details: { cost: "ab 350 €", recovery: "Sofortige Rückkehr", duration: "30 Minuten", notes: "Haltbarkeit 9–12 Monate" },
        indication: [
          "Volumenverlust der Lippen",
          "Asymmetrie",
          "Wunsch nach definierterer Lippenkontur",
        ],
      },
      {
        id: "wangen",
        title: "Wangenkonturierung",
        description:
          "Volumenaufbau an den Jochbeinen und Wangenknochen. Hebt das Mittelgesicht, definiert die Wangenkontur und unterstützt das gesamte Gesicht.",
        details: { cost: "ab 450 € pro Seite", recovery: "Sofortige Rückkehr", duration: "30–45 Minuten", notes: "Haltbarkeit 12–18 Monate" },
        indication: [
          "Abgesunkenes Mittelgesicht",
          "Schwach ausgeprägte Wangenknochen",
          "Wunsch nach mehr Definition",
        ],
      },
      {
        id: "kinn",
        title: "Kinn- und Kieferlinien-Konturierung",
        description:
          "Definition von Kinn und Kieferlinie. Besonders bei Männern ein häufiger Wunsch — gibt dem unteren Gesichtsdrittel mehr Struktur und Männlichkeit.",
        details: { cost: "ab 450 €", recovery: "Sofortige Rückkehr", duration: "30–45 Minuten" },
        indication: [
          "Schwach ausgeprägtes Kinn",
          "Wunsch nach scharfer Kieferlinie",
          "Maskuline Gesichts-Architektur als Ziel",
        ],
      },
      {
        id: "nasolabial",
        title: "Faltenkorrektur (Nasolabial, Marionetten)",
        description:
          "Glättung statischer Falten — Nasolabialfalten, Marionettenfalten, Mundwinkel. Hyaluronsäure-Filler unterpolstern die Falte und stellen das Hautniveau wieder her.",
        details: { cost: "ab 350 €", recovery: "Sofortige Rückkehr", duration: "30 Minuten" },
        indication: [
          "Statische Nasolabialfalten",
          "Marionettenfalten",
          "Abgesunkene Mundwinkel",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "botox" },
      { type: "minimal", key: "biostimulation" },
      { type: "treatment", key: "face" },
    ],
  },
  en: {
    eyebrow: "Minimally Invasive Procedures",
    title: "Filler",
    tagline: "Volume. Contour. Natural.",
    heroImage: "/portraits/filler.jpg",
    heroImageAlt: "Hyaluronic acid filler treatment with Dr. Yary",
    intro:
      "Hyaluronic acid fillers restore lost volume, contour facial areas and smooth static lines. Applied with judgement and anatomical knowledge — never as blanket filling.",
    subProcedures: [
      {
        id: "lips",
        title: "Lip Augmentation with Hyaluronic Acid",
        description:
          "Subtle to pronounced lip contouring with hyaluronic acid. Individual lip anatomy is central — symmetry, proportion and natural shape are the goal.",
        details: { cost: "from €350", recovery: "Immediate return", duration: "30 minutes", notes: "Durability 9–12 months" },
        indication: [
          "Loss of lip volume",
          "Asymmetry",
          "Desire for a more defined lip contour",
        ],
      },
      {
        id: "cheeks",
        title: "Cheek Contouring",
        description:
          "Volume restoration on the zygomatic and cheek bones. Lifts the mid-face, defines the cheek contour and supports the entire face.",
        details: { cost: "from €450 per side", recovery: "Immediate return", duration: "30–45 minutes", notes: "Durability 12–18 months" },
        indication: [
          "Descended mid-face",
          "Weakly defined cheekbones",
          "Desire for more definition",
        ],
      },
      {
        id: "chin",
        title: "Chin and Jawline Contouring",
        description:
          "Definition of chin and jawline. Especially with men a frequent wish — gives the lower face third more structure and masculinity.",
        details: { cost: "from €450", recovery: "Immediate return", duration: "30–45 minutes" },
        indication: [
          "Weakly defined chin",
          "Desire for sharp jawline",
          "Masculine face architecture as goal",
        ],
      },
      {
        id: "nasolabial",
        title: "Line Correction (Nasolabial, Marionette)",
        description:
          "Smoothing of static lines — nasolabial folds, marionette lines, mouth corners. Hyaluronic acid fillers cushion the fold and restore skin level.",
        details: { cost: "from €350", recovery: "Immediate return", duration: "30 minutes" },
        indication: [
          "Static nasolabial folds",
          "Marionette lines",
          "Dropped mouth corners",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "botox" },
      { type: "minimal", key: "biostimulation" },
      { type: "treatment", key: "face" },
    ],
  },
};

const biostimulation: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Minimal-invasive Verfahren",
    title: "Biostimulation",
    tagline: "Kollagen-Stimulation. Langfristig. Natürlich.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Biostimulator-Behandlung bei Dr. Yary",
    intro:
      "Biostimulatoren (Sculptra, Radiesse, Profhilo) regen die körpereigene Kollagen- und Elastinproduktion an. Anders als Volumen-Filler arbeiten sie an der Hautqualität selbst — für ein langfristiges, natürliches Ergebnis.",
    subProcedures: [
      {
        id: "sculptra",
        title: "Sculptra (Poly-L-Milchsäure)",
        description:
          "Sculptra wirkt über mehrere Monate, indem es die Kollagenproduktion stimuliert. Ideal für umfangreiche Volumenwiederherstellung im Gesicht, Dekolleté oder Gesäß.",
        details: { cost: "ab 600 € pro Sitzung", recovery: "Sofortige Rückkehr", duration: "45–60 Minuten", notes: "Mehrere Sitzungen üblich, Ergebnis 2–3 Jahre" },
        indication: [
          "Umfangreicher Volumenverlust",
          "Wangen, Schläfen, Dekolleté",
          "Wunsch nach langfristigem Ergebnis",
        ],
      },
      {
        id: "radiesse",
        title: "Radiesse (Calciumhydroxylapatit)",
        description:
          "Sofortiger Volumeneffekt kombiniert mit langfristiger Kollagen-Stimulation. Besonders geeignet für Kieferlinie, Hände und Konturierung.",
        details: { cost: "ab 550 €", recovery: "Sofortige Rückkehr", duration: "30–45 Minuten", notes: "Ergebnis 12–18 Monate" },
        indication: [
          "Konturierung Kieferlinie",
          "Hand-Verjüngung",
          "Mittelgesicht-Anhebung",
        ],
      },
      {
        id: "profhilo",
        title: "Profhilo (Hyaluronsäure-Biostimulator)",
        description:
          "Stabilisierte hochmolekulare Hyaluronsäure, die sich gleichmäßig im Gewebe verteilt und Hautqualität, Elastizität und Hydratation verbessert.",
        details: { cost: "ab 380 € pro Sitzung", recovery: "Sofortige Rückkehr", duration: "30 Minuten", notes: "2 Sitzungen, 4 Wochen Abstand" },
        indication: [
          "Schlaffer Hautton",
          "Verlust an Hautelastizität",
          "Gesicht, Hals, Dekolleté",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "filler" },
      { type: "minimal", key: "microneedling" },
      { type: "minimal", key: "prp" },
    ],
  },
  en: {
    eyebrow: "Minimally Invasive Procedures",
    title: "Biostimulants",
    tagline: "Collagen stimulation. Lasting. Natural.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Biostimulant treatment with Dr. Yary",
    intro:
      "Biostimulants (Sculptra, Radiesse, Profhilo) stimulate the body's own collagen and elastin production. Unlike volume fillers they work on the skin quality itself — for a lasting, natural result.",
    subProcedures: [
      {
        id: "sculptra",
        title: "Sculptra (Poly-L-Lactic Acid)",
        description:
          "Sculptra works over several months by stimulating collagen production. Ideal for extensive volume restoration in the face, décolleté or buttocks.",
        details: { cost: "from €600 per session", recovery: "Immediate return", duration: "45–60 minutes", notes: "Multiple sessions usual, result 2–3 years" },
        indication: [
          "Extensive volume loss",
          "Cheeks, temples, décolleté",
          "Desire for a long-lasting result",
        ],
      },
      {
        id: "radiesse",
        title: "Radiesse (Calcium Hydroxylapatite)",
        description:
          "Immediate volume effect combined with long-term collagen stimulation. Particularly suitable for jawline, hands and contouring.",
        details: { cost: "from €550", recovery: "Immediate return", duration: "30–45 minutes", notes: "Result 12–18 months" },
        indication: [
          "Jawline contouring",
          "Hand rejuvenation",
          "Mid-face lifting",
        ],
      },
      {
        id: "profhilo",
        title: "Profhilo (Hyaluronic Acid Biostimulant)",
        description:
          "Stabilised high-molecular hyaluronic acid that spreads evenly in the tissue and improves skin quality, elasticity and hydration.",
        details: { cost: "from €380 per session", recovery: "Immediate return", duration: "30 minutes", notes: "2 sessions, 4 weeks apart" },
        indication: [
          "Lax skin tone",
          "Loss of skin elasticity",
          "Face, neck, décolleté",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "filler" },
      { type: "minimal", key: "microneedling" },
      { type: "minimal", key: "prp" },
    ],
  },
};

const laser: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Minimal-invasive Verfahren",
    title: "Laserbehandlung",
    tagline: "Präzise Verjüngung. Auf Zellebene.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Laserbehandlung bei Dr. Yary",
    intro:
      "CO2-Laser, fraktioniert oder ablativ — die Laserbehandlung adressiert Pigmentstörungen, feine Falten, Aknenarben und Hauttexturprobleme. Präzise, regulierbar, mit messbarer Erneuerung der Hautstruktur.",
    subProcedures: [
      {
        id: "co2-laser",
        title: "CO2-Laser Hautverjüngung",
        description:
          "Fraktionierter CO2-Laser entfernt mikroskopisch kleine Hautsäulen und stimuliert eine umfassende Erneuerung. Behandlung von Falten, Aknenarben, Pigmentflecken und Texturproblemen.",
        details: { cost: "ab 800 € pro Sitzung", recovery: "5–7 Tage Downtime", duration: "60 Minuten", notes: "Lokalanästhesie / Topisch" },
        indication: [
          "Statische Falten",
          "Aknenarben",
          "Pigmentstörungen, Sonnenschäden",
        ],
      },
      {
        id: "pigment",
        title: "Pigment-Laser",
        description:
          "Q-switched oder Picosekunden-Laser für Pigmentflecken, Altersflecken, Melasma und Tattoo-Entfernung. Sehr präzise, schonend für umliegendes Gewebe.",
        details: { cost: "ab 250 € pro Sitzung", recovery: "Sofortige Rückkehr", duration: "30 Minuten" },
        indication: [
          "Altersflecken",
          "Sonnenflecken",
          "Tattoo-Entfernung",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "microneedling" },
      { type: "minimal", key: "biostimulation" },
      { type: "minimal", key: "prp" },
    ],
  },
  en: {
    eyebrow: "Minimally Invasive Procedures",
    title: "Laser Treatment",
    tagline: "Precise rejuvenation. At cellular level.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Laser treatment with Dr. Yary",
    intro:
      "CO2 laser, fractional or ablative — laser treatment addresses pigmentation, fine lines, acne scars and skin texture issues. Precise, adjustable, with measurable skin renewal.",
    subProcedures: [
      {
        id: "co2-laser",
        title: "CO2 Laser Skin Rejuvenation",
        description:
          "Fractional CO2 laser removes microscopically small skin columns and stimulates comprehensive renewal. Treatment of wrinkles, acne scars, pigment spots and texture issues.",
        details: { cost: "from €800 per session", recovery: "5–7 days downtime", duration: "60 minutes", notes: "Local / topical anaesthesia" },
        indication: [
          "Static wrinkles",
          "Acne scars",
          "Pigmentation, sun damage",
        ],
      },
      {
        id: "pigment",
        title: "Pigment Laser",
        description:
          "Q-switched or picosecond laser for pigment spots, age spots, melasma and tattoo removal. Very precise, gentle on surrounding tissue.",
        details: { cost: "from €250 per session", recovery: "Immediate return", duration: "30 minutes" },
        indication: [
          "Age spots",
          "Sun spots",
          "Tattoo removal",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "microneedling" },
      { type: "minimal", key: "biostimulation" },
      { type: "minimal", key: "prp" },
    ],
  },
};

const prp: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Minimal-invasive Verfahren",
    title: "Plättchenreiches Plasma (PRP)",
    tagline: "Regeneration mit Ihrem eigenen Blut.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "PRP-Behandlung bei Dr. Yary",
    intro:
      "Plättchenreiches Plasma (PRP) wird aus Ihrem eigenen Blut gewonnen. Die konzentrierten Wachstumsfaktoren regen Zellregeneration, Kollagenproduktion und Mikrozirkulation an — vollständig autologe Therapie.",
    subProcedures: [
      {
        id: "haut",
        title: "PRP Hautverjüngung",
        description:
          "Injektion von PRP in die Gesichtshaut. Reduziert feine Falten, verbessert Hautstruktur, Glanz und Spannkraft. Besonders um die Augen und am Hals wirksam.",
        details: { cost: "ab 450 € pro Sitzung", recovery: "Sofortige Rückkehr", duration: "60 Minuten", notes: "3 Sitzungen empfohlen" },
        indication: [
          "Müde Hautstruktur",
          "Feine Falten",
          "Verlust an Hauttonus",
        ],
      },
      {
        id: "haare",
        title: "PRP Haartherapie",
        description:
          "Injektion von PRP in die Kopfhaut. Stimuliert die Haarfollikel, kann hereditäre Alopezie verlangsamen und Haardichte verbessern. Mehrere Sitzungen erforderlich.",
        details: { cost: "ab 380 € pro Sitzung", recovery: "Sofortige Rückkehr", duration: "60 Minuten", notes: "4–6 Sitzungen, dann Erhaltungstherapie" },
        indication: [
          "Beginnende Alopezie",
          "Schütteres Haar",
          "Postpartaler Haarausfall",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "biostimulation" },
      { type: "minimal", key: "microneedling" },
      { type: "minimal", key: "laser" },
    ],
  },
  en: {
    eyebrow: "Minimally Invasive Procedures",
    title: "Platelet-Rich Plasma (PRP)",
    tagline: "Regeneration with your own blood.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "PRP treatment with Dr. Yary",
    intro:
      "Platelet-rich plasma (PRP) is obtained from your own blood. The concentrated growth factors stimulate cell regeneration, collagen production and microcirculation — fully autologous therapy.",
    subProcedures: [
      {
        id: "skin",
        title: "PRP Skin Rejuvenation",
        description:
          "Injection of PRP into the facial skin. Reduces fine lines, improves skin structure, radiance and firmness. Particularly effective around the eyes and on the neck.",
        details: { cost: "from €450 per session", recovery: "Immediate return", duration: "60 minutes", notes: "3 sessions recommended" },
        indication: [
          "Tired skin structure",
          "Fine lines",
          "Loss of skin tone",
        ],
      },
      {
        id: "hair",
        title: "PRP Hair Therapy",
        description:
          "Injection of PRP into the scalp. Stimulates hair follicles, can slow hereditary alopecia and improve hair density. Multiple sessions required.",
        details: { cost: "from €380 per session", recovery: "Immediate return", duration: "60 minutes", notes: "4–6 sessions, then maintenance" },
        indication: [
          "Early alopecia",
          "Thinning hair",
          "Postpartum hair loss",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "biostimulation" },
      { type: "minimal", key: "microneedling" },
      { type: "minimal", key: "laser" },
    ],
  },
};

const microneedling: Record<Locale, TreatmentContent> = {
  de: {
    eyebrow: "Minimal-invasive Verfahren",
    title: "Radiofrequenz-Microneedling",
    tagline: "Hautstraffung. Ohne Skalpell.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Radiofrequenz-Microneedling (Morpheus8) bei Dr. Yary",
    intro:
      "Radiofrequenz-Microneedling (Morpheus8) kombiniert mechanische Stimulation feinster Nadeln mit thermischer Energie aus Radiofrequenz. Das Ergebnis: messbare Hautstraffung, Kollagen-Neubildung und Konturverbesserung — ohne Skalpell.",
    subProcedures: [
      {
        id: "gesicht",
        title: "Morpheus8 Gesicht",
        description:
          "Behandlung von Gesicht, Hals und Dekolleté. Reduziert feine Falten, strafft die Haut und kann tiefere Strukturen wie das SMAS erreichen. Drei Sitzungen im Abstand von 4–6 Wochen.",
        details: { cost: "ab 750 € pro Sitzung", recovery: "2–3 Tage Rötung", duration: "60–75 Minuten", notes: "Topische Anästhesie" },
        indication: [
          "Beginnende Hauterschlaffung",
          "Mittelgesicht und Kieferlinie",
          "Hals und Dekolleté",
        ],
      },
      {
        id: "koerper",
        title: "Morpheus8 Body",
        description:
          "Größere Behandlungsköpfe (Morpheus8 Body) erlauben effiziente Behandlung von Bauch, Oberarmen, Innenschenkeln oder Knien. Hautstraffung nach Liposuktion oder Gewichtsabnahme.",
        details: { cost: "ab 950 € pro Sitzung", recovery: "2–3 Tage Rötung", duration: "75–90 Minuten" },
        indication: [
          "Hautstraffung nach Gewichtsabnahme",
          "Adjuvant nach Liposuktion",
          "Bauch, Arme, Innenschenkel",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "biostimulation" },
      { type: "minimal", key: "laser" },
      { type: "minimal", key: "prp" },
    ],
  },
  en: {
    eyebrow: "Minimally Invasive Procedures",
    title: "Radiofrequency Microneedling",
    tagline: "Skin tightening. Without a scalpel.",
    heroImage: "/portraits/morpheus.jpg",
    heroImageAlt: "Radiofrequency microneedling (Morpheus8) with Dr. Yary",
    intro:
      "Radiofrequency microneedling (Morpheus8) combines the mechanical stimulation of fine needles with thermal energy from radiofrequency. The result: measurable skin tightening, collagen neogenesis and contour improvement — without a scalpel.",
    subProcedures: [
      {
        id: "face",
        title: "Morpheus8 Face",
        description:
          "Treatment of face, neck and décolleté. Reduces fine lines, tightens the skin and can reach deeper structures such as the SMAS. Three sessions 4–6 weeks apart.",
        details: { cost: "from €750 per session", recovery: "2–3 days redness", duration: "60–75 minutes", notes: "Topical anaesthesia" },
        indication: [
          "Early skin laxity",
          "Mid-face and jawline",
          "Neck and décolleté",
        ],
      },
      {
        id: "body",
        title: "Morpheus8 Body",
        description:
          "Larger treatment tips (Morpheus8 Body) allow efficient treatment of abdomen, upper arms, inner thighs or knees. Skin tightening after liposuction or weight loss.",
        details: { cost: "from €950 per session", recovery: "2–3 days redness", duration: "75–90 minutes" },
        indication: [
          "Skin tightening after weight loss",
          "Adjuvant after liposuction",
          "Abdomen, arms, inner thighs",
        ],
      },
    ],
    related: [
      { type: "minimal", key: "biostimulation" },
      { type: "minimal", key: "laser" },
      { type: "minimal", key: "prp" },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Registries + accessor
// ─────────────────────────────────────────────────────────────

export const treatmentContent: Record<TreatmentSlug, Record<Locale, TreatmentContent>> = {
  breast,
  face,
  abdomen,
  legs,
  arms,
  buttocks,
};

export const minimalInvasiveContent: Record<MinimalInvasiveSlug, Record<Locale, TreatmentContent>> = {
  botox,
  filler,
  biostimulation,
  laser,
  prp,
  microneedling,
};

export type TreatmentCategory = "treatment" | "minimal";

export function getTreatmentContent(
  category: TreatmentCategory,
  slug: TreatmentSlug | MinimalInvasiveSlug,
  locale: Locale,
): TreatmentContent {
  if (category === "treatment") {
    return treatmentContent[slug as TreatmentSlug][locale];
  }
  return minimalInvasiveContent[slug as MinimalInvasiveSlug][locale];
}

/** Compact card-friendly meta used by carousels/related lists. */
export function getTreatmentCard(
  category: TreatmentCategory,
  slug: TreatmentSlug | MinimalInvasiveSlug,
  locale: Locale,
): { title: string; tagline: string; image: string; alt: string } {
  const c = getTreatmentContent(category, slug, locale);
  return {
    title: c.title,
    tagline: c.tagline,
    image: c.heroImage,
    alt: c.heroImageAlt,
  };
}
