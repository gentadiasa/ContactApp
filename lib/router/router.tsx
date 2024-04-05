import React from 'react';
import { NavigationContainer, type NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactList from '../screens/ContactList';
import AddContact from '../screens/AddContact';
import ContactDetail from '../screens/ContactDetail';
import { Contact } from '../types/types';

export type RootStackParamList = {
    ContactList: undefined;
    AddContact: undefined | {data?: Contact}
    ContactDetail: undefined;
  };
  
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ContactList" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ContactList" component={ContactList} />
                <Stack.Screen name="AddContact" component={AddContact} />
                <Stack.Screen name="ContactDetail" component={ContactDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack