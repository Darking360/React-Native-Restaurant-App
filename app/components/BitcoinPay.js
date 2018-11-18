// TODO bitcoin pay
import React from 'react';
import { View, Image } from 'react-native';
import Assets from '../../src/constants/assets';
import PrimaryText from '../base_components/PrimaryText';
export default () => (
  <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Image
      source={Assets.Images.bitcoin}
      style={{
        width: 150,
        height: 150,
      }}
      resizeMode="contain"
    />
    <PrimaryText>Nos encontramos trabajando...</PrimaryText>
  </View>
)
