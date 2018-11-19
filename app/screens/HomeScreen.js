/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ScrollView, FlatList, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import startCase from 'lodash/startCase';
import styled from 'styled-components';

import BR from '../base_components/BR';
import SignOutButton from '../components/RightHeaderButtons';
import FoodItem from '../components/FoodItem';
import AppBase from '../base_components/AppBase';
import CuisineGrid from '../components/CuisineGrid';
import PrimaryText from '../base_components/PrimaryText';
import RestaurantList from '../components/RestaurantList';
import TextInput from '../base_components/TextInput';
import FilterRadioModal from '../components/FilterRadioModal';
import { fetchCuisineTypes, fetchRestaurant, fetchRestaurantByType } from '../../src/actions/index';

const Heading = styled.Text`
  font-size: 14px;
  color: #9DA8BA;
  text-align: center;
  margin-bottom: 10px;
`;

const SubHeading = styled.Text`
  font-size: 16px;
  color: #213052;
  text-align: center;
`;

const Section = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 15px 20px;
  background: #FFF;
`;
const SectionItem = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <PrimaryText>Order my Food</PrimaryText>,
    headerRight: <SignOutButton />,
  });

  constructor(props) {
    super(props);
    this.filterModalRef = React.createRef();
    this.state = {
      name: '',
      price: '',
      type: 'mexican',
    };
  }

  componentDidMount() {
    const { restaurantList, cuisineTypes, role } = this.props;
    if (role === 'user') {
      this.props.fetchRestaurant();
      this.props.fetchCuisineTypes();
    } else {
      // TODO get my food listed to delete it or something
    }
  }

  handleFilter = (type) => {
    if (type !== null) {
      this.props.fetchRestaurantByType(type);
    } else {
      this.props.fetchRestaurant();
    }
  };

  openCuisineScreen = (value) => {
    Actions.cuisineRestaurants({
      cuisineType: value,
      backTitle: 'Atras',
      title: startCase(value),
      rightTitle: 'Cerrar sesion',
      onRight: () => this.handleSignOut(),
    });
  };

  renderFoodList = foods => (
    <FlatList
      data={foods}
      bounces={false}
      ListHeaderComponent={this.renderHeader}
      keyExtractor={item => item._id}
      renderItem={this.renderFoodItem}
    />
  );

  renderFoodItem = ({ item }) => {
    if (item) {
      return (
        <FoodItem
          key={item.food._id}
          food={item}
          onPress={() => this.props.updateCartItems(item, 1)}
        />
      );
    }
    return null;
  };

  onNameChange = (name) => this.setState({ name })
  onPriceChange = (price) => {
    if (/[0-9]+/.test(price)) this.setState({ price })
  }
  onTypeChange = (type) => this.setState({ type })

  render() {
    const filterData = this.props.cuisineTypes.map(type => ({
      value: type,
      label: startCase(type),
    }));

    const { role, food } = this.props;
    const { name, price, type } = this.state;

    return (
      <AppBase style={{
        alignItems: 'stretch',
        backgroundColor: role === 'user' ? '#fff' : null,
      }}
      >
        {
          (filterData.length > 0 && role === 'user') &&
          <FilterRadioModal
            heading="Categoria"
            data={filterData}
            // eslint-disable-next-line no-return-assign
            pRef={el => (this.filterModalRef = el)}
            close={() => this.filterModalRef.close()}
            onClose={this.handleFilter}
          />
        }
        {
          role === 'user' ?
            <ScrollView>
              <CuisineGrid
                data={this.props.cuisineTypes}
                onPress={this.openCuisineScreen}
              />
              <RestaurantList
                onFilterIconPress={() => this.filterModalRef.open()}
                restaurantList={this.props.restaurantList}
              />
            </ScrollView>
          :
            <ScrollView>
              <Section>
                <SectionItem>
                  <PrimaryText>Crear Comida</PrimaryText>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={this.onNameChange}
                    style={{
                      width: '100%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                    underlineColorAndroid="#B9B9B9"
                    value={name}
                    placeholder="Nombre"
                  />
                  <TextInput
                    autoCorrect={false}
                    onChangeText={this.onPriceChange}
                    style={{
                      width: '100%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                    underlineColorAndroid="#B9B9B9"
                    value={price}
                    placeholder="Precio"
                  />
                  <Picker
                  style={{ height: 50, width: '100%' }}
                  selectedValue={type}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({type: itemValue});
                  }}>
                    <Picker.Item label="Mexicano" value={'mexican'} />
                    <Picker.Item label="Pizza" value={'pizza'} />
                    <Picker.Item label="Helado" value={'ice-cream'} />
                  </Picker>
                </SectionItem>
              </Section>
              <BR size={20} />
              <Section>
                <SectionItem>
                </SectionItem>
              </Section>
            </ScrollView>
        }
      </AppBase>
    );
  }
}

HomeScreen.defaultProps = {
  restaurantList: [],
  cuisineTypes: [],
};

HomeScreen.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  fetchRestaurantByType: PropTypes.func.isRequired,
  fetchCuisineTypes: PropTypes.func.isRequired,
  // fetchCartItems: PropTypes.func.isRequired,
  restaurantList: PropTypes.array,
  cuisineTypes: PropTypes.array,
};

function initMapStateToProps(state) {
  return {
    food: state.food.myfood,
    cuisineTypes: state.food.cuisineTypes,
    restaurantList: state.restaurant.fullList,
    role: state.auth.loginMessage.role,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRestaurant,
    fetchRestaurantByType,
    fetchCuisineTypes,
    // fetchCartItems,
  }, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(HomeScreen);
