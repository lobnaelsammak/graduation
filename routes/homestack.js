import { createStackNavigator} from 'react-navigation-stack';
import ReviewDetails from '../screens/activeRequests';
import Header from '../components/header';
import React from 'react';

const screens = {
  ReviewDetails: {
    screen: ReviewDetails,
    navigationOptions: 
      ({ navigation }) => {
        return {
          headerTitle: () => <Header title='pending requests' navigation={navigation} />
        }
      },
  },
};

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
      headerTintColor: '#444',
      headerStyle: {
        // paddingTop: 38,
        backgroundColor:'coral',
        height: 100 }
    }
  });

// home stack navigator screens
export default HomeStack;