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
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator} from 'react-native';
import Home from './src/screens/Home';
import auth from '@react-native-firebase/auth';
import Navigation from './src/navigators/Navigation';
import BottomtabAdmin from './src/navigators/BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/screens/SignIn';
import firestore from '@react-native-firebase/firestore';
import BottomtabShipper from './src/navigators/BottomTabShipper';

const Stack = createNativeStackNavigator();
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onAuthStateChanged = user => {
    setCurrentUser(user);
    setIsLoading(false);
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isShipper, setIsShipper] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    SplashScreen.hide();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    let isMounted = true;
    firestore()
      .collection('Users')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data().type === 'admin') {
          if (isMounted) setIsAdmin(true);
        } else if (doc.data().type === 'shipper')
          if (isMounted) setIsShipper(true);
        setLoading(false);
      });

    return () => {
      subscriber;
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (currentUser && isAdmin)
    return (
      <NavigationContainer>
        <BottomtabAdmin></BottomtabAdmin>
      </NavigationContainer>
    );
  if(currentUser && isShipper)
    return (
      <NavigationContainer>
        <BottomtabShipper></BottomtabShipper>
      </NavigationContainer>
    )
  return <Navigation />;
};

export default App;

const styles = StyleSheet.create({});
