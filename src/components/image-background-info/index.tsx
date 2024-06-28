import {FC} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {CoffeeBeanType} from '../../dto';
import {GradientBgIcon} from '../gradient-bg-icon';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme';
import CustomIcon from '../custom-icon';

interface IImageBackgroundInfo {
  coffeeBean: CoffeeBeanType;
  enableBackHandler: boolean;
  toggleFavorite: (
    isFavorite: boolean,
    type: 'Coffee' | 'Bean',
    id: string,
  ) => void;
  backHandler?: (...args: any[]) => void;
}

export const ImageBackgroundInfo: FC<IImageBackgroundInfo> = ({
  coffeeBean,
  backHandler,
  enableBackHandler,
  toggleFavorite,
}) => {
  return (
    <View>
      <ImageBackground
        source={coffeeBean.imageLinkPortrait}
        style={styles.itemBackgroundImage}>
        {enableBackHandler ? (
          <View style={styles.imageHeaderBarContainerWithBack}>
            <TouchableOpacity onPress={backHandler}>
              <GradientBgIcon
                name={'left'}
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                toggleFavorite(
                  coffeeBean.favourite,
                  coffeeBean.type,
                  coffeeBean.id,
                )
              }>
              <GradientBgIcon
                name={'like'}
                color={
                  coffeeBean.favourite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageHeaderBarContainerWithoutBack}>
            <TouchableOpacity
              onPress={() =>
                toggleFavorite(
                  coffeeBean.favourite,
                  coffeeBean.type,
                  coffeeBean.id,
                )
              }>
              <GradientBgIcon
                name={'like'}
                color={
                  coffeeBean.favourite
                    ? COLORS.primaryRedHex
                    : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.imageInfoOuterContainer}>
          <View style={styles.imageInfoInnerContainer}>
            <View style={styles.infoContainerRow}>
              <View>
                <Text style={styles.itemTitleText}>{coffeeBean.name}</Text>
                <Text style={styles.itemSubtitleText}>
                  {coffeeBean.specialIngredient}
                </Text>
              </View>
              <View style={styles.itemPropertiesContainer}>
                <View style={styles.firstProperty}>
                  <CustomIcon
                    name={coffeeBean.type === 'Bean' ? 'bean' : 'beans'}
                    size={
                      coffeeBean.type === 'Bean'
                        ? FONTSIZE.size_18
                        : FONTSIZE.size_24
                    }
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.firstPropertyText,
                      {
                        marginTop:
                          coffeeBean.type === 'Bean'
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}>
                    {coffeeBean.type}
                  </Text>
                </View>
                <View style={styles.firstProperty}>
                  <CustomIcon
                    name={coffeeBean.type === 'Bean' ? 'location' : 'drop'}
                    size={FONTSIZE.size_16}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.lastPropertyText}>
                    {coffeeBean.ingredients}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainerRow}>
              <View style={styles.ratingContainer}>
                <CustomIcon
                  name={'star'}
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_20}
                />
                <Text style={styles.ratingText}>
                  {coffeeBean.averageRating}
                </Text>
                <Text style={styles.ratingCountText}>
                  ({coffeeBean.ratingsCount})
                </Text>
              </View>
              <View style={styles.roastedContainer}>
                <Text style={styles.roastedText}>{coffeeBean.roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  itemBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  imageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageHeaderBarContainerWithoutBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageInfoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
  },
  imageInfoInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_15,
  },
  infoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  itemSubtitleText: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  itemPropertiesContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  firstProperty: {
    height: 55,
    width: 55,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  firstPropertyText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  lastPropertyText: {
    fontSize: FONTSIZE.size_10,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_2 + SPACING.space_4,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  ratingCountText: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  roastedContainer: {
    height: 55,
    width: 55 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  roastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
});
