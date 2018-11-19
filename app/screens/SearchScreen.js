/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import Stripe from 'react-native-stripe-api';
import { CreditCardInput } from 'react-native-credit-card-input';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View, Picker, ActivityIndicator, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import startCase from 'lodash/startCase';

import SignOutButton from '../components/RightHeaderButtons';
import TextInput from '../base_components/TextInput';
import RoundButton from '../base_components/RoundButton';
import AppBase from '../base_components/AppBase';
import BR from '../base_components/BR';
import Colors from '../../src/constants/colors';
import PrimaryText from '../base_components/PrimaryText';
import { doSearch, resetResults } from '../../src/actions';

import RestaurantList from '../components/RestaurantList';
import FoodItem from '../components/FoodItem';


const windowWidth = Dimensions.get('window').width - 18;

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

class SearchScreen extends Component {
  static navigationOptions = {
    title: (<PrimaryText style={{ flex: 1 }}>Busqueda</PrimaryText>),
    headerStyle: {
      backgroundColor: '#f5f5f5',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: '#fcfcfc',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitle: 'Home',
    headerRight: <SignOutButton />,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      option: 0,
    };
  }

  handleSearch = debounce(() => {
    const { search, option } = this.state;
    const { doSearch } = this.props;
    doSearch({search, option});
  },300);

  onSearchChange = (search) => {
    this.setState({ search }, () => {
      this.handleSearch();
    })
  }

  renderFoodItem = ({ item }) => {
    if (item) {
      return (
        <FoodItem
          key={item.name}
          preview
          food={{ ...item, food: item }}
          upperPress={() => {Actions.restaurantScreen({
            title: startCase(item.restaurant.name),
            backTitle: 'Back',
            rightTitle: 'Sign Out',
            onRight: () => this.handleSignOut(),
            restaurant: item.restaurant,
          })}}
        />
      );
    }
    return null;
  };

  renderItem = () => {
    const { option } = this.state;
    return(<View />)
  }

  renderSelection = () => {
    const { option } = this.state;
    const { searchItems } = this.props;
    if (option === 0) {
      return(
        <RestaurantList
          hideFilter
          restaurantList={searchItems}
        />
      )
    } else {
      return(
        <SectionItem style={{ width: '100%' }}>
          {
            searchItems.length === 0 ?
              <PrimaryText>No hemos encontrado comida...</PrimaryText>
            :
              <SectionItem style={{ width: '100%' }}>
                <FlatList
                  style={{ width: '100%' }}
                  data={searchItems}
                  renderItem={this.renderFoodItem}
                />
              </SectionItem>
          }
        </SectionItem>
      );
    }
  }

  renderLoading = () => {
    return (
      <ActivityIndicator size="large" />
    );
  }

  render() {
    const { option, search } = this.state;
    const { loading, resetResults } = this.props;

    console.log(this.props)

    return (
      <AppBase>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
        >
          <ScrollView
            bounces={false}
            contentContainerStyle={{ width: 300 }}
          >
            <BR size={10} />
            <Section>
              <SectionItem>
                <Picker
                style={{ height: 50, width: '100%' }}
                selectedValue={option}
                onValueChange={(itemValue, itemIndex) => {
                  resetResults();
                  this.setState({option: itemValue});
                }}>
                  <Picker.Item label="Restaurante" value={0} />
                  <Picker.Item label="Comida" value={1} />
                </Picker>
              </SectionItem>
            </Section>
            <BR size={10} />
            <Section>
              <SectionItem>
                <TextInput
                  autoCorrect={false}
                  onChangeText={this.onSearchChange}
                  style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  underlineColorAndroid="#B9B9B9"
                  value={search}
                  placeholder="Buscar"
                />
              </SectionItem>
            </Section>
            <BR size={10} />
            <Section>
              {
                  loading ?
                    this.renderLoading()
                  :
                    this.renderSelection()
              }
            </Section>
          </ScrollView>
        </KeyboardAvoidingView>
      </AppBase>
    );
  }
}

SearchScreen.defaultProps = {
  createdOrder: null,
};

SearchScreen.propTypes = {
  orderId: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  doCancelOrder: PropTypes.func.isRequired,
  createdOrder: PropTypes.object,
};

function initMapStateToProps(state) {
  return {
    searchItems: state.food.results,
    loading: state.food.loadingSearch,
    state: state.food,
  };
}

export default connect(initMapStateToProps, { doSearch, resetResults })(SearchScreen);
