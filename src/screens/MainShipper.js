import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from '../utils/Auth'

const MainShipper = () => {
  return (
    <View>
      <Text>MainShipper</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>signout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MainShipper

const styles = StyleSheet.create({})