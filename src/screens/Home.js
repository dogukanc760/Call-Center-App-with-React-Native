import Login from './Login';
import {AuthContext} from '../context/AuthContext';
import React, {useRef, useContext} from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dashboard from './Dashboard';
import Telephone from './Telephone';
import Account from './Account';
import MPanosu from './MPanosu';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabComponent from '../components/Tab';
import MissedCalls from './MissedCalls';
import SystemSettings from './SystemSettings';
import CallHistory from './CallHistory';
import SplashScreen from './/SplashScreen';
import CallPageOne from './CallPageOne';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
export default function Home() {
  const {userInfo, isLoading} = useContext(AuthContext);

  // console.log(userInfo)
  return (
    <>
      {/* Yönlendirmeler burada gerçekleşiyor */}
      {/* Tab Menu */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            right: 16,
            left: 16,
            borderTopStartRadius: 14,
            borderTopEndRadius: 14,
          },
        })}>
        {/* Login girişinin daha önce yapılmışsa uygulamaya girsin.Eğer giriş
        yapmamışsa login ekranını görsün.If koşulunun reactcası */}
        {userInfo.X_ID ? (
          <>
            {/* Tab screenler içerisinde TabComponent'e label ve iconname gönderildi. */}
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                tabBarButton: props => (
                  <TabComponent label="Dashboard" iconname="phone" {...props} />
                ),
              }}
            />

            <Tab.Screen
              name="MPanosu"
              component={MPanosu}
              options={{
                tabBarButton: props => (
                  <TabComponent label="MPanosu" iconname="phone" {...props} />
                ),
              }}
            />
            <Tab.Screen
              name="Telephone"
              //component={Telephone}
              options={{
                tabBarButton: props => (
                  <TabComponent label="Telephone" iconname="phone" {...props} />
                ),
              }}
            >
               {() => (
                <HomeStack.Navigator screenOptions={{headerShown: false}}>
                  <HomeStack.Screen name="Telephone" component={Telephone} />

                  <HomeStack.Screen
                    name="CallPageOne"
                    component={CallPageOne}
                  />
                </HomeStack.Navigator>
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Accountt"
              options={{
                tabBarButton: props => (
                  <TabComponent label="Account" iconname="user" {...props} />
                ),
              }}>
              {() => (
                <HomeStack.Navigator screenOptions={{headerShown: false}}>
                  <HomeStack.Screen name="Account" component={Account} />

                  <HomeStack.Screen
                    name="MissedCalls"
                    component={MissedCalls}
                  />
                  <HomeStack.Screen
                    name="CallHistory"
                    component={CallHistory}
                  />
                  <HomeStack.Screen
                    name="SystemSettings"
                    component={SystemSettings}
                  />
                  <HomeStack.Screen
                    name="CallPageOne"
                    component={CallPageOne}
                  />
                </HomeStack.Navigator>
              )}
            </Tab.Screen>
          
          </>
        ) : (
          //Login ekranı daha önce giriş yapılmamışsa  gösterilir.
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              tabBarStyle: {display: 'none'},
            }}
          />
        )}
      </Tab.Navigator>
    </>
  );
}
