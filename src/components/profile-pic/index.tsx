import {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Avatar} from '../../assets/images';
import {COLORS, SPACING} from '../../theme';

export const ProfilePicture: FC = () => {
  return (
    <View style={styles.profileContainer}>
      <Image source={Avatar} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    backgroundColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: SPACING.space_36,
    height: SPACING.space_36,
  },
});
