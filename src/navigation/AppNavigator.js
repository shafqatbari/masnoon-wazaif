import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "../../src/screens/Login";
import Home from "../../src/screens/Home/screen/Home";
import UploadFile from '../screens/UploadFile/screen/UploadFile'
import AdminDashboard from '../screens/AdminDashboard/screen/AdminDashboard'
import ReaderScreen from '../screens/ReaderScreen'
import ScreenNames from "../helpers/ScreenNames";





const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}  >
        <Stack.Screen name={ScreenNames.Home} component={Home} />
        <Stack.Screen name={ScreenNames.Login} component={Login} />
        <Stack.Screen name={ScreenNames.UploadFile} component={UploadFile} />
        <Stack.Screen name={ScreenNames.ReaderScreen} component={ReaderScreen} />
        <Stack.Screen name={ScreenNames.AdminDashboard} component={AdminDashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;

