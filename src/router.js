import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AuthScreen from './screens/AuthScreen';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SettingScreen from './screens/SettingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import StoryScreen from './screens/StoryScreen';

export const MainNavigator = TabNavigator({
   Welcome: { screen: WelcomeScreen },
   Auth: {
     screen: TabNavigator({
       Auth: { screen: AuthScreen },
       Register: { screen: RegistrationScreen },
       Home: {
         screen: TabNavigator({
           Search: { screen: SearchScreen },
           Home: { screen: HomeScreen },
           Story: { screen: StoryScreen },
           Bookmark: { screen: BookmarkScreen},
           Profile: {
             screen: StackNavigator({
               Profile: { screen: ProfileScreen, header: { visible:false } },
               Settings: { screen: SettingScreen }
             })
           }
         })
       }
     })
   }
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
