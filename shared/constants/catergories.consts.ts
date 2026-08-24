export const CATEGORY_CONFIG = {
  CAREER: {
    id: "CAREER",
    name: "Career",
    color: "#60A5FA",
  },
  PERSONAL: {
    id: "PERSONAL",
    name: "Personal",
    color: "#34D399",
  },
  FINANCE: {
    id: "FINANCE",
    name: "Finance",
    color: "#FBBF24",
  },
  RELATIONSHIPS: {
    id: "RELATIONSHIPS",
    name: "Relationships",
    color: "#FB7185",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORY_CONFIG;
export type Category = (typeof CATEGORY_CONFIG)[CategoryKey];

export const CATEGORIES = Object.values(CATEGORY_CONFIG);
export const CATEGORY_IDS = Object.keys(CATEGORY_CONFIG) as [
  CategoryKey,
  ...CategoryKey[],
];