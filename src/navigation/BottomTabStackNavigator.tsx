import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import CalendarScreen from "../screens/celendar/CalendarScreen";
import HomeScreen from '../screens/home/HomeScreen';
import MypageScreen from "../screens/myPage/MypageScreen";
import RecordScreen from '../screens/record/RecordScreen';
import AllTodoScreen from '../screens/todo';
import { ScreenName } from "../statics/constants/ScreenName";
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name={ScreenName.AllTodo}
        component={AllTodoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Calendar}
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Record}
        component={RecordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenName.Mypage}
        component={MypageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;