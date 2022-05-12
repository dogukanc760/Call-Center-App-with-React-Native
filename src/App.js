/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {AuthContext} from './context/AuthContext';
import React, {useRef, useContext} from 'react';
import {Text, View,Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dashboard from './screens/Dashboard';
import Telephone from './screens/Telephone';
import Account from './screens/Account';
import MPanosu from './screens/MPanosu';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabComponent from './components/Tab';
import MissedCalls from './screens/MissedCalls';
import SystemSettings from './screens/SystemSettings';
import CallHistory from './screens/CallHistory';
import Login from './screens/Login';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './context/AuthContext';
import Home from './screens/Home';





export default function App() {

  return (
    <AuthProvider>
      <NavigationContainer>
         <Home /> 
      </NavigationContainer>
    </AuthProvider>
  );
}
