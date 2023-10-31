export type HealthCheckResponse = {
  status: "ok";
};

export type ClimateResponse = {
  HDD65: number;
  CDD65: number;
  stats: { day: string; temp: number }[];
};

export type Coordinates = { lat: number; lng: number };

export type GeocodeItem = {
  id: string;
  formatted: string;
  lat: number;
  lng: number;
};

export type GeocodeResponse = GeocodeItem[];

export const TYPEHUQ = {
  MOBILE_HOME: "1",
  SINGLE_FAMILY_DETACHED: "2",
  SINGLE_FAMILY_ATTACHED: "3",
  APARTMENT_SMALL: "4",
  APARTMENT_LARGE: "5",
} as const;

export const STORIES = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR_OR_MORE: "4",
  SPLIT: "5",
} as const;

export const SIZEOFGARAGE = {
  ONE_CAR: "1",
  TWO_CAR: "2",
  THREE_OR_MORE_CAR: "3",
} as const;

export const YEARMADERANGE = {
  BEFORE_1950: "1",
  FROM_1950_TO_1959: "2",
  FROM_1960_TO_1969: "3",
  FROM_1970_TO_1979: "4",
  FROM_1980_TO_1989: "5",
  FROM_1990_TO_1999: "6",
  FROM_2000_TO_2009: "7",
  FROM_2010_TO_2015: "8",
  FROM_2016_TO_PRESENT: "9",
} as const;

export const WALLTYPE = {
  BRICK: "1",
  WOOD: "2",
  SIDING: "3",
  STUCCO: "4",
  SHINGLE: "5",
  STONE: "6",
  CONCRETE: "7",
  OTHER: "8",
} as const;

export const ROOFTYPE = {
  CERAMIC_OR_CLAY_TILE: "1",
  WOOD_SHINGLES: "2",
  METAL: "3",
  SLATE_OR_SYNTHETIC_SLATE: "4",
  ASPHALT_SHINGLES: "5",
  CONCRETE_TILE: "6",
  OTHER: "99",
} as const;

export const TYPEGLASS = {
  SINGLE_PANE: "1",
  DOUBLE_PANE: "2",
  TRIPLE_PANE: "3",
} as const;

export const ADQINSUL = {
  WELL_INSULATED: "1",
  ADEQUATELY_INSULATED: "2",
  POORLY_INSULATED: "3",
  NOT_INSULATED: "4",
} as const;

export const FUELPOOL = {
  NONE: "0",
  NATURAL_GAS: "1",
  PROPANE: "2",
  FUEL_OIL: "3",
  ELECTRICITY: "5",
  OTHER: "99",
} as const;

export const FUELTUB = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  FUEL_OIL: "3",
  ELECTRICITY: "5",
  OTHER: "99",
} as const;

export const TYPERFR1 = {
  ONE_DOOR: "1",
  TWO_DOOR_FREEZER_SIDE: "2",
  TWO_DOOR_FREEZER_TOP: "3",
  TWO_DOOR_FREEZER_BOTTOM: "4",
  THREE_OR_MORE_DOORS: "5",
} as const;

export const TYPERFR2 = TYPERFR1;

export const LOCRFRI2 = {
  BASEMENT: "1",
  GARAGE: "2",
  OUTSIDE: "3",
  MAIN_LIVING_AREA: "4",
  OTHER: "99",
} as const;

export const UPRTFRZR = {
  UPRIGHT: "1",
  CHEST: "2",
} as const;

export const RANGEFUEL = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  ELECTRICITY: "5",
  DUAL_FUEL: "13",
} as const;

export const COOKTOPFUEL = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  ELECTRICITY: "5",
} as const;

export const OVENFUEL = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  ELECTRICITY: "5",
} as const;

export const OUTGRILLFUEL = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  CHARCOAL: "23",
} as const;

export const DWCYCLE = {
  NORMAL_WITHOUT_HEAT_DRY: "1",
  NORMAL_WITH_HEAT_DRY: "2",
  HEAVY_POTS_AND_PANS: "3",
  LIGHT_DELICATE: "4",
  ENERGY_SAVER: "5",
  QUICK: "6",
} as const;

export const TOPFRONT = {
  TOP_LOADING: "1",
  FRONT_LOADING: "2",
} as const;

export const WASHTEMP = {
  HOT: "1",
  WARM: "2",
  COLD: "3",
} as const;

export const DRYRFUEL = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  ELECTRICITY: "5",
} as const;

