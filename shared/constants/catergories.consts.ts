export const CATEGORY_NAME = {
  CAREER: "Career",
  PERSONAL: "Personal",
  FINANCE: "Finance",
  RELATIONSHIPS: "Relationships",
} as const;

export const CATEGORY_COLOR = {
  CAREER: "#60A5FA",
  PERSONAL: "#34D399",
  FINANCE: "#FBBF24",
  RELATIONSHIPS: "#FB7185",
} as const;

export const CATEGORIES = [
  {
    name: CATEGORY_NAME.CAREER,
    color: CATEGORY_COLOR.CAREER,
  },
  {
    name: CATEGORY_NAME.PERSONAL,
    color: CATEGORY_COLOR.PERSONAL,
  },
  {
    name: CATEGORY_NAME.FINANCE,
    color: CATEGORY_COLOR.FINANCE,
  },
  {
    name: CATEGORY_NAME.RELATIONSHIPS,
    color: CATEGORY_COLOR.RELATIONSHIPS,
  },
];
