/* eslint-disable react/prop-types */
import React from 'react';
import { Drawer, Router, Scene } from 'react-native-router-flux';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Colors from '../src/constants/colors';
import SignupScreen from './screens/SignupScreen';
import SignupStoreScreen from './screens/SignupStoreScreen';
import RestaurantInfoScreen from './screens/RestaurantInfoScreen';
import CuisineRestaurantsScreen from './screens/CuisineRestaurantsScreen';
import CartScreen from './screens/CartScreen';
import PaymentHome from './screens/Payment/Home';
import PaymentComplete from './screens/Payment/Complete';
import PaymentFailed from './screens/Payment/Failed';
import SideDrawer from './screens/SideDrawer';
import DrawerImage from './components/DrawerImage';
import OrdersList from './screens/OrderListScreen';

// New routes
import EditScreen from './screens/EditScreen';


const AppRouter = () => (
  <Router>

    <Scene key="root" title="">
      <Scene
        key="loginScreen"
        component={LoginScreen}
        initial
        hideNavBar
      />

      <Scene
        key="signupScreen"
        component={SignupScreen}
        title={'Registro Usuario'}
      />
      <Scene
        key="signupStoreScreen"
        component={SignupStoreScreen}
        title={'Registro Tienda'}
      />
      <Drawer
        key="drawer"
        hideNavBar
        contentComponent={SideDrawer}
        drawerIcon={<DrawerImage />}
        panHandlers={null}
        drawerWidth={300}
      >
        <Scene>
          <Scene
            key="homeScreen"
            component={HomeScreen}
            title="Order my Food"
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
          />

          <Scene
            key="editScreen"
            component={EditScreen}
            title="Actualizar Perfil"
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
          />

          <Scene
            key="cuisineRestaurants"
            component={CuisineRestaurantsScreen}
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
          />

          <Scene
            key="restaurantScreen"
            component={RestaurantInfoScreen}
          />

          <Scene
            key="cartScreen"
            component={CartScreen}
            navigationBarStyle={{
              backgroundColor: '#fff',
              elevation: 2,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}
            titleStyle={{
              fontFamily: 'Roboto Slab',
              color: Colors.primaryColor,
            }}
            title="Carrito"
          />

          <Scene
            drawer={false}
            key="paymentHome"
            component={PaymentHome}
          />

          <Scene
            key="paymentSuccess"
            component={PaymentComplete}
          />

          <Scene
            key="paymentFailed"
            component={PaymentFailed}
          />
          <Scene
            key="showAllOrders"
            component={OrdersList}
            title="Mis ordenes"
          />
        </Scene>
      </Drawer>
    </Scene>
  </Router>
);

export default AppRouter;
