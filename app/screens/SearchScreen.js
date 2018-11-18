/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import Stripe from 'react-native-stripe-api';
import { CreditCardInput } from 'react-native-credit-card-input';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RoundButton from '../../base_components/RoundButton';
import AppBase from '../../base_components/AppBase';
import BR from '../../base_components/BR';
import Colors from '../../../src/constants/colors';
import PrimaryText from '../../base_components/PrimaryText';
import { doCancelOrder } from '../../../src/actions';

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

class PaymentHome extends Component {
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
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }


  _onChange = (form) => {
    this.setState((s, p) => ({
      cardData: form,
      validData: form.valid,
    }));
  };

  renderSelection = () => {
    const { option } = this.state;
    <FlatList
      data={}
    />
  }

  render() {
    const { orderId, totalAmount } = this.props;
    const { option } = this.state;

    return (
      <AppBase>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
        >
          <ScrollView
            bounces={false}
          >
            <BR size={10} />
            <Section>
              <SectionItem>
                <Picker
                selectedValue={option}
                style={{ height: 50, width: 500 }}
                onValueChange={(itemValue, itemIndex) => this.setState({option: itemValue})}>
                  <Picker.Item label="Comida" value={0} />
                  <Picker.Item label="Restaurant" value={1} />
                </Picker>
              </SectionItem>
            </Section>
            <BR size={10} />
            <Section>
              { this.renderSelection() }
            </Section>
          </ScrollView>
        </KeyboardAvoidingView>
      </AppBase>
    );
  }
}

PaymentHome.defaultProps = {
  createdOrder: null,
};

PaymentHome.propTypes = {
  orderId: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  doCancelOrder: PropTypes.func.isRequired,
  createdOrder: PropTypes.object,
};

function initMapStateToProps(state) {
  return {
    searchItemms: state.foods.results,
  };
}

function initMapDispatchToProps(dipatch) {
  return bindActionCreators({
    makeSearch,
  }, dipatch);
}


export default connect(initMapStateToProps, initMapDispatchToProps)(PaymentHome);
