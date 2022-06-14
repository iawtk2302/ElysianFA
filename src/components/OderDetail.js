import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OderDetail = ({item}) => {
  return (
    <View>
      <Text>{item.price}</Text>
    </View>
  )
}

export default OderDetail

const styles = StyleSheet.create({})