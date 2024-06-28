import {FC, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useStore} from '../../store';
import {CoffeeBeanType} from '../../dto';
import {getCategoryFromData, getCoffeeList} from './logic';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme';
import {CoffeeCard, CustomIcon, HeaderBar} from '../../components';

export const HomeScreen: FC<{navigation: any}> = ({navigation}) => {
  const coffeeList: CoffeeBeanType[] = useStore(state => state.CoffeeList);
  const beanList: CoffeeBeanType[] = useStore(state => state.BeanList);

  const [categories, setCategories] = useState<string[]>(
    getCategoryFromData(coffeeList),
  );
  const [searchText, setSearchText] = useState<string>('');
  const [categoryIndex, setCategoryIndex] = useState<{
    index: number;
    category: string;
  }>({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState<CoffeeBeanType[]>(
    getCoffeeList(categoryIndex.category, coffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();

  const coffeeFlatListRef = useRef<FlatList>();

  const handleCoffeeRef = () => {
    coffeeFlatListRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  const handleSearchCoffee = (text: string) => {
    if (searchText !== '') {
      handleCoffeeRef();
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...coffeeList.filter(item =>
          item.name.toLowerCase().includes(text.toLowerCase()),
        ),
      ]);
    }
  };

  const handleResetSearchCoffee = () => {
    setSearchText('');
    handleCoffeeRef();
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...coffeeList]);
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        contentContainerStyle={styles.scrollViewFlex}
        showsVerticalScrollIndicator={false}>
        {/*App Header*/}
        <HeaderBar />

        <Text style={styles.screenTitle}>
          Find The Best {'\n'}Coffee For You
        </Text>

        {/*Search Input*/}
        <View style={styles.inputSearchContainer}>
          <TouchableOpacity onPress={() => handleSearchCoffee(searchText)}>
            <CustomIcon
              style={styles.inputSearchIcon}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              size={FONTSIZE.size_18}
              name="search"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.textSearchInput}
            placeholder={'Find Your Coffee...'}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              handleSearchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleResetSearchCoffee}>
              <CustomIcon
                style={styles.inputSearchIcon}
                name={'close'}
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
        </View>

        {/*Category Scroller*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {categories.map((categoryItem, index) => (
            <View key={index} style={styles.categoryItemContainer}>
              <TouchableOpacity
                onPress={() => {
                  handleCoffeeRef();
                  setCategoryIndex({
                    index: index,
                    category: categoryItem,
                  });
                  setSortedCoffee([...getCoffeeList(categoryItem, coffeeList)]);
                }}
                style={styles.categoryItemButton}>
                <Text
                  style={[
                    styles.categoryItemText,
                    {
                      color:
                        categoryIndex.index === index
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}>
                  {categoryItem}
                </Text>
                {categoryIndex.index === index && (
                  <View style={styles.categoryItemActive} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/*Coffee FlatList*/}
        <FlatList
          ListEmptyComponent={
            <View style={styles.coffeeEmptyContainer}>
              <Text style={styles.coffeeEmptyText}>No Coffee Available</Text>
            </View>
          }
          ref={coffeeFlatListRef}
          data={sortedCoffee}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }>
              <CoffeeCard coffee={item} buttonPressHandler={() => {}} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coffeeListContainer}
        />

        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        {/*Bean FlatList*/}
        <FlatList
          data={beanList}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }>
              <CoffeeCard coffee={item} buttonPressHandler={() => {}} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.coffeeListContainer,
            {marginBottom: tabBarHeight},
          ]}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  inputSearchIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textSearchInput: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryItemContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryItemButton: {
    alignItems: 'center',
  },
  categoryItemText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_4,
  },
  categoryItemActive: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  coffeeListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightGreyHex,
  },
  coffeeEmptyContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  coffeeEmptyText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_4,
    color: COLORS.primaryLightGreyHex,
  },
});
