import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AuthScreen from './screens/AuthScreen';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SettingScreen from './screens/SettingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import StoryScreen from './screens/StoryScreen';
//import CategoryScreen from './screens/CategoryScreen';

export const MainNavigator = TabNavigator({
      Welcome: { screen: WelcomeScreen },
      Auth: { screen: AuthScreen },
      Register: { screen: RegistrationScreen },
      Main: {
        screen: TabNavigator({
          Search: {
            screen: SearchScreen,
            navigationOptions: {
              tabBarLabel: 'Search',
              tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />,
            },
           },
          Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarLabel: 'Home',
              tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />,
            },
           },
          Story: {
            screen: StackNavigator({
              Story: { screen: StoryScreen },
              Catergory: {
                screen: StackNavigator({
                  Category: { screen: SettingScreen }
                })
              }
            }),
            navigationOptions: {
              tabBarLabel: 'Story',
              tabBarIcon: ({ tintColor }) => <Icon name="add" size={35} color={tintColor} />,
            },
          },
          Bookmark: {
            screen: BookmarkScreen,
            navigationOptions: {
              tabBarLabel: 'Bookmark',
              tabBarIcon: ({ tintColor }) => <Icon name="bookmark" size={35} color={tintColor} />,
            },
           },
          Profile: {
            screen: StackNavigator({
              Profile: { screen: ProfileScreen },
              Settings: { screen: SettingScreen }
            }),
            navigationOptions: {
              tabBarLabel: 'Profile',
              tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />,
            },
          }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazyLoad: true
    });

export const Authentication = TabNavigator({
  Auth: { screen: AuthScreen },
  Register: { screen: RegistrationScreen},
  Home: { screen: HomeScreen}
});

export const WelcomeTab = TabNavigator({
  Welcome: { screen: WelcomeScreen},
  Auth: { screen: AuthScreen }
});
