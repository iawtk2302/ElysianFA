import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainAdmin from '../screens/MainAdmin';
import MainShipper from '../screens/MainShipper';
import MainStaff from '../screens/MainStaff';
<<<<<<< HEAD
import Order from '../screens/order';
import SearchProduct from '../screens/searchProduct';
import EditProduct from '../screens/editProduct';
import AddProduct from '../screens/addProduct';
import AddBanner from '../screens/addBanner';
=======
import Shipping from '../screens/shipping';
import Order from '../screens/Order';
>>>>>>> Khanh
const Stack = createNativeStackNavigator();
const Navigation = ({type}) => {
  const type1 = type
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={type}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainAdmin" component={MainAdmin} />
        <Stack.Screen name="MainShipper" component={MainShipper} />
        <Stack.Screen name="MainStaff" component={MainStaff} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="AddBanner" component={AddBanner} />
=======
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={type1}>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerTitle: 'Đăng nhập'}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerTitle: 'Đăng ký'}}/> 
        <Stack.Screen name="MainAdmin" component={MainAdmin}/>
        <Stack.Screen name="MainShipper" component={MainShipper}/>
        <Stack.Screen name="MainStaff" component={MainStaff} />
        <Stack.Screen name="Shipping" component={Shipping} />
        <Stack.Screen name="Order" component={Order} />
>>>>>>> Khanh
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})