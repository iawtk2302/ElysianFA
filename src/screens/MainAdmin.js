import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import ItemMain from '../components/itemMain'

const MainAdmin = () => {
  const dataItem=[
    {
      title:"Đơn hàng",
      screen:"Order"
    },
    {
      title:"Thức uống",
      screen:"Product"
    },
    {
      title:"Khuyến mãi",
      screen:"Order"
    },
    {
      title:"Quảng cáo",
      screen:"AddBanner"
    },
    {
      title: 'Nhân viên',
      screen: 'Employee'
    },
    {
      title:"Đăng xuất",
      screen:""
    },
    
  ]
  return (
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
      <FlatList
        style={{marginTop:200}}
        data={dataItem}
        renderItem={({item})=><ItemMain title={item.title} screen={item.screen}/>}
        keyExtractor={(item)=>item+item.title}
        numColumns={2}
      />
    </View>
  )
}

export default MainAdmin

const styles = StyleSheet.create({})