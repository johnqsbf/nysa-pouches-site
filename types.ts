export interface NavItem {
  label: string;
  id: string;
  subLabel?: string;
}

export interface Product {
  id: number;
  name: string;
  category: 'Mint' | 'Fruit' | 'Other';
  description: string;
  image: string;
  accentColor: string;
}

export interface Persona {
  title: string;
  description: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
}