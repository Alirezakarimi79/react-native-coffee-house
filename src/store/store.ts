import {create} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BeansData, CoffeeData} from '../data';
import {CoffeeBeanType} from '../dto';

interface IZustand {
  CoffeeList: CoffeeBeanType[];
  BeanList: CoffeeBeanType[];
  FavoriteList: CoffeeBeanType[];
  CartList: CoffeeBeanType[];
  OrderHistoryList: CoffeeBeanType[];
  CartPrice: number;
}

const persistOptions: PersistOptions<IZustand> = {
  name: 'coffee-app',
  storage: createJSONStorage(() => AsyncStorage),
};

export const useStore = create(
  persist<IZustand>(
    (get, set) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavoriteList: [],
      CartList: [],
      OrderHistoryList: [],
      CartPrice: 0,
    }),
    persistOptions,
  ),
);
