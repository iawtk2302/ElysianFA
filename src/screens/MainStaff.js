import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from '../utils/Auth'

const MainStaff = () => {
  return (
    <View>
      <Text>MainStaff</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>signout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MainStaff

const styles = StyleSheet.create({})