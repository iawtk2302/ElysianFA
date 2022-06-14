import {View, TouchableOpacity, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import fireStore from '@react-native-firebase/firestore';
import converTimeToFB from '../utils/convertTime';
import { ActivityIndicator } from 'react-native';

export default ItemInOder = ({item, setModalVisible, setArrProducts, setLoading}) => {
  const [arrProduct, setArrProduct] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [address, setAddress] = useState()
  // const [loading, setLoading] = useState(true);

  const changeColor = state => {
    return state === 'waiting'
      ? '#4CC2FF'
      : state === 'shipping'
      ? '#16C60C'
      : state === 'cancelled'
      ? '#F84F4F'
      : '#FED66D';
  };
  const convertStatus = () => {
    return item.state === 'waiting'
      ? 'Chờ xử lý'
      : item.state === 'shipping'
      ? 'Đang giao'
      : item.state === 'cancelled'
      ? 'Đã hủy'
      : 'Hoàn thành';
  };

  const convertButton = () => {
    return item.state === 'waiting'
      ? 'Xác nhận'
      : item.state === 'shipping'
      ? 'Hoàn thành'
      : item.state === 'cancelled'
      ? 'Đã hủy'
      : 'Đã hoàn thành';
  };
  const loadProducts = async () => {
    const temp = [];
    await fireStore()
      .collection('OrderDetails')
      .where('orderID', '==', item.orderID)
      .get()
      .then(snap => {
        snap.forEach(docSnap => {
          temp.push(docSnap.data());
        });
      });
    const tempProducts = [];
    for (let item of temp) {
      await fireStore()
        .collection('Products')
        .doc(item.productID)
        .get()
        .then(docSnap => {
          tempProducts.push(docSnap.data());
        });
    }
    setArrProducts(tempProducts);
  };
  const changeStatus = async () => {
    await fireStore()
      .collection('Orders')
      .doc(item.orderID)
      .update({
        state: convertButton() === 'Xác nhận' ? 'shipping' : 'completed',
      })
      .then(() => {});
  };

  useEffect(() => {
    let isMounted = true;
    fireStore()
      .collection('Users')
      .doc(item.userID)
      .get()
      .then(doc => {
        if (isMounted) setUserInfo(doc.data());
      });
    fireStore()
    .collection('Addresses')
    .doc(item.idAddress)
    .get()
    .then(doc => {
      if(isMounted)setAddress(doc.data())
    })
    // setLoading(false)
    return () => {
      isMounted = false;
    };
  }, []);
  // if (loading) {
  //   return <ActivityIndicator />;
  // }
  return (
    <View
      style={{
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        borderRadius: 15,
        padding: 15,
      }}>
      <TouchableOpacity
        onPress={() => {
          console.log(item.userID);
          // setArrProducts([]);
          // loadProducts();
          setModalVisible(true);
        }}>
        <Text>{userInfo?.name}</Text>
        <Text>{userInfo.phoneNumber}</Text>
        <Text>Tổng cộng: {parseInt(item.totalCost)}đ</Text>
        <Text>Ngày tạo: {converTimeToFB(item.createdAt)}</Text>
        <View
          style={{height: 0.6, backgroundColor: '#ccc', marginTop: 10}}></View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: changeColor(item.state), fontWeight: '500'}} numberOfLines={2}>
            {address?.ward + ',' + address?.district + '\n' + address?.province}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              height: 30,
              justifyContent: 'center',
              borderRadius: 5,
              padding: 5,
            }}
            onPress={() => {
              changeStatus();
            }}>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              {convertButton()}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
