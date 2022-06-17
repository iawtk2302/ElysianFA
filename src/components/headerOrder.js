import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from '../common/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const HeaderOrder = ({data}) => {
  const Navigation = useNavigation();
  const navSearch=()=>{
    Navigation.push("SearchProduct",{data:data})
  }
  const navAdd=()=>{
    Navigation.push("AddProduct")
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Icon name="chevron-back-outline" size={26} color="white"  style={{marginRight:4}} onPress={()=>{Navigation.goBack()}}/>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
        Thức uống
      </Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Icon name="search-outline" size={26} color="white"  style={{marginRight:15}} onPress={navSearch}/>
        <Icon name="add-outline" size={26} color="white"  onPress={navAdd}/>
      </View>  
    </View>
  );
};

export default HeaderOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.custom,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
