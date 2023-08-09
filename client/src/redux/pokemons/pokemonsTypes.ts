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
  retreatCost: string[];
  set: Set;

  convertedRetreatCost: number;
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers: number[];

  legalities: Legalities;
  images: Images;
  tcgplayer: Tcgplayer;
  cardmarket: Cardmarket;
}

export interface PokemonsApiResponse {
  count: number;
  data: Pokemon[] | [];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface PokemonsState {
  error: any;
  loading: boolean;
  page?: number;
  pokemons?: Pokemon[];
  selectedPokemon?: Pokemon;
  totalCount?: number;
}

export interface Abilities {
  name: string;
  text: string;
  type: string;
}

export interface Attacks {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Weaknesses {
  type: string;
  value: string;
}

export interface Resistances {
  type: string;
  value: string;
}

interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

interface Legalities {
  unlimited: string;
}

interface Images {
  small: string;
  large: string;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: {
    holofoil?: {
      low: number;
      mid: number;
      high: number;
      market: number;
    };
    reveseHolofoil?: {
      low: number;
      mid: number;
      high: number;
      market: number;
      directLow: number;
    };
  };
}

export interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number;
    lowPrice: number;
    trendPrice: number;
    reverseHoloLow: number;
    reverseHoloTrend: number;
    lowPriceExPlus: number;
    avg1: number;
    avg7: number;
    avg30: number;
    reverseHoloAvg1: number;
    reverseHoloAvg7: number;
    reverseHoloAvg30: number;
  };
}
