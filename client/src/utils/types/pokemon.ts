export interface Pokemon {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level: number;
  hp: number;
  types: string[];

  abilities?: Abilities[];
  attacks: Attacks[];
  weaknesses: Weaknesses[];
  resistances?: Resistances[];

  images: Images;
}

interface Abilities {
  name: string;
  text: string;
  type: string;
}

interface Attacks {
  convertedEnergyCost: number;
  cost: string[];
  damage: string;
  name: string;
  text: string;
}

interface Weaknesses {
  type: string;
  value: string;
}

interface Resistances {
  type: string;
  value: string;
}

interface Images {
  small: string;
  large: string;
}
