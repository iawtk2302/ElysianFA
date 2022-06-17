import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from '../common/Color'
import { useNavigation } from '@react-navigation/native'

const Voucher = () => {
    const navigation=useNavigation()
  return (
    <View style={{flex:1, justifyContent:'center'}}>
      <TouchableOpacity style={{height:100, alignItems:'center', justifyContent:'center',backgroundColor:Color.custom, borderRadius:10,margin:8}}
      onPress={()=>{navigation.push('AddVoucherTotal')}}>
        <Text style={{color:'white'}}>Khuyến mãi theo tổng tiền hóa đơn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{height:100,justifyContent:'center',alignItems:'center',backgroundColor:Color.custom,borderRadius:10,margin:8}}
      onPress={()=>{navigation.push('AddVoucherAmount')}}>
        <Text style={{color:'white'}}>Khuyến mãi theo số lượng</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Voucher

const styles = StyleSheet.create({})