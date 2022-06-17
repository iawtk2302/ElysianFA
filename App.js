import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  LogBox,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import auth from '@react-native-firebase/auth';
import Navigation from './src/navigators/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/screens/SignIn';
import firestore from '@react-native-firebase/firestore'; 
import SwitchScreen from './src/navigators/SwitchScreen';
import { signIn } from './src/utils/Auth';

const Stack = createNativeStackNavigator();
const App = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const onAuthStateChanged = user => {
    setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs()
    // console.log("mounded")
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }
  // console.log(currentUser)
  if (currentUser) return <SwitchScreen />;
  return <Navigation type={'SignIn'}/>
};

export default App;

const styles = StyleSheet.create({});
