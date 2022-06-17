import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import fireStore from '@react-native-firebase/firestore';
import converTimeToFB from '../utils/convertTime';
import OderDetail from './OderDetail';
import Color from '../common/Color';
export default ItemInOder = ({
  item,
  setModalVisible,
  setArrProducts,
  setLoading,
}) => {
  const [arrProduct, setArrProduct] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [address, setAddress] = useState();
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
    setLoading(true);
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
    // const tempProducts = [];
    for (let item1 of temp) {
      await fireStore()
        .collection('Products')
        .doc(item1.productID)
        .get()
        .then(docSnap => {
          const product = docSnap.data();
          const size = {
            name: item1.size,
            price:
              item1.size === 'M' ? '8000' : item1.size === 'L' ? '16000' : '0',
          };
          item1.state = item.state;
          item1.product = product;
          item1.size = size;
          item1.total = item.totalCost;
          // tempProducts.push(docSnap.data());
          setLoading(false);
        });
    }
    setArrProducts(temp);
    setModalVisible(true);
  };
  const changeStatus = async () => {
    if (convertButton() === 'Xác nhận' || convertButton() === 'Hoàn thành')
      Alert.alert('Xác nhận', 'Bạn xác nhận thay đổi trạng thái đơn hàng', [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            await fireStore()
              .collection('Orders')
              .doc(item.orderID)
              .update({
                state:
                  convertButton() === 'Xác nhận'
                    ? 'shipping'
                    : convertButton() === 'Hoàn thành'
                    ? 'completed'
                    : convertButton() === 'Đã hoàn thành'
                    ? 'completed'
                    : 'cancelled',
              })
              .then(() => {});
          },
        },
      ]);
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fireStore()
        .collection('Users')
        .doc(item.userID)
        .get()
        .then(doc => {
          if (isMounted) setUserInfo(doc.data());
        }),
      fireStore()
        .collection('Addresses')
        .doc(item.idAddress)
        .get()
        .then(doc => {
          if (isMounted) setAddress(doc.data());
          // setLoading(false);
        }),
    ]);
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
          // console.log(item.userID);
          setArrProducts([]);
          loadProducts();
        }}>
        <Text style={{alignSelf: 'center', color: '#000', fontSize: 16}}>
          #{item?.orderID}
        </Text>
        <Text style={{marginVertical:4}}>Tên: {userInfo?.name}</Text>
        <Text style={{marginVertical:4}}>Tổng cộng: {parseInt(item.totalCost)}đ</Text>
        <Text style={{marginVertical:4}}>Ngày tạo: {converTimeToFB(item.createdAt)}</Text>
        <View
          style={{height: 0.6, backgroundColor: '#ccc', marginTop: 10}}></View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 15,
            }}
            numberOfLines={3}>
            {address?.ward + ',' + address?.district + '\n' + address?.province}
            {/* {userInfo?.phoneNumber} */}
          </Text>
          <TouchableOpacity
            activeOpacity={
              item.state === 'cancelled' || item.state === 'completed' ? 1 : 0.5
            }
            style={{
              backgroundColor: Color.custom,
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
