import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Post from '../screens/Post';
import Profile from '../screens/Profile'; 
import Notification from '../screens/Notification';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomColor } from '../common/Color';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';
const Tab = createBottomTabNavigator();
const BottomtabStaff = () => {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }
          else if (route.name === 'Post') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={28} color={CustomColor} />;
        },
        headerShown:false,
        tabBarLabel:() => {return null},
        tabBarStyle:{
          height:50
        }
      })}>
        {/* <Tab.Screen name="Home" component={Home} /> */}
        {/* <Tab.Screen name="Chat" component={Chat} /> */}
        {/* <Tab.Screen name="Post" component={Post} /> */}
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  )
}

export default BottomtabStaff

const styles = StyleSheet.create({})