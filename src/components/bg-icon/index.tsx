import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {BORDERRADIUS, SPACING} from '../../theme';
import CustomIcon from '../custom-icon';

interface IBgIcon {
  name: string;
  size: number;
  color: string;
  bgColor: string;
}

export const BgIcon: FC<IBgIcon> = ({bgColor, color, size, name}) => {
  return (
    <View style={[styles.bgIconContainer, {backgroundColor: bgColor}]}>
      <CustomIcon name={name} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  bgIconContainer: {
    width: SPACING.space_30,
    height: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
