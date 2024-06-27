import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {produce} from 'immer';

import {BeansData, CoffeeData} from '../data';
import {CoffeeBeanType, CoffeePriceType} from '../dto';

interface IZustand {
  CoffeeList: CoffeeBeanType[];
  BeanList: CoffeeBeanType[];
  FavoriteList: CoffeeBeanType[];
  CartList: CoffeeBeanType[];
  OrderHistoryList: CoffeeBeanType[];
  CartPrice: string;
  AddToCart: (cartItem: CoffeeBeanType) => void;
  CalculateCartPrice: () => void;
  AddToFavoriteList: (type: 'Coffee' | 'Bean', id: string) => void;
  DeleteFromFavoriteList: (type: 'Coffee' | 'Bean', id: string) => void;
}

const useStore = create(
  persist<IZustand>(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavoriteList: [],
      CartList: [],
      OrderHistoryList: [],
      CartPrice: '',
      AddToCart: (cartItem: CoffeeBeanType) =>
        set(
          produce((state: IZustand) => {
            let itemFound = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                itemFound = true;
                let sizeFound = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size === cartItem.prices[0].size
                  ) {
                    sizeFound = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (!sizeFound) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                  state.CartList[i].prices.sort(
                    (a: CoffeePriceType, b: CoffeePriceType) => {
                      if (a.size > b.size) {
                        return -1;
                      }
                      if (a.size < b.size) {
                        return 1;
                      }
                      return 0;
                    },
                  );
                }
                break;
              }
            }
            if (!itemFound) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      CalculateCartPrice: () =>
        set(
          produce((state: IZustand) => {
            let totalPrice: number = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let temPrice: number = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                temPrice =
                  temPrice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].itemPrice = temPrice.toFixed(2).toString();
              totalPrice = totalPrice + temPrice;
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
          }),
        ),
      AddToFavoriteList: (type: 'Coffee' | 'Bean', id: string) =>
        set(
          produce((state: IZustand) => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (!state.CoffeeList[i].favourite) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoriteList.unshift(state.CoffeeList[i]);
                  } else {
                    state.CoffeeList[i].favourite = false;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  if (!state.BeanList[i].favourite) {
                    state.BeanList[i].favourite = true;
                    state.FavoriteList.unshift(state.BeanList[i]);
                  } else {
                    state.BeanList[i].favourite = false;
                  }
                  break;
                }
              }
            }
          }),
        ),
      DeleteFromFavoriteList: (type: 'Coffee' | 'Bean', id: string) =>
        set(
          produce((state: IZustand) => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (state.CoffeeList[i].favourite) {
                    state.CoffeeList[i].favourite = false;
                    state.FavoriteList.unshift(state.CoffeeList[i]);
                  } else {
                    state.CoffeeList[i].favourite = true;
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  if (state.BeanList[i].favourite) {
                    state.BeanList[i].favourite = false;
                    state.FavoriteList.unshift(state.BeanList[i]);
                  } else {
                    state.BeanList[i].favourite = true;
                  }
                  break;
                }
              }
            }
            let spliceIndex: number = -1;
            for (let i = 0; i < state.FavoriteList.length; i++) {
              if (state.FavoriteList[i].id === id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoriteList.splice(spliceIndex, 1);
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useStore;
