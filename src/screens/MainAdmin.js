import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from '../utils/Auth'

const MainAdmin = () => {
  return (
    <View>
      <Text>MainAdmin</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>signout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MainAdmin

const styles = StyleSheet.create({})