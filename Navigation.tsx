import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Store} from './store/index.type';
import Modal from './layouts/Modal';
import Login from './screes/Login';
import useNavigation from './hooks/useNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const user = useSelector((x: Store) => x?.user);
  const navigation = useNavigation();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
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
