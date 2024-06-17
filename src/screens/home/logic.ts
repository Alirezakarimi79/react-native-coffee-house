import {CoffeeBeanType} from '../../dto';

export const getCategoryFromData = (data: CoffeeBeanType[]): string[] => {
  let temp: any = {};

  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');

  return categories;
};

export const getCoffeeList = (
  category: string,
  data: CoffeeBeanType[],
): CoffeeBeanType[] => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList: CoffeeBeanType[] = data.filter(
      item => item.name === category,
    );
    return coffeeList;
  }
};
