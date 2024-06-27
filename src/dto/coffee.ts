export type CoffeeBeanType = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imageLinkSquare: string;
  imageLinkPortrait: string;
  ingredients: string;
  specialIngredient: string;
  prices: CoffeePriceType[];
  averageRating: number;
  ratingsCount: string;
  favourite: boolean;
  type: 'Coffee' | 'Bean';
  index: number;
  itemPrice: string;
};

export type CoffeePriceType = {
  size: string;
  price: string;
  currency: string;
  quantity: number;
};
