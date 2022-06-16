import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const OderDetail = ({item}) => {
  // console.log(item);
  const calculatetotalTopping = () => {
    let total = 0
    item.toppingIDs.forEach(element => {
      total += parseInt(element.price)
    })
    return total
  }
  const calculateTotalPrice = () => {
    // console.log(item.size.price);
    return (
      ((parseInt(item.product.price) + parseInt(item.size.price)) *
      parseInt(item.amount)) + calculatetotalTopping()
    );
  };
  return (
    <TouchableOpacity
      style={{marginTop: 15, backgroundColor: '#fff'}}
      activeOpacity={1}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
        <Image
          source={{uri: item.product.linkImage}}
          style={{flex: 1, height: 100}}
        />
        <View style={{flex: 4, paddingLeft: 15}}>
          <Text style={{color: '#000', fontSize: 16}}>{item.product.name}</Text>
          <Text>
            Kích cỡ:
            <Text style={{color: '#000'}}> {item.size.name}</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 15,
            }}>
            <Text>
              SL:
              <Text style={{color: '#000'}}> {item.amount}</Text>
            </Text>
            <Text>Giá: 
              <Text style={{color: '#000'}}> {item.product.price}</Text>
            </Text>
          </View>
        </View>
      </View>
      {item.toppingIDs?.map(element => {
        console.log(element);
        return (
          <View
            key={element.linkImage}
            style={{
              flex: 1,
              paddingLeft: 25,
              height: 35,
              flexDirection: 'row',
              marginVertical: 6,
              alignItems: 'center'
            }}>
            <Image
              source={{uri: element.linkImage}}
              style={{width: 55, height: 30}}
            />
            <View
              style={{
                paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
                paddingRight: 15
              }}>
              <Text>{element.name}</Text>
              <Text>
                Giá:
                <Text style={{color: '#000'}}> {element.price}</Text>
              </Text>
            </View>
          </View>
        );
      })}
      <View
        style={{
          height: 0.6,
          backgroundColor: '#ccc',
          marginHorizontal: 15,
        }}></View>
      <View
        style={{
          paddingVertical: 15,
          paddingLeft: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}>
        <Text style={{color: '#000'}}>x{item.amount}</Text>
        <Text>Thành tiền: 
          <Text style={{color: '#000'}}> {calculateTotalPrice()}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};
//

export default OderDetail;

const styles = StyleSheet.create({});
