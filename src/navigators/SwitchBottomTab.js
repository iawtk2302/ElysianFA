import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import BottomtabAdmin from './BottomTab';
import BottomtabShipper from './BottomTabShipper';
import BottomtabStaff from './BottomTabStaff';
const SwitchBottomTab = () => {
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
  if (isAdmin)
    return (
      <NavigationContainer>
        <BottomtabAdmin />
      </NavigationContainer>
    );
  if (isShipper)
    return (
      <NavigationContainer>
        <BottomtabShipper />
      </NavigationContainer>
    );
  return (
    <NavigationContainer>
      <BottomtabStaff />
    </NavigationContainer>
  );
};

export default SwitchBottomTab;

const styles = StyleSheet.create({});
