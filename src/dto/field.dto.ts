export interface Field {
  label: string;
  body: string[];
}

export interface TechNote {
  id: string;
  title: string;
  fields: Field[];
}

export interface LabelValue {
  label: string;
  value: string;
}
