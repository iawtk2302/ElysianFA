import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from '../utils/Auth'
import { useNavigation } from '@react-navigation/native'

const MainStaff = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Text>MainStaff</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>signout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('Order')}}>
        <Text>Open order</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MainStaff

const styles = StyleSheet.create({})