import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../../theme';
import {GradientBgIcon} from '../gradient-bg-icon';
import {ProfilePicture} from '../profile-pic';

interface IHeaderBar {
  title?: string;
}

export const HeaderBar: FC<IHeaderBar> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <GradientBgIcon
        name={'menu'}
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.headerText}>{title}</Text>
      <ProfilePicture />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