export const EQUIPM = {
  STEAM: "2",
  CENTRAL_FURNACE: "3",
  CENTRAL_PUMP: "4",
  BUILT_IN_ELECTRIC_UNITS: "5",
  BUILT_IN_GAS_OR_OIL_UNITS: "7",
  WOOD_STOVE: "8",
  PORTABLE_ELECTRIC_HEATERS: "10",
  DUCTLESS_HEAT_PUMP: "13",
  OTHER: "99",
} as const;

export const FUELHEAT = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  FUEL_OIL: "3",
  ELECTRICITY: "5",
  WOOD: "7",
  OTHER: "99",
} as const;

export const EQUIPAUXTYPE = {
  NONE: "0",
  BUILT_IN_ELECTRIC_UNITS: "5",
  WOOD_STOVE: "8",
  FIREPLACE: "9",
  PORTABLE_ELECTRIC_HEATERS: "10",
  DUCTLESS_MINI_SPLIT: "13",
  OTHER: "99",
} as const;

export const FUELAUX = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  FUEL_OIL: "3",
  ELECTRICITY: "5",
  WOOD: "7",
  OTHER: "99",
} as const;

export const HUMIDTYPE = {
  NONE: "0",
  PORTABLE_HUMIDIFIER: "1",
  WHOLE_HOUSE_HUMIDIFIER: "2",
} as const;

export const ACEQUIPM_PUB = {
  CENTRAL_AIR_CONDITIONER: "1",
  DUCTLESS_MINI_SPLIT: "3",
  ROOM_AIR_CONDITIONER: "4",
  PORTABLE_AIR_CONDITIONER: "5",
  EVAPORATIVE_COOLER: "6",
} as const;

export const ACEQUIPAUXTYPE_PUB = {
  NONE: "0",
  CENTRAL_AIR_CONDITIONER: "1",
  DUCTLESS_MINI_SPLIT: "3",
  ROOM_AIR_CONDITIONER: "4",
  PORTABLE_AIR_CONDITIONER: "5",
  EVAPORATIVE_COOLER: "6",
} as const;

export const DEHUMTYPE = {
  NONE: "0",
  PORTABLE_DEHUMIDIFIER: "1",
  WHOLE_HOUSE_DEHUMIDIFIER: "2",
} as const;

export const TYPETHERM = {
  NONE: "0",
  MANUAL: "1",
  PROGRAMMABLE: "2",
  SMART: "3",
} as const;

export const HEATCNTL = {
  SET_AND_LEAVE_IT: "1",
  MANUALLY_ADJUST: "2",
  PROGRAMMABLE: "3",
  TURN_ON_AND_OFF_AS_NEEDED: "4",
  NO_CONTROL: "5",
  OTHER: "99",
} as const;

export const COOLCNTL = HEATCNTL;

export const WHEATSIZ = {
  SMALL: "1",
  MEDIUM: "2",
  LARGE: "3",
  TANKLESS: "4",
} as const;

export const FUELH2O = {
  NATURAL_GAS: "1",
  PROPANE: "2",
  FUEL_OIL: "3",
  ELECTRICITY: "5",
  WOOD: "7",
  SOLAR: "8",
  OTHER: "99",
} as const;

export const FUELH2O2 = FUELH2O;

