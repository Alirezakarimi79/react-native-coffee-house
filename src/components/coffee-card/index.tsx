import {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme';
import CustomIcon from '../custom-icon';
import {CoffeeBeanType} from '../../dto';
import {BgIcon} from '../bg-icon';

interface ICoffeeCard {
  coffee: CoffeeBeanType;
  buttonPressHandler: (...args: any[]) => any;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

export const CoffeeCard: FC<ICoffeeCard> = ({coffee, buttonPressHandler}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardLinearGradientContainer}>
      <ImageBackground
        source={coffee.imageLinkSquare}
        resizeMode={'cover'}
        style={styles.cardImageBackground}>
        <View style={styles.cardRatingContainer}>
          <CustomIcon
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.cardRatingText}>{coffee.averageRating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{coffee.name}</Text>
      <Text style={styles.cardSubTitle}>{coffee.specialIngredient}</Text>
      <View style={styles.cardFooterContainer}>
        <Text style={styles.cardFooterPriceCurrency}>
          $<Text style={styles.cardFooterPrice}>{coffee.prices[2].price}</Text>
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <BgIcon
            name={'add'}
            size={FONTSIZE.size_10}
            color={COLORS.primaryWhiteHex}
            bgColor={COLORS.primaryOrangeHex}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImageBackground: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
    position: 'relative',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    paddingHorizontal: SPACING.space_15,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.space_10,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  cardRatingText: {
    fontSize: FONTSIZE.size_14,
    lineHeight: 22,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  cardTitle: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  cardSubTitle: {
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
  },
  cardFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  cardFooterPriceCurrency: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
  },
  cardFooterPrice: {
    color: COLORS.primaryWhiteHex,
  },
});
