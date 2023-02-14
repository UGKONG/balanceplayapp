/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Store} from './store/index.type';
import Modal from './layouts/Modal';
import Login from './screes/Login';
import useNavigation from './hooks/useNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const icon = {
  home: {
    default: 'people-outline',
    focus: 'people-sharp',
  },
  notice: {
    default: 'notifications-outline',
    focus: 'notifications-sharp',
  },
  setting: {
    default: 'ios-construct-outline',
    focus: 'ios-construct',
  },
  none: {
    default: 'ios-help-outline',
    focus: 'ios-help-sharp',
  },
};

export default function Navigation() {
  const user = useSelector((x: Store) => x?.user);
  const navigation = useNavigation();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color}) => {
              let routeName = route.name;
              let iconName = focused ? icon.none.focus : icon.none.default;
              let iconSize = focused ? 29 : 26;

              if (routeName === 'Home') {
                iconName = focused ? icon.home.focus : icon.home.default;
              } else if (routeName === 'Notice') {
                iconName = focused ? icon.notice.focus : icon.notice.default;
              } else if (routeName === 'Setting') {
                iconName = focused ? icon.setting.focus : icon.setting.default;
              }

              return <Icon name={iconName} color={color} size={iconSize} />;
            },
            headerStyle: {backgroundColor: '#00ADA9'},
            headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
            tabBarActiveTintColor: '#00ADA9',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
          })}>
          {navigation?.map(item => (
            <Tab.Screen
              key={item?.id}
              name={item?.name}
              component={item?.component}
              options={{headerTitle: item?.title}}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>

      <Modal visible={!user}>
        <Login />
      </Modal>
    </>
  );
}
