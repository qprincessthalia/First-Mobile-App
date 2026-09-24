import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screen/HomeScreen';
import LogIn from './Screen/LogIn';
import Choose from './Screen/Choose';
import EnterTask from './Screen/EnterTask';
import ConfirmTask from './Screen/ConfirmTask';
import MyTask from './Screen/MyTask';
import SortedActivity from './Screen/SortedActivity';
import MenuBar from './Screen/MenuBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Start"
          component={LogIn}
        />

      <Stack.Screen
      name="Activity"
      component={Choose}
      options={({ navigation }) => ({
      title: 'Activity',
      headerRight: () => (
      <MenuBar navigation={navigation} />
       ),
      })}
      />

      <Stack.Screen
      name="Enter Task"
      component={EnterTask}
      options={({ navigation }) => ({
      title: 'Enter Task',
      headerRight: () => (
      <MenuBar navigation={navigation} />
      ),
      })}
      />

      <Stack.Screen
      name="Confirm Task"
      component={ConfirmTask}
      options={({ navigation }) => ({
      title: 'Confirm Task',
      headerRight: () => (
      <MenuBar navigation={navigation} />
      ),
      })}
      />

      <Stack.Screen
      name="My Tasks"
      component={MyTask}
      options={({ navigation }) => ({
      title: 'My Tasks',
      headerRight: () => (
      <MenuBar navigation={navigation} />
      ),
      })}
      />

      <Stack.Screen
      name="Sorted Activity"
      component={SortedActivity}
      options={({ navigation }) => ({
      title: 'Sorted Activity',
      headerRight: () => (
      <MenuBar navigation={navigation} />
      ),
      })}
      />

        
        <Stack.Screen
          name="Menu Bar"
          component={MenuBar}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}