export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  categoryIcon:string;
  change: { dir: "up" | "down" | "flat"; pct: number };
};

