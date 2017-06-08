import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AuthScreen from './screens/AuthScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SettingScreen from './screens/SettingScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export const MainNavigator = TabNavigator({
   welcome: { screen: WelcomeScreen },
   auth: {
     screen: TabNavigator({
       auth: { screen: AuthScreen },
       register: { screen: RegistrationScreen },
       home: {
         screen: TabNavigator({
           map: { screen: MapScreen },
           deck: { screen: DeckScreen },
           profile: {
             screen: StackNavigator({
               profile: { screen: ProfileScreen, header: { visible:false } },
               settings: { screen: SettingScreen }
             })
           }
         })
       }
     })
   }
 });

export const Authentication = StackNavigator({
  auth: { screen: AuthScreen },
  register: {
    screen: RegistrationScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Create an Account'
    }),
  },
});
