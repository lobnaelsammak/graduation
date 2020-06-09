import { createStackNavigator } from 'react-navigation-stack';
import History from '../screens/history';
import Header from '../components/header';
import React from 'react';

const screens = {
  History: {
    screen: History,
    navigationOptions: 
    ({ navigation }) => {
      return {
        headerTitle: () => <Header title='History' navigation={navigation} />
      }
    },
  },
}

const HistoryStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { 
      // paddingTop: 38,
        backgroundColor:'#82C4C3',
        height: 100  },
  }
});

export default HistoryStack;