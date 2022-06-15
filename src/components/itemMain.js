import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import Color from '../common/Color'
import { signOut } from '../utils/Auth'
import { useNavigation } from '@react-navigation/native'
const ItemMain = ({title,screen}) => {
    const navigation=useNavigation()
    const onPress=()=>{
        if(title=='Đăng xuất')
        signOut()
        else
        navigation.push(screen)
    }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={{color:'white'}}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ItemMain

const styles = StyleSheet.create({
    container:{
        backgroundColor:Color.custom,
        height:100,
        width:170,
        borderRadius:10, 
        justifyContent:'center', 
        alignItems:'center', 
        margin:4
    }
})