export type PredictBody = {
  HDD65?: number;
  CDD65?: number;
  TYPEHUQ: (typeof TYPEHUQ)[keyof typeof TYPEHUQ];
  CELLAR?: boolean;
  BASEFIN?: boolean;
  ATTIC?: boolean;
  ATTICFIN?: boolean;
  STORIES?: (typeof STORIES)[keyof typeof STORIES];
  SIZEOFGARAGE?: (typeof SIZEOFGARAGE)[keyof typeof SIZEOFGARAGE];
  YEARMADERANGE: (typeof YEARMADERANGE)[keyof typeof YEARMADERANGE];
  BEDROOMS: number;
  NCOMBATH: number;
  NHAFBATH: number;
  WALLTYPE: (typeof WALLTYPE)[keyof typeof WALLTYPE];
  ROOFTYPE?: (typeof ROOFTYPE)[keyof typeof ROOFTYPE];
  HIGHCEIL?: boolean;
  TYPEGLASS: (typeof TYPEGLASS)[keyof typeof TYPEGLASS];
  TREESHAD: boolean;
  ADQINSUL: (typeof ADQINSUL)[keyof typeof ADQINSUL];
  FUELPOOL?: (typeof FUELPOOL)[keyof typeof FUELPOOL];
  FUELTUB?: (typeof FUELTUB)[keyof typeof FUELTUB];
  NUMFRIG: number;
  TYPERFR1?: (typeof TYPERFR1)[keyof typeof TYPERFR1];
  ICE?: boolean;
  TYPERFR2?: (typeof TYPERFR2)[keyof typeof TYPERFR2];
  LOCRFRI2?: (typeof LOCRFRI2)[keyof typeof LOCRFRI2];
  WINECHILL: boolean;
  NUMFREEZ: number;
  UPRTFRZR?: (typeof UPRTFRZR)[keyof typeof UPRTFRZR];
  RANGEFUEL?: (typeof RANGEFUEL)[keyof typeof RANGEFUEL];
  RCOOKUSE?: number;
  ROVENUSE?: number;
  COOKTOPFUEL?: (typeof COOKTOPFUEL)[keyof typeof COOKTOPFUEL];
  COOKTOPUSE?: number;
  OVENFUEL?: (typeof OVENFUEL)[keyof typeof OVENFUEL];
  OVENUSE?: number;
  MICRO: number;
  AMTMICRO?: number;
  OUTGRILLFUEL?: (typeof OUTGRILLFUEL)[keyof typeof OUTGRILLFUEL];
  DISHWASH: boolean;
  DWASHUSE?: number;
  DWCYCLE?: (typeof DWCYCLE)[keyof typeof DWCYCLE];
  CWASHER: boolean;
  TOPFRONT?: (typeof TOPFRONT)[keyof typeof TOPFRONT];
  WASHLOAD?: number;
  WASHTEMP?: (typeof WASHTEMP)[keyof typeof WASHTEMP];
  DRYER: boolean;
  DRYRFUEL?: (typeof DRYRFUEL)[keyof typeof DRYRFUEL];
  DRYRUSE?: number;
  TVCOLOR: number;
  PLAYSTA?: number;
  DESKTOP: number;
  NUMLAPTOP: number;
  NUMTABLET: number;
  NUMSMPHONE: number;
  HEATHOME: boolean;
  HEATAPT?: boolean;
  EQUIPM?: (typeof EQUIPM)[keyof typeof EQUIPM];
  FUELHEAT?: (typeof FUELHEAT)[keyof typeof FUELHEAT];
  EQUIPAUXTYPE?: (typeof EQUIPAUXTYPE)[keyof typeof EQUIPAUXTYPE];
  EQUIPAUX?: boolean;
  FUELAUX?: (typeof FUELAUX)[keyof typeof FUELAUX];
  NUMPORTEL?: number;
  NUMFIREPLC?: number;
  BASEHEAT?: boolean;
  ATTCHEAT?: boolean;
  GARGHEAT?: boolean;
  HUMIDTYPE: (typeof HUMIDTYPE)[keyof typeof HUMIDTYPE];
  NUMPORTHUM?: number;
  AIRCOND: boolean;
  COOLAPT?: boolean;
  ACEQUIPM_PUB?: (typeof ACEQUIPM_PUB)[keyof typeof ACEQUIPM_PUB];
  ACEQUIPAUXTYPE_PUB?: (typeof ACEQUIPAUXTYPE_PUB)[keyof typeof ACEQUIPAUXTYPE_PUB];
  NUMWWAC?: number;
  NUMPORTAC?: number;
  NUMCFAN: number;
  NUMFLOORFAN: number;
  DEHUMTYPE: (typeof DEHUMTYPE)[keyof typeof DEHUMTYPE];
  NUMPORTDEHUM?: number;
  TYPETHERM?: (typeof TYPETHERM)[keyof typeof TYPETHERM];
  HEATCNTL?: (typeof HEATCNTL)[keyof typeof HEATCNTL];
  TEMPHOME?: number;
  COOLCNTL?: (typeof COOLCNTL)[keyof typeof COOLCNTL];
  TEMPHOMEAC?: number;
  H2OAPT?: boolean;
  WHEATSIZ: (typeof WHEATSIZ)[keyof typeof WHEATSIZ];
  FUELH2O: (typeof FUELH2O)[keyof typeof FUELH2O];
  MORETHAN1H2O: boolean;
  FUELH2O2?: (typeof FUELH2O2)[keyof typeof FUELH2O2];
  EVCHRGHOME?: boolean;
  NHSLDMEM?: number;
  SQFTEST?: number;
};

export type PredictResponse = {
  BTUEL: number;
  BTUNG: number;
  BTULP: number;
  BTUFO: number;
  BTUWD: number;
};
