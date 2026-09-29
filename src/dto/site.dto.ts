export interface Contact {
  email: string;
  github: string;
}

export interface YearRange {
  label: string;
  years: string;
}

export interface Site {
  name: string;
  role: string;
  disciplines: string;
  range: YearRange;
  contact: Contact;
  visualsNote: string;
  visualsNoteKo: string;
}

export interface ExperienceItem {
  name: string;
  scope: string;
}

export interface ExperienceYear {
  year: string;
  items: ExperienceItem[];
}
