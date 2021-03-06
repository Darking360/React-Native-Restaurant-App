/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Assets from '../../src/constants/assets';
import PrimaryText from '../base_components/PrimaryText';
import SecondaryText from '../base_components/SecondaryText';
import LoadingFood from '../base_components/LoadingFood';
import ViewRow from '../base_components/ViewRow';
import Colors from '../../src/constants/colors';
import FlatButton from '../base_components/FlatButton';

import { translate } from '../../src/utils/language';

class FoodItem extends React.Component {
  render() {
    const { food, onPress, preview, upperPress, isStore } = this.props;
    const { food: info } = food;
    if (!info) {
      return <LoadingFood />;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={upperPress}
      >
        <View
          key={food._id}
          style={{
            elevation: 3,
            minHeight: 220,
            backgroundColor: '#fff',
            margin: 10,
            borderRadius: 5,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          <Image
            source={Assets.Images[info.type]}
            style={{
              width: '100%',
              height: 150,
            }}
            resizeMode="contain"
          />
          <ViewRow
            jc="space-between"
            ai="flex-start"
            style={{
              padding: 15,
            }}
          >
            <View
              style={{
                flex: 3,
                flexDirection: 'column',
              }}
            >
              <PrimaryText size={18} align="left" style={{ marginBottom: 5 }}>
                {info.name}
              </PrimaryText>
              <SecondaryText>
                {translate[info.type]}
              </SecondaryText>
            </View>
            {
              !preview && (
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <PrimaryText size={20} color={Colors.moneyColor}>
                    $ {food.price}
                  </PrimaryText>
                </View>
              )
            }
          </ViewRow>
          {
            (!preview && !isStore) ? (
              <FlatButton
                key="add2Cart"
                title="Agregar a Carrito"
                onPress={onPress}
              />
            ) : !isStore && (
              <View
                style={{
                  flex: 1,
                }}
              >
                <PrimaryText size={20} color={Colors.green}>
                  Restaurante: { info.restaurant.name }
                </PrimaryText>
              </View>
            )
          }
        </View>
      </TouchableOpacity>
    );
  }
}


FoodItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  food: PropTypes.object.isRequired,
};


export default FoodItem;
