import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainAdmin from '../screens/MainAdmin';
import MainShipper from '../screens/MainShipper';
import MainStaff from '../screens/MainStaff';
import Order from '../screens/Order';
import SearchProduct from '../screens/searchProduct';
import EditProduct from '../screens/editProduct';
import AddProduct from '../screens/addProduct';
import AddBanner from '../screens/addBanner';
import Shipping from '../screens/shipping';
import Product from '../screens/product';
import Employee from '../screens/Employee';
import Voucher from '../screens/voucher';
import AddVoucherAmount from '../screens/voucheramount';
import AddVoucherTotal from '../screens/voucherTotal';

const Stack = createNativeStackNavigator();
const Navigation = ({type}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={type}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainAdmin" component={MainAdmin} />
        <Stack.Screen name="MainShipper" component={MainShipper} />
        <Stack.Screen name="MainStaff" component={MainStaff} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="AddBanner" component={AddBanner} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Employee" component={Employee} options={{headerTitle: 'Nhân viên', headerShown: true, headerTitleAlign: 'center'}}/>
        <Stack.Screen name="Voucher" component={Voucher} options={{headerShown:true,headerTitle:'Thêm khuyến mãi'}}/>
        <Stack.Screen name="AddVoucherAmount" component={AddVoucherAmount} />
        <Stack.Screen name="AddVoucherTotal" component={AddVoucherTotal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})