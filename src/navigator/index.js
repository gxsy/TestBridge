import React from 'react';

import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as screens from '../screens';

const AppNavigator = StackNavigator(
  {
    Index: {
      screen: screens.ImagePicker
    }
  },
  {
    initialRouteName: 'Index',
    // headerMode: 'none',
    /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
  }
);

export default AppNavigator;
