-- Subset drug seed matching the current schema.
-- Production formularies should import from an authoritative source
-- (RxNorm, First Databank, etc.). This file is for local dev / demo.

WITH cat AS (SELECT id, code FROM drug_categories)
INSERT INTO drugs (slug, name, generic_name, brand_names, category_id,
                   default_route, routes, concentration, mechanism,
                   indications, contraindications, warnings, interactions, monitoring, references_)
VALUES
('propofol','Propofol','propofol','{Diprivan}',(SELECT id FROM cat WHERE code='anesthetic'),
  'IV','{IV}','10 mg/mL','GABA-A agonist; reduces consciousness.',
  '{Induction of anesthesia,Maintenance of anesthesia,ICU sedation}',
  '{Egg/soy allergy,Severe hypotension}',
  '{Hypotension and apnea common,Risk of PRIS at high prolonged dose}',
  '{Opioids,Benzodiazepines,Antihypertensives}',
  '{BP,HR,SpO2,Capnography}',
  '{UpToDate,Lexicomp,ASA Guidelines}'),
('fentanyl','Fentanyl','fentanyl citrate','{Sublimaze}',(SELECT id FROM cat WHERE code='analgesic'),
  'IV','{IV,IM,Epidural,Intrathecal}','50 mcg/mL','Mu-opioid agonist.',
  '{Intraoperative analgesia,Procedural sedation}',
  '{Severe respiratory depression,MAOIs within 14 days}',
  '{Respiratory depression,Chest wall rigidity with rapid bolus}',
  '{MAOIs,Benzodiazepines,CYP3A4 inhibitors}',
  '{RR,SpO2,Pain score,Sedation level}',
  '{UpToDate,Lexicomp}'),
('rocuronium','Rocuronium','rocuronium bromide','{Zemuron}',(SELECT id FROM cat WHERE code='nmb'),
  'IV','{IV}','10 mg/mL','Non-depolarizing NMB.',
  '{Rapid sequence intubation,Surgical relaxation}',
  '{Hypersensitivity}',
  '{Ensure ability to ventilate before paralysis,Prolonged duration in liver disease}',
  '{Aminoglycosides,Magnesium,Inhaled anesthetics}',
  '{Train-of-four,Capnography,BP,HR}',
  '{UpToDate,Lexicomp}'),
('vancomycin','Vancomycin','vancomycin hydrochloride','{Vancocin}',(SELECT id FROM cat WHERE code='antibiotic'),
  'IV','{IV,PO}','5 mg/mL','Inhibits cell wall synthesis.',
  '{MRSA,Severe gram-positive infection}',
  '{Hypersensitivity}',
  '{Vancomycin infusion reaction,Nephrotoxicity}',
  '{Aminoglycosides,Nephrotoxic agents}',
  '{Trough,SCr,AUC24}',
  '{IDSA MRSA Guidelines,UpToDate}'),
('epinephrine','Epinephrine','epinephrine','{Adrenalin}',(SELECT id FROM cat WHERE code='vasopressor'),
  'IV','{IV,IM,SC,Inhaled}','1 mg/mL','Alpha/beta adrenergic agonist.',
  '{Anaphylaxis,Cardiac arrest,Septic shock}',
  '{Hypersensitivity (relative)}',
  '{Arrhythmia risk,Severe hypertension at high doses}',
  '{Beta-blockers,MAOIs,TCAs}',
  '{ECG,BP,Urine output}',
  '{ACLS Guidelines,UpToDate}')
ON CONFLICT (slug) DO NOTHING;

-- Sample dose formulas
INSERT INTO dose_formulas (drug_id, audience, basis, min_value, max_value, unit, max_single, hepatic_reduction)
SELECT id, 'adult', 'weight', 1.5, 2.5, 'mg/kg', 250, 0.20 FROM drugs WHERE slug = 'propofol'
ON CONFLICT (drug_id, audience, basis) DO NOTHING;

INSERT INTO dose_formulas (drug_id, audience, basis, min_value, max_value, unit, max_single, hepatic_reduction)
SELECT id, 'pediatric', 'weight', 2.5, 3.5, 'mg/kg', 250, 0.20 FROM drugs WHERE slug = 'propofol'
ON CONFLICT (drug_id, audience, basis) DO NOTHING;

INSERT INTO dose_formulas (drug_id, audience, basis, min_value, max_value, unit, max_single, renal_threshold, renal_reduction)
SELECT id, 'adult', 'weight', 15, 20, 'mg/kg', 2000, 50, 0.50 FROM drugs WHERE slug = 'vancomycin'
ON CONFLICT (drug_id, audience, basis) DO NOTHING;
