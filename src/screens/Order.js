import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {signOut} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ItemInOder from '../components/itemInOrders';
import ItemInOrders from '../components/itemInOrders';
import OderDetail from '../components/OderDetail';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Waiting from './waiting';
import Shipping from './shipping';
import Complete from './complete';
import Cancel from './cancel';
import Color from '../common/Color';
const Tab = createMaterialTopTabNavigator();
const Order = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isShipper, setIsShipper] = useState(false);
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState(false)
  useEffect(() => {
    let isMounted = true;
    firestore()
      .collection('UserAdmin')
      .doc(auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.data().type === 'admin') {
          if (isMounted) setIsAdmin(true);
        } else if (doc.data().type === 'shipper'){
          if (isMounted) setIsShipper(true);
        }
        else{
          setStaff(false)
        }
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  if (isShipper)
    return (
      <Tab.Navigator>
      <Tab.Screen name="shipping" component={Shipping} />
    </Tab.Navigator>
    );
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor:Color.custom,tabBarInactiveTintColor:'#C5C5C5', tabBarIndicatorStyle: {backgroundColor: Color.custom}}}>
      <Tab.Screen name="Chờ" component={Waiting} />
      <Tab.Screen name="Vận chuyển" component={Shipping} />
      <Tab.Screen name="Hoàn thành" component={Complete} />
      <Tab.Screen name="Hủy" component={Cancel} />
    </Tab.Navigator>
  );
};

export default Order;

const styles = StyleSheet.create({});
