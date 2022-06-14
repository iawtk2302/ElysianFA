import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import MainAdmin from '../screens/MainAdmin';
import MainShipper from '../screens/MainShipper';
import MainStaff from '../screens/MainStaff';
const SwitchScreen = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isShipper, setIsShipper] = useState(false);
  const [loading, setLoading] = useState(true);
  // const getData = async() => {
  //   await
  // }
  useEffect(() => {
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
      isMounted = false;
    };
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  if(isAdmin)
    return(
      <MainAdmin/>
    )
  if(isShipper)
    return(
      <MainShipper/>
    )
  return(
    <MainStaff/>
  )
};

export default SwitchScreen;

const styles = StyleSheet.create({});
