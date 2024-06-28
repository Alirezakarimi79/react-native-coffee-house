import {FC} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {useStore} from '../../store';
import {COLORS} from '../../theme';
import {ImageBackgroundInfo} from '../../components';

export const DetailsScreen: FC<{navigation: any; route: any}> = ({
  navigation,
  route,
}) => {
  const itemOfIndex = useStore(state =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const addToFavoriteList = useStore(state => state.AddToFavoriteList);

  const deleteFromFavoriteList = useStore(
    state => state.DeleteFromFavoriteList,
  );

  const backHandler = () => navigation.pop();

  const handleToggleFavorite = (
    isFavorite: boolean,
    type: 'Coffee' | 'Bean',
    id: string,
  ) => {
    isFavorite ? addToFavoriteList(type, id) : deleteFromFavoriteList(type, id);
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <ImageBackgroundInfo
          coffeeBean={itemOfIndex}
          enableBackHandler={true}
          toggleFavorite={handleToggleFavorite}
          backHandler={backHandler}
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
});
