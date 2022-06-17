import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {signOut} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ItemInOder from '../components/itemInOrders';
import ItemInOrders from '../components/itemInOrders';
import OderDetail from '../components/OderDetail';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native';
import Color from '../common/Color';
const Shipping = () => {
  const [arrShipping, setArrShipping] = useState([]);
  const [data1, setData1] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0)
  const [address, setAddress] = useState('');
  const getAddress = async() => {
    // console.log(data[index].idAddress)
    firestore()
        .collection('Addresses')
        .doc(data1[index].idAddress)
        .get()
        .then(doc => {
          setAddress(doc.data());
          // setLoading(false);
        });
  }
  const changeStatus = async () => {  
    if (convertButton() === 'Xác nhận' || convertButton() === 'Hoàn thành')
      Alert.alert('Xác nhận', 'Bạn xác nhận thay đổi trạng thái đơn hàng', [
        {
          text: 'Không',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => { 
            await firestore()
              .collection('Orders')
              .doc(arrShipping[0].orderID)
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
              .then(() => {setModalVisible(false)});
              await fireStore()
              .collection('OrderHistories')
              .where('orderID', '==', arrProducts[0].orderID)
              .get()
              .then(query => {
                query.forEach(doc => {
                  doc.ref.update({
                    completeTime: new Date()
                  })
                })
              });
          },
        },
      ]);
  };
  const getData = async () => {
    await firestore()
      .collection('Orders')
      .where('state', '==', 'shipping')
      .onSnapshot(query => {
        const temp = [];
        // console.log(query.data())
        query.forEach(doc => {
          temp.push(doc.data());
        });
        temp.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        setData1(temp);
        // console.log(temp)
      });
  };
  const convertButton = () => {
    return arrShipping[0]?.state === 'waiting'
      ? 'Xác nhận'
      : arrShipping[0]?.state === 'shipping'
      ? 'Hoàn thành'
      : arrShipping[0]?.state === 'cancelled'
      ? 'Đã hủy'
      : 'Đã hoàn thành';
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <ScrollView>
        {data1.map((item, index) => {
          return (
            <ItemInOder
              setLoading={setLoading}
              key={index}
              item={item}
              setModalVisible={setModalVisible}
              setArrProducts={setArrShipping}
              index={index}
              getAddress={getAddress}
              setIndex={setIndex}
            />
          );
        })}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {arrShipping.map((item, index) => {
              return (
                <View key={index}>
                  <OderDetail item={item} />
                </View>
              );
            })}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{marginTop:15, paddingLeft: 16}}>
                <Text style={{fontSize: 15}}>
                  Địa chỉ: 
                   <Text style={{color: '#000',}}> {address?.ward +
                    ',' +
                    address?.district +
                    '\n' +
                    address?.province}{' '}</Text>
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Text style={{marginTop: 10, fontSize: 16, marginRight: 15}}>
                  {' '}
                  Tổng cộng:
                  <Text style={{color: '#000'}}> {arrShipping[0]?.total}</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    changeStatus();
                  }}
                  style={{
                    backgroundColor: Color.custom,
                    // alignSelf: 'flex-end',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 10,
                    marginRight: 10,
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'white'}}>{convertButton()}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View height={70} />
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.closeBtn}>
            <IonIcons
              name="close-circle"
              style={{fontSize: 50, color: '#B81F32'}}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Shipping;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    shadowColor: '#000',
    elevation: 5,
    height: '95%',
  },
  closeBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    bottom: 15,
    transparent: true,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
