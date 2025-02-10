export type level = "grey" | "bronze" | "silver" | "gold" | "unique" | "prismatic";

export interface ShopSlot {
    purchased: boolean;
    unit: string;
    cost: number;
  }