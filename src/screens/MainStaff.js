import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { signOut } from '../utils/Auth'
import { useNavigation } from '@react-navigation/native'
import ItemMain from '../components/itemMain'

const MainStaff = () => {
    const navigation = useNavigation()
    const dataItem=[
      {
        title:"Đơn hàng",
        screen:"Order"
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

export default MainStaff

const styles = StyleSheet.create({})