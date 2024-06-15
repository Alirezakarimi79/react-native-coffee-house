import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BeansData, CoffeeData} from '../data';

export const useStore = create(
  persist(
    (get, set) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavoriteList: [],
      CartList: [],
      OrderHistoryList: [],
      CartPrice: 0,
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